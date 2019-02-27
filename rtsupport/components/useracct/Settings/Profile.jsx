import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

const baseStyle = {
  width: 255,
  height: 255,
  borderWidth: 2,
  borderColor: '#666',
  borderStyle: 'dashed',
  borderRadius: 0,
  marginLeft: 'auto',
};
const activeStyle = {
  borderStyle: 'solid',
  borderColor: '#28A645',
  backgroundColor: '#f5f5f5',
};
const rejectStyle = {
  borderStyle: 'solid',
  borderColor: '#DB3545',
  backgroundColor: '#f5f5f5',
};
const stepsHeader = {
  height: 38,
  fontWeight: 650,
}

class Profile extends Component {
  state = {
    photoURL: this.props.fba.photoURL || "/static/images/whazup-square-logo.png",
    preview: null,
    binaryCroppedCanvas: {},
  }
  componentDidMount() {
    const {fba, providerId} = this.props 
    if (providerId && providerId == 'facebook.com') {
      this.setState({
        photoURL: fba.photoURL+'?height=250'
      })
    }
  }
  onDrop = (files) => {
    this.setState({
      photoURL: files.map(file => URL.createObjectURL(file))[0],      
    })
  }
  cropImage = () => {
    this.refs.cropper.getCroppedCanvas().toBlob(blob => {
      this.setState({
        preview: URL.createObjectURL(blob),
        binaryCroppedCanvas: blob,
      })
    }, 'image/jpeg')
  }
  render() {
    const {fba, providerId} = this.props 
    const {photoURL, preview} = this.state
    return (
      <div>
        <h3 className='mb-0 font-weight-bold'>Public Profile</h3>
        <hr/>        
        <div className='row'>
          <div class="col-lg-4 mb-4">
            <h6 style={stepsHeader}>STEP1 - ADD A NEW IMAGE</h6>
            <Dropzone 
              accept="image/*"
              multiple={false}
              onDrop={this.onDrop}
              >
              {
                ({ 
                  getRootProps, 
                  getInputProps, 
                  isDragActive, 
                  isDragAccept, 
                  isDragReject, 
                  acceptedFiles, 
                  rejectedFiles 
                }) => {
                  let styles = {...baseStyle}
                  styles = isDragActive ? {...styles, ...activeStyle} : styles
                  styles = isDragReject ? {...styles, ...rejectStyle} : styles
              
                  return (
                    <div
                      {...getRootProps()}
                      style={styles}
                    >
                      <input {...getInputProps()} />
                      <div className='pt-5'>
                        {
                          !isDragReject &&
                          <h6 className='pt-5 mt-5 mx-4'>                            
                            {
                              isDragAccept 
                              ? <span className='green-text'>
                                  <i class="fas fa-check-circle mr-2"></i>Add This Image
                                </span>
                              : <span>
                                  <i class="fas fa-upload mr-2"></i>
                                  Drag then Drop a New Image Here OR Click/Tap To Add
                                </span>
                            }
                          </h6>
                        }
                        {
                          isDragReject &&
                          <h6 className='pt-5 mt-5 mx-4 red-text'>
                            <i class="fas fa-exclamation-triangle mr-2"></i>
                            Invalid File Type
                          </h6>
                        }
                      </div>
                    </div>
                  )
                }
              }
            </Dropzone>
          </div>      
          <div class="col-lg-4 mb-4">
            <h6 style={stepsHeader}>STEP2 - CROP THE IMAGE<br/></h6>
            <div style={{...baseStyle}}>
              <Cropper
                style={{height:250,width:'100%'}}
                ref='cropper'
                src={photoURL}
                aspectRatio={1}
                viewMode={0}
                dragMode='move'
                guides={false}
                scalable={true}
                cropBoxMovable={true}
                cropBoxResizable={true}
                crop={this.cropImage}
              />
            </div>
          </div>      
          <div class="col-lg-4 mb-4">
            <h6 style={stepsHeader}>STEP3 - PREVIEW THE CROPPED IMAGE</h6>
            <div style={{...baseStyle}}>
              <img src={preview} style={{maxWidth:'100%'}}/>                  
            </div>
          </div>      
        </div>
        <hr/>
        <button 
          type="button" 
          class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">
          Set New Profile Picture
        </button>                  
      </div>
    )
  }
}

export default Profile
