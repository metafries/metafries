import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChannelForm extends Component {
    onSubmit(e) {
        e.preventDefault();
        const node = this.refs.channel;
        const channelName = node.value;
        this.props.addChannel(channelName);
        node.value = '';
    }
    render() {
        return(
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className='input-group'>
                    <input
                        className='form-control border border-primary rounded-0'
                        placeholder='Add Channel'
                        type='text'
                        ref='channel'
                    /> 
                    <div className='input-group-append'>
                        <button type="submit" class="btn btn-outline-primary rounded-0">+</button>
                    </div>                                   
                </div>
            </form>
        )
    }
}

ChannelForm.prototypes = {
    addChannel: PropTypes.func.isRequired
}

export default ChannelForm;