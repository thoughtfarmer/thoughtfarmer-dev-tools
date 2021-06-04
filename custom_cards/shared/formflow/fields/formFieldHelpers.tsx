import tfcFormFlowApi from 'tfcFormFlowApi';

export interface IFieldProps {
    updateField: (fieldId: number, data: any) => void;
    field: tfcFormFlowApi.ApiFormField;
    hasError?: boolean;
    errorMessage?: string;
    defaultValue?: string;
}

export interface ICommonFieldElements {
    classNames: string;
    helpTextElement: JSX.Element;
    requiredIcon: JSX.Element;
    errorElement: JSX.Element;
}

export const getCommonFieldElements = (field: tfcFormFlowApi.ApiFormField, hasError: boolean, errorMessage: string, className?: string): ICommonFieldElements => {
    const helpText = tf.localizedListGetAnyCulture(ctx, field.helpText);
    const classNames = `tfc-form-input ${className ? className : ''} ${hasError ? 'tfc-field-has-error' : ''}`;
    const helpTextElement = helpText && helpText.length ? <div className="tfc-help-text">{helpText}</div> : null;
    const requiredIcon = field.isRequired ? <span className="tfc-required-icon">*</span> : null;    
    const errorElement = hasError && errorMessage ? <ErrorMessage message={errorMessage} /> : null;

    return {
        classNames: classNames,
        helpTextElement: helpTextElement,
        requiredIcon: requiredIcon,
        errorElement: errorElement
    };
};
