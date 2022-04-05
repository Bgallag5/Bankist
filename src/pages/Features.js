import React, {useContext} from 'react'
import { GlobalContext } from '../App'

export default function Features() {
    const {section1} = useContext(GlobalContext);

  return (
    <section ref={section1} className="section" id="section--1">
    <div className="section__title">
      <h2 className="section__description">Features</h2>
      <h3 className="section__header">
        Everything you need in a modern bank and more.
      </h3>
    </div>

    <div className="features">
      <img
        src={require("../img/digital-lazy.jpg")}
        data-src={require("../img/digital.jpg")}
        alt="Computer"
        className="features__img lazy-img"
      />
      <div className="features__feature">
        <div className="features__icon">
        <i><span className='material-icons'>settings_remote</span></i>
        </div>
        <h5 className="features__header">100% digital bank</h5>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias
          sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam
          debitis ducimus.
        </p>
      </div>

      <div className="features__feature">
        <div className="features__icon">
          <i><span className='material-icons'>paid</span></i>
        </div>
        <h5 className="features__header">Watch your money grow</h5>
        <p>
          Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
          inventore ab? Nulla incidunt eius numquam sequi iste pariatur
          quibusdam!
        </p>
      </div>
      <img
        src={require("../img/grow-lazy.jpg")}
        data-src={require("../img/grow.jpg")}
        alt="Plant"
        className="features__img lazy-img"
      />

      <img
        src={require("../img/card-lazy.jpg")}
        data-src={require("../img/card.jpg")}
        alt="Credit card"
        className="features__img lazy-img"
      />
      <div className="features__feature">
        <div className="features__icon">
        <i><span className='material-icons'>payment</span></i>
        </div>
        <h5 className="features__header">Free debit card included</h5>
        <p>
          Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
          eveniet consequatur odit quam quos possimus assumenda dicta fuga
          inventore ab.
        </p>
      </div>
    </div>
  </section>
  )
}
