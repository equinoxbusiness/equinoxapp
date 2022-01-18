import { Field } from 'formik';
import React from 'react';
import './WithFormField.scss';

const WithFormField: React.FC<any> = (props) => {
  const { label, type = 'text', name, disabled, options, error, optionkey = 'id', optionval = 'name' } = props;
  return (
    <div className="with-form-field" data-testid="WithFormField">
      <div className="text-start">
        <label htmlFor={name} className="form-label" title={label}>{label}</label>
      </div>
      {type !== 'select' && <Field id={name} name={name} type={type} className={error ? 'form-input invalid': 'form-input'}  disabled={disabled} {...props}/>}
      {type === 'select' && 
        <Field name={name} as="select" className={error ? 'form-input invalid': 'form-input'} disabled={disabled} {...props}>
          <option></option>
          {options.map((o: any)=>{
            return <option value={o[optionkey]} key={o[optionkey]}>{o[optionval]}</option>
          })}
        </Field>
      }
    </div>
  );
};

export default WithFormField;
