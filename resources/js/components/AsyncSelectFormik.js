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
  render() {
    return (
      <AsyncSelect 
        cacheOptions 
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
        {...this.props}
        value={this.state.options.filter(option => {
          return option.id === this.props.value
        })}
        //value={{id: this.props.value}}
      />
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
                  