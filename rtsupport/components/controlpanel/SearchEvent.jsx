import React, { Component } from 'react'

class SearchEvent extends Component {
  render() {
    return (
        <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Search An Event
                        </button>
                    </h5>
                </div>      
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control ml-2 border-dark rounded-0" placeholder="Sup?"/>
                            <div class="input-group-append mr-2">
                                <button class="btn btn-outline-dark rounded-0" type="button"><i class="fas fa-search"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}

export default SearchEvent