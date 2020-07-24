import React from 'react';
import { Field } from 'formik';
import classnames from 'classnames'


class TextArea extends React.Component {
  render() {
    return <div className="input-wrapper full">
      <div>{this.props.placeholder}</div>
      {
        !this.props.valueChange ?
        <textarea 
          {...this.props.field}
          autoComplete="off"
          className={
            classnames({
              "input": true,
              "is-invalid": this.props.field.meta && this.props.field.meta.error
            })
          }
          placeholder={this.props.placeholder}
        />
        :
        <textarea 
          value={this.props.value}
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

export default class InputTextAreaFormik extends React.Component {
  render() {
    return <Field
      {...this.props}
      component={TextArea}
    />
  }
}