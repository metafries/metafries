import React, { Component } from 'react'
import ChatListItem from './ChatListItem.jsx'

class ChatList extends Component {
  render() {
    return (
      <div class="accordion mx-0" id="chatlist">
        <ChatListItem/>
      </div>
    )
  }
}

export default ChatList