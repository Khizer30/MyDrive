// Message
function Message(props: any): JSX.Element
{
  return (
  <>
    <div role="alert" className={ "alert bold " + props.type + ((props.mes === "NULL") ? " invisible" : "") }>
      <span> { props.mes } </span>
    </div>
  </>
  ) ;
}

// Export Message
export default Message ;