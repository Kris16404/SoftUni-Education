export default function () {
  return (
    <section className="slider_section">
      <div id="customCarousel1" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      Tech Store <br />
                    </h1>
                    <p>
                      One of the best websites to search for trading computer
                      parts. Have a problem with the features of our website? -
                      contact us.
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        Learn More About Us
                      </a>
                      <a href="" className="btn-2">
                        Contact Us
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="img-box">
                        <img src="images/slider-img.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      What Is Tech Store <br />
                    </h1>
                    <p>
                      Tech Store is a website that stocks computer parts monthly
                      and has the option for users to sell their parts aswell
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        View Stock
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="img-box">
                        <img src="images/slider-img.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <div className="container">
              <div className="row">
                <div className="col-md-6">
                  <div className="detail-box">
                    <h1>
                      Big Choice <br />
                    </h1>
                    <p>
                      We have a lot of buyers and sellers with over 1 Million
                      sells every Year. Tech Store is restoring over 1 thousand
                      parts every month
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-1">
                        Go To Store
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="img-box">
                        <img src="images/slider-img.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel_btn-box">
          <a
            className="carousel-control-prev"
            href="#customCarousel1"
            role="button"
            data-slide="prev"
          >
            <i className="fa fa-angle-left" aria-hidden="true"></i>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#customCarousel1"
            role="button"
            data-slide="next"
          >
            <i className="fa fa-angle-right" aria-hidden="true"></i>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </section>
  );
}
