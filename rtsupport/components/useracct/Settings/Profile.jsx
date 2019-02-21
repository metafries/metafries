import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

const baseStyle = {
  width: 250,
  height: 250,
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
  render() {
    return (
      <div>
        <h3 className='mb-0 font-weight-bold'>Public Profile</h3>
        <hr/>        
        <h5 className='font-weight-bold'>Avatar</h5>
        <div className='row'>
          <div class="col-lg-4 mb-2">
            <h6>STEP1 - ADD A NEW IMAGE</h6>
            <Dropzone accept="image/*">
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
          </div>      
        </div>
      </div>
    )
  }
}

export default Profile
