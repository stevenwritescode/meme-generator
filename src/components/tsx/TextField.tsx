import { v4 as uuid } from "uuid";
import React, { useState } from "react";
import "../css/TextField.css";
import { ITestable } from "../../common/ITestable";

interface ITextField {
  className: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: (value: string) => void;
}

const TextField: React.FC<ITextField & ITestable> = ({ label, value, onChange, onBlur, className }) => {
  const classVar = className ? className + " text-field" : "text-field",
    [text, setText] = useState(value),
    id = uuid();

  const handlers = {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setText(newValue);
      if (onChange) {
        onChange(newValue);
      }
    },
    onBlur: (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      setText(newValue);
      if (onBlur) {
        onBlur(newValue);
      }
    }
  };

  return (
    <div className={classVar}>
      <label className={`${className} text-field-label`} htmlFor={id}>
        {label}
      </label>
      <input className={`${className} text-field-input`} id={id} type="text" value={text} onChange={handlers.onChange} onBlur={handlers.onBlur} data-testid="text-field" />
    </div>
  );
};

export default TextField;
