import { Tooltip } from 'react-tooltip'
const Button = (props) => {
  return (
    <>
      <button 
          id                   = {props.id}
          type                 = {props.type} 
          className            = {`${props.className} ${props.zise}`} 
          onClick              = {props.onClick}
          data-tooltip-place   = {props.place}
          data-tooltip-content = {props.content}
      >
          {props.children}
      </button>
      {
        props.tooltip && (
          <Tooltip anchorId={props.id} />
        )
      }
    </>
  )
}
Button.defaultProps={
    id        : null,
    type      : 'button',
    className : 'btn btn-primary',
    zise      : 'btn-sm',
    tooltip   : false,
    place     : null,
    content   : null,

}
export default Button