import Slider from "react-slick";
import { reviews } from "./testimonialList";
import BookingButton from "../BookingButton";
import HeadlineWrapperH2 from "../Header/HeadlineWrapperH2";

const Testimonials = ({ classicHeader, darkTheme }) => {
  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };
  return (
    <section
      id="rezensionen"
      className={"section " + (darkTheme ? "bg-dark-1" : "")}
    >
      <div className={"container " + (classicHeader ? "" : "px-lg-5")}>
        <HeadlineWrapperH2 label={"Rezensionen"} darkTheme={darkTheme} />
        <Slider {...settings}>
          {reviews.length > 0 &&
            reviews.map((value, index) => (
              <div className="item" key={index}>
                <div
                  className={
                    " rounded p-5 " + (darkTheme ? "bg-dark" : "bg-light")
                  }
                >
                  <div className="d-flex align-items-center mt-auto mb-4">
                    <img
                      className="img-fluid rounded-circle border d-inline-block w-auto w"
                      style={{ height: "5rem" }}
                      src={value.path}
                      alt=""
                    />
                    <p className="ms-3 mb-0">
                      <strong
                        className={
                          "d-block fw-600 " +
                          (darkTheme ? "text-white" : "text-dark")
                        }
                      >
                        {value.name}
                      </strong>
                      <span className="text-muted fw-500">
                        {value.position}
                      </span>
                    </p>
                  </div>
                  <p
                    className={
                      " fw-500 mb-4 " + (darkTheme ? "text-white" : "text-dark")
                    }
                    style={{ wordBreak: "break-word" }}
                  >
                    “{value.desc}”
                  </p>
                  <span className="text-2">
                    {[...Array(value.rating)].map((value, i) => (
                      <i className="fas fa-star text-warning" key={i} />
                    ))}
                  </span>
                </div>
              </div>
            ))}
        </Slider>
      </div>
      <div
        style={{
          // padding: "0",
          // width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // border: "red solid 1px",
        }}
      >
        <BookingButton />
      </div>
    </section>
  );
};

export default Testimonials;
