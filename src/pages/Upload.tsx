import { useState } from "react" ;
import { ref, StorageReference, uploadBytesResumable, UploadTask, UploadTaskSnapshot } from "firebase/storage" ;
import { storage, fetchList } from "../firebase" ;
import Message from "./Message" ;

// Upload
function Upload(): JSX.Element
{
  // Title
  document.title = "MyDrive - Upload" ;

  // Fetch List of Files
  fetchList() ;

  // Variables
  const [selectedFile, setFile]: any = useState(undefined) ;
  const [progress, setProgress] = useState(0) ;
  // ...
  const [message, setMessage] = useState("NULL") ;
  const [type, setType] = useState("alert-danger") ;

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

      // Display Message
      setType("alert-success") ;
      setMessage("File Uploaded Successfully!") ;
    })
  }

  return (
  <>
    <div className="container-fluid mainContainer">
      <h1 className="heading"> Upload Files </h1>

      <Message mes={ message } type={ type } />

      <form action="" method="post" target="_self" encType="multipart/form-data"
      autoComplete="off" noValidate onSubmit={ handleBug }>
        <div>
          <button type="button" onClick={ handleClick } className="mainButton"> Select a File </button>
        </div>
      { (selectedFile !== undefined) &&
        <div>
          <p className="heading2"> { selectedFile.name } </p>
          <button type="button" onClick={ upload } className="mainButton"> Upload </button>
          <div className="progress proBar">
            <div className="progress-bar bg-dark progress-bar-striped progress-bar-animated" style={{ width: progress + "%" }}></div>
          </div>
        </div>
      }
      </form>
    </div>
  </>
  ) ;
}

// Export Upload
export default Upload ;