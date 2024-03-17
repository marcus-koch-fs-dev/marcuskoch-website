import React, { useEffect, useRef } from "react";

import Slider from "react-slick";

const ProjectDetailsSlider = ({ darkTheme, projectDetails }) => {
  const sliderRef = useRef();

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
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

  useEffect(() => {
    sliderRef.current.slickGoTo(0);
  }, [projectDetails]);

  return (
    <div className="col-md-8" style={{ margin: "0 auto" }}>
      <Slider {...settings} ref={sliderRef}>
        {/* <div className="item">
          <img className="img-fluid" alt="" src={projectDetails?.thumbImage} />
        </div> */}
        {projectDetails?.sliderImages?.length > 0 &&
          projectDetails?.sliderImages?.map((image, index) => {
            return (
              <>
                <div
                  className="item"
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="img-fluid"
                    alt=""
                    src={image}
                    style={{
                      maxHeight: "30vh",
                      margin: "0 auto",
                      //   width: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <span
                    className={
                      "text-dark font-weight-600 me-2" +
                      (darkTheme ? " text-white" : "")
                    }
                  >
                    image description
                  </span>
                </div>
              </>
            );
          })}
      </Slider>
    </div>
  );
};

export default ProjectDetailsSlider;
