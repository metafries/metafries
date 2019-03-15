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
            <div id="profilePictures" class="carousel slide" data-ride="carousel" data-interval="false">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <a href={fbp.avatarUrl} target="_blank">
                            <img src={this.props.avatarUrl} class="d-block w-100" alt="..."/>
                        </a>                        
                        <button 
                            type="button" 
                            class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0 disabled'
                        >
                            <i class="fas fa-user-circle mr-2"></i>IN USE
                        </button>                    
                        <button 
                            type="button" 
                            class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                            data-toggle="modal" 
                            data-target="#inUseAvatar"
                        >
                            <i class="fas fa-trash-alt mr-2"></i>DELETE
                        </button>  
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
                                        <a href={fbp.avatarUrl} target="_blank">
                                            <img src={this.props.avatarUrl} class="d-block w-100" alt="..."/>
                                        </a>
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger btn-lg rounded-0 w-100 font-weight-bold">Delete This Photo</button>
                                    </div>
                                </div>
                            </div>
                        </div>                  
                    </div>
                    {
                        filteredPhotos && filteredPhotos.length > 0 &&
                        filteredPhotos.map((photo, index) => (
                            <div key={photo.id} class="carousel-item">
                                <a href={photo.downloadURL} target="_blank">
                                    <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                </a>
                                <button 
                                    type="button" 
                                    class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                >
                                    <i class="fas fa-user-circle mr-2"></i>AVATAR
                                </button>                    
                                <button 
                                    type="button" 
                                    class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                    data-toggle="modal" 
                                    data-target={'#'+photo.imgId}        
                                >
                                    <i class="fas fa-trash-alt mr-2"></i>DELETE
                                </button>  
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
                                                <a href={photo.downloadURL} target="_blank">
                                                    <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                                </a>
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-danger btn-lg rounded-0 w-100 font-weight-bold">Delete This Photo</button>
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
                    <a style={{marginBottom:75}} class="carousel-control-prev" href="#profilePictures" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>                
                }
                {
                    filteredPhotos && filteredPhotos.length > 0 &&
                    <a style={{marginBottom:75}} class="carousel-control-next" href="#profilePictures" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                }
            </div>
        }
      </div>
    )
  }
}

export default Photos