import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import ProfileForm from '../../forms/ProfileForm.jsx'
import { ACTIVE, NOT_ACTIVE } from '../../nav/navConstants.jsx'

const baseStyle = {
  width: 'auto',
  height: 95,
  borderWidth: 1,
  borderColor: '#000',
  borderStyle: 'dashed',
  borderRadius: 0,
  backgroundColor: '#f5f5f5',
};
const ratioContainer = {
  position: 'relative',
  width: '100%',
  minWidth: 250,
  paddingTop: '100%',
  borderWidth: 1,
  borderStyle: 'dashed',
  borderRadius: 0,
  backgroundColor: '#000',
}
const ratioContent= {
  width: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
}
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
  fontWeight: 'bold',
}

class Profile extends Component {
  state = {
    photoURL: this.props.fbp.avatarUrl,
    preview: null,
    croppedCanvas: {},
    uploadImgOkMsg: '',
    uploadImgErrMsg: '',
    defaultOpts: true,
  }
  componentDidMount() {
    const {fbp, providerId} = this.props 
    if (fbp.avatarUrl && fbp.avatarUrl.includes('graph.facebook.com')) {
      this.setState({
        photoURL: fbp.avatarUrl+'?height=250'
      })  
    }
  }
  hendledefaultOpts = () => {
    this.setState(prevState => ({
      defaultOpts: !prevState.defaultOpts
    }))
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
        croppedCanvas: blob,
      })
    }, 'image/jpeg')
  }
  uploadImage = async () => {
    this.setState({
      uploadImgOkMsg: '',
      uploadImgErrMsg: '',  
    })
    const {croppedCanvas} = this.state
    try {
      await this.props.setNewProfilePicture(croppedCanvas)
      this.setState({
        uploadImgOkMsg: 'Your avatar has changed successfully'
      })
    } catch (error) {
      this.setState({
        uploadImgErrMsg: error.message
      })
    } finally {
      this.props.history.push(`/profile/${this.props.fba.uid}`)
    }
  }
  render() {
    const {updateProfile, fbp, fba, providerId, loading} = this.props 
    const {photoURL, preview, uploadImgOkMsg, uploadImgErrMsg, defaultOpts} = this.state
    return (
      <div>
        <button 
          type="button" 
          class={defaultOpts ? ACTIVE : NOT_ACTIVE}
          onClick={this.hendledefaultOpts}>
          INTRO
        </button>
        <button 
          type="button" 
          class={defaultOpts ? NOT_ACTIVE : ACTIVE}
          onClick={this.hendledefaultOpts}>          
          AVATAR
        </button>
        <hr/>    
        {
          ! defaultOpts
          ? <div>
              <div className='row mb-4'>
                <div className='col-lg-4'>
                  <h5 style={stepsHeader} className='my-4'>Step1 - Add a New Image</h5>
                </div>
                <div className='col-lg-8'>
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
                              {
                                  !isDragReject &&
                                  <h5 className='m-3'>                            
                                    {
                                      isDragAccept 
                                      ? <span className='green-text float-right'>
                                          <i class="fas fa-check-circle mr-2"></i>Add This Image
                                        </span>
                                      : <span>
                                          <i class="far fa-image h4 mr-2"></i>
                                          Drag and Drop an Image HERE or Click/Tap to Add
                                        </span>
                                    }
                                  </h5>
                              }
                              {
                                isDragReject &&
                                <h5 className='red-text float-right m-3'>
                                  <i class="fas fa-exclamation-triangle mr-2"></i>
                                  Invalid File Type
                                </h5>
                              }
                          </div>
                        )
                      }
                    }
                  </Dropzone>   
                </div> 
              </div>
              <div className='row mb-4'>
                <div className='col-lg-4'>
                  <h5 style={stepsHeader} className='my-4'>Step2 - Crop the Image</h5>
                </div>
                <div className='col-lg-8'>
                  <div style={ratioContainer}>
                    <Cropper
                      style={ratioContent}
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
              </div>
              <div className='row mb-4'>
                <div className='col-lg-4'>
                  <h5 style={stepsHeader} className='my-4'>Step3 - Preview the Cropped Image</h5>
                </div>
                <div className='col-lg-8'>
                  <div style={ratioContainer}>
                    <img src={preview} style={ratioContent}/>                  
                  </div>
                </div>
              </div>
              {
                uploadImgOkMsg.length > 0 &&
                <h6 className='input-ok-msg my-1 p-2'>
                  <i class="fas fa-check-circle mr-2 my-1"></i>
                  <span className='my-1'>{uploadImgOkMsg}</span>
                  <i class="fas fa-minus mx-2 my-1"></i>
                  <a href={`/profile/${fba.uid}`} className='badge badge-pill badge-dark my-1 py-0'>
                    view your profile.
                  </a>
                </h6>        
              }
              {
                uploadImgErrMsg.length > 0 &&
                <h6 className='input-err-msg my-2 p-2'>
                  <i class="fas fa-exclamation-circle mr-2"></i>
                  {uploadImgErrMsg}
                </h6>        
              }            
              <hr/>
              {
                loading
                ? <div className='h5'>
                    <span 
                      class="spinner-border mr-2" 
                      role="status" 
                      aria-hidden="true">
                    </span>
                    <span className='h3'>
                      Uploading...
                    </span>
                  </div>  
                : <button 
                    onClick={this.uploadImage}
                    type="button" 
                    class="btn btn-dark btn-lg rounded-0 text-ddc213 font-weight-bold">
                    Set New Profile Picture
                  </button>                  
              }   
            </div>
          : <ProfileForm 
              updateProfile={updateProfile}  
              fbp={fbp}              
              fba={fba}          
            />          
        }    
      </div>
    )
  }
}

export default withRouter(Profile)
