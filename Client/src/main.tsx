import ReactDOM from "react-dom/client" ;
import loadable from "@loadable/component" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
// ...
import Animation from "./pages/Animation" ;
const Navbar = loadable(() => import("./pages/Navbar"), { fallback: <Animation /> }) ;
const Download = loadable(() => import("./pages/Download"), { fallback: <Animation /> }) ;
const Upload = loadable(() => import("./pages/Upload"), { fallback: <Animation /> }) ;
const Error = loadable(() => import("./pages/Error"), { fallback: <Animation /> }) ;

// HTML DOM Element
const app: HTMLElement = document.getElementById("app")! ;

// App
function App(): JSX.Element
{
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navbar /> }>

          <Route index element={ <Download /> } />
          <Route path="/upload" element={ <Upload /> } />
          <Route path="/animation" element={ <Animation /> } />
          <Route path="*" element={ <Error /> } />

        </Route>
      </Routes>
    </BrowserRouter>
  </>
  ) ;
}

// Render
ReactDOM.createRoot(app).render(<App />) ;