import React from 'react';
import { IContent } from '../../../public_api_client/models/content/IContent';
import ApiClient from '../../../public_api_client/client/apiClient';
import { firePromise } from '../../shared/apiHelpers/apiHelpers';


export interface IProps {
    sourceId: number;
    showTitle: boolean;
    portletConfigurationId: number;
    alternateTitle?: string;
    icon?: string;
    isUserInAdminMode: boolean;
    useSummary: boolean;
}

interface IState {
    page: IContent;
    hasError: boolean;
    errorMessage: string;
}

export default class RTEContentContainer extends React.Component<IProps, IState> {

    private _actionName = `tfcRTEContainerPageLoaded_${this.props.portletConfigurationId}`;   
    private _apiClient: ApiClient = new ApiClient();

    constructor(props: IProps) {
        super(props);

        this.state = {
            page: null,
            hasError: false,
            errorMessage: ''
        };
    }

    componentDidMount() {
        ctx.customPortlets.addEventListener(this._actionName, this.contentLoaded);
        
        const getContent = this._apiClient.content.getContent(this.props.sourceId);
        firePromise(ctx, this._actionName, getContent);
    }

    componentWillUnmount() {
        ctx.customPortlets.removeEventListener(this._actionName, this.contentLoaded);
    }   
    
    contentLoaded = (success: boolean, data: any) => {
        if (success) {
            this.setState({
                page: data
            });
        } else {
            this.setState({
                hasError: true,
                errorMessage: data
            });
        }
    }

    render() {
        if (this.state.hasError && this.props.isUserInAdminMode) {
            return (
                <div className="tfc-error">
                    <i className="fa fa-exclamation-circle"></i>
                    There was an error with loading the data. Please make sure the card configuration is correct and the page exists then reload the page.
                </div>
            );
        }

        if (!this.state.page) {
            return null;
        }

        let titleElem = null;
        let icon = null;
        const summary = tf.localizedListGetAnyCulture(ctx, this.state.page.summary);
        const body = tf.localizedListGetAnyCulture(ctx, this.state.page.body);
        const content = summary.length && this.props.useSummary ? summary : body;

        if (this.props.showTitle) {
            const title = !this.props.alternateTitle ? tf.localizedListGetAnyCulture(ctx, this.state.page.title) : this.props.alternateTitle;
            titleElem = <h3 className="tf-portlet-heading" data-cy="rteTitle">{title}</h3>;

            if (this.props.icon !== '') {
                icon = <i data-cy="rteIcon" className={`tf-portlet-icon fa ${this.props.icon}`}></i>;
            }
        }

        return (
            <div lang={ctx.session.culture}>
                <div className="tfc-rte-heading">
                    {titleElem}
                    {icon}
                </div>
                <div data-cy="rteBody" className="tfc-side-column-rte-body tf-richtext-content" >
                    <div dangerouslySetInnerHTML={{ __html: content }}/>
                </div>
            </div>
        );
    }

}
