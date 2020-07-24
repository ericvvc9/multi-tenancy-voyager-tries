import React from "react"
import {
  Label,
  FormGroup,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import Select from "react-select";

class WrapSelect extends React.Component {
  handleChange = (e) => {
    this.props.form.setFieldValue(this.props.field.name, e.value)
    //field.onChange(e);
    //console.log(this)
    /* <div>
        <label htmlFor={fieldName} className={"label-color"}>
          {fieldName}
        </label>
        <div>
          <Stars
            count={value}
            handleClick={number => setFieldValue(fieldName, number)}
          />
        </div>
      </div> */
  }
  getValue = (opts, val) => {
    return opts.find(o => {
      if(o && o.value)
        return o.value === val
      return o === val
    })
  }

  render() {
    return <FormGroup>
      <Label for={this.props.name}>{this.props.label ||  this.props.placeholder}</Label>
      <Select
        className="React"
        classNamePrefix="select"
        {...this.props.field}
        {...this.props}
        //value={this.props.field.value}
        value={this.getValue(this.props.options, this.props.field.value)}
        //getOptionLabel={option => option.value}
        //getOptionValue={option => option.value}
        onChange={this.handleChange}
      />
    </FormGroup>
  }
}

export default class SelectFormik extends React.Component {
  render() {
    return <Field
      component={WrapSelect}
      {...this.props}
    />

  }
}
                  