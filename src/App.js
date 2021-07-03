import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Info from './components/Info';

import './css/materialize.min.css';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState();
  console.log(token);
  if (!token) {
    //return <Login setToken={setToken}/>
    return (<>
      <Router>
        <Switch>
          <Route path='/syrinx'>
            <Login setToken={setToken} id_jarj={'1971'}/>
          </Route>
          <Route path='/'>
            <Login setToken={setToken}/>
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
