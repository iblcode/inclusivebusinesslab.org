import React from 'react';
import {iblConfig} from './config.js';

var CaptionData = require('./CaptionData.json')
import LocalizedStrings from 'react-localization';

class Signup extends React.Component {

  constructor(props) {
    super(props);
    var url = require('url')
    var nowLang = (url.parse(location.href).pathname.split('/')[1])
    this.state = {active:props.active,userId:null,strings:new LocalizedStrings(CaptionData),selectData:[]};
    this.state.strings.setLanguage(nowLang);
    this.getSelectData();
    this.regFields = [
      {name:'country',label:this.state.strings.form.country,type:'select'},
      {name:'city',label:this.state.strings.form.city,type:'select'},
      {name:'school',label:this.state.strings.form.org,type:'select'},
      {name:'name_eng',label:this.state.strings.form.name_eng,type:'text'},
      {name:'name_chi',label:this.state.strings.form.name_chi,type:'text',optional:true},     
      {name:'gender',label:this.state.strings.form.gender,type:'radio',data:['M','F']},
      {name:'birthday',label:this.state.strings.form.birthday,type:'date'},
      {name:'age',label:this.state.strings.form.age,type:'number'},
      {name:'email',label:this.state.strings.form.email,type:'email'},
      {name:'mobile',label:this.state.strings.form.mobile,type:'tel'}
    ];
    this.formValidation = this.formValidation.bind(this);
    this.proceedForm = this.proceedForm.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active });  
  }

  
  updateSelectData(key,obj){
    $("#modal-loader").show();
    let newSelectData = Object.assign({}, this.state.selectData);
    newSelectData[key]=obj;
    this.setState({selectData:newSelectData});
    $("#modal-loader").hide();
  }

  getSelectData(){
    if(!this.state.selectData.length){
      var apis=['country','city','school'],_this=this;
      
        for(var i=0;i<apis.length;i++){
          var xhr = new XMLHttpRequest()
          xhr.open('GET',iblConfig.baseUrl+apis[i],true);
          xhr.send();
          xhr.apis = apis;
          var currentKey = apis[i];
          xhr.onload=function(){
            try{
              var key = this.responseURL.split('v1/')[1]
              _this.updateSelectData(key,JSON.parse(this.responseText));
            }catch(e){
              alert(_this.state.strings.general.err_exception+currentKey+'(signup_selection_data) : '+"\n"+e);
              $('#modal-loader').find("p").html(_this.state.strings.general.err_exception);
              $('#modal-loader').find(".spinner").hide();
              $('#modal-loader').show();
            }
          }
        }
       
    }
  }

  proceedForm(){
    var formId=new URL(location.href).searchParams.get("form");
    this.props.callbackForm(formId,this.state.userId);
  }

  formReg(){
    $("#modal-loader").show();
    var xhr = new XMLHttpRequest(), data={}, _this=this;
    xhr.open('POST',iblConfig.baseUrl+'user',true);
    for(var i=0;i<this.regFields.length;i++){
      if(this.regFields[i].type=='select'){
        data[this.regFields[i].name]=parseInt($("select[name='"+this.regFields[i].name+"'] option:selected").val());
      }else if(this.regFields[i].type=='radio'){
        data[this.regFields[i].name]=$("input[name='"+this.regFields[i].name+"']:checked").val();
      }else{
        data[this.regFields[i].name]=$("input[name='"+this.regFields[i].name+"']").val();
      }
    }
    xhr.timeout = 2000
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onload = function(){
      var res = JSON.parse(this.responseText);
      $("#modal-loader").hide();
      if(res.user_id){
        _this.setState({userId:res.user_id,userEmail:$("input[name='email']").val()})
      }else{
        if(res.message)
          alert(res.message)
        else
          alert(_this.state.strings.signup.err_exception);
        console.log(res);
      }
    };
  }

  formValidation(){
    let err=false;
    for(var i=0;i<this.regFields.length;i++){
      var f=this.regFields[i];
      if(f.optional) continue;

      if(f.type=='select' && $("select[name='"+f.name+"'] option:selected").val()==''){
        err = this.state.strings.form.ph_select+' '+f.label;
        break;
      }else if(f.type=='radio' && !$("input[name='"+f.name+"']:checked").val()){
        err = this.state.strings.form.ph_select+' '+f.label;
        break;
      }else if(f.type!='radio' && $("input[name='"+f.name+"']").val()==''){
        err = this.state.strings.form.ph_input+' '+f.label;
        break;
      }
    }
    if(!err)
      this.formReg();
    else
      alert(err);
  }

  render() {
    if(this.state.userId==null){
      var _this = this;
      return (
        <div className="wrapper3 pt-120 pb-60 text-center" style={{display:(this.state.active?'block':'none')}}>
          <p className="text2">{this.state.strings.signup.signupform}</p>
          {
            
            this.regFields.map(function(field,index){
              if(['radio','select'].indexOf(field.type)<0){
                return(
                  <div key={index} className="form-group form-react" >
                    <label htmlFor="age">{field.label}</label>
                    <input name={field.name} type={field.type} id={field.name} className="form-control" />
                  </div>
                )
              }else if(field.type=='select' && _this.state.selectData[field.name]){
                return(
                  <div key={index} className="form-group form-react">
                    <label htmlFor={field.name}>{field.label}</label>
                    <select defaultValue="" className="form-control" name={field.name}>
                      <option value="" disabled>{_this.state.strings.form.ph_select}</option>
                      {
                          _this.state.selectData[field.name].map(function(val,index){
                            return(
                              <option value={val.id}>{val.name}</option>
                            )
                          })
                        
                      }
                    </select>
                  </div>
                )
              }else if(field.type=='radio'){
                return(
                  <div key={index} className="form-group form-react">{field.label}
                    {
                      field.data.map(function(val,index){
                        return (
                          <div key={index}><label><input name={field.name} type="radio" value={val} /> {val}</label></div>
                        )
                      })
                    }
                  </div>
                )
              }else{
                return (<div key={index}>Error while rendering the input for {field.name}</div>)
              }
            })
          }
          
          <div><button className="btn" onClick={this.formValidation}>{this.state.strings.signup.btn_submit}</button></div>
        </div>
      );
    }else{
      return(
        <div className="wrapper3 pt-120 pb-60 text-center" style={{display:(this.state.active?'block':'none')}}>
          <div>
            <h3>{this.state.strings.signup.regsuccess}</h3>
            <p>{this.state.strings.signup.rememberreginfo}:</p>
            {this.state.strings.form.userid}: <strong className="card-text" style={{paddingBottom:0}} >{this.state.userId}</strong><br/>
            {this.state.strings.form.email}: <strong className="card-text" style={{paddingBottom:0}} >{this.state.userEmail}</strong><br/>
          </div>
          <div>
            <button className="btn" onClick={this.proceedForm}>{this.state.strings.general.btn_proceed}</button>
          </div>
        </div>

      );
    }
  }
}

export default Signup;
