console.log(json);


pyynnot = new Map();

tehtavat = [];

window.onload = function() {
  M.AutoInit();
  //var instance = M.Tabs.init(el, options);
  luoPyynnot(json);
  luoTehtavat(json);
  luoKayttajat(json);
  updateUserInfo();
  laskeSuoritukset(json);
}


function laskeSuoritukset(data) {
  var suoritukset = {};
  let tyypit = new Set();
  var tyyppi_maarat = {};
  for (let teht of data.tehtavat) {
    tyypit.add(teht.tyyppi);
  }
  for (let typ of tyypit) {
    tyyppi_maarat[typ] = 0;
  }
  for (let teht of data.tehtavat) {
    tyyppi_maarat[teht.tyyppi] = tyyppi_maarat[teht.tyyppi] + 1; 
  }
  console.log(tyyppi_maarat);
  for (let suor of data.suoritukset) {
    if (suoritukset[suor.id_user] == null) {
      suoritukset[suor.id_user] = [];
    }
    suoritukset[suor.id_user].push(suor);
  }
  for (let suor in suoritukset) {
    let kayt_suor = {};
    for (let typ of tyypit) {
      kayt_suor[typ] = 0;
      kayt_suor[typ + '_pros'] = 0;
    }
    for (let i of suoritukset[suor]) {
      kayt_suor[i.tyyppi] = kayt_suor[i.tyyppi] + 1;
      kayt_suor[i.tyyppi + '_pros'] = (kayt_suor[i.tyyppi] / tyyppi_maarat[i.tyyppi]) * 100;
    }
    console.log(kayt_suor);
    suoritukset[suor + '_maarat'] = kayt_suor;
    lisaaSuoritukset(kayt_suor, tyyppi_maarat, suor);
  }
}

function lisaaSuoritukset(kayt_suor, tyyppi_maarat, suor) {
  let yhtMaar = 0;
  let yhtSuor = 0;
  for (let typ in tyyppi_maarat) {
    yhtMaar = yhtMaar + tyyppi_maarat[typ];
    yhtSuor = yhtSuor + kayt_suor[typ];
    let div = document.getElementById(suor);
    let div1 = document.createElement('div');
    div1.className = 'halinfo';
    let tyyppi = typ.charAt(0).toUpperCase() + typ.slice(1).replace('_', ' ');
    div1.appendChild(document.createTextNode(tyyppi + ': ' + kayt_suor[typ] + ' / ' + tyyppi_maarat[typ] + '  |  ' + kayt_suor[typ+'_pros'] + '%'));
    div.appendChild(div1);
  }
  
  let nameDiv = document.getElementById(suor+'1');
  nameDiv.appendChild(document.createTextNode(' - '+ yhtSuor +' / '+yhtMaar))
  console.log(nameDiv);
}

function updateUserInfo() {
  document.getElementById('useremail').appendChild(document.createTextNode(parseUseremail(json.useremail)));
  document.getElementById('title').appendChild(document.createTextNode(json.aj +' Fuksipassi Hallinta'));
  document.getElementById('headtitle').appendChild(document.createTextNode(json.aj +' Fuksipassi Hallinta'));
}

function luoKayttajat(data) {
  let ul = document.getElementById('collapsible-kayt');

  for (let kayt of data.kayttajat) {
    let name = parseUseremail(kayt.useremail);
    let li = document.createElement('li');
    let div1 = document.createElement('div');
    div1.className = 'collapsible-header';
    div1.appendChild(document.createTextNode(name));
    li.appendChild(div1);
    let div2 = document.createElement('div');
    div2.className = 'collapsible-body';
    div2.appendChild(document.createTextNode(kayt.useremail));
    div2.appendChild(document.createElement('br'));
    div2.appendChild(document.createTextNode('Lisää infoa tulossa...'));
    li.appendChild(div2);
    ul.appendChild(li);
  }
}


function parseUseremail(useremail) {
  if (useremail.includes('@')) {
    let parseName = useremail.split('@');
    let name_list = parseName[0].split('.')
    name_list[0] = name_list[0].charAt(0).toUpperCase() + name_list[0].slice(1);
    if (name_list.length > 1) {
      name_list[name_list.length-1] = name_list[name_list.length-1].charAt(0).toUpperCase() + name_list[name_list.length-1].slice(1);
      return name_list[0] + ' ' + name_list[name_list.length-1];
    } else {
      return name_list[0]
    }
  } else {
    return useremail;
  }
}


