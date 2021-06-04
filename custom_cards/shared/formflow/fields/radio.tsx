import { ChangeEvent, FunctionComponent } from 'react';
import { getCommonFieldElements, IFieldProps } from './formFieldHelpers';

const Radio: FunctionComponent<IFieldProps> = ({updateField, field, hasError, errorMessage}) => {

    const name = `field${field.fieldId}`;
    const {classNames, helpTextElement, requiredIcon, errorElement} = getCommonFieldElements(field, hasError, errorMessage, 'tfc-radio');

    const onChange = (item: ChangeEvent<HTMLInputElement>) => {        
        updateField(field.fieldId, item.target.value);
    };

    return <div className={classNames}>
        <div className="tfc-input-label">{tf.localizedListGetAnyCulture(ctx, field.label)}{requiredIcon}</div>
        {helpTextElement}
        {field.options.map( option => {
            return <label key={option.optionId} className="tfc-option">
                <input type="radio" name={name} value={option.value} onChange={onChange}/> {tf.localizedListGetAnyCulture(ctx, option.label)}
            </label>;
        })}
        {errorElement}
    </div>;
};

export default Radio;