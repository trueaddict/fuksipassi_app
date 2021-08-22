import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Info from './components/Info';
import Tasks from './components/Tasks';
import Policy from './components/Policy';
import Setup from './components/Setup';
import Frontpage from './components/Frontpage';
import Gdpr from './components/Gdpr';
import Config from './config/Config';

import './css/materialize.min.css';

const App = () => {
  const [user, setUser] = useState();
  let themes = {
    '1':Config.syrinx,
  };
  console.log(user);

  if (!user) {
    return (<>
      <Router>
        <Switch>
          <Route path='/syrinx'>
            <Login setUser={setUser} id_jarj={'1'} theme={Config.syrinx}/>
          </Route>
          <Route path='/gdpr'>
            <Gdpr/>
          </Route>
          <Route path='/'>
            <Frontpage/>
          </Route>
        </Switch>
      
      </Router>
      </>
    );
  }
  
  let theme = themes[user.id_jarj];

  if (user.is_admin) {
    return (
    <>
      <Header setUser={setUser} user={user} theme={theme}/>
      <Setup user={user} theme={theme}/>
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
