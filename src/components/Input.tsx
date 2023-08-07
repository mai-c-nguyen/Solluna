import React from "react";
import clsx from "clsx";

function Input(props: any) {
  const { className, placeholder, required, type = "text" } = props;
  const classNames = clsx(
    {
      input: true,
    },
    className
  );

  return (
    <label className="label">
      {placeholder}
      {required && <span className="input-required">*</span>}
      <div>
        <input
          type={type}
          className={classNames}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </label>
  );
}

export default Input;
