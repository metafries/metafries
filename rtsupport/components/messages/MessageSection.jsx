import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MessageList from './MessageList.jsx';
import MessageForm from './MessgeForm.jsx';

class MessageSection extends Component {
    render() {
        let {activeChannel} = this.props;
        return (
            <div className='support card'>
                <div className='card-header bg-dark text-warning'>
                    <strong>{activeChannel.name || 'Select A Channel'}</strong>
                </div>
                <div className='card-body channels bg-secondary'>
                    <MessageList {...this.props} />               
                    <MessageForm {...this.props} />
                </div>
            </div>
        )
    }
}

MessageSection.PropTypes = {
    messages: PropTypes.object.isRequired,
    activeChannel: PropTypes.func.isRequired,
    addMessage: PropTypes.func.isRequired
}

export default MessageSection
