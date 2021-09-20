import clsx from "clsx";

function Input(props) {

  const {className, placeholder, required, type="text", ...rest} = props;
  const classNames = clsx({
    input: true
  }, className)

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
    )
  }

export default Input;
