import React, { Component } from 'react'

class ChatListItem extends Component {
  render() {
    return (
        <div>
        <div class="card rounded-0">
            <div class="card-header px-0 py-0" id="headingOneMsg">
            <button class="btn btn-light btn-block collapsed px-0 py-0 rounded-0" data-toggle="collapse" data-target="#collapseOneMsg" aria-expanded="true" aria-controls="collapseOneMsg">
                <div className='contact float-left px-1 py-1'>
                    <img src="/static/images/whazup-square-logo.png" class="img-fluid rounded-circle" alt="..."/>
                </div>
                <div className='d-inline'>
                    <div className='float-left ml-2'><strong>Cashviar</strong></div>
                    <div className='float-right mr-2'>10:04</div><br/>
                    <div className='float-left ml-2'>hola!</div>
                </div>     
            </button>
            </div>
            <div id="collapseOneMsg" class="collapse show" aria-labelledby="headingOneMsg" data-parent="#chatlist">
                <div class="card-body px-0 py-0">
                    <div className='mx-2 mt-2'>
                        <h6 className='text-left'>Hola! <small>10:03</small></h6>
                        <h6 className='text-right'><small>10:04</small> hola!</h6>
                    </div>
                </div> 
                <div className='card-footer px-0 py-0 rounded-0'>
                    <div className='input-group'>                
                        <input 
                        type='text'
                        className='form-control rounded-0'
                        placeholder='Add Message...'
                        />
                        <div className='input-group-append'>
                            <button type="submit" class="btn btn-dark float-right rounded-0 text-ddc213 font-weight-bold">Send</button>
                        </div>        
                    </div>   
                </div>
            </div>
        </div>  
                <div class="card rounded-0">
                <div class="card-header px-0 py-0" id="headingTwoMsg">
                <button class="btn btn-light btn-block collapsed px-0 py-0 rounded-0" data-toggle="collapse" data-target="#collapseTwoMsg" aria-expanded="false" aria-controls="collapseTwoMsg">
                    <div className='contact float-left px-1 py-1'>
                        <img src="/static/images/whazup-square-logo.png" class="img-fluid rounded-circle" alt="..."/>
                    </div>
                    <div className='d-inline'>
                        <div className='float-left ml-2'><strong>Cashviar</strong></div>
                        <div className='float-right mr-2'>10:04</div><br/>
                        <div className='float-left ml-2'>hola!</div>
                    </div>     
                </button>
                </div>
                <div id="collapseTwoMsg" class="collapse" aria-labelledby="headingTwoMsg" data-parent="#chatlist">
                <div class="card-body px-0 py-0">
                <div className='mx-2 mt-2'>
                    <h6 className='text-left'>Hola! <small>10:03</small></h6>
                    <h6 className='text-right'><small>10:04</small> hola!</h6>
                </div>
            </div> 
            <div className='card-footer px-0 py-0 rounded-0'>
                <div className='input-group'>                
                    <input 
                    type='text'
                    className='form-control rounded-0'
                    placeholder='Add Message...'
                    />
                    <div className='input-group-append'>
                        <button type="submit" class="btn btn-dark float-right rounded-0 text-ddc213 font-weight-bold">Send</button>
                    </div>        
                </div>   
            </div>
            </div>
            </div>   
            </div>   
      )
  }
}

export default ChatListItem