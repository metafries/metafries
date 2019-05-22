import React, { Component } from 'react'
import { VALID_INPUT } from './formConstants.jsx'
  
class CommentForm extends Component {
    state = {
        comment: '',
        commentInputLength: 0,
    }
    onInputChange = (e) => {
        this.setState({
            comment: e.target.value,
            commentInputLength: e.target.value.trim().length,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const trimComment = this.state.comment.trim()
        this.props.addEventComment(
            this.props.eventId,
            this.props.targetCode,                        
            trimComment,
        )
        this.setState({
            comment: '',
            commentInputLength: 0,
        })
    }
    render() {
        const {commentInputLength} = this.state
        return (
            <form onSubmit={this.handleSubmit}>
                <small className='float-right text-secondary'>
                    {commentInputLength}/500
                </small>
                <textarea 
                    maxlength='500'
                    name='comment'
                    onChange={this.onInputChange} 
                    value={this.state.comment}
                    className={VALID_INPUT} 
                    placeholder="Enter Comment ..." 
                    rows="3"
                    >
                </textarea> 
                {
                    this.props.err &&
                    <h6 className='input-err-msg mt-3 p-2'>
                        <i class="fas fa-exclamation-circle mr-2 my-1"></i>
                        <span className='my-1'>ERR: ADD EVENT COMMENT</span>
                    </h6>   
                }
                {
                    commentInputLength == 0
                        ?   <span className='disabled float-right'>
                                <button 
                                    type="submit" 
                                    class="btn btn-outline-dark rounded-0 font-weight-bold mt-2 px-2"
                                    >
                                    Post
                                </button>          
                            </span>                
                        :   <button 
                                type="submit" 
                                style={{borderWidth:'3px'}} 
                                class="btn btn-dark rounded-0 text-ddc213 font-weight-bold float-right mt-2 px-2"
                                >
                                Post
                            </button>
                }
            </form>
        )
    }
}

export default CommentForm