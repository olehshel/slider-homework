import React, { Component } from "react";
import "./style.css";

const sliderData = [
  {
    id: 1,
    img: "https://stsci-opo.org/STScI-01EVSQQZQDXK4V2BYGG8TNW9A1.png",
    title: "THE COSMIC REEF: NGC 2014 AND NGC 2020",
    text: "Hubble reveals a colorful landscape of iridescent gases, streamers of dust, and brilliant, newborn stars in the giant red nebula NGC 2014. The blue ring of glowing oxygen at left is the neighboring nebula NGC 2020, formed by a torrential gaseous outflow from a lone, massive, super-hot star at its center.",
  },
  {
    id: 2,
    img: "https://stsci-opo.org/STScI-01EVVB69VN7R8RAD7XQJ8FWM22.png",
    title: "MARS WITH MOON",
    text: "Hubble captured the tiny moon Phobos during its orbital trek around Mars in this time-lapse photo. The telescope has observed the solar system for 30 years, providing long-term information on the planets` weather and satellites.",
  },
  {
    id: 3,
    img: "https://stsci-opo.org/STScI-01EVSV9FNE6WMSTB219Q4E0DJ8.png",
    title: "JUPITER",
    text: "Among Jupiter`s most striking features is the Great Red Spot, a storm rolling counterclockwise between two bands of clouds moving in opposite directions.",
  },
];

class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slides: sliderData,
      currentSlideIndex: 0,
      isSlideshowRunning: false,
    };

    this.intervalId = null;
  }

  componentDidMount() {
    this.startSlideshow();
  }

  componentWillUnmount() {
    this.stopSlideshow();
  }

  startSlideshow = () => {
    this.setState({ isSlideshowRunning: true }, () => {
      this.intervalId = setInterval(this.nextSlide, 3000);
    });
  };

  stopSlideshow = () => {
    this.setState({ isSlideshowRunning: false }, () => {
      clearInterval(this.intervalId);
    });
  };

  prevSlide = () => {
    const { currentSlideIndex, slides } = this.state;
    const lastIndex = slides.length - 1;
    const newIndex =
      currentSlideIndex === 0 ? lastIndex : currentSlideIndex - 1;
    this.setState({ currentSlideIndex: newIndex });
  };

  nextSlide = () => {
    const { currentSlideIndex, slides } = this.state;
    const lastIndex = slides.length - 1;
    const newIndex =
      currentSlideIndex === lastIndex ? 0 : currentSlideIndex + 1;
    this.setState({ currentSlideIndex: newIndex });
  };

  render() {
    const { slides, currentSlideIndex, isSlideshowRunning } = this.state;
    const currentSlide = slides[currentSlideIndex];

    return (
      <div className="slider">
        <div className="img-wrapper">
          <button className="btn btn-prev" onClick={this.prevSlide}>
            {"<"}
          </button>
          <img
            className="img"
            src={currentSlide.img}
            alt={currentSlide.title}
          />
          <button className="btn btn-next" onClick={this.nextSlide}>
            {">"}
          </button>
        </div>
        <div className="text-wrapper">
          <h1 className="h1">{currentSlide.title}</h1>
          <p className="p">{currentSlide.text}</p>
        </div>
        <div className="controls">
          {isSlideshowRunning ? (
            <button className="btn-slideshow" onClick={this.stopSlideshow}>
              Stop Slideshow
            </button>
          ) : (
            <button className="btn-slideshow" onClick={this.startSlideshow}>
              Start Slideshow
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Slider;