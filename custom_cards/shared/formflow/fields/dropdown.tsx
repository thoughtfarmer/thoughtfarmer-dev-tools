import { ChangeEvent, FunctionComponent } from 'react';
import { getCommonFieldElements, IFieldProps } from './formFieldHelpers';


const Dropdown: FunctionComponent<IFieldProps> = ({updateField, field, hasError, errorMessage, defaultValue}) => {

    const name = `field${field.fieldId}`;
    const {classNames, helpTextElement, requiredIcon, errorElement} = getCommonFieldElements(field, hasError, errorMessage, 'tfc-dropdown');

    const onChange = (item: ChangeEvent<HTMLSelectElement>) => {        
        updateField(field.fieldId, item.target.value);
    };

    return <div className={classNames}>
        <div className="tfc-input-label">{tf.localizedListGetAnyCulture(ctx, field.label)}{requiredIcon}</div>
        {helpTextElement}
        <select name={name} defaultValue={defaultValue} onChange={onChange}>
            {field.options.map( option => {
                return <option key={option.optionId} value={option.value} className="tfc-option">
                    {tf.localizedListGetAnyCulture(ctx, option.label)}
                </option>;
            })}
        </select>
        
        {errorElement}
    </div>;
};

export default Dropdown;