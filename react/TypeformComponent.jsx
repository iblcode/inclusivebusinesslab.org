import React from 'react';


class Typeform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {active:props.active};
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({ active: nextProps.active,url:"https://iblfeedback.typeform.com/to/"+nextProps.formId+"?user_id="+nextProps.userId });  
  }

  render() {
    if(this.state.active){
      $(".wrapper3").remove();
      $("nav").remove();
      $("#hero").remove();

      return (
        <div style={{display:(this.state.active?'block':'none')}}>
          <iframe style={{border:'none',zIndex:9999,height:'100%',width:'100vw',top:0,position:'absolute'}} src={this.state.url} />
        </div>
      );
    }else{
      return(
      <div></div>
      );
    }

  }

}

export default Typeform;
