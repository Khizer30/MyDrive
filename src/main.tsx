import ReactDOM from "react-dom/client" ;
import loadable from "@loadable/component" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
import { Provider, useDispatch } from "react-redux" ;
import { ref, StorageReference, listAll, ListResult } from "firebase/storage" ;
import { storage } from "./firebase" ;
import { setList } from "./redux/listSlice" ;
import store from "./redux/store" ;
// ...
import Animation from "./pages/Animation" ;
const Navbar = loadable(() => import("./pages/Navbar"), { fallback: <Animation /> }) ;
const Download = loadable(() => import("./pages/Download"), { fallback: <Animation /> }) ;
const Upload = loadable(() => import("./pages/Upload"), { fallback: <Animation /> }) ;
const NotFound = loadable(() => import("./pages/NotFound"), { fallback: <Animation /> }) ;

// HTML DOM Element
const app: HTMLElement = document.getElementById("app")! ;

// App
function App(): JSX.Element
{
  // Fetch List Function
  const fetchList = (): void =>
  {
    const dispatch = useDispatch() ;

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
    
      // Set Redux
      dispatch(setList(JSON.stringify(myArr))) ;
    })
  }

  return (
  <>
    <Provider store={ store }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Navbar /> }>

            <Route index element={ <Upload fetch={ fetchList } /> } />
            <Route path="/download" element={ <Download fetch={ fetchList } /> } />
            <Route path="/animation" element={ <Animation /> } />
            <Route path="*" element={ <NotFound /> } />

          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
  ) ;
}

// Render
ReactDOM.createRoot(app).render(<App />) ;