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


const App = () => {
  const [user, setUser] = useState();

  console.log(user);

  if (!user) {
    return (<>
      <Router>
        <Switch>
          <Route path='/syrinx'>
            <Login setUser={setUser} id_jarj={'1'}/>
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
      <Header setUser={setUser} name='Otto Virtanen'/>
      <Setup user={user}/>
    </>);
  }

  return (
    <>
      {user.isnewuser ? <Policy user={user} setUser={setUser}/> : <></>}
      <Header setUser={setUser} name='Otto Virtanen'/>
      <Info/>
      <Tasks user={user} />
    </>
  );
}

export default App;
