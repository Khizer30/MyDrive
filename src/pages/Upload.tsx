import { useState } from "react" ;
import { ref, StorageReference, uploadBytesResumable, UploadTask, UploadTaskSnapshot } from "firebase/storage" ;
import { storage } from "../firebase" ;

// Upload
function Upload(props: any): JSX.Element
{
  // Title
  document.title = "MyDrive - Upload" ;

  // Fetch List of Files
  props.fetch() ;

  // Variables
  const [selectedFile, setFile]: any = useState(undefined) ;
  const [progress, setProgress] = useState(0) ;

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
    let input: HTMLInputElement = document.createElement("input") ;
    input.type = "file" ;
    input.onchange = handleChange ;
    input.click() ;
  }

  // Upload File
  const upload = (): void =>
  {
    let storageRef: StorageReference = ref(storage, "myFiles/" + selectedFile.name) ;
    let uploadTask: UploadTask = uploadBytesResumable(storageRef, selectedFile) ;

    uploadTask.on("state_changed", (snapshot: UploadTaskSnapshot): void =>
    {
      // Set Progress Bar
      setProgress(snapshot.bytesTransferred / snapshot.totalBytes * 100) ;
    })
  }

  return (
  <>
    <div className="container-fluid mainContainer">
      <h1 className="heading"> Upload Files </h1>

      <form action="" method="post" target="_self" encType="multipart/form-data"
      autoComplete="off" noValidate onSubmit={ handleBug }>
        <div className="progress proBar">
          <div className="progress-bar bg-dark progress-bar-striped progress-bar-animated" style={{ width: progress + "%" }}></div>
        </div>
        <div className={ (selectedFile === undefined ? "invisible" : "") }>
          <p className="heading2"> { (selectedFile === undefined ? "NULL" : selectedFile.name) } </p>
          <button type="button" onClick={ upload } className="mainButton"> Upload </button>
        </div>
        <div className="d-flex d-sm-flex justify-content-center align-items-center justify-content-sm-center align-items-sm-center">
          <div className="d-flex d-md-flex justify-content-center align-items-center justify-content-md-center align-items-md-center dropDiv">
            <p onClick={ handleClick } className="dropLink"> Select a File to Upload </p>
          </div>
        </div>
      </form>
    </div>
  </>
  ) ;
}

// Export Upload
export default Upload ;