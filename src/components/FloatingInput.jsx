import {Form, Field, ErrorMessage } from 'formik';
const FloatingInput = (props) => {
  return (
    <div className={`form-floating ${props.classInput}`}>
      <Field 
        type={props.type} 
        className={props.className} 
        placeholder={props.placeholder}
        name={props.name}
      />
      <label>{props.label}</label>
      <ErrorMessage name={props.name} component='small'>
          {msg=><div className={props.classNameMessage}>{msg}</div>}
      </ErrorMessage>
    </div>
  )
}
FloatingInput.defaultProps={
    type:'text',
    className:'form-control',
    classNameMessage:'text-danger',
    classInput:''
}
export default FloatingInput