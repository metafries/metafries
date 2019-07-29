import React, { Component } from 'react'
import { objToArray } from '../../app/common/util/shapers.js'

class EventPosters extends Component {
    render() {
        const {event} = this.props
        const convertedPosters = event && event.posters && objToArray(event.posters)        
        let filteredPosters
        if (convertedPosters && convertedPosters.length > 0) {
            filteredPosters = convertedPosters.filter(photo => (
                photo.downloadURL != event.posterUrl
            ))
        }
        return (
            <div>
            {
                event.posterUrl && event.posterUrl.length > 0
                ?   <div id={event.id} class="carousel slide" data-ride="carousel" data-interval="false">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <a href={event.posterUrl} rel='noopener noreferrer' target="_blank">
                                    <img src={event.posterUrl} class="d-block w-100" alt="..."/>
                                </a>                        
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
                                        <h6 class="mb-0 font-weight-bold text-right bg-dark text-white py-1 px-3">
                                            {index+2}/{filteredPosters.length+1}
                                        </h6>
                                    </div>    
                                ))
                            }
                        </div>
                        {
                            filteredPosters && filteredPosters.length > 0 &&
                            <a style={{marginBottom:25}} class="carousel-control-prev" href={`#${event.id}`} role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>                
                        }
                        {
                            filteredPosters && filteredPosters.length > 0 &&
                            <a style={{marginBottom:25}} class="carousel-control-next" href={`#${event.id}`} role="button" data-slide="next">
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
                                        class={index == 0 ? 'carousel-item active' : 'carousel-item'}
                                    >
                                        <a href={photo.downloadURL} rel='noopener noreferrer' target="_blank">
                                            <img src={photo.downloadURL} class="d-block w-100" alt="..."/>
                                        </a>
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
                            <a style={{marginBottom:25}} class="carousel-control-prev" href={`#${event.id}`} role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>                
                        }
                        {
                            filteredPosters && filteredPosters.length > 1 &&
                            <a style={{marginBottom:25}} class="carousel-control-next" href={`#${event.id}`} role="button" data-slide="next">
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