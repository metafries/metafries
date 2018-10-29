import React, {Component} from 'react';
import PropTypes from 'prop-types';

class UserForm extends Component {
    onSubmit(e) {
        e.preventDefault();
        const node = this.refs.userName;
        const userName = node.value;
        this.props.setUserName(userName);
        node.value = '';
    }
    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <div className='input-group'>
                    <input 
                        className='form-control border border-primary rounded-0'
                        placeholder='Set Your Name...'
                        type='text'
                        ref='userName'
                    />
                    <div className='input-group-append'>
                        <button type="submit" class="btn btn-outline-primary rounded-0">+</button>
                    </div>
                </div>
            </form>
        )
    }
}

UserForm.propTypes = {
    setUserName: PropTypes.func.isRequired
}

export default UserForm