import { FunctionComponent, useRef } from 'react';
import { getCommonFieldElements, IFieldProps } from './formFieldHelpers';



const CheckBox: FunctionComponent<IFieldProps> = ({updateField, field, hasError, errorMessage}) => {

    const container = useRef<HTMLDivElement>(null);
    const {classNames, helpTextElement, requiredIcon, errorElement} = getCommonFieldElements(field, hasError, errorMessage, 'tfc-checkbox');

    const onChange = () => {
        const checkedElements = container.current.querySelectorAll('input:checked');
        let checkedItems = [];
        if (checkedElements && checkedElements.length) {
            checkedItems = Array.from(checkedElements).map( (input: HTMLInputElement) => input.value);
        }
        updateField(field.fieldId, checkedItems);
    };

    return <div ref={container} className={classNames}>
        <div className="tfc-input-label">{tf.localizedListGetAnyCulture(ctx, field.label)}{requiredIcon}</div>
        {helpTextElement}
        {field.options.map( option => {
            return <label key={option.optionId} className="tfc-option">
                <input type="checkbox" value={option.value} onChange={onChange}/> {tf.localizedListGetAnyCulture(ctx, option.label)}
            </label>;
        })}
        {errorElement}
    </div>;
};

export default CheckBox;