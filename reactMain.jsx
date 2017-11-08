import React from 'react';
import {render} from 'react-dom';
import Signin from './react/SigninComponent.jsx';
import Typeform from './react/TypeformComponent.jsx';
import Signup from './react/SignupComponent.jsx';

class ProfileGateway extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	signinActive:true,
      signupActive:false,
      typeformActive:false
    };
    
    this.proceedTypeForm = this.proceedTypeForm.bind(this);
    this.proceedSignup = this.proceedSignup.bind(this);
  }

  proceedSignup(){
  	this.setState({
  		signinActive:false,
  		signupActive:true,
  		typeformActive:false
  	});
  }

  proceedTypeForm(formId,userId){
    this.setState({
    	formId:formId,
    	userId:userId,
    	signinActive:false,
    	signupActive:false,
    	typeformActive:true
    });
  }


  render () {
    return (
      <div>
        <Signin active={this.state.signinActive} callbackSignup={this.proceedSignup} callbackForm={this.proceedTypeForm} />
        <Signup active={this.state.signupActive} callbackForm={this.proceedTypeForm} />
        <Typeform active={this.state.typeformActive} formId={this.state.formId} userId={this.state.userId} />
      </div>
    );
  }
}


if(document.getElementById('reactApps'))
	render(<ProfileGateway/>, document.getElementById('reactApps'));