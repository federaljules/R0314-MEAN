import React from 'react';
import Header from './Components/Header.js'
import './App.css';
import Etusivu from './Components/Etusivu.js';
import Muokkaa from './Components/Muokkaa.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {      //Renderoi kaikki pääkomponentit
  return (
    <Router>
    <div>
    <Header/>   
    <Switch>
    <Route path="/" exact component={Etusivu}/>     {/*määritä reitit ja komponentti reitille*/}
    <Route path="/muokkaa" component={Muokkaa}/>    {/*määritä reitit ja komponentti reitille*/}
    </Switch>
    </div>
    </Router>
  );
}

export default App;
