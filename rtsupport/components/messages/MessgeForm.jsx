import React, {Component} from 'react';
import PropTypes from 'prop-types';

class MessageForm extends Component {
    onSubmit(e) {
        e.preventDefault();
        const node = this.refs.message;
        const message = node.value;
        this.props.addMessage(message);
        node.value = '';
    }
    render() {
        let input_group;
        if (this.props.activeChannel.id !== undefined) {
            input_group = (
                <div className='input-group'>                
                    <input 
                        ref='message'
                        type='text'
                        className='form-control border border-primary rounded-0'
                        placeholder='Add Message...'
                    />
                    <div className='input-group-append'>
                        <button type="submit" class="btn btn-outline-primary rounded-0">Send</button>
                    </div>    
                </div>    
            )
        }        
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                {input_group}
            </form>
        )
    }
}

MessageForm.propTypes = {
    activeChannel: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
}

export default MessageForm