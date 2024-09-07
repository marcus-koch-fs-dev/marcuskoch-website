import { useEffect, useRef } from "react";
import { useState } from "react";
import "./projectDetailsSlider.scss";

import Slider from "react-slick";
import { Overlay } from "./Overlay";

const ProjectDetailsSlider = ({ projectDetails }) => {
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

  const sliderImages = projectDetails?.sliderImages || [];
  const settings = {
    arrows: sliderImages.length > 1, // Zeigt Pfeile nur, wenn es mehr als ein Bild gibt
    infinite: sliderImages.length > 1, // Endloses Scrollen nur bei mehr als einem Bild
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
    <div className="details-wrapper">
      <Slider {...settings} ref={sliderRef} className="">
        {sliderImages.map((obj, index) => {
          const { desc, medium, big } = obj;
          return (
            <div key={index} className="details-item">
              <h4 className="details-desc">{desc}</h4>
              <div className="details-img">
                <img onClick={() => handleOpen(big)} alt="" src={medium} />
              </div>
            </div>
          );
        })}
      </Slider>
      {isOpen && (
        <Overlay handleClose={handleClose}>
          <img
            src={img}
            className="details-max"
            // style={{ width: "100%", maxHeight: "80%" }}
          />
        </Overlay>
      )}
    </div>
  );
};

export default ProjectDetailsSlider;
