import React, { Component } from 'react'

class SearchEvent extends Component {
  render() {
    return (
        <div class="card rounded-0 border-dark border-bottom-0">
            <div class="card-header border-dark px-0 py-0 bg-white" id="headingOne">
                <button class="btn btn-outline-dark rounded-0 btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                <i class="fas fa-filter"></i> <strong>Filter</strong>
                </button>
            </div>      
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#dashboard">
                <div class="card-body px-0">
                    <form>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text rounded-0 border-right-0 bg-white" for="inputGroupSelect01"><i class="far fa-clock"></i></label>
                            </div>
                            <select class="custom-select rounded-0 border-left-0" id="inputGroupSelect01">
                                <option selected>All</option>
                                <option value="1">Today</option>
                                <option value="2">Tomorrow</option>
                                <option value="3">This Week</option>
                                <option value="4">This Month</option>
                            </select>
                        </div>   
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <label class="input-group-text rounded-0 border-right-0 bg-white" for="inputGroupSelect02"><i class="fas fa-bolt ml-1"></i></label>
                            </div>
                            <select class="custom-select rounded-0 border-left-0" id="inputGroupSelect02">
                                <option selected>All</option>
                                <option value="1">- 100</option>
                                <option value="2">100 - 1000</option>
                                <option value="3">1000 - 10000</option>
                                <option value="4">10000 -</option>
                            </select>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <label class="input-group-text rounded-0 border-right-0 bg-white"><i class="fas fa-map-marker-alt ml-1"></i></label>
                            </div>
                            <input type="text" class="form-control rounded-0 border-left-0" placeholder="Enter A City..."/>
                        </div>  
                        <button type="submit" class="btn btn-dark float-right mb-3 rounded-0 text-ddc213 font-weight-bold">Search</button>           
                    </form>
                </div>
            </div>
        </div>
    )
  }
}

export default SearchEvent