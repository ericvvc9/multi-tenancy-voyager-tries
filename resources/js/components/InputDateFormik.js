import React from 'react';
import { Field } from 'formik';
import classnames from 'classnames'
import "flatpickr/dist/themes/material_green.css";
import Flatpickr from "react-flatpickr";
import * as moment from 'moment';

class DateInput extends React.Component {
  render() {
    return <div className="input-wrapper full">
      <div>{this.props.placeholder}</div>
      {/* <input 
        {...this.props.field}
        autoComplete="off"
        className={
          classnames({
            "input": true,
            "is-invalid": this.props.field.meta && this.props.field.meta.error
          })
        }
        placeholder={this.props.placeholder}
      /> */}
      <Flatpickr
        className={
          classnames({
            "input": true,
            "is-invalid": this.props.field.meta && this.props.field.meta.error
          })
        }
        //data-enable-time
        value={this.props.field.value}
        options={{
          defaultDate: moment().subtract(18,'year').toDate()
        }}
        onChange={date => {
          this.props.form.setFieldValue(this.props.field.name, date)
          //this.setState({ date });
        }}
      />
    </div>
  }
}

export default class InputDateFormik extends React.Component {
  render() {
    return <Field
      {...this.props}
      component={DateInput}
    />
  }
}