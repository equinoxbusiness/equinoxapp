import React, { useState } from 'react';
import './OrgStep3.scss';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { addOrgFormData } from '../../../redux/actions';
import { connect } from 'react-redux';

const OrgStep3 = (props:any) => {
  const [isCamera, setCamera] = useState(false);
  const handleTakePhoto = (dataUri: any) => {
    console.log(dataUri)
    const selfy = dataURItoBlob(dataUri);
    props.dispatch(addOrgFormData({selfy}));
    setCamera(false);
  }
  const dataURItoBlob = (dataURI: any) => {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mimeString});
  }

  return (
    isCamera ? 
    <Camera
      onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
    /> :
    <div className="OrgStep3" data-testid="OrgStep3">
      <div className="container">
        <div className="inner_card ">
          <div className="w-100">
            <div className="row mb-4">
              <div className="col-md-3"></div>
              <div className="col-md-6">
                <p>ORG 3.0 LAUNCHPAD</p>
                <h2>STEP 3</h2>
                <p className="text-primary">
                Deployer's Photo
                </p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4"></div>
              <div className="col-md-4">
                <div className="text-start step3_content mb-3">
                  <p className="dep_text">Deployer's Photograph</p>
                  <p className="mb-5">Upload your clear photograph by using the button below & click next</p>
                  <div className="mb-5 text-center">
                    <button className="photo_cap_btn" onClick={()=>setCamera(true)}>CLICK TO CAPTURE SELFIE</button>
                  </div>
                </div>
                <div className="float-start">
                  <button className="next_btn" type="button" onClick={()=>props.previousStep()}>Previuos</button>
                </div>
                <div className="float-end ">
                    <button className="next_btn" onClick={props.nextStep}>NEXT <i className="fa fa-sign-in ps-2" aria-hidden="true"></i></button>
                  </div>
              </div>
            </div>
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default connect()(OrgStep3);
