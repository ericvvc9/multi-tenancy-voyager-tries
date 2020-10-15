import React from "react"
import {
  Card,
  CardBody,
  Media,
  Row,
  Col,
  Button,
  Input,
  Label,
  FormGroup,
  CustomInput,
  Table
} from "reactstrap"
import { Check, Lock, User, MapPin } from "react-feather"
import { Formik, Form, Field } from "formik"
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import Toggle from "react-toggle";
import Odontrogram from "./Odontogram";



class WrapOdontrogram extends React.Component {

  render() {
    return <Odontrogram 
      value={this.props.field.value}
      onChange={(value) => {
        this.props.form.setFieldValue(this.props.field.name, value)
      }}
    />
  }
}

export default class FormikOdontrogram extends React.Component {
  render() {
    return <Field
      component={WrapOdontrogram}
      {...this.props}
    />

  }
}
                  