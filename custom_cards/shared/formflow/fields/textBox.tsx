import { FunctionComponent, useRef } from 'react';
import { getCommonFieldElements, IFieldProps } from './formFieldHelpers';

const TextBox: FunctionComponent<IFieldProps> = ({updateField, field, hasError, errorMessage}) => {

    const input = useRef(null);
    const {classNames, helpTextElement, requiredIcon, errorElement} = getCommonFieldElements(field, hasError, errorMessage, 'tfc-text-input');

    const onChange = () => {
        updateField(field.fieldId, input.current.value);
    };

    return <div className={classNames}>
        <div className="tfc-input-label">{tf.localizedListGetAnyCulture(ctx, field.label)}{requiredIcon}</div>
        {helpTextElement}
        <input type="text" ref={input} onChange={onChange}/>
        {errorElement}
    </div>;
};

export default TextBox;