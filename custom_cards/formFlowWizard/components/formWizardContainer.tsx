import React from 'react';
import { firePromise } from '../../shared/apiHelpers/apiHelpers';
import tfcFormFlowApi from 'tfcFormFlowApi';
import StepWizard from 'react-step-wizard';
import StepContainer from './stepContainer';
import { guid } from '../../shared/utilities';

/*
React Step Wizard
https://github.com/jcmcneal/react-step-wizard

MIT License

Copyright (c) 2017 Jason McNeal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

interface IProps {
    formId: number;
}

interface IState {
    isLoading: boolean;
    isSaving: boolean;
    loadError: boolean;
    saveError: boolean;
    errorMessage: string;
    form: tfcFormFlowApi.ApiForm;
    formEntryData: Record<number,any>;
    formCreateSuccess: boolean;
    fieldErrors: Record<number, string>;
}


export default class FormWizardContainer extends React.Component<IProps, IState> {

    // The portletConfigurationId ensures the action name is unique for every instance of the custom card.
    // Otherwise, multiple instances of the same card will fire each other's event listeners with potentially the wrong data.
    private _loadFormAction = `tfcLoadFormAction_${portletConfigurationId}`;
    private _loadCreateAction = `tfcCreateEntryAction_${portletConfigurationId}`;

    // Each resource in the FormFlow API can be newed up as its own client.
    private _formApiClient = new tfcFormFlowApi.ApiFormApi();
    private _formEntryApiClient = new tfcFormFlowApi.ApiFormEntryApi();


    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isSaving: false,
            loadError: false,
            saveError: false,
            errorMessage: '',
            formCreateSuccess: false,
            form: null,
            formEntryData: {},          
            fieldErrors: {}
        };
    }

    componentDidMount() {
        // Register event listeners with unique action names and callbacks
        ctx.customPortlets.addEventListener(this._loadFormAction, this.formLoaded);
        ctx.customPortlets.addEventListener(this._loadCreateAction, this.formEntryCreated);

        // Create the load form promise. All available functions should be available with intelli-sense and include documentation.
        const loadForm = this._formApiClient.publicFormFormIdGet(this.props.formId);

        // Fire off the Promise and associate its completion with an action name
        firePromise(ctx, this._loadFormAction, loadForm);       
    }

    componentWillUnmount() {
        // Remove event listeners when component unmounts to avoid memory leaks
        ctx.customPortlets.removeEventListener(this._loadFormAction, this.formLoaded);
        ctx.customPortlets.removeEventListener(this._loadCreateAction, this.formEntryCreated);
    }

    // The callback fired when an action is complete. It MUST have this exact signature.
    formEntryCreated = (success: boolean, data: any) => {
        if (!success) {

            if (data.response.responseJSON.hasErrors) {
                const response: tfcFormFlowApi.FormEntryErrorResponse = data.response.responseJSON;
                if (response.formError.length) {
                    this.setState({
                        isSaving: false,
                        saveError: true,
                        errorMessage: response.formError
                    });
                    return;
                }

                const fieldErrors: Record<number, string> = {};
                response.fieldErrors.forEach( error => {
                    fieldErrors[error.formFieldData['fieldId']] = error.errorMessage;
                });

                this.setState({
                    isSaving: false,
                    saveError: true,
                    errorMessage: 'There were field validation errors. Please check the fields in the form and correct any errors.',
                    fieldErrors: fieldErrors
                });
                return;

            }

            this.setState({
                isSaving: false,
                saveError: true,
                errorMessage: 'Error saving form entry. Check the console for details.'
            });
            return;
        } 

        this.setState({
            isSaving: false,
            formCreateSuccess: true
        });

    }

    formLoaded = (success: boolean, data: any) => {
        if (!success) {
            this.setState({
                isLoading: false,
                loadError: true,
                errorMessage: `Error loading Form with id ${this.props.formId}.<br> <strong>Status: </strong>${data.response.status}<br><strong>Message: </strong>${data.response.statusText}<br>`
            });
            return;
        } 

        this.setState({
            isLoading: false,
            form: data
        });
    }

    updateField = (fieldId: number, value: any) => {
        const formEntryData = tf.clone(this.state.formEntryData);
        const fieldErrors = tf.clone(this.state.fieldErrors);
        formEntryData[fieldId] = value;
        delete fieldErrors[fieldId];
        this.setState({
            formEntryData: formEntryData,
            fieldErrors: fieldErrors
        });
    }

    submit = () => {
        const now = new Date();
        const request: tfcFormFlowApi.ApiFormEntryCreateModel = {
            formId: this.props.formId,
            scratchpadId: guid(),
            startDate: now.toISOString(),
            data: JSON.stringify(this.state.formEntryData)
        };
        const createEntry = this._formEntryApiClient.publicFormentryPost(request);
        firePromise(ctx, this._loadCreateAction, createEntry);
        this.setState({
            isSaving: true,
            saveError: false
        });
    }

    render() {
        let body = null;
        if (this.state.isLoading) {
            return <LoadingIndicator />;
        }
        
        if (this.state.loadError) {
            body = <WarningMessage reversed containsHtml message={this.state.errorMessage} />;
        } else if (this.state.formCreateSuccess) {
            body = <div className="tfc-information">
                {tf.localizedListGetAnyCulture(ctx, this.state.form.thankyouMessage) || 'Thank you for submitting your entry'}
            </div>;
        } else {
            body = <StepWizard>
                {this.state.form.sections.map( section => <StepContainer key={section.sectionId} submit={this.submit} section={section} updateField={this.updateField} fieldErrors={this.state.fieldErrors}/>)}
            </StepWizard>;
        }

        const saveErrors = this.state.saveError ? <WarningMessage reversed message={this.state.errorMessage} /> : null;
       
     
        return <div className="tfc-form-wizard-container">
            {saveErrors}
            {body}
        </div>;
    }
}