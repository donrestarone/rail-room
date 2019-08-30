import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Rooms from './Components/Containers/Rooms/Rooms'
import Room from './Components/Containers/Room/Room'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' render={(props) => <Rooms /> }/>
        <Route exact path='/rooms/:id'  component={Room}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
