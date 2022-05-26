import { useState } from "react" ;

// Download
function Download(): JSX.Element
{
  // Title
  document.title = "MyDrive - Download" ;

  // Handle Bug
  const handleBug = (event: any): void =>
  {
    event.preventDefault() ;
  }

  return (
  <>
    <div className="container-fluid mainContainer">
      <h1 className="heading"> Download / Delete Files </h1>
      <div role="alert" className="alert alert-success bold">
        <span> Error </span>
      </div>
      <form action="" method="post" target="_self" encType="application/x-www-form-urlencoded"
      autoComplete="off" noValidate onSubmit={ handleBug }>
        <div className="form-floating">
          <select name="theFile" id="theFile" className="form-select marginTB">
            <option value="1"> 1 </option>
            <option value="NULL" disabled className="displayNone"> </option>
          </select>
          <label htmlFor="theFile" className="form-label"> Select a File </label>
        </div>
        <div>
          <button className="mainButton" type="button"> Download </button>
        </div>
        <div>
          <button className="mainButton" type="button"> Upload </button>
        </div>
      </form>
    </div>
  </>
  ) ;
}

// Export Download
export default Download ;