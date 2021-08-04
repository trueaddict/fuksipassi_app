import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Info from './components/Info';
import Tasks from './components/Tasks';
import Policy from './components/Policy';
import Setup from './components/Setup';

import './css/materialize.min.css';
import { useState } from 'react';

const theme_syrinx = {
  name: 'Syrinx Fuksipassi',
  button: 'btn yellow darken-2',
  navBackgroundColor:{'background':'#f1dc44'},
  navTextColor:{'color':'#000'},
  bodyBackgroundColor:'#93ad20',
  accentBackgroundColor:{'backgroundColor':'#687a17'},
  taskButton:{
    'border': '1px solid #fff',
    'color': '#fff'
  },
  icon_url:'https://www.syrinx.fi/wp-content/uploads/2019/02/copy-syrinx_logoGreenBackgroundveryYellowWithText.png',
  website_url:'https://www.syrinx.fi',
  info_1:'Tämä on Syrinx Ry:n virallinen Fuksipassi 2020. Seuraavia tehtäviä suorittamalla saat kaiken irti fuksisyksystäsi ja pääset samalla sukeltamaan osaksi Syrinxin toimintaa!',
  info_2:'Vaikka fuksipassin täyttämiseen tulee suhtautua omistautuneesti ja asianmukaisella vakavuudella, muista aina tehtäviä suorittaessasi pitää hauskaa ja hakea rennosti uusia kokemuksia.',
  info_3:'Antoisaa fuksisyksyä!'
}

const theme_sporticus = {
  name: 'Sporticus Fuksipassi',
  button: 'btn yellow darken-2',
  navBackgroundColor:{'background':'#000'},
  navTextColor:{'color':'#f8af2d'},
  bodyBackgroundColor:'#dfdfdf',
  accentBackgroundColor:{'backgroundColor':'#fff'},
  taskButton:{
    'border': '1px solid #000',
    'color': '#000'
  },
  icon_url:'https://fuksipassisporticus.herokuapp.com/static/img/sporticus_logo.png',
  website_url:'https://www.sporticus.fi',
  info_1:'',
  info_2:'',
  info_3:''
}

const App = () => {
  const [user, setUser] = useState();

  let theme = theme_syrinx;
  console.log(user);

  if (!user) {
    return (<>
      <Router>
        <Switch>
          <Route path='/syrinx'>
            <Login setUser={setUser} id_jarj={'1'} theme={theme_syrinx}/>
          </Route>
          <Route path='/'>
            <p>Public frontpage</p>
          </Route>
        </Switch>
      
      </Router>
      </>
    );
  }
  
  if (user.is_admin) {
    return (
    <>
      <Header setUser={setUser} user={user} theme={theme}/>
      <Setup user={user}/>
    </>);
  }

  return (
    <>
      {user.isnewuser ? <Policy user={user} setUser={setUser}/> : <></>}
      <Header setUser={setUser} user={user} theme={theme}/>
      <Info theme={theme}/>
      <Tasks user={user} theme={theme}/>
    </>
  );
}

export default App;
