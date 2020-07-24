import React from 'react';
import AsyncSelect from 'react-select/async'
import classnames from 'classnames'
import { request } from '../utils';


export class SelectAjax extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      options:[]
    }
  }
  
  promiseOptions = (slug,relation) => (inputValue) => {
    return new Promise(resolve => {
      request.get(`/api/${slug}/relation?type=${relation}&page=1&search=${inputValue}`).then((data) => {
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
        /* style={{
          option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'blue',
            padding: 20,
          }),
          control: () => ({
            // none of react-select's styles are passed to <Control />
            width: 200,
          }),
          singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
        
            return { ...provided, opacity, transition };
          }
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
          ...theme.colors,
            text: 'orangered',
            primary25: 'hotpink',
            primary: 'black',
          },
        })} */
        cacheOptions 
        defaultOptions 
        loadOptions={this.promiseOptions(this.props.slug,this.props.relation)} 
        //getOptionValue={(option)=>option.id}
        //getOptionLabel={(option)=>option.text}
        {...this.props}
        value={this.state.options.filter(option => {
          return option.id === this.props.value
        })}
        //value={{id: this.props.value}}
      />
    );
  }
}

export default class Input extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageSelected:false,
      image:''
    }
  }
  render() {
    const { field = { name: '' }, type = "text" } = this.props;
    let meta;
    if (this.props.form) {
      meta = this.props.form.getFieldMeta(field.name); // <-- the workaround.
    }
    return <>
      {
        type === 'text' || type === 'password' ?
          <div className="input-wrapper">
            <div>{this.props.placeholder}</div>
            <input
              autoComplete="off"
              className={
                classnames({
                  "input": true,
                  "is-invalid": meta && meta.error
                })
              }
              name={this.props.name}
              tabIndex={this.props.tabIndex}
              type={type}
              onKeyDown={(ele) => {
                  if(ele.key === 'Enter' && this.props.onEnter) {
                    this.props.onEnter(ele)
                    //alert(ele.value);
                  }
                }
              }
              {...field}
              onChange={(e) => {
                this.props.form.setFieldValue(field.name, e.target.value)
              }}
              onBlur={(e) => {
                this.props.form.setFieldTouched(field.name, true)
              }}
              onFocus={() => {
                this.props.form.setFieldTouched(field.name, false)
              }}
              value={field.value}
              placeholder={this.props.placeholder} />
            {meta && meta.error && meta.touched ? (
              <div className="invalid-tooltip mt-25">{meta.error}</div>
            ) : null}
          </div>
          :
          type === 'image' ?
            <div className="input-wrapper">
              <div>{this.props.placeholder}</div>
              {
                this.state.image  ? 
                <img 
                  src={this.state.image}
                />  
                :
                <img 
                  src={`/storage/${field.value}`}
                />
              }
              <input
                autoComplete="off"
                className={
                  classnames({
                    "input": true,
                    "is-invalid": meta && meta.error
                  })
                }
                name={this.props.name}
                type="file"
                onChange={(e) => {
                  
                  var reader = new FileReader();
      
                  reader.onload =  (e2) => {
                    this.setState({
                      image:e2.target.result
                    })
                    
                  }
                  reader.readAsDataURL(e.target.files[0]);
                  
                  this.props.form.setFieldValue(
                    field.name,
                    //e.target.files[0]
                    e.target.files[0]
                  )
                  //debugger
                  //this.setState({imageSelected:true})
                }}
                placeholder={this.props.placeholder} />
              {meta && meta.error && meta.touched ? (
                <div className="invalid-tooltip mt-25">{meta.error}</div>
              ) : null}
            </div>
          : 
          type === 'relationship' ? <div className="input-wrapper" >
            <div>{this.props.placeholder}</div>
            <div style={{
              color:'black'
            }}>
              <SelectAjax 
                onChange={option => {
                  this.props.form.setFieldValue(field.name, option.value)
                  //console.log(field)
                  //debugger
                }}
                value={field.value}
                relation={this.props.fieldDescription.field}
                slug={this.props.slug}
                fieldDescription={this.props.fieldDescription}
              />
            </div>
          </div>
          :null
      }
    </>
  }
}