import React, { Component } from 'react'

class InstantMsg extends Component {
  render() {
    return (
        <div class="card rounded-0 border-dark">
          <div class="card-header border-dark px-0 py-0 bg-white" id="headingThree">
          <button class="btn btn-outline-dark rounded-0 btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          <i class="fas fa-comment-alt"></i> <strong>Message</strong>
          </button>
      </div>
          <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#dashboard">
            <div class="card-body">
              Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
            </div>
          </div>
        </div>
    )
  }
}

export default InstantMsg