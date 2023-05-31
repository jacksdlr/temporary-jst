const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
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
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
export default FormRow;