function luoTehtavat(data) {
  //let tehtavat = [];
  for (let i = 0; i < data.tehtavat.length; i++) {
    for (let k = 0; k < data.tehtavat.length; k++) {
      if (data.tehtavat[k].num == i+1) {
        tehtavat.push(data.tehtavat[k]);
      }
    } 
  }

  let ul = document.createElement('ul');
  ul.className = 'collection';
  document.getElementById('teht').appendChild(ul);
  for (let t of tehtavat) {
    var li1=document.createElement('li');
    li1.className='collection-item center';
    var txt1=document.createTextNode(t.num + '.');
    li1.appendChild(txt1);
    var div1=document.createElement('div');
    div1.className='input-field inline margin-0';
    li1.appendChild(div1);
    var form1=document.createElement('form');
    form1.setAttribute('action','/tallenna');
    form1.setAttribute('method','POST');
    form1.className='margin-0';
    div1.appendChild(form1);
    var input1=document.createElement('input');
    input1.className='hide';
    input1.setAttribute('type','text');
    input1.setAttribute('name', 'id_teht');
    input1.setAttribute('value', t.id_teht);
    form1.appendChild(input1);
    var input2=document.createElement('input');
    input2.className='margin-0';
    input2.setAttribute('type','text');
    input2.setAttribute('name', 'kuvaus');
    input2.setAttribute('value', t.kuvaus);
    form1.appendChild(input2);
    var button1=document.createElement('button');
    button1.className='btn-small float-right';
    form1.appendChild(button1);
    var txt6=document.createTextNode('Tallenna');
    button1.appendChild(txt6);
    ul.appendChild(li1);
  }
}


function luoPyynnot(data) {
  if (data.kuitattavat.length <= 0) {
    let p = document.createElement('p');
    p.className = 'center'
    p.appendChild(document.createTextNode('Ei kuitattavia pyyntöjä'));
    document.getElementById('pyyn').appendChild(p);
  } else {
    for (let kuitti of data.kuitattavat) {
      if (pyynnot.has(kuitti.id_user) == false) {
        pyynnot.set(kuitti.id_user, {"useremail":kuitti.useremail, "id_user":kuitti.id_user ,"kuitattavat":[]});
      }
      let kuitList = pyynnot.get(kuitti.id_user);
      kuitList.kuitattavat.push({
        "id_suor":kuitti.id_suor,
        "id_teht": kuitti.id_teht,
        "kuvaus": kuitti.kuvaus,
        "message": kuitti.message,
      })
      pyynnot.set(kuitti.id_user, kuitList);
    }
    for (let i of pyynnot.entries()) {
      document.getElementById('collapsible-pyyn').appendChild(luoPyynto(i[1]));
    }
  }
}


function luoPyynto(i) {
  var li1=document.createElement('li');
  var div1=document.createElement('div');
  div1.className='collapsible-header';
  li1.appendChild(div1);
  var txt2=document.createTextNode(parseUseremail(i.useremail));
  div1.appendChild(txt2);
  var div2=document.createElement('div');
  div2.className='collapsible-body';
  li1.appendChild(div2);
  
  var form = document.createElement('form');
  form.setAttribute('action', '/kuittaa');
  form.setAttribute('method', 'post');
  div2.appendChild(form);

  var div3 = document.createElement('div');
  form.appendChild(div3);
  var btn = document.createElement('button');
  btn.setAttribute('name', 'kuittaaBtn');
  btn.className = 'btn-small kuittaa-btn';
  btn.appendChild(document.createTextNode('Kuittaa valitut'));
  div3.appendChild(btn);
  var div4=document.createElement('div');
  form.appendChild(div4);
  
  var ul = document.createElement('ul');

  for (let teht of i.kuitattavat) {
    var li=document.createElement('li');

    var divrow = document.createElement('div');
    divrow.className = 'row'
    li.appendChild(divrow);

    var divcol1 = document.createElement('div');
    divcol1.className = 'col s9 coli';
    divrow.appendChild(divcol1);

    var label1=document.createElement('label');
    label1.className = 'brand-text';
    divcol1.appendChild(label1);
    var input1=document.createElement('input');
    input1.setAttribute('type','checkbox');
    input1.setAttribute('checked', 'checked');
    input1.setAttribute('name', i.id_user + '_' + teht.id_teht);
    input1.id = i.id_user + '_' + teht.id_teht
    input1.className = 'yellow';
    label1.appendChild(input1);
    var span1=document.createElement('span');
    span1.className = 'margin-bottom';
    label1.appendChild(span1);
    var txt4=document.createTextNode(teht.kuvaus);
    span1.appendChild(txt4);
    var span2 = document.createElement('div');
    span2.className = 'small-margin-left font-13';
    label1.appendChild(span2);
    var txt5 = document.createTextNode(teht.message);
    span2.appendChild(txt5);
    
    var divcol2 = document.createElement('div');
    divcol2.className = 'col s3';
    divrow.appendChild(divcol2);
    var formhyl = document.createElement('form');
    formhyl.setAttribute('action', '/hylkaa');
    formhyl.setAttribute('method', 'POST');
    divcol2.appendChild(formhyl);

    var inputid = document.createElement('input');
    inputid.setAttribute('type', 'text');
    inputid.setAttribute('name', 'suorId');
    inputid.setAttribute('value', teht.id_suor);
    inputid.className = 'hide';
    formhyl.appendChild(inputid);

    var buttonhyl = document.createElement('button');
    buttonhyl.setAttribute('name', 'hylkaaBtn');
    buttonhyl.className = 'btn-small';
    buttonhyl.appendChild(document.createTextNode('Hylkää'));
    formhyl.appendChild(buttonhyl);

    ul.appendChild(li);
  }
  div4.appendChild(ul);
  return li1;
}