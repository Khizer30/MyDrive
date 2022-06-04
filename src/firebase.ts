import { FirebaseApp, initializeApp } from "firebase/app" ;
import { getStorage, FirebaseStorage, ref, StorageReference, listAll, ListResult } from "firebase/storage" ;

const firebaseConfig: object = 
{
  apiKey: "AIzaSyBzC5X4Wno8eRiw7sJXsTnwvUhd2A9oBjA",
  authDomain: "mydrive-0786.firebaseapp.com",
  projectId: "mydrive-0786",
  storageBucket: "mydrive-0786.appspot.com",
  messagingSenderId: "643926601290",
  appId: "1:643926601290:web:fbf2c72979f74c7dde80b3",
  measurementId: "G-J58DCKLRK9"
} ;

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig) ;
const storage: FirebaseStorage = getStorage(app) ;

// Fetch List of Files
function fetchList(): void
{
  let theRef: StorageReference = ref(storage, "/myFiles") ;
  listAll(theRef)
  .then((res: ListResult) =>
  {
    // Put File Paths in String
    let arr: string = "" ;
    res.items.forEach((newItem: StorageReference) =>
    {
      arr += newItem + " ... " ;
    })
    arr = arr.replaceAll("gs://mydrive-0786.appspot.com/myFiles/", "") ;
  
    // Put File Paths in Array
    const myArr: string[] = arr.split(" ... ") ;
    myArr.pop() ;
  
    // Set Session Storage
    sessionStorage.setItem("allFiles", JSON.stringify(myArr)) ;
  })
  .catch(() =>
  {
    // Set Session Storage
    sessionStorage.setItem("allFiles", JSON.stringify([])) ;
  })
}

// Exports
export { storage, fetchList } ;