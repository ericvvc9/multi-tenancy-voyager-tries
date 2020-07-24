import React from 'react';
import { Field } from 'formik';
import user from '../assets/img/user.jpg'
import classnames from 'classnames'

class CheckBox extends React.Component {
  render() {
    return <div className="input-wrapper checkbox-wrap full">
      <div>
        <input 
          {...this.props.field}
          type="checkbox"
          autoComplete="off"
          className={
            classnames({
              checkbox:true,
              "input": true,
              "is-invalid": this.props.field.meta && this.props.field.meta.error
            })
          }
          checked={this.props.field.value}
        />
      </div>
      <div>{this.props.label}</div>
    </div>
  }
}

export default class InputCheckboxFormik extends React.Component {
  render() {
    return <Field
      {...this.props}
      component={CheckBox}
    />
  }
}