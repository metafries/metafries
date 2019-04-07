import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'

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
  paddingTop: '56.25%',
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

class Poster extends Component {
  state = {
    posterUrl: this.props.event.posterUrl || 
      '/static/images/IMG_20180706_185041.jpg',
      preview: null,
      croppedCanvas: {},  
  }
  onDrop = (files) => {
    this.setState({
      posterUrl: files.map(file => URL.createObjectURL(file))[0],   
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
  render() {
    const {preview, posterUrl} = this.state
    return (
      <div>
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
                src={posterUrl}
                aspectRatio={16/9}
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
        <div className='row'>
          <div className='col-lg-4'>
            <h5 style={stepsHeader} className='my-4'>Step3 - Preview the Cropped Image</h5>
          </div>
          <div className='col-lg-8'>
            <div style={ratioContainer}>
              <img src={preview} style={ratioContent}/>                  
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Poster