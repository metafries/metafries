import React, { Component } from 'react'
import Script from 'react-load-script'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { 
    VALID_INPUT, 
    INVALID_INPUT,
    HIDE_ERR_MSG,
    SHOW_ERR_MSG,
} from './formConstants.jsx'

class ProfileForm extends Component {
    state = {
        username_input: VALID_INPUT,  
        username_err_msg: HIDE_ERR_MSG,      
        usernameInputLength: this.props.fba.displayName.length,
        bioInputLength: 0,
        scriptLoaded: false,
        profile: {
            username: this.props.fba.displayName,
            website: '',
            company: '',
            location: '',
            bio: '',            
        }
    }
    handleScriptLoad = () => {
        this.setState({
            scriptLoaded: true
        })
    }    
    handleAddrChange = address => {
        const update = this.state.profile;
        update.location = address
        this.setState({
            profile: update
        })
    };    
    handleAddrSelect = address => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error));
    };        
    onInputChange = (e) => {
        const userInput = this.state.profile
        userInput[e.target.name] = e.target.value
        this.setState({
            profile: userInput
        })
        if (e.target.name == 'username') {
            this.setState({
                usernameInputLength: e.target.value.trim().length
            })
            if (e.target.value.trim().length == 0) {      
                this.setState({
                  username_err_msg: SHOW_ERR_MSG,
                  username_input: INVALID_INPUT,        
                })  
            } else {
                this.setState({
                    username_err_msg: HIDE_ERR_MSG,
                    username_input: VALID_INPUT,                
                })  
            }          
        }
        if (e.target.name == 'bio') {
            this.setState({
                bioInputLength: e.target.value.trim().length
            })
        }
    }
    render() {
        const {
            username_input, 
            username_err_msg, 
            usernameInputLength, 
            bioInputLength,
            scriptLoaded,
            profile,
        } = this.state
        return (
            <form>
                <Script
                    url='https://maps.googleapis.com/maps/api/js?key=AIzaSyA8xyoeTTfh5SOxWdF8C5J9oD0PrBQv3WQ&libraries=places'
                    onLoad={this.handleScriptLoad}
                />
                <div className="form-group">
                    <small className='float-right'>{usernameInputLength}/64</small>
                    <h5 className='font-weight-bold'>Username</h5>
                    <input 
                        maxlength='64'
                        type="text" 
                        class={username_input} 
                        name='username'
                        value={profile.username}
                        onChange={this.onInputChange}
                    />
                    <small className={username_err_msg}>
                        <i class="fas fa-exclamation-triangle mr-1"></i>
                        Username is required.
                    </small>
                </div>   
                <div className="form-group">
                    <h5 className='font-weight-bold'>Website</h5>
                    <input 
                        type="url" 
                        className="form-control rounded-0" 
                        name='website'
                        value={profile.website}
                        onChange={this.onInputChange}
                        placeholder="https://example.com"
                    /> 
                </div>
                <div className='form-group'>
                    <h5 className='font-weight-bold'>Company</h5>
                    <input 
                        type="text" 
                        className="form-control rounded-0" 
                        name='company'
                        value={profile.company}
                        onChange={this.onInputChange}
                        placeholder='Add a workplace'
                    />
                </div>
                <div className='form-group'>
                    <h5 className='font-weight-bold'>Location</h5>
                    {
                        scriptLoaded &&
                        <PlacesAutocomplete
                            value={profile.location}
                            onChange={this.handleAddrChange}
                            onSelect={this.handleAddrSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div>
                                    <input
                                        {...getInputProps({
                                            placeholder: 'Add your current city',                      
                                        })}
                                        className='form-control rounded-0'
                                    />
                                    <div className="autocomplete-dropdown-container">
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#f5f5f5', cursor: 'pointer' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                            return (
                                                <div
                                                    {...getSuggestionItemProps(suggestion, {
                                                        className,
                                                        style,
                                                    })}
                                                >
                                                    <span>{suggestion.description}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                    }
                </div>
                <div className="form-group">
                    <small className='float-right'>{bioInputLength}/256</small>
                    <h5 className='font-weight-bold'>Bio</h5>
                    <textarea 
                        maxlength='256'
                        name='bio'
                        onChange={this.onInputChange} 
                        value={profile.bio}
                        className="form-control rounded-0" 
                        rows='3' 
                        placeholder="Write more details about yourself"
                    />
                </div>
                <hr/>
                <button 
                    type="button" 
                    class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">
                    Update Profile
                </button>         
            </form>
        )
    }
}

export default ProfileForm