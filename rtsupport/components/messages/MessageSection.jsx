import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList.jsx';
import MessageForm from './MessgeForm.jsx';

class MessageSection extends Component {
    render() {
        let {activeChannel} = this.props;
        return (
            <div className='messages-container card border-dark rounded-0'>
                <div className='card-header border-dark rounded-0 bg-white'>
                    <strong>{activeChannel.name || 'Select A Channel'}</strong>
                </div>
                <div className='card-body messages'>
                    <MessageList {...this.props} />               
                    <MessageForm {...this.props} />
                </div>
            </div>
        )
    }
}

MessageSection.propTypes = {
    messages: PropTypes.object.isRequired,
    activeChannel: PropTypes.object.isRequired,
    addMessage: PropTypes.func.isRequired
}

export default MessageSection
