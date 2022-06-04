import { useState } from "react" ;
import { ref, StorageReference, getDownloadURL, deleteObject } from "firebase/storage" ;
import { storage, fetchList } from "../firebase" ;
import Message from "./Message" ;

// Download
function Download(): JSX.Element
{
  // Title
  document.title = "MyDrive - Download" ;

  // Fetch List of Files
  fetchList() ;

  // Variables
  const [name, setName] = useState("NULL") ;
  const allFiles = JSON.parse(sessionStorage.getItem("allFiles")!) ;
  // ...
  const [message, setMessage] = useState("NULL") ;
  const [type, setType] = useState("alert-danger") ;

  // Handle Bug
  const handleBug = (event: any): void =>
  {
    event.preventDefault() ;
  }

  // Delete
  const deleteIt = (): void =>
  {
    let theRef: StorageReference = ref(storage, "/myFiles/" + name) ;
    deleteObject(theRef)
    .then(() =>
    {
      setType("alert-success") ;
      setMessage(name + " Deleted!") ;
    
      // Reset
      setName("NULL") ;
      fetchList() ;
    })
  }

  // Handle Change
  const handleChange = (event: any): void =>
  {
    setName(event.target.value) ;
  }

  // Download
  const download = (): void =>
  {
    let theRef: StorageReference = ref(storage, "/myFiles/" + name) ;
    getDownloadURL(theRef)
    .then((url) =>
    {
      const xhr: XMLHttpRequest = new XMLHttpRequest() ;
      xhr.responseType = "blob" ;
      xhr.open("GET", url) ;
      xhr.onload = (): void =>
      {
        const blob: Blob = xhr.response ;

        let a: HTMLAnchorElement = document.createElement("a") ;
        a.href = window.URL.createObjectURL(blob) ;
        a.download = name ;
        a.click() ;
      }
      xhr.send() ;
    })
  }

  // Mapper
  const mapper = (x: string): JSX.Element =>
  {
    return (
    <>
      <option value={ x } className="optionButton"> { x } </option>
    </>
    ) ;
  }

  return (
  <>
    <div className="container-fluid mainContainer">
      <h1 className="heading"> Download / Delete Files </h1>

      <Message mes={ message } type={ type } />

      <form action="" method="post" target="_self" encType="application/x-www-form-urlencoded"
      autoComplete="off" noValidate onSubmit={ handleBug }>

        <div className="form-floating">
          <select name="name" id="name" value={ name } onChange={ handleChange } className="form-select marginTB">
            <option value="NULL" disabled className="displayNone"> </option>
            {
              allFiles.map(mapper)
            }
          </select>
          <label htmlFor="name" className="form-label"> Select a File </label>
        </div>

        <div>
          <button onClick={ download } className="mainButton" type="button"> Download </button>
        </div>
        <div>
          <button onClick={ deleteIt } className="mainButton" type="button"> Delete </button>
        </div>
      </form>
    </div>
  </>
  ) ;
}

// Export Download
export default Download ;