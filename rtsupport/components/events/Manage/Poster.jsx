import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

const baseStyle = {
  width: 'auto',
  height: 100,
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
  fontWeight: 'bold',
}

class Poster extends Component {
  state = {
    posterUrl: this.props.event.posterUrl || 
      '/static/images/IMG_20180706_185041.jpg',
  }
  onDrop = (files) => {
    this.setState({
      posterUrl: files.map(file => URL.createObjectURL(file))[0],   
    })
  }
  render() {
    return (
      <div>
        <h5 style={stepsHeader} className='my-4'>Step1 - Add a New Image</h5>
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
                                  Drag and Drop an Image HERE Or Click/Tap To Add
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
        <h5 style={stepsHeader} className='my-4'>Step2 - Crop the Image</h5>
        <h5 style={stepsHeader} className='my-4'>Step3 - Preview the Cropped Image</h5>
      </div>
    )
  }
}

export default Poster