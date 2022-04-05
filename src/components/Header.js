import React, { useEffect, useContext, useRef } from "react";
import { GlobalContext } from "../App";

export default function Header() {
  const { btnScrollTo, section1 } = useContext(GlobalContext);
  const navRef = useRef();


  const handleMessageRemove = () => {
    const message = document.querySelector(".cookie-message");
    message && message.remove();
  };

  //handle Navbar hover effect
  const handleHover = function (item, opacity) {
    const navBar = document.querySelector(".nav__links");
    navBar.childNodes.forEach((el) => {
      //do nothing on hovered link
      console.log(el === item);
      if (el === item) return;
      //fade all others
      el.style.transition = ".3s";
      el.style.opacity = opacity;
    });
  };

  //add event listeners on mount
  useEffect(() => {
    // Smooth Scrolling
    btnScrollTo.current.addEventListener("click", () => {
      section1.current.scrollIntoView({ behavior: "smooth" });
    });

    //Nav Fade
    document.querySelectorAll(".nav__item").forEach((nav) => {
      //on hover, fade other nav links
      nav.addEventListener("mouseover", () => handleHover(nav, "25%"));
      //listen for mouse out and remove fade
      nav.addEventListener("mouseout", () => handleHover(nav, "100%"));
    });

    const section1Coords = section1.current.getBoundingClientRect();

    //Sticky Navigation
    window.addEventListener("scroll", function () {
      if (window.scrollY <= section1Coords.top) {
        navRef.current.classList.remove("sticky");
      } else if (window.scrollY > section1Coords.top) {
        navRef.current.classList.add("sticky");
        handleMessageRemove();
      }
    });
  }, []);


  return (
    <>
      <div className="cookie-message">
        We use cookies for improved functionality and analytics.
        <button
          onClick={() => handleMessageRemove()}
          className="btn btn--close-cookie"
        >
          Got it!
        </button>
      </div>
      <header className="header">
        <nav ref={navRef} className="nav">
          <img
            src={require("../img/logo.png")}
            alt="Bankist logo"
            className="nav__logo"
            id="logo"
            pokemon="pikachu"
            data-version-num="3.0"
            data-creator="Ben G."
          />
          <ul className="nav__links">
            <li className="nav__item">
              <button className="nav__link" href="#section--1">
                Features
              </button>
            </li>
            <li className="nav__item">
              <button className="nav__link" href="#section--2">
                Operations
              </button>
            </li>
            <li className="nav__item">
              <button className="nav__link" href="#section--3">
                Testimonials
              </button>
            </li>
            <li className="nav__item">
              <button
                className="nav__link nav__link--btn btn--show-modal"
                href={"#"}
              >
                Open account
              </button>
            </li>
          </ul>
        </nav>

        <div className="header__title">
          <h1>
            When <span className="highlight">banking</span> meets
            <br />
            <span className="highlight">minimalist</span>
          </h1>
          <h4>A simpler banking experience for a simpler life.</h4>
          <button ref={btnScrollTo} className="btn--text btn--scroll-to">
            Learn more{" "}
            <i>
              <span className="material-icons">expand_more</span>
            </i>{" "}
          </button>
          <img
            src={require("../img/hero.png")}
            className="header__img"
            alt="Minimalist bank items"
          />
        </div>
      </header>
    </>
  );
}
