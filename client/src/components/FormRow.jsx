const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      {type != 'dropdown' ? (
        <input
          className='form-input'
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
        />
      ) : (
        <select
          className='form-input'
          name={name}
          value={value}
          onChange={handleChange}
        ></select>
      )}
    </div>
  );
};
export default FormRow;
