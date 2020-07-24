import React from 'react';
import { Field } from 'formik';
import user from '../assets/img/user.png'

class Image extends React.Component {
  constructor(props){
    super(props);
    this.state={
      hasImageChanged: false,
      image: undefined
    }
  }
  handleChange = (e) => {
    if(e.target.files && e.target.files[0]) {
      this.props.form.setFieldValue(this.props.field.name, e.target.files[0])
      let fr = new FileReader();
      fr.onload = (frR) => {
        /* this.setState({
          changeImage:frR.target.result
        }) */
        this.setState({
          image: frR.target.result
        })
      };  
      fr.readAsDataURL(e.target.files[0]); 
    }
  }
  render() {
    return <div className="wrapImage">
      <input 
        className="input-file"
        onChange={this.handleChange}
        type="file" 
        accept={this.props.accept}
      />
      <img 
        className="img"
        src={
          typeof this.props.field.value === 'string' ?
          "/storage/" +this.props.field.value:(this.state.image || user)
        }
      />
      
    </div>
  }
}

export default class InputEasyImageFormik extends React.Component {
  render() {
    return <Field
      {...this.props}
      component={Image}
    />
  }
}