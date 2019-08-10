import React, { Component } from 'react'
import { DEFAULT_AVATAR } from '../../config/imgConstants.jsx'

class Photos extends Component {
  state = {
      setAvatarOnClick: false,
      deleteOnClick: false,
  }
  handleSetAvatar = (photo) => async() => {
    this.setState({
        setAvatarOnClick: true,
    })
    try {
        await this.props.setAvatar(photo)
    } finally {
        window.location.reload()
    }
  }
  handleDelete = (photo) => async() => {
    this.setState({
        deleteOnClick: true,
    })
    try {
        await this.props.deleteProfilePicture(photo)        
    } finally {
        window.location.reload()            
    }
  }
  render() {
    const {isCurrentUser, providerId, loading, photos, fbp} = this.props
    const {setAvatarOnClick, deleteOnClick} = this.state
    const isNotDefaultAvatar = (fbp.avatarUrl !== DEFAULT_AVATAR)
    console.log(isNotDefaultAvatar)
    let filteredPhotos, uploadedFile
    if (photos && photos.length > 0) {
        filteredPhotos = photos.filter(photo => {
            return photo.downloadURL !== fbp.avatarUrl
        })
        uploadedFile = photos.find(
            photo => photo.downloadURL === fbp.avatarUrl
        )
    } else {
        uploadedFile = {
            downloadURL: fbp.avatarUrl,
            id: null,
            imgId: null,
        }
    }
    return (
        <div>
            {
                loading
                ?   <div className='text-center px-4 mx-5 my-2'>
                        <span 
                            class="spinner-border mr-2" 
                            role="status" 
                            aria-hidden="true">
                        </span>
                        <span className='h2 mb-0'>
                            {setAvatarOnClick && 'Setting...'}
                            {deleteOnClick && 'Deleting...'}                            
                        </span>
                    </div>  
                :   <div>
                        {
                            fbp.avatarUrl && fbp.avatarUrl.length > 0
                            ?   <div id="profilePictures" class="carousel slide" data-ride="carousel" data-interval="false">
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <a href={fbp.avatarUrl} rel='noopener noreferrer' target="_blank">
                                                <img 
                                                    src=
                                                    {
                                                        fbp.avatarUrl.includes('graph.facebook.com')
                                                            ? fbp.avatarUrl+'?height=250'
                                                            : fbp.avatarUrl
                                                    } 
                                                    class="d-block w-100" alt="..."
                                                />
                                            </a>    
                                            {
                                                isCurrentUser && isNotDefaultAvatar &&
                                                <button 
                                                    type="button" 
                                                    class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0 disabled'
                                                    >
                                                    <i class="fas fa-user-circle mr-2"></i>IN USE
                                                </button>                    
                                            }        
                                            {
                                                isCurrentUser && isNotDefaultAvatar &&
                                                <button 
                                                    type="button" 
                                                    class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                    data-toggle="modal" 
                                                    data-target="#inUseAvatar"
                                                    >
                                                    <i class="fas fa-trash-alt mr-2"></i>DELETE
                                                </button>  
                                            }            
                                            {
                                                filteredPhotos && filteredPhotos.length > 0 &&
                                                <h6 class="mb-0 font-weight-bold text-right bg-dark text-white py-1 px-3">
                                                    1/{filteredPhotos.length+1}
                                                </h6>
                                            }
                                            <div class="modal fade" id="inUseAvatar" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                <div class="modal-dialog modal-dialog-centered" role="document">
                                                    <div class="modal-content rounded-0">
                                                        <div class="modal-header">
                                                            <h4 class="mb-0 font-weight-bold"><i class="fas fa-trash-alt mr-2"></i>DELETE</h4>
                                                            <button type="button" class="close py-3" data-dismiss="modal" aria-label="Close">
                                                                <i class="fas fa-times"></i>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <a href={fbp.avatarUrl} rel='noopener noreferrer' target="_blank">
                                                                <img 
                                                                    src=
                                                                    {
                                                                        providerId && providerId === 'facebook.com' &&
                                                                        !fbp.avatarUrl.includes('firebasestorage')
                                                                        ? fbp.avatarUrl+'?height=250'
                                                                        : fbp.avatarUrl
                                                                    }                 
                                                                    class="d-block w-100" alt="..."
                                                                />
                                                            </a>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button 
                                                                type="button" 
                                                                class="btn btn-danger btn-lg rounded-0 w-100 font-weight-bold"
                                                                onClick={this.handleDelete(uploadedFile)}
                                                            >
                                                                Delete This Photo
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>                  
                                        </div>
                                        {
                                            filteredPhotos && filteredPhotos.length > 0 &&
                                            filteredPhotos.map((photo, index) => (
                                                <div key={photo.id} class="carousel-item">
                                                    <a href={photo.downloadURL} rel='noopener noreferrer' target="_blank">
                                                        <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                                    </a>
                                                    {
                                                        isCurrentUser &&
                                                        <button 
                                                            type="button" 
                                                            class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                            onClick={this.handleSetAvatar(photo)}                                                        
                                                            >
                                                            <i class="fas fa-user-circle mr-2"></i>AVATAR
                                                        </button>                    
                                                    }
                                                    {
                                                        isCurrentUser &&
                                                        <button 
                                                            type="button" 
                                                            class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                            data-toggle="modal" 
                                                            data-target={'#'+photo.imgId}        
                                                            >
                                                            <i class="fas fa-trash-alt mr-2"></i>DELETE
                                                        </button>  
                                                    }
                                                    <h6 class="mb-0 font-weight-bold text-right bg-dark text-white py-1 px-3">
                                                        {index+2}/{filteredPhotos.length+1}
                                                    </h6>
                                                    <div class="modal fade" id={photo.imgId} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                                            <div class="modal-content rounded-0">
                                                                <div class="modal-header">
                                                                    <h4 class="mb-0 font-weight-bold"><i class="fas fa-trash-alt mr-2"></i>DELETE</h4>
                                                                    <button type="button" class="close py-3" data-dismiss="modal" aria-label="Close">
                                                                        <i class="fas fa-times"></i>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <a href={photo.downloadURL} rel='noopener noreferrer' target="_blank">
                                                                        <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                                                    </a>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button 
                                                                        type="button" 
                                                                        class="btn btn-danger btn-lg rounded-0 w-100 font-weight-bold"
                                                                        onClick={this.handleDelete(photo)}
                                                                    >
                                                                        Delete This Photo
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                  
                                                </div>    
                                            ))
                                        }
                                    </div>
                                    {
                                        filteredPhotos && filteredPhotos.length > 0 &&
                                        <a style={isCurrentUser ? {marginBottom:70} : {marginBottom:30}} class="carousel-control-prev" href="#profilePictures" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>                
                                    }
                                    {
                                        filteredPhotos && filteredPhotos.length > 0 &&
                                        <a style={isCurrentUser ? {marginBottom:70} : {marginBottom:30}} class="carousel-control-next" href="#profilePictures" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    }
                                </div>
                            :   <div id="profilePictures" class="carousel slide" data-ride="carousel" data-interval="false">
                                    <div class="carousel-inner">
                                        {
                                            filteredPhotos && filteredPhotos.length > 0 &&
                                            filteredPhotos.map((photo, index) => (
                                                <div 
                                                    key={photo.id} 
                                                    class={index === 0 ? 'carousel-item active' : 'carousel-item'}
                                                >
                                                    <a href={photo.downloadURL} rel='noopener noreferrer' target="_blank">
                                                        <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                                    </a>
                                                    {
                                                        isCurrentUser &&
                                                        <button 
                                                            type="button" 
                                                            class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                            onClick={this.handleSetAvatar(photo)}
                                                            >
                                                            <i class="fas fa-user-circle mr-2"></i>AVATAR
                                                        </button>                    
                                                    }
                                                    {
                                                        isCurrentUser &&
                                                        <button 
                                                            type="button" 
                                                            class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                            data-toggle="modal" 
                                                            data-target={'#'+photo.imgId}        
                                                            >
                                                            <i class="fas fa-trash-alt mr-2"></i>DELETE
                                                        </button>  
                                                    }
                                                    {
                                                        filteredPhotos && filteredPhotos.length > 1 &&
                                                        <h6 class="mb-0 font-weight-bold text-right bg-dark text-white py-1 px-3">
                                                            {index+1}/{filteredPhotos.length}
                                                        </h6>
                                                    }
                                                    <div class="modal fade" id={photo.imgId} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                        <div class="modal-dialog modal-dialog-centered" role="document">
                                                            <div class="modal-content rounded-0">
                                                                <div class="modal-header">
                                                                    <h4 class="mb-0 font-weight-bold"><i class="fas fa-trash-alt mr-2"></i>DELETE</h4>
                                                                    <button type="button" class="close py-3" data-dismiss="modal" aria-label="Close">
                                                                        <i class="fas fa-times"></i>
                                                                    </button>
                                                                </div>
                                                                <div class="modal-body">
                                                                    <a href={photo.downloadURL} rel='noopener noreferrer' target="_blank">
                                                                        <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                                                    </a>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <button 
                                                                        type="button" 
                                                                        class="btn btn-danger btn-lg rounded-0 w-100 font-weight-bold"
                                                                        onClick={this.handleDelete(photo)}
                                                                    >
                                                                        Delete This Photo
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                  
                                                </div>    
                                            ))
                                        }
                                    </div>
                                    {
                                        filteredPhotos && filteredPhotos.length > 1 &&
                                        <a style={isCurrentUser ? {marginBottom:70} : {marginBottom:30}} class="carousel-control-prev" href="#profilePictures" role="button" data-slide="prev">
                                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Previous</span>
                                        </a>                
                                    }
                                    {
                                        filteredPhotos && filteredPhotos.length > 1 &&
                                        <a style={isCurrentUser ? {marginBottom:70} : {marginBottom:30}} class="carousel-control-next" href="#profilePictures" role="button" data-slide="next">
                                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span class="sr-only">Next</span>
                                        </a>
                                    }
                                </div>
                        }
                    </div>
            }
        </div>
    )
  }
}

export default Photos