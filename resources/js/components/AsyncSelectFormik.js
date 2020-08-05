import React from "react"
import {
  Label,
  FormGroup,
} from "reactstrap"
import { Formik, Form, Field } from "formik"
import Select from "react-select";
import { request } from "../utils";
import AsyncSelect from 'react-select/async'
import q from 'query-string'

class WrapSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      options:[]
    }
  }
  
  promiseOptions = (slug,relation) => (inputValue) => {
    return new Promise(resolve => {
      let params;
      if(inputValue) {
        params = q.stringify({
          type:relation,
          page: 1,
          search: inputValue
        })
      } else {
        params = q.stringify({
          type:relation,
          page: 1
        })
      }
      request.get(`/api/${slug}/relation?${params}`).then((data) => {
        let dataresolved = data.results.map((r) => {
          return {...r,
            value: r.id,
            label: r.text,
          }
        })
        this.setState({options:dataresolved})
        resolve(dataresolved)
      })
    });
  }

  handleChange = (event) => {
    this.props.form.setFieldValue(this.props.field.name, event)
  }

  getFilter = () => {
    if(typeof(this.props.field.value) === 'object') {
      return this.props.field.value
    } else {
      return this.state.options.filter((option) => {
        return this.props.field.value === option.value
      })
    }
    
  }

  render() {
    return (
      <FormGroup className="input-wrapper full">
        <Label className="label-placeholder" for={this.props.name}>{this.props.label ||  this.props.placeholder}</Label>
        <AsyncSelect 
          cacheOptions 
          isDisabled={this.props.disabled}
          defaultOptions 
          loadOptions={this.promiseOptions(this.props.slug,this.props.relation)} 
          //getOptionValue={(option)=>option.id}
          //getOptionLabel={(option)=>option.text}
          styles={
            {
              option: (provided, state) => ({
                ...provided,
                //borderBottom: '1px dotted pink',
                color: state.isSelected ? 'black' : 'black',
                //padding: 20,
              })
            }
          }
          onChange={this.handleChange}
          value={this.getFilter()}
          {...this.props}
        />
      </FormGroup>
    );
  }
}

export default class AsyncSelectFormik extends React.Component {
  render() {
    return <Field
      component={WrapSelect}
      {...this.props}
    />

  }
}
                  