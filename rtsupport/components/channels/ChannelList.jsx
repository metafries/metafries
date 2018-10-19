import React, {Component} from 'react';
import Channel from './Channel';
import PropTypes from 'prop-types';

class ChannelList extends Component {
    render() {
        return (
            <ul>
                {this.props.channels.map( chan => {
                    <Channel 
                    channel={chan} 
                    setChannel={this.props.setChannel} />
                })}
            </ul>
        )
    }
}

ChannelList.propTypes = {
    channels: PropTypes.array.isRequired,
    setChannel: PropTypes.func.isRequired
}

export default ChannelList;