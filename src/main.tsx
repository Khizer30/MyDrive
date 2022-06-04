import ReactDOM from "react-dom/client" ;
import loadable from "@loadable/component" ;
import { BrowserRouter, Routes, Route } from "react-router-dom" ;
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
  return (
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Navbar /> }>

          <Route index element={ <Upload /> } />
          <Route path="/download" element={ <Download /> } />
          <Route path="/animation" element={ <Animation /> } />
          <Route path="*" element={ <NotFound /> } />

        </Route>
      </Routes>
    </BrowserRouter>
  </>
  ) ;
}

// Render
ReactDOM.createRoot(app).render(<App />) ;