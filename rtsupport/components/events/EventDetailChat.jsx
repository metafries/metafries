import React, { Component } from 'react'
import distanceInWords from 'date-fns/distance_in_words'
import EventDetailReply from './EventDetailReply.jsx'
import CommentForm from '../forms/CommentForm.jsx'

class EventDetailChat extends Component {
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
            <h5 className='my-3'>
              <i class="fas fa-info-circle mr-2"></i>
              You are currently in anonymous mode，
              <a href='/'>SIGN IN</a> to add or reply to the comment.
            </h5>
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
                        className="mt-3 signout rounded-circle" alt="..."
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
                      <p className='mb-0'>{comment.text}</p>
                      <small className='ml-1 text-secondary d-block'>
                        {distanceInWords(comment.date, Date.now())} ago
                      </small>
                      <button 
                        type="button" 
                        class="btn btn-outline-dark l-btn wl-btn rounded-0 mt-2 font-weight-bold p-1" 
                        data-toggle="modal" 
                        data-target={`#${comment.id}`}
                        value={comment.id}
                        onClick={this.onCommentReply}
                        >
                        Reply
                        <span className='ml-1'>0</span>
                      </button>
                      <EventDetailReply 
                        err={this.props.err} 
                        eventId={this.props.eventId} 
                        addEventComment={this.props.addEventComment}      
                        authenticated={authenticated}
                        fba={fba} 
                        replyTarget={comment}
                      />
                      <button 
                        type="button" 
                        style={{borderWidth:'3px'}}
                        class="btn btn-dark text-ddc213 rounded-0 mt-2 font-weight-bold p-1 float-right"
                        >
                        <i class="fas fa-arrow-down"></i>
                        <span className='ml-1'>0</span>
                      </button>
                      <button 
                        type="button" 
                        style={{borderWidth:'3px'}}
                        class="btn btn-dark text-ddc213 rounded-0 mt-2 font-weight-bold p-1 float-right mr-1"
                        >
                        <i class="fas fa-arrow-up"></i>
                        <span className='ml-1'>0</span>
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
              <h5 className='mb-0'>
                <i class="fas fa-info-circle mr-2"></i>
                No comment yet.       
              </h5>
            </div>
          }
        </div>
      </div>
    )  
  }
}

export default EventDetailChat
