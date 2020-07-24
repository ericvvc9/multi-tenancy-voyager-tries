import axios from 'axios';
import { toast } from "react-toastify"
import { store } from './redux/storeConfig/store';
import React from 'react'
import Select from "react-select"
import swal from 'bootstrap-sweetalert'
import 'bootstrap-sweetalert/dist/sweetalert.css';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import "./assets/scss/plugins/forms/flatpickr/flatpickr.scss"
import moment from 'moment';
import { CustomInput } from 'reactstrap';
const request = axios.create();
request.interceptors.response.use((response) => {
  //toast.error("This is error toast!")
  store.dispatch({type:"DECREMENT_FETCHING"})
  console.log(`response ${response}`);
  return response.data;
}, (error) => {
  store.dispatch({type:"DECREMENT_FETCHING"})
  
  if(error && error.response && error.response.data && error.response.data.message) {
    toast.error(error.response.data.message)
    //console.log(`error ${error}`);
  }
  if (401 === error.response.status && !error.config.disableExpiredSession) {
      swal({
          title: "Sesion Expirada",
          text: "Su sesión ha expirado",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          closeOnConfirm: true
      }, function(){
          store.dispatch({ type: "LOGOUT", payload: {} })
          window.location.reload()
      });
  } else {
      return Promise.reject(error);
  }
  return Promise.reject(error);
});
request.interceptors.request.use((config) => {
  if( store.getState().auth.login && store.getState().auth.login.user &&  store.getState().auth.login.user.token) {
    config.headers.Authorization = `Bearer ${store.getState().auth.login.user.token}`;
  } 
  //config.withCredentials= true;
  store.dispatch({type:"INCREMENT_FETCHING"})
  return config;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
})

export const SelectField = ({
  options,
  field,
  form,
  className
}) => (
  <Select
    options={options}
    name={field.name}
    value={options ? options.find(option => option.value === field.value) : ''}
    onChange={(option) => form.setFieldValue(field.name, option.value)}
    onFocus={() => { 
      //form.setErrors({ [field.name] :false}) 
      //form.setFieldTouched(field.name, true, true)
    }}
    onBlur={field.onBlur}
    className={className}
  />
)

export const DateField = ({
  value,
  field,
  form,
  dateFormat = "Y-m-d",
  className
}) => (
  <Flatpickr
    //id="dob"
    className={`form-control ${className}` }
    options={{ dateFormat: dateFormat }}
    value={field.value}
    onChange={date => form.setFieldValue(field.name,date)}
  />
)

export const RadioField = ({
  value,
  field,
  form,
  dateFormat = "Y-m-d",
  className,
  label
}) => (
  <div className={`d-inline-block mr-1 ${className}`}>

</div>
)

export const SwitchField = ({
  value,
  field,
  label,
  form,
  className,
}) => (
  <CustomInput
    type="switch"
    id="status"
    name="status"
    checked={field.value}
    onChange={(e) => {form.setFieldValue(field.name,e.target.checked)}}
    inline
  >
    <span className="switch-label">{label}</span>
  </CustomInput>
)

/* <Select
  options={options}
  name={field.name}
  value={options ? options.find(option => option.value === field.value) : ''}
  onChange={(option) => form.setFieldValue(field.name, option.value)}
  onBlur={field.onBlur}
  className={className}
/> */

const reasons = [{
  value:"Consulta",
  label:"Consulta"
},{
  value:"Curación",
  label:"Curación"
},{
  value:"Tratamiento",
  label:"Tratamiento"
},{
  value:"Cirujia",
  label:"Cirujia"
}]
const specialities = [{
  value:"Consulta",
  label:"Consulta"
},{
  value:"Curación",
  label:"Curación"
},{
  value:"Tratamiento",
  label:"Tratamiento"
},{
  value:"Cirujia",
  label:"Cirujia"
}]
const paymentForms = [{
  value:"Consulta",
  label:"Consulta"
},{
  value:"Curación",
  label:"Curación"
},{
  value:"Tratamiento",
  label:"Tratamiento"
},{
  value:"Cirujia",
  label:"Cirujia"
}]
export {request,reasons,  specialities, paymentForms}