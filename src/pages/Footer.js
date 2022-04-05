import React, {useContext, useEffect} from "react";
import { GlobalContext } from "../App";
import { Link } from "react-router-dom";

export default function Footer() {
    const {overlay, modal, closeModal} = useContext(GlobalContext);

    
    const handleFormSubmit = (e) => {
      e.preventDefault();
      const form = document.querySelector(".modal__form");
     const fields = form.querySelectorAll("input")
     fields.forEach(el => console.log(el.value));
     //setCurrentUser

    }


  return (
    <>
      <section className="section section--sign-up">
        <div className="section__title">
          <h3 className="section__header">
            The best day to join Bankist was one year ago. The second best is
            today!
          </h3>
        </div>
        <button className="btn btn--show-modal">
          Open your free account today!
        </button>
      </section>
      <footer className="footer">
        <ul className="footer__nav">
          <li className="footer__item">
            <a className="footer__link" href={"/"}>
              About
            </a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href={"/"}>
              Pricing
            </a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href={"/"}>
              Terms of Use
            </a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href={"/"}>
              Privacy Policy
            </a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href={"/"}>
              Careers
            </a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href={"/"}>
              Blog
            </a>
          </li>
          <li className="footer__item">
            <a className="footer__link" href={"/"} >
              Contact Us
            </a>
          </li>
        </ul>
        <img src={require("../img/icon.png")} alt="Logo" className="footer__logo" />
        <p className="footer__copyright">
          &copy; Copyright by
          <a
            className="footer__link twitter-link"
            target="_blank"
            rel="noreferrer"
            href="https://twitter.com/jonasschmedtman"
          >
            Jonas Schmedtmann
          </a>
          . Use for learning or your portfolio. Don't use to teach. Don't claim
          as your own product.
        </p>
      </footer>
      <div ref={modal} className="modal hidden">
        <button onClick={() => closeModal()} className="btn--close-modal">&times;</button>
        <h2 className="modal__header">
          Open your bank account <br />
          in just <span className="highlight">5 minutes</span>
        </h2>
        <form className="modal__form">
          <label>First Name</label>
          <input type="text" />
          <label>Last Name</label>
          <input type="text" />
          <label>Choose a PIN</label>
          <input type="text" />
          <button onClick={handleFormSubmit} className="btn">Register &rarr;</button>
        </form>
      </div>
      <div ref={overlay} onClick={() => closeModal()} className="overlay hidden"></div>
    </>
  );
}
