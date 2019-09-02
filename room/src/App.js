import React, { Component } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Rooms from './Components/Containers/Rooms/Rooms'
import Room from './Components/Containers/Room/Room'





class App extends Component {

  componentDidMount = () => {
    this.switchToHttps()
  }

  switchToHttps = () => {
    if (window.location.protocol != 'https:') {
     window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
    }
  }
  
  renderViewMode = () => {
    let isDark = this.props.shouldBeDarkMode 
    let appBody = document.getElementById('app-body')
    if (isDark) {
      appBody.classList.add('dark-body')
    } else {
      appBody.classList.remove('dark-body')
    }
  }
  render() {
    this.renderViewMode()
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' render={(props) => <Rooms /> }/>
            <Route exact path='/rooms/:id'  component={Room}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    shouldBeDarkMode: state.darkMode
  }
}

export default connect(mapStateToProps)(App);