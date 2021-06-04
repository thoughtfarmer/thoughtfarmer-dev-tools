import { FunctionComponent } from 'react';
import Likert from 'react-likert-scale';
import { getCommonFieldElements, IFieldProps } from './formFieldHelpers';

const LikertScale: FunctionComponent<IFieldProps> = ({updateField, field, hasError, errorMessage}) => {

    const {classNames, errorElement} = getCommonFieldElements(field, hasError, errorMessage, 'tfc-likert');

    const onChange = (response: any) => {        
        updateField(field.fieldId, response.value);
    };

    const likertOptions = {
        question: tf.localizedListGetAnyCulture(ctx, field.label),
        responses: field.options.map(option => {
            return { value: option.value, text: tf.localizedListGetAnyCulture(ctx, option.label)};
        }),
        onChange: onChange,
        layout: 'stacked'
    };

    return <div className={classNames}>      
        <Likert {...likertOptions} />
        {errorElement}
    </div>;
};

export default LikertScale;