import { useState, useRef } from "react" ;

// Upload
function Upload(): JSX.Element
{
  // Title
  document.title = "MyDrive - Upload" ;

  // Variables
  const [selectedFile, setFile]: any = useState(undefined) ;
  const fileInput: any = useRef(undefined) ;

  // Handle Bug
  const handleBug = (event: any): void =>
  {
    event.preventDefault() ;
  }

  // Handle Change
  const handleChange = (event: any): void =>
  {
    setFile(event.target.files[0]) ;
  }

  // Select File
  const handleClick = (): void =>
  {
    fileInput.current.click() ;
  }

  // Upload File
  const upload = (): void =>
  {
    const formData = new FormData() ;
    formData.append("theFile", selectedFile, selectedFile.name) ;

    if (selectedFile !== undefined)
    {
      sendFile("http://localhost:8000/upload", formData) ;
    }
  }

  // Fetch
  const sendFile = async (url: string = "", data: any = undefined) =>
  {
    const response = await fetch(url, 
    {
      mode: 'cors',
      method: 'POST',
      headers: 
      {
      'Content-Type': 'multipart/form-data"'
      },
      body: data
    }) ;

    let res = await response.text() ;

    console.log(res) ;
  }

  return (
  <>
    <div className="container-fluid mainContainer">
      <h1 className="heading"> Upload Files </h1>
    { (selectedFile !== undefined) &&
      <div role="alert" className="alert bold alert-success">
        <span> { selectedFile.name } </span>
      </div>
    }
      <form action="" method="post" target="_self" encType="multipart/form-data"
      autoComplete="off" noValidate onSubmit={ handleBug }>
        <div>
          <input type="file" ref={ fileInput } onChange={ handleChange } className="displayNone" />
          <button type="button" onClick={ handleClick } className="mainButton"> Select a File </button>
        </div>
      { 
      /*
        <div className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
          <div className="d-flex d-md-flex justify-content-center align-items-center justify-content-md-center align-items-md-center dropDiv">
            <p className="dropPar"> Drag The File Here </p>
          </div>
        </div>
      */ 
      }
      { (selectedFile !== undefined) &&
        <div>
          <button type="button" onClick={ upload } className="mainButton"> Upload </button>
        </div>
      }
      </form>
    </div>
  </>
  ) ;
}

// Export Upload
export default Upload ;