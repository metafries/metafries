import React, { Component } from 'react'

class CreateEvent extends Component {
  render() {
    return (
        <div class="card rounded-0 border-dark border-bottom-0">
                <div class="card-header border-dark px-0 py-0 bg-white" id="headingTwo">
                <button class="btn btn-outline-dark rounded-0 btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                <i class="fas fa-plus"></i> New
            </button>
    </div>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#dashboard">
                    <div class="card-body px-2 py-2">
                    <form>
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
  </div>
  <div class="form-group form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary float-right mb-3">Submit</button>
</form>

                    </div>
          </div>
        </div>
    )
  }
}

export default CreateEvent