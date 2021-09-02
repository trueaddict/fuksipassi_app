import React from 'react';
import linkki_logo from '../Linkin_logo.png';

const Frontpage = () => {
  return (
    <section className="container">
      <div className="row">
        <div className="col s12">
          <h4 class="grey-text text-darken-3">Klikkaa oman ainejärjestösi fuksipassiin tästä!</h4>
        </div>
        <div className="col s12 m6">
          <div class="card z-depth-0 grey lighten-4">
            <div class="card-content center card-size">
              <h3 class="">Syrinx</h3>
              <a href="/syrinx"><img src="http://groups.jyu.fi/syrinx/kuvat/logot/originaalit/syrinx_logo.png" alt="" class="responsive-img"/></a>
            </div>
          </div>
        </div>
        <div className="col s12 m6">
          <div class="card z-depth-0 grey lighten-4">
            <div class="card-content center card-size">
              <h3 class="">Linkki</h3>
              <a href="/linkkijkl"><img src={linkki_logo} alt="" class="responsive-img"/></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Frontpage;