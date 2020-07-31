"use strict";
console.log(data);

set_valitut = new Set();

window.onload = function() {
  toggleAccordions();
  luoTehtavat();
  
}

function luoTehtavat() {
  let perus = document.getElementById("perusopinnot");
  console.log(perus);
  for(let teht of data.tehtavat) {
    perus.appendChild(luoTehtava(teht.nro, teht.kuvaus, teht.suoritettu, teht.id));
  }
}


function luoTehtava(nro, kuvaus, suoritettu, id) {
  var div1=document.createElement('div');
  div1.className='col s12 m12 l6';
  var div2=document.createElement('div');
  div2.className='card z-depth-0';
  div1.appendChild(div2);
  var div3=document.createElement('div');
  div3.className='card-content center';
  div2.appendChild(div3);
  var h31=document.createElement('h3');
  div3.appendChild(h31);
  var txt4 = document.createTextNode('Tehtävä '+nro);
  h31.appendChild(txt4);
  var h51=document.createElement('h5');
  div3.appendChild(h51);
  var txt6=document.createTextNode(kuvaus);
  h51.appendChild(txt6);
  var div4=document.createElement('div');
  div4.className='card-action center';
  div2.appendChild(div4);
  if (!suoritettu) {
    var a1=document.createElement('button');
    a1.addEventListener('click', function(e) {
      if (set_valitut.has(e.target.id)) {
        set_valitut.delete(e.target.id);
        e.target.className = 'btn brand-text yellow darken-2'
        if (set_valitut.size == 0) {
          let footer = document.querySelector('div.fixed');
          footer.classList.remove('show')
        }
      } else {
        set_valitut.add(e.target.id);
        e.target.className = 'btn brand-text green darken-4'
        let footer = document.querySelector('div.fixed');
        footer.classList.add('show')
        //e.target.parentNode.removeChild(e.target); 
      }
      console.log(set_valitut);
    })
    a1.className='btn brand-text yellow darken-2';
    a1.id=id;
    div4.appendChild(a1);
    var txt8=document.createTextNode('Valitse');
    a1.appendChild(txt8);
  }
  return div1;
}

function toggleAccordions() {
  var accordions=document.querySelectorAll("button.accordion");

  for(var i=0; i < accordions.length; i++) {
    accordions[i].onclick=function(){
      this.classList.toggle("active");
      this.nextElementSibling.classList.toggle("show");
    }
  }
}