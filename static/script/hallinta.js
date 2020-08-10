console.log(data);

window.onload = function() {
  M.AutoInit();
  //var instance = M.Tabs.init(el, options);
  luoPyynnot();
}


function luoPyynnot() {
  for (let i = 0; i < 10; i++) {
    document.getElementById('collapsible').appendChild(luoPyynto(i+1));
  }
}


function luoPyynto(i) {
  var li1=document.createElement('li');
  var div1=document.createElement('div');
  div1.className='collapsible-header';
  li1.appendChild(div1);
  var txt2=document.createTextNode('Nimi Suku '+ i);
  div1.appendChild(txt2);
  var div2=document.createElement('div');
  div2.className='collapsible-body';
  li1.appendChild(div2);
  var p1=document.createElement('p');
  div2.appendChild(p1);
  var txt5=document.createTextNode('Lorem ipsum');
  p1.appendChild(txt5);
  return li1;
}