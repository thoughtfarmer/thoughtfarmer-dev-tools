declare let replaceView: any;
declare let portletConfig: string;
declare let LoadingIndicator: any;
declare let TabbedContainer: any;
declare let Tooltip: any;
declare let Button: any;
declare let portletCss: string;
declare let portletConfigurationId: number;
declare let NewsGridItem: any;
declare let LikeBtn: any;
declare let FollowPageButton: any;
declare let moment: any;
declare let StickyIndicator: any;
declare let TruncatedText: any;
declare let BadgeList: any;
declare let EditBadge: any;
declare let LinkIcon: any;
declare let LinkButton: any;
declare let ButtonLoadingIndicator: any;
declare let DatePicker: any;
declare let CloseBtn: any;
declare let PageTypeIcon: any;
declare let ProfilePhoto: any;
declare let vidyardEmbed: any;
declare let $: any;
declare let ErrorMessage: any;
declare let WarningMessage: any;
declare let NewsListItem: any;
declare let ModalPanel: any;
declare let AutoCompleteInput: any;
declare let ToolTipElement: any;
declare let ProgressBar: any;
declare let AutoCompleteUsersInput: any;
declare let prettyPrint: () => void;
declare let Matomo: any;

declare let tf: ITF & Partial<any>;
declare let ctx: ICTX & Partial<any>;

// Can use these to assist TypeScript and auto-complete for helpful portions of the tf and ctx namespace without having to declare the whole thing
interface ITF {
    clone: <T>(item: T) => T;
    actionCreators: IActionCreators & Partial<any>;
    localizedListGetAnyCulture: (ctx: any, localizedList: any[]) => string;
    logging: ILogging & Partial<any>;
}

interface IActionCreators {
    createHideModalAction: (ctx: any) => void;
    createShowModalAction: (ctx: any, modal: any) => void;
}

interface ILogging {
    logError: (message: string, url: string, line: number, col: number, error: string, debugData: any) => void;
}

interface ICTX {
    customPortlets: ICustomPortlets & Partial<any>;
}

interface ICustomPortlets {
    addEventListener: (actionName: string, callback: (success: boolean, data: any) => void) => void;
    removeEventListener: (actionName: string, callback: (success: boolean, data: any) => void) => void;
}


// non TF globals
declare let ActiveXObject: any;