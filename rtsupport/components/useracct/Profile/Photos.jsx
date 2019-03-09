import React, { Component } from 'react'

class Photos extends Component {
  render() {
    const {fbp} = this.props    
    return (
      <div>
        <a href={fbp.avatarUrl}>
            <img src={this.props.avatarUrl} style={{width:'100%'}}/>
        </a>
        {
            fbp.avatarUrl &&
            <button 
                type="button" 
                class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
            >
                <i class="fas fa-user-circle mr-2"></i>AVATAR
            </button>                    
        }
        {
            fbp.avatarUrl &&
            <button 
                type="button" 
                class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
            >
                <i class="fas fa-trash-alt mr-2"></i>DELETE
            </button>                    
        }        
      </div>
    )
  }
}

export default Photos