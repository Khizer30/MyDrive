import { Outlet, Link, NavLink, useLocation, Location } from "react-router-dom" ;

// Navbar
function Navbar(): JSX.Element
{
  // Variable
  const location: Location = useLocation() ;

  return (
  <>
    <nav className="navbar navbar-dark navbar-expand-md bg-dark py-3 navContainer">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <span className="navHeading"> MyDrive </span>
        </Link>
        <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol">
          <span className="visually-hidden"> Toggle Navigation </span>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navcol">
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <NavLink to="/" className={ "nav-link navLink" + (location.pathname === "/" ? " active" : "") }> Upload </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/download" className={ "nav-link navLink" + (location.pathname === "/download" ? " active" : "") }> Download </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>

    <Outlet />
  </>
  ) ;
}

// Export Navbar
export default Navbar ;