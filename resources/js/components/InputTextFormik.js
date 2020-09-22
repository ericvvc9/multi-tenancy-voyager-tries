import React from 'react';
import { Field } from 'formik';
import classnames from 'classnames'


class TextInput extends React.Component {
  render() {
    return <div className="input-wrapper full">
      <div>{this.props.placeholder}</div>
      {
        !this.props.valueChange ?
        <input 
          {...this.props.field}
          autoComplete="off"
          className={
            classnames({
              "input": true,
              "is-invalid": this.props.field.meta && this.props.field.meta.error
            })
          }
          disabled={this.props.disabled}
          placeholder={this.props.placeholder}
        />
        :
        <input 
          value={this.props.value}
          disabled={this.props.disabled}
          autoComplete="off"
          className={
            classnames({
              "input": true,
              "is-invalid": this.props.field.meta && this.props.field.meta.error
            })
          }
          placeholder={this.props.placeholder}
        />


      }
    </div>
  }
}

export default class InputTextFormik extends React.Component {
  render() {
    return <Field
      {...this.props}
      component={TextInput}
    />
  }
}