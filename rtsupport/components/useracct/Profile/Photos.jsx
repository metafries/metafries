import React, { Component } from 'react'

class Photos extends Component {
  render() {
    const {photos, fbp} = this.props
    let filteredPhotos
    if (photos && photos.length > 0) {
        filteredPhotos = photos.filter(photo => {
            return photo.downloadURL != fbp.avatarUrl
        })
    }
    return (
      <div>
        {
            fbp.avatarUrl && fbp.avatarUrl.length > 0 &&
            <div id="profilePictures" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <a href={fbp.avatarUrl}>
                            <img src={this.props.avatarUrl} class="d-block w-100" alt="..."/>
                        </a>
                    </div>
                    {
                        filteredPhotos && filteredPhotos.length > 0 &&
                        filteredPhotos.map((photo) => (
                            <div key={photo.id} class="carousel-item">
                                <a href={photo.downloadURL}>
                                    <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                </a>
                            </div>    
                        ))
                    }
                </div>
                {
                    filteredPhotos && filteredPhotos.length > 0 &&
                    <a class="carousel-control-prev" href="#profilePictures" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>                
                }
                {
                    filteredPhotos && filteredPhotos.length > 0 &&
                    <a class="carousel-control-next" href="#profilePictures" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                }
            </div>
        }
        {
            fbp.avatarUrl && fbp.avatarUrl.length > 0 &&
            <button 
                type="button" 
                class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
            >
                <i class="fas fa-user-circle mr-2"></i>AVATAR
            </button>                    
        }
        {
            fbp.avatarUrl && fbp.avatarUrl.length > 0 &&
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