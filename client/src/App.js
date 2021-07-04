import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Info from './components/Info';
import Tasks from './components/Tasks';
import Policy from './components/Policy';

import './css/materialize.min.css';
import { useState } from 'react';


function App() {
  const [token, setToken] = useState();

  console.log(token);

  if (!token) {
    return (<>
      <Router>
        <Switch>
          <Route path='/syrinx'>
            <Login setToken={setToken} id_jarj={'1'}/>
          </Route>
          <Route path='/'>
            <p>Public frontpage</p>
          </Route>
        </Switch>
      
      </Router>
      </>
    );
  } 

  return (
    <>
      {token.isnewuser ? <Policy token={token} setToken={setToken}/> : <></>}
      <Header/>
      <Info/>
      
      <Tasks token={token} />
    </>
  );
}

export default App;
