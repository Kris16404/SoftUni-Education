export default function () {
  return (
    <div class="hero_area">
      <header class="header_section">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg custom_nav-container">
            <a class="navbar-brand" href="index.html">
              <span>Hostit</span>
            </a>

            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class=""> </span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="index.html">
                    Home <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="about.html">
                    {' '}
                    About
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="service.html">
                    Services
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="price.html">
                    Pricing
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="contact.html">
                    Contact Us
                  </a>
                </li>
              </ul>
              <div class="quote_btn-container">
                <form class="form-inline">
                  <button class="btn nav_search-btn" type="submit">
                    <i class="fa fa-search" aria-hidden="true"></i>
                  </button>
                </form>
                <a href="">
                  <i class="fa fa-phone" aria-hidden="true"></i>
                  <span> Call : +01 123455678990 </span>
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
}
