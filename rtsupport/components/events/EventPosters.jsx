import React, { Component } from 'react'
import { objToArray } from '../../app/common/util/shapers.js'

class EventPosters extends Component {
    state = {
        deletePosterOnClick: false,
        setToMainOnClick: false,
    }

    handleDeletePoster = (photo, event) => async() => {
        this.setState({
            deletePosterOnClick: true
        })
        try {
            await this.props.deletePoster(photo, event)            
        } finally {
            window.location.reload()
        }        
    }

    handleSetToMain = (photo, eventId) => async() => {
        this.setState({
            setToMainOnClick: true
        })
        await this.props.setToMain(photo, eventId)
    }
    render() {
        const {processing, isHost, event} = this.props
        const {deletePosterOnClick, setToMainOnClick} = this.state
        const convertedPosters = event && event.posters && objToArray(event.posters)        
        let filteredPosters, inUsePoster
        if (convertedPosters && convertedPosters.length > 0) {
            filteredPosters = convertedPosters.filter(photo => (
                photo.downloadURL !== event.posterUrl
            ))
            inUsePoster = convertedPosters.find(
                photo => photo.downloadURL === event.posterUrl
            )
        }
        return (
            processing
            ?   <div className='text-center px-4 mx-5 my-2'>
                    <span 
                        class="spinner-border mr-2" 
                        role="status" 
                        aria-hidden="true">
                    </span>
                    <span className='h2 mb-0'>
                        {deletePosterOnClick && 'Deleting...'}
                        {setToMainOnClick && 'Setting...'}
                    </span>
                </div>  
            :   <div>
                    {
                        event.posterUrl && event.posterUrl.length > 0
                        ?   <div id={event.id} class="carousel slide" data-ride="carousel" data-interval="false">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <a href={event.posterUrl} rel='noopener noreferrer' target="_blank">
                                            <img src={event.posterUrl} class="d-block w-100" alt="..."/>
                                        </a>  
                                        {
                                            isHost &&
                                            <button 
                                                type="button" 
                                                class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0 disabled'
                                                >
                                                <i class="fas fa-thumbtack mr-2"></i>IN USE
                                            </button>                                                    
                                        }      
                                        {
                                            isHost &&
                                            <button 
                                                type="button" 
                                                class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                data-toggle="modal" 
                                                data-target="#inUsePoster"
                                                >
                                                <i class="fas fa-trash-alt mr-2"></i>DELETE
                                            </button>  
                                        }   
                                        <div class="modal fade" id="inUsePoster" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                            <div class="modal-dialog modal-dialog-centered" role="document">
                                                <div class="modal-content rounded-0">
                                                    <div class="modal-header">
                                                        <h4 class="mb-0 font-weight-bold"><i class="fas fa-trash-alt mr-2"></i>DELETE</h4>
                                                        <button type="button" class="close py-3" data-dismiss="modal" aria-label="Close">
                                                            <i class="fas fa-times"></i>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <a href={event.posterUrl} rel='noopener noreferrer' target="_blank">
                                                            <img 
                                                                src={event.posterUrl}
                                                                class="d-block w-100" alt="..."
                                                            />
                                                        </a>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button 
                                                            type="button" 
                                                            class="btn btn-danger btn-lg rounded-0 w-100 font-weight-bold"
                                                            onClick={this.handleDeletePoster(inUsePoster, event)}
                                                        >
                                                            Delete This Photo
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>                                                               
                                        {
                                            filteredPosters && filteredPosters.length > 0 &&
                                            <h6 class="mb-0 font-weight-bold text-right bg-dark text-white py-1 px-3">
                                                1/{filteredPosters.length+1}
                                            </h6>
                                        }
                                    </div>
                                    {
                                        filteredPosters && filteredPosters.length > 0 &&
                                        filteredPosters.map((photo, index) => (
                                            <div key={photo.id} class="carousel-item">
                                                <a href={photo.downloadURL} rel='noopener noreferrer' target="_blank">
                                                    <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                                </a>
                                                {
                                                    isHost &&
                                                    <button 
                                                        type="button" 
                                                        class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                        onClick={this.handleSetToMain(photo, event.id)}
                                                        >
                                                        <i class="fas fa-thumbtack mr-2"></i>MAIN
                                                    </button>                    
                                                }
                                                {
                                                    isHost &&
                                                    <button 
                                                        type="button" 
                                                        class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                        data-toggle="modal" 
                                                        data-target={'#'+photo.id}        
                                                        >
                                                        <i class="fas fa-trash-alt mr-2"></i>DELETE
                                                    </button>  
                                                }     
                                                <div class="modal fade" id={photo.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                                                    onClick={this.handleDeletePoster(photo, event)}                                                                    
                                                                >
                                                                    Delete This Photo
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                                                                                                                
                                                <h6 class="mb-0 font-weight-bold text-right bg-dark text-white py-1 px-3">
                                                    {index+2}/{filteredPosters.length+1}
                                                </h6>
                                            </div>    
                                        ))
                                    }
                                </div>
                                {
                                    filteredPosters && filteredPosters.length > 0 &&
                                    <a style={isHost ? {marginBottom:70} : {marginBottom:25}} class="carousel-control-prev" href={`#${event.id}`} role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>                
                                }
                                {
                                    filteredPosters && filteredPosters.length > 0 &&
                                    <a style={isHost ? {marginBottom:70} : {marginBottom:25}} class="carousel-control-next" href={`#${event.id}`} role="button" data-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Next</span>
                                    </a>
                                }
                            </div>
                        :   <div id={event.id} class="carousel slide" data-ride="carousel" data-interval="false">
                                <div class="carousel-inner">
                                    {
                                        filteredPosters && filteredPosters.length > 0 &&
                                        filteredPosters.map((photo, index) => (
                                            <div 
                                                key={photo.id} 
                                                class={index === 0 ? 'carousel-item active' : 'carousel-item'}
                                            >
                                                <a href={photo.downloadURL} rel='noopener noreferrer' target="_blank">
                                                    <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                                </a>
                                                {
                                                    isHost &&
                                                    <button 
                                                        type="button" 
                                                        class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                        onClick={this.handleSetToMain(photo, event.id)}
                                                        >
                                                        <i class="fas fa-thumbtack mr-2"></i>MAIN
                                                    </button>                    
                                                }
                                                {
                                                    isHost &&
                                                    <button 
                                                        type="button" 
                                                        class='btn btn-outline-dark btn-lg rounded-0 font-weight-bold w-50 border-0'
                                                        data-toggle="modal" 
                                                        data-target={'#'+photo.id}        
                                                        >
                                                        <i class="fas fa-trash-alt mr-2"></i>DELETE
                                                    </button>  
                                                }     
                                                <div class="modal fade" id={photo.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                                                                    onClick={this.handleDeletePoster(photo, event)}                                                                    
                                                                >
                                                                    Delete This Photo
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>                                                                                                                                
                                                {
                                                    filteredPosters && filteredPosters.length > 1 &&
                                                    <h6 class="mb-0 font-weight-bold text-right bg-dark text-white py-1 px-3">
                                                        {index+1}/{filteredPosters.length}
                                                    </h6>
                                                }
                                            </div>    
                                        ))
                                    }
                                </div>
                                {
                                    filteredPosters && filteredPosters.length > 1 &&
                                    <a style={isHost ? {marginBottom:70} : {marginBottom:25}} class="carousel-control-prev" href={`#${event.id}`} role="button" data-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="sr-only">Previous</span>
                                    </a>                
                                }
                                {
                                    filteredPosters && filteredPosters.length > 1 &&
                                    <a style={isHost ? {marginBottom:70} : {marginBottom:25}} class="carousel-control-next" href={`#${event.id}`} role="button" data-slide="next">
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

export default EventPosters