const FormRowSelect = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText}
      </label>
      <select
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        {list.map((itemValue, index) => {
          return (
            <option
              key={index}
              value={itemValue}
              hidden={index === 0 ? true : false}
              disabled={
                itemValue == 'Standard rep ranges' ||
                itemValue == 'More specific rep ranges'
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
