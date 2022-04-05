import React, { useEffect, useRef, useState } from "react";

import Header from "./components/Header";
import Operations from "./pages/Operations";
import Features from "./pages/Features";
import Testimonials from "./pages/Testimonials";
import Footer from "./pages/Footer";

///////////////////////////////////////
// DOM Elements

const allButtons = document.getElementsByTagName("button");

export const GlobalContext = React.createContext();

function App() {
  const btnScrollTo = useRef();
  const section1 = useRef();
  const modal = useRef();
  const overlay = useRef();
  const header = useRef();

  const currentSlide = useRef(0);
  // const [currentSlide, setCurrentSlide] = useState(0);

  //on mount add event listeners
  useEffect(() => {
    //Open Modal
    const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
    for (let i = 0; i < btnsOpenModal.length; i++) {
      btnsOpenModal[i].addEventListener("click", openModal);
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modal.current.classList.contains("hidden")) {
        closeModal();
      }
    });

    // smooth scroll for each nav item
    document
      .querySelector(".nav__links")
      .addEventListener("click", function (e) {
        e.preventDefault();
        if (e.target.classList.contains("btn--show-modal")) return;

        document
          .querySelector(`${e.target.attributes.href.value}`)
          .scrollIntoView({ behavior: "smooth" });
      });
  }, []);

  //Reveal Sections using IntersectionObserver
  useEffect(() => {
    const allSections = document.querySelectorAll(".section");

    const revealSection = function (entries, observer) {
      const [entry] = entries;
      //if section is intersecting, remove class "hidden"
      if (!entry.isIntersecting) return;
      entry?.target.classList.remove("section--hidden");
      //remove observer
      observer.unobserve(entry.target);
    };
    //declare new Observer(callback, {options})
    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });
    //observe each section - and add class "hidden"
    allSections.forEach((section) => {
      sectionObserver.observe(section);
      section.classList.add("section--hidden");
    });
  }, []);

  //Lazy Load Images
  useEffect(() => {
    //select all image El's
    const featuresImages = document.querySelectorAll(".features__img");
    //use Observer to monitor all images, callback: 1. remove blur 2. change img src

    //observer callback
    const loadImage = function (entries, observer) {
      const [entry] = entries;
      //IntersectionObserver API always runs the callback on the first element...
      //...so return if entries are not intersecting
      if (!entry.isIntersecting) return;
      //swap src
      entry.target.src = entry.target.dataset.src;
      //remove blur when new img loads
      entry.target.addEventListener("load", function () {
        this.classList.remove("lazy-img");
      });
      observer.unobserve(entry.target);
    };
    // declare observer
    const Observer = new IntersectionObserver(loadImage, {
      root: null,
      threshold: 0,
      rootMargin: "200px",
    });
    //observe each img
    featuresImages.forEach((img) => {
      Observer.observe(img);
    });
  }, []);

  //Slider
  useEffect(() => {
    const slides = document.querySelectorAll(".slide");
    const dotContainer = document.querySelector(".dots");
    const handleDotClick = function (i) {
      console.log(i);
    };

    const createDots = function () {
      slides.forEach((_, i) => {
        dotContainer.insertAdjacentHTML(
          "beforeend",
          `<button class="dots__dot" data-slide=${i}></button>`
        );
      });
    };

    createDots();

    document.querySelectorAll(".dots__dot").forEach((el) => {
      el.addEventListener("click", function (e) {
        console.log(this);
        currentSlide.current = this.dataset.slide;
        goToSlide();
      });
    });

    //position slides based on current slide
    const goToSlide = function () {
      slides.forEach((slide, i) => {
        slide.style.transform = `translateX(${
          100 * (i - currentSlide.current)
        }%)`;
      });
    };
    //on load position slides
    goToSlide();

    //on btn click, set current slide and reposition all slides
    document.querySelectorAll(".slider__btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        let direction = this.dataset.direction === "right" ? 1 : -1;
        //error boundaries
        if (direction === 1 && currentSlide.current === slides.length - 1)
          return;
        if (direction === -1 && currentSlide.current === 0) return;
        //set slide and reposition
        currentSlide.current = currentSlide.current + direction;
        goToSlide();
      });
    });
  }, []);

  //// Open/Close Modal
  const openModal = function () {
    modal.current.classList.remove("hidden");
    overlay.current.classList.remove("hidden");
  };

  const closeModal = function () {
    modal.current.classList.add("hidden");
    overlay.current.classList.add("hidden");
  };

  const globalVars = {
    openModal,
    closeModal,
    btnScrollTo,
    section1,
    modal,
    overlay,
    header,
  };


  return (
    <GlobalContext.Provider value={globalVars}>
      <div>
        <Header />
        <Features />
        <Operations />
        <Testimonials />
        <Footer />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
