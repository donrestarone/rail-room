import React, { Component } from 'react';
import { connect } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import './App.css';
import Rooms from './Components/Containers/Rooms/Rooms'
import Room from './Components/Containers/Room/Room'
import {pingApi} from './Services/ping'




class App extends Component {

  componentDidMount = () => {
    // this.switchToHttps()
    this.checkApiStatus()
  }

  checkApiStatus = () => {
    pingApi().then(response => response.json())
    .then(object => {
      if (object.code === 200) {
        this.props.toggleApiStatus()
      }
    })
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

const mapDispatchToProps = dispatch => {
  return {
    toggleApiStatus: () => dispatch({
      type: 'toggleApiStatus'
    })
  }
}

const mapStateToProps = state => {
  return {
    shouldBeDarkMode: state.darkMode,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);