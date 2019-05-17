import React, { Component } from 'react'
import distanceInWords from 'date-fns/distance_in_words'
import EventDetailReply from './EventDetailReply.jsx'
import CommentForm from '../forms/CommentForm.jsx'

class EventDetailChat extends Component {
  state = {
    replyTarget: ''
  }
  onCommentReply = (e) => {
    console.log(e.target.value)
    this.setState({
      replyTarget: e.target.value
    })
  }
  render() {
    const {authenticated, fba, eventChat} = this.props
    return (
      <div className='card rounded-0'>
        <div className='card-header rounded-0 transbox px-3'>
          <h5 className='mb-0'>
            {eventChat ? eventChat.length+' Comments' : '0 Comment'}
          </h5>
        </div>
        <div className='card-body px-3 pt-2 pb-0'>
          {
            !authenticated &&
            <h6 className='info-text-box my-3 p-2'>
              <i class="fas fa-info-circle mr-2"></i>
              You are currently in anonymous mode，
              <a href='/'>Log In</a> to add or reply to the comment.
            </h6>
          }
          <table class="table mb-0">
            <tbody>
              {
                authenticated &&
                <tr>
                  <th scope="row" className='signout rounded-circle px-0 py-3 border-0'>
                    <a href={`/profile/${fba.uid}`}>
                      <img 
                        src={fba.photoURL || '/static/images/whazup-square-logo.png'} 
                        className="signout rounded-circle" alt="..."
                      />
                    </a>
                  </th>
                  <td className='pr-0 border-0'>
                    <CommentForm 
                      err={this.props.err} 
                      eventId={this.props.eventId} 
                      addEventComment={this.props.addEventComment}
                    />
                  </td>
                </tr>
              }
              <EventDetailReply replyTarget={this.state.replyTarget}/>
              {
                eventChat && eventChat.map((comment) => (
                  <tr key={comment.id}>
                    <th scope="row" className='signout rounded-circle px-0 py-3'>
                      <a href={`/profile/${comment.uid}`}>
                        <img src={comment.avatarUrl} className="signout rounded-circle" alt="..."/>
                      </a>
                    </th>
                    <td className='pr-0'>
                      <a className='eds-a' href={`/profile/${comment.uid}`}>
                        <strong>{comment.displayName}</strong>
                      </a>
                      <small className='ml-1'>
                        {distanceInWords(comment.date, Date.now())} ago
                      </small>
                      <p className='mb-0'>{comment.text}</p>
                      <button 
                        type="button" 
                        class="btn btn-link btn-sm p-0" 
                        data-toggle="modal" 
                        data-target={`#${comment.id}`}
                        value={comment.id}
                        onClick={this.onCommentReply}
                        >
                        Reply
                      </button>
                    </td>
                  </tr>  
                ))
              }
            </tbody>      
          </table>   
          {
            !eventChat &&
            <div className='card-footer px-0 bg-white'>
              <h6 className='info-text-box p-2'>
                <i class="fas fa-info-circle mr-2"></i>
                No comment yet.       
              </h6>
            </div>
          }
        </div>
      </div>
    )  
  }
}

export default EventDetailChat
