"use strict";
console.log(data);

var name;

window.onload = function() {
  toggleAccordions();
  luoTehtavat();
  updateUserInfo();
  openAccordion();
  luodaankoUusiKayttaja();
}


function luodaankoUusiKayttaja() {
  if (data.newUser == 'true') {
    var div1=document.createElement('div');
    div1.className='policy';
    var h51=document.createElement('h5');
    h51.className='center gray-text';
    div1.appendChild(h51);
    var txt2=document.createTextNode('Luodaanko uusi käyttäjä?');
    h51.appendChild(txt2);
    var p1=document.createElement('p');
    p1.className='center brand-text';
    div1.appendChild(p1);
    var txt4=document.createTextNode('Email');
    p1.appendChild(txt4);
    var p2=document.createElement('p');
    p2.className='center gray-text';
    div1.appendChild(p2);
    var txt6=document.createTextNode('Luomalla käyttäjän hyväksyt palvelun käyttöehdot sekä ');
    p2.appendChild(txt6);
    var a1=document.createElement('a');
    a1.setAttribute('href','./gdpr');
    p2.appendChild(a1);
    var txt7=document.createTextNode('rekisteri- ja tietosuojaselosteen');
    a1.appendChild(txt7);
    var div2=document.createElement('div');
    div2.className='center margin-top-bottom';
    div1.appendChild(div2);
    var button1=document.createElement('button');
    button1.setAttribute('id','signup');
    button1.className='btn green-syrinx';
    div2.appendChild(button1);
    var txt10=document.createTextNode('Kyllä');
    button1.appendChild(txt10);
    var div3=document.createElement('div');
    div3.className='center margin-top-bottom';
    div1.appendChild(div3);
    var a2=document.createElement('a');
    a2.setAttribute('href','/signout');
    a2.className='btn yellow darken-2';
    div3.appendChild(a2);
    var txt14=document.createTextNode('Ei');
    a2.appendChild(txt14);
    var div4=document.createElement('div');
    div4.className='policy-background';
    let pol = document.getElementById('policy');
    pol.appendChild(div1);
    pol.appendChild(div4);   
    document.getElementById('signup').addEventListener('click', function (e) {
      console.log(e);
      let policy = document.getElementsByClassName('policy')[0];
      policy.className = 'hide';
      policy = document.getElementsByClassName('policy-background')[0];
      policy.className = 'hide';
    }); 
  }
}


function updateUserInfo() {
  let parseName = data.user.split('@');
  let name_list = parseName[0].split('.')
  name_list[0] = name_list[0].charAt(0).toUpperCase() + name_list[0].slice(1);
  if (name_list.length > 1) {
    name_list[name_list.length-1] = name_list[name_list.length-1].charAt(0).toUpperCase() + name_list[name_list.length-1].slice(1);
    document.getElementById("useremail").appendChild(document.createTextNode(name_list[0] + ' ' + name_list[name_list.length-1]));
  } else {
    document.getElementById("useremail").appendChild(document.createTextNode(name_list[0]));
  }
  
  
}

function openAccordion() {
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('id') != null) {
    let id = parseInt(urlParams.get('id'))-1;
    let name = document.getElementById(id).className;
    let div = document.getElementById(name).parentElement.previousElementSibling;
    div.classList.toggle("active");
    div.nextElementSibling.classList.toggle("show");
    document.getElementById(id).scrollIntoView(true);
  }
}


function luoTehtavat() {
  var maarat = {};
  maarat['perusopinnot'] = 0;
  maarat['aineopinnot'] = 0;
  maarat['syventavat_opinnot'] = 0;
  maarat['yleisopinnot'] = 0;
  maarat['perusopinnot_suor'] = 0;
  maarat['aineopinnot_suor'] = 0;
  maarat['syventavat_opinnot_suor'] = 0;
  maarat['yleisopinnot_suor'] = 0;

  for(let teht of data.tehtavat) {
    maarat[teht.tyyppi] = maarat[teht.tyyppi] + 1
    if (teht.suoritettu == 'true') {
      maarat[teht.tyyppi + '_suor'] = maarat[teht.tyyppi + '_suor'] + 1
    }  
    document.getElementById(teht.tyyppi).appendChild(luoTehtava(teht.nro, teht.kuvaus, teht.suoritettu, teht.tyyppi, teht.id, teht.lahetetty));
  }
  document.getElementById('perusopinnot_suor').appendChild(document.createTextNode(maarat['perusopinnot_suor'] + ' / ' + maarat['perusopinnot']));
  document.getElementById('aineopinnot_suor').appendChild(document.createTextNode(maarat['aineopinnot_suor'] + ' / ' + maarat['aineopinnot']));
  document.getElementById('syventavat_opinnot_suor').appendChild(document.createTextNode(maarat['syventavat_opinnot_suor'] + ' / ' + maarat['syventavat_opinnot']));
  document.getElementById('yleisopinnot_suor').appendChild(document.createTextNode(maarat['yleisopinnot_suor'] + ' / ' + maarat['yleisopinnot']));
}


function luoTehtava(nro, kuvaus, suoritettu, tyyppi, id, lahetetty) {
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
  if ('true' == suoritettu) {
    var button = document.createElement('button');
    button.className = 'btn brand-text btn-suoritettu';
    div4.appendChild(button);
    button.appendChild(document.createTextNode('Suoritettu'));
  } else if ('true' == lahetetty) {
    var button = document.createElement('button');
    button.className = 'btn brand-text grey';
    div4.appendChild(button);
    button.appendChild(document.createTextNode('Lähetetty'));
  } else {
    var form=document.createElement('form');
    form.setAttribute('action', '/tarkista');
    form.setAttribute('method', 'post');
    div4.appendChild(form);
    var input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', 'Viesti / Tutorin nimi');
    input.setAttribute('name', 'message');
    input.setAttribute('id', id);
    input.className = tyyppi;

    var input_id = document.createElement('input');
    input_id.className = 'hide';
    input_id.setAttribute('name', 'id');
    input_id.value = id;

    form.appendChild(input_id);
    form.appendChild(input);
    var button = document.createElement('button');
    button.setAttribute('type', 'submit');
    button.className = 'btn brand-text yellow darken-2';
    form.appendChild(button);
    var txt7 = document.createTextNode('Lähetä');
    button.appendChild(txt7);
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