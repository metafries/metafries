import React, {Component} from 'react';
import PropTypes from 'prop-types';
import fetcha from 'fetcha';

class Message extends Component {
    render() {
        let {message} = this.props;
        let createdAt = fetcha.format(new Date(message.createdAt), 'HH:mm:ss MM/DD/YY');    
        return (
            <li className='message'>
                <div className='author'>
                    <strong> {message.author} </strong>
                    <i className='timestamp'> {createdAt} </i>
                </div>
                <div className='body'> {message.body} </div>
            </li>
        )
    }
}

Message.propTypes = {
    message: PropTypes.object.isRequired
}

export default Message