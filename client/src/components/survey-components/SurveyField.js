import React from 'react';

export default ({ input, meta, label, placeholder }) => {
  return (
    <React.Fragment>
      <label style={{fontSize: '15px'}}>{label}</label>
      <input {...input} placeholder={placeholder} />
      <div className="red-text mb-3">{meta.touched && meta.error}</div>
    </React.Fragment>
  )
};