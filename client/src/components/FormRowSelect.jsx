const FormRowSelect = ({
  labelText,
  name,
  value,
  handleChange,
  list,
  className,
}) => {
  return (
    <div className={`form-row ${className}`}>
      {labelText && (
        <label htmlFor={name} className='form-label'>
          {labelText}
        </label>
      )}
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className={`form-select`}
      >
        {list.map((itemValue, index) => {
          return (
            <option
              key={index}
              value={itemValue}
              hidden={index === 0 && itemValue != 'All' ? true : false}
              disabled={
                typeof itemValue == 'string' && itemValue.charAt(0) === '-'
                  ? true
                  : false
              }
            >
              {itemValue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
