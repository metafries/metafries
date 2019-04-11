import React, { Component } from 'react'
import ChatList from '../chat/ChatList.jsx'

class InstantMsg extends Component {
  render() {
    return (
        <div class="card rounded-0 border-dark">
          <div class="card-header border-dark px-0 py-0 bg-white" id="headingThree">
          <button class="btn btn-dark rounded-0 btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <i class="fas fa-comment-alt"></i> <strong>Message</strong>
          </button>
      </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#dashboard">
            <div class="card-body px-0 py-0">
              <ChatList/>
            </div>
          </div>
        </div>
    )
  }
}

export default InstantMsg