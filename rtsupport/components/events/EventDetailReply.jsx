import React, { Component } from 'react'

class EventDetailReply extends Component {
    render() {
        const {replyTarget} = this.props
        return (
            <div className='modal fade' id={replyTarget} tabindex="-1" role="dialog">
                 <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content rounded-0">
                        <div class="modal-header">
                            <h5 class="modal-title" id={replyTarget+'_title'}>
                                Reply to <a href='#'>{replyTarget}</a>
                            </h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form>
                            <textarea 
                                class="form-control rounded-0" 
                                placeholder="Enter Reply ..." 
                                rows="3">
                            </textarea>  
                            <div class="modal-footer">  
                                <button type="button" class="btn btn-secondary rounded-0 font-weight-bold" data-dismiss="modal">Close</button>
                                <button type="submit" class="btn btn-dark rounded-0 font-weight-bold text-ddc213">Reply</button>  
                            </div>        
                        </form>                    
                    </div>
                 </div>
            </div>
        )        
    }
}

export default EventDetailReply
