import React from 'react';

import {iblConfig} from './config.js';
var CaptionData = require('./CaptionData.json')
import LocalizedStrings from 'react-localization';

class Signin extends React.Component {

  constructor(props) {
    super(props);
    var url = require('url')
    var nowLang = (url.parse(location.href).pathname.split('/')[1])
    
    this.state = {active:props.active,lookupData : null,lookupType:'id',currentView:'signin',strings:new LocalizedStrings(CaptionData)};
    this.state.strings.setLanguage(nowLang);

    this.userLookup = this.userLookup.bind(this);
    this.userSignup = this.userSignup.bind(this);
  }

  userSignup(){
    this.props.callbackSignup();
  }

  userLookup(){
    if(!this.state.lookupData || this.state.lookupData==''){
      alert(this.state.strings.signin.err_empty);

      return false;
    }
    $("#modal-loader").show();
    var url, data, method, xhr = new XMLHttpRequest(), _this=this;

    if(this.state.lookupType=='email'){
      url = iblConfig.baseUrl+"find_user_id?email="+encodeURIComponent(this.state.lookupData);
      data = JSON.stringify([{"email":this.state.lookupData}]);
      method = 'GET';
    }else{
      url = iblConfig.baseUrl+"login";
      data = JSON.stringify({"user_id":this.state.lookupData});
      method='POST';
    }

    xhr.open(method,url,true);
    xhr.timeout = 2000
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(data);
    xhr.onload = function(){
      var res = JSON.parse(this.responseText);
      if(res.code==0){
        _this.proceedForm(_this.state.lookupData);
      }else if(res.user_id){
        _this.proceedForm(res.user_id);
      }else{
        $("#modal-loader").hide();
        alert(_this.state.strings.signin.err_notfound);
        _this.props.callbackSignup();
      }
    }
  }

  proceedForm(user_id){
    var formId=new URL(location.href).searchParams.get("form")
    this.props.callbackForm(formId,user_id);
  }

  handleChange(e) {
    var type='id', data = e.target.value;
    if(data.match(/[@].*/))
      type='email';

    this.setState({ lookupData: e.target.value,lookupType:type });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active });  
  }

  render() {
    return (
      <div className="wrapper3 pt-120 pb-60 text-center" style={{display:(this.state.active?'block':'none')}}>
        <p>{this.state.strings.signin.please_input_id_or_email}:</p>
        <input type="text" className="form-react form-control" placeholder={this.state.strings.form.ph_idoremail} onChange={ this.handleChange.bind(this) } />
        <div><button className="btn" onClick={this.userLookup}>{this.state.strings.general.btn_proceed}</button></div>
        <p>{this.state.strings.signin.notregistered} <a href='javascript:void(0);' onClick={this.userSignup}>{this.state.strings.signin.clickregister}</a></p>
      </div>
    );
  }

}

export default Signin;
