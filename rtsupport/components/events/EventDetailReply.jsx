import React, { Component } from 'react'
import CommentForm from '../forms/CommentForm.jsx'

class EventDetailReply extends Component {
    render() {
        const {authenticated, fba, replyTarget} = this.props
        return (
            <div className='modal fade' id={replyTarget.id} tabindex="-1" role="dialog">
                 <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content rounded-0">
                        <div class="modal-header">
                            <h5 class="modal-title" id={replyTarget.id+'_title'}>
                                <i class="fas fa-reply mr-2"></i>
                                <span className='mr-2'>Reply to</span>
                                <a className='eds-a mr-2' href={`/profile/${replyTarget.uid}`}>
                                    <strong>{replyTarget.displayName}</strong>
                                </a>
                                <span>- {replyTarget.text}</span>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            {
                                !authenticated &&
                                <h5 className='mb-0'>
                                    <i class="fas fa-info-circle mr-2"></i>
                                    You are currently in anonymous mode，
                                    <a href='/'>SIGN IN</a> to reply to the comment.
                                </h5>
                            }
                            <table class="table mb-0">
                                <tbody>
                                    {
                                        authenticated &&
                                        <tr>
                                            <th scope="row" className='icon rounded-circle px-0 py-3 border-0'>
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
                                </tbody>
                            </table>
                            <hr/>
                            <h5 className='mb-0'>
                                <i class="fas fa-info-circle mr-2"></i>
                                No reply yet.       
                            </h5>
                        </div>
                    </div>
                 </div>
            </div>
        )        
    }
}

export default EventDetailReply
