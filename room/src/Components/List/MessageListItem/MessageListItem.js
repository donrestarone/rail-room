import React, { Component } from 'react';
import { connect } from 'react-redux'
import './MessageListItem.css'
import {changeClassesOfRefs} from '../../../Utilities/HTMLhelpers'







class MessageListItem extends Component {
  state = {
    refs: []
  }

  renderViewMode = () => {
    let isDark = this.props.shouldBeDarkMode 
    let domNodes = this.state.refs
    if (isDark) {
      changeClassesOfRefs(domNodes, true)
    } else {
      changeClassesOfRefs(domNodes, false)
    }
  }
  render() {
    this.renderViewMode()
    let message = this.props.message
    return (
    <div className="message-wrapper" ref={messageWrapper => this.state.refs[0] = messageWrapper}>
      <div className="message-contents-wrapper">
        <p className="message-sender">{message.attributes.sender_name}:</p>
        <p className="message-body">{message.attributes.body}</p>
      </div>
    </div>
    
    );
  }
}

const mapStateToProps = state => {
  return {
    shouldBeDarkMode: state.darkMode
  }
}

export default connect(mapStateToProps, null)(MessageListItem);