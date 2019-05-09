import React,{Component} from 'react';
import firebase from './firebase';
import * as actions from '../../../actions';
import {connect} from 'react-redux';

const storage = firebase.storage();

class ImgUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      img: props.image,
      msg: '',
      id: props.id,
      label: 'Add Image',
      dis: false,
      spin: false
    }
  }



  fileSelectHandler(e) {
    if(!e.target.files[0]) {
      return;
    }

    if(this.state.label.includes('Uploaded')) {
      return this.props.msg('Please Wait... Photo is being Uploaded.')
    }

    const size = Math.round(((e.target.files[0].size / 1024)/1024));

    if(size > 6 ) {
    return this.props.msg('Please select image of size less than 5mb.');
    }


    this.setState({dis:true});



    const getUrl = (url) => {
      this.props.msg('Please Wait... Updating Your Profile.')
      this.setState({img:url,label:'Add Image',dis:false,spin:false});
        actions.addImage({image:url}).then((res)=>{
          return this.props.msg('Image has been added to Your Profile.');

        }).catch((err)=>{

        return  error.msg('Unable to add image to Your Profile.');
        })

      }

      const error = (msg) => {
        this.setState({dis:false});
        this.props.msg(msg)

      }

      const changeLabel = (p) => {

        this.props.notify('Please Wait while the photo is being uploaded...')
        this.setState({label:`Uploaded ${p}%`,spin:true});
      }


    const uploadTask = storage.ref(this.props.id).put(e.target.files[0]);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
  function(snapshot) {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    changeLabel(Math.round(progress));

  }, function(error) {
    error('Unable to upload your picture. Please try again.');

}, function() {
  // Upload completed successfully, now we can get the download URL
  uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
    getUrl(downloadURL);
  });
});

  }


  render() {

    return(
      <div className="profile-area">
      <div className="p-image">
        <div onClick={()=>this.ImgInput.click()} id="img-u" className="img">
        {this.state.img
        ? <div className="pp" style={{background: `url(${this.state.img})`}}></div>
        :null}

        <div className="label">
        {this.state.spin ?<div> <i className="fa fa-spinner fa-spin" /> <br/> </div> : ''}
        <div>{this.state.label}</div>
        </div>
        </div>
        </div>
      <input style={{display:'none'}} type="file" accept=".jpg,.jpeg,.png" onChange={(e)=>this.fileSelectHandler(e)} ref={ImgInput => this.ImgInput = ImgInput}/>

      </div>
    )
  }
}

export default connect(null)(ImgUpload);
