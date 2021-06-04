import { FunctionComponent } from 'react';
import FormInput from '../../shared/formflow/formInput';
import tfcFormFlowApi from 'tfcFormFlowApi';

interface IProps {
    updateField: (fieldId: number, data: any) => void;
    section: tfcFormFlowApi.ApiFormSection;
    submit: () => void;
    fieldErrors: Record<number, string>;
    // following props from plug-in component https://www.npmjs.com/package/react-step-wizard automatically passed down
    isActive?: boolean;
    currentStep?: number;
    totalSteps?: number;
    firstStep?: () => void;
    lastStep?: () => void;
    nextStep?: () => void;
    previousStep?: () => void;
    goToStep?: (step: number | string) => void;
}

const StepContainer: FunctionComponent<IProps> = (props: IProps) => {

    const previous = props.currentStep === 1 ? null : <Button classNames="tfc-left-button" onClick={props.previousStep} ><i className="fa fa-arrow-left"></i>Previous</Button>;
    const next = props.currentStep === props.totalSteps ? <Button classNames="tfc-right-button" onClick={props.submit} ><i className="fa fa-check"></i>Submit</Button> :
        <Button rightIcon classNames="tfc-right-button" onClick={props.nextStep} >Next<i className="fa fa-arrow-right"></i></Button>;

    return <div className="tfc-step-container">
        <div className="tfc-step-progress">Step {props.currentStep} of {props.totalSteps}</div>
        <h3>{tf.localizedListGetAnyCulture(ctx, props.section.label) || `Section ${props.section.sortOrder}`}</h3>
        {props.section.fields.map( field => <FormInput key={`field${field.fieldId}`} field={field} updateField={props.updateField} hasError={!!props.fieldErrors[field.fieldId]} errorMessage={props.fieldErrors[field.fieldId]}/>)}
        <div className="tfc-step-controls">
            {previous}
            {next}
        </div>
    </div>;
};

export default StepContainer;