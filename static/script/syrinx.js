console.log(data);


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
  if ('true' !== suoritettu) {
    var form=document.createElement('form');
    form.setAttribute('action', '/tarkista');
    form.setAttribute('method', 'post');
    div4.appendChild(form);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Viesti / Tutorin nimi');
    input.setAttribute('name', 'message');
    input.setAttribute('id', id);
    form.appendChild(input);
    var button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.className = 'btn brand-text yellow darken-2';
    form.appendChild(button);
    var txt7 = document.createTextNode('Lähetä');
    button.appendChild(txt7);
  } else {
    var button = document.createElement('button');
    button.className = 'btn brand-text btn-suoritettu';
    div4.appendChild(button);
    button.appendChild(document.createTextNode('Suoritettu'));
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