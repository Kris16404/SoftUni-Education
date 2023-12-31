export default function () {
  return (
    <header className="header_section">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg custom_nav-container">
          <a className="navbar-brand" href="index.html">
            <span>Tech Store</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className=""> </span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <a className="nav-link" href="index.html">
                  Home <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="about.html">
                  {' '}
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="price.html">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="price.html">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="contact.html">
                  Contacts
                </a>
              </li>
            </ul>
            <div className="quote_btn-container"></div>
          </div>
        </nav>
      </div>
    </header>
  );
}
