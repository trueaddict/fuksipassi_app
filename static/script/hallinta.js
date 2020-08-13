console.log(data);

pyynnot = new Map();

window.onload = function() {
  M.AutoInit();
  //var instance = M.Tabs.init(el, options);
  luoPyynnot(data);
  let kuittausBtns = document.getElementsByName('kuittaaBtn');
  for (let btn of kuittausBtns) {
    listener(btn);
  }
}


function listener(btn) {
  btn.addEventListener('click', function(e) {
    let body = e.target.parentNode.parentNode;
    let inputs = body.getElementsByTagName('input');
    let kuit = {"kuittaukset": []};
    for (let input of inputs) {
      if (input.checked) {
        kuit.kuittaukset.push({
          "id_user":input.id.split('_')[0],
          "id_teht":input.id.split('_')[1],
        });
      }
    }
    console.log(JSON.stringify(kuit));
    window.fetch('/hallinta/kuittaa', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(kuit)
    }).then(function (res) {
      return res.text();
    }).then(function (text) {
      console.log(text);
      console.log(data);
      let div = document.getElementById('collapsible-pyyn');
      while (div.firstChild) {
        div.removeChild(div.lastChild);
      }
      luoPyynnot(JSON.parse(text));
      let kuittausBtns = document.getElementsByName('kuittaaBtn');
      for (let btn of kuittausBtns) {
        listener(btn);
      }
    })
  })
}

function luoPyynnot(data) {
  for (let kuitti of data.kuitattavat) {
    if (pyynnot.has(kuitti.id_user) == false) {
      pyynnot.set(kuitti.id_user, {"useremail":kuitti.useremail, "id_user":kuitti.id_user ,"kuitattavat":[]});
    }
    let kuitList = pyynnot.get(kuitti.id_user);
    console.log(kuitList);
    kuitList.kuitattavat.push({
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


function luoPyynto(i) {
  var li1=document.createElement('li');
  var div1=document.createElement('div');
  div1.className='collapsible-header';
  li1.appendChild(div1);
  var txt2=document.createTextNode(i.useremail);
  div1.appendChild(txt2);
  var div2=document.createElement('div');
  div2.className='collapsible-body';
  li1.appendChild(div2);
  
  var div3 = document.createElement('div');
  div2.appendChild(div3);
  var btn = document.createElement('button');
  btn.setAttribute('name', 'kuittaaBtn');
  btn.className = 'btn kuittaa-btn yellow darken-2';
  btn.appendChild(document.createTextNode('Kuittaa valitut'));
  div3.appendChild(btn);
  var div4=document.createElement('div');
  div2.appendChild(div4);
  
  var ul = document.createElement('ul');

  for (let teht of i.kuitattavat) {
    var li=document.createElement('li');
    var label1=document.createElement('label');
    label1.className = 'brand-text';
    li.appendChild(label1);
    var input1=document.createElement('input');
    input1.setAttribute('type','checkbox');
    input1.setAttribute('checked', 'checked');
    input1.id = i.id_user + '_' + teht.id_teht
    input1.className = 'yellow';
    label1.appendChild(input1);
    var span1=document.createElement('span');
    label1.appendChild(span1);
    var txt4=document.createTextNode(teht.kuvaus + ' : ' + teht.message);
    span1.appendChild(txt4);
    ul.appendChild(li);
  }
  div4.appendChild(ul);
  return li1;
}