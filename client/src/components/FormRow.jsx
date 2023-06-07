const FormRow = ({
  type,
  name,
  value,
  checked,
  handleChange,
  labelText,
  placeholder,
  min,
  step,
}) => {
  return (
    <div className={`form-row ${type == 'checkbox' && 'checkbox'}`}>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input
        className='form-input'
        type={type}
        name={name}
        value={value}
        min={min}
        step={step}
        checked={checked}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
export default FormRow;
