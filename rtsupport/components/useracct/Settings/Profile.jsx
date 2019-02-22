import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

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

class Profile extends Component {
  state = {
    files: [],
    multipleSelect: false,
  }
  onDrop = (files) => {
    this.setState({
      files: files.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      }))
    })
  }
  render() {
    const {fba, providerId} = this.props 
    const {files} = this.state
    return (
      <div>
        <h3 className='mb-0 font-weight-bold'>Public Profile</h3>
        <hr/>        
        <h5 className='font-weight-bold'>Avatar</h5>
        <div className='row'>
          <div class="col-lg-4 mb-2">
            <h6>STEP1 - ADD A NEW IMAGE</h6>
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
          <div class="col-lg-4 mb-2">
            <h6>STEP2 - CROP THE IMAGE</h6>
          </div>      
          <div class="col-lg-4 mb-2">
            <h6>STEP3 - PREVIEW AND UPLOAD</h6>
            {
              files.length > 0
              ? files.map(file => (
                  <div style={{...baseStyle}}>
                    <img src={file.preview} style={{maxWidth:250}}/>                  
                  </div>
                ))
              : <div style={{...baseStyle}}>
                  {
                    providerId && providerId == 'facebook.com'
                    ? <img src={fba.photoURL+'?height=250'} style={{maxWidth:250}}/>
                    : <img src={fba.photoURL} style={{maxWidth:250}}/>                    
                  }
                </div>
            }
          </div>      
        </div>
      </div>
    )
  }
}

export default Profile
