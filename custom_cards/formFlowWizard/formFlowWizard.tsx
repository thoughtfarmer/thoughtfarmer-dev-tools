import { parseConfig } from '../shared/utilities';
import FormWizardContainer from './components/formWizardContainer';

const params = [
    { key: 'formId', type: 'int', defaultValue: 0 }
];

const config = parseConfig(portletConfig, params);

replaceView(<FormWizardContainer formId={config.formId} />);