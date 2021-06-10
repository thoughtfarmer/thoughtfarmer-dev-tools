import { IConfigurtationItem, parseConfig } from '../shared/utilities';
import RTEContentContainer from './components/rteContentContainer';

const params: IConfigurtationItem[] = [
    { key: 'sourceId', type: 'int', defaultValue: 0 },
    { key: 'showTitle', type: 'boolean', defaultValue: false },
    { key: 'alternateTitle', type: 'string', defaultValue: null },
    { key: 'icon', type: 'string', defaultValue: null },
    { key: 'useSummary', type: 'boolean', defaultValue: true },
    { key: 'hideBottomBorder', type: 'bool', defaultValue: false }
];

const config = parseConfig(portletConfig, params);
config.ctx = ctx;
config.isUserInAdminMode = ctx.session.inAdminMode;
config.portletConfigurationId = portletConfigurationId;

let hideBottomBorderClass = '';
if (config.hideBottomBorder) {
    hideBottomBorderClass = 'tfc-hide-bottom-border';
}

replaceView(<RTEContentContainer {...config} />, {classNames: hideBottomBorderClass});
