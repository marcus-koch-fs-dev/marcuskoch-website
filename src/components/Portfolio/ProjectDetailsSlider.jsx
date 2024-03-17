import { useEffect, useRef } from "react";
import { useState } from "react";

import Slider from "react-slick";
import ModalLayer from "./ModalLayer";

const ProjectDetailsSlider = ({ darkTheme, projectDetails }) => {
  const sliderRef = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState(null);

  const handleOpen = (img) => {
    setImg(img);
    setIsOpen(true);
  };

  const handleClose = () => {
    setImg(null);
    setIsOpen(false);
  };

  const settings = {
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
          projectDetails?.sliderImages?.map((obj, index) => {
            const { desc, medium, big } = obj;
            return (
              <div key={index}>
                <div
                  className="item"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="img-fluid"
                    onClick={() => handleOpen(big)}
                    alt=""
                    src={medium}
                    style={{
                      cursor: "pointer",
                      maxHeight: "30vh",
                      margin: "0 auto",
                    }}
                  />
                  <p
                    className={
                      "text-dark font-weight-600 me-2" +
                      (darkTheme ? " text-white" : "")
                    }
                  >
                    {desc}
                  </p>
                </div>
              </div>
            );
          })}
      </Slider>
      {isOpen && (
        <ModalLayer
          image={img}
          handleClose={handleClose}
          darkTheme={darkTheme}
        />
      )}
    </div>
  );
};

export default ProjectDetailsSlider;
