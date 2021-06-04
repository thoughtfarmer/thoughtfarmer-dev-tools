import { FunctionComponent } from 'react';
import FieldType from './fieldType';
import CheckBox from './fields/checkbox';
import Dropdown from './fields/dropdown';
import Radio from './fields/radio';
import TextBox from './fields/textBox';
import { IFieldProps } from './fields/formFieldHelpers';

const FormInput: FunctionComponent<IFieldProps> = (props) => {

    switch (props.field.fieldType) {
        case FieldType.Textbox:
        case FieldType.Email:
        case FieldType.Telephone:
            return <TextBox {...props} />;
        case FieldType.Radio:
            return <Radio {...props} />;
        case FieldType.Checkbox:
            return <CheckBox {...props} />;
        case FieldType.Select:
            return <Dropdown {...props} />;
        default:
            return <WarningMessage reversed containsHtml message={`Field type ${props.field.fieldType} is not yet supported. Contact <a href="mailto:helpdesk@thoughtfarmer.com">helpdesk@thoughtfarmer.com</a> for a quote for Professional Services.`}/>;
    }

};

export default FormInput;