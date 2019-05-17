import React, { Component } from 'react'
import { 
    VALID_INPUT, 
    INVALID_INPUT,
    HIDE_ERR_MSG,
    SHOW_ERR_MSG,
  } from './formConstants.jsx'
  
class CommentForm extends Component {
    state = {
        comment: '',
        comment_err_msg: HIDE_ERR_MSG,
        comment_input: VALID_INPUT,                
    }
    isNotEmptyComment = (e) => {
        if (e.target.value.trim().length > 0) {      
            this.setState({
                comment_err_msg: HIDE_ERR_MSG,
                comment_input: VALID_INPUT,                
            })      
        }
      }    
    onInputChange = (e) => {
        this.setState({
            comment: e.target.value,
        })
        this.isNotEmptyComment(e)
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const trimComment = this.state.comment.trim()
        if (trimComment.length == 0) {
            this.setState({
                comment_err_msg: SHOW_ERR_MSG,
                comment_input: INVALID_INPUT,        
            })  
            return
        }
        this.props.addEventComment(
            this.props.eventId,
            trimComment,
        )
        this.setState({
            comment: '',
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea 
                    name='comment'
                    onBlur={this.isNotEmptyComment}
                    onChange={this.onInputChange} 
                    value={this.state.comment}
                    className={this.state.comment_input} 
                    placeholder="Enter Comment ..." 
                    rows="3"
                    >
                </textarea> 
                <h6 className={this.state.comment_err_msg}>
                    <i class="fas fa-exclamation-triangle mr-1"></i>
                    Comment is required.
                </h6>
                {
                    this.props.err &&
                    <h6 className='input-err-msg mt-3 p-2'>
                        <i class="fas fa-exclamation-circle mr-2 my-1"></i>
                        <span className='my-1'>ERR: ADD EVENT COMMENT</span>
                    </h6>   
                }
                <button type="submit" class="btn btn-dark rounded-0 text-ddc213 font-weight-bold float-right mt-2">Post</button>          
            </form>
        )
    }
}

export default CommentForm