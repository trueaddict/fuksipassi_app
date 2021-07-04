import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Info from './components/Info';

import './css/materialize.min.css';
import { useState } from 'react';

function App() {
  const [tokenData, setToken] = useState();
  
  if (tokenData['status'] != 'loggedin') {
    //return <Login setToken={setToken}/>
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
      <Header/>
      <Info/>
      
      <p>Etusivu</p>
    </>
  );
}

export default App;
