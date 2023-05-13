const FormRow = ({ type, name, value, handleChange, labelText, id }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <input
        className='form-input'
        id={id}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};
export default FormRow;
