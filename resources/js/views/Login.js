import React from 'react';
import Input from '../components/Input';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup"
import { submitLogin } from '../redux/actions/auth/loginActions';
import { connect } from 'react-redux';
import logo from '../assets/img/logo.png'
import { request } from '../utils';

const formSchema = Yup.object().shape({
  email: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
})

class Login extends React.Component {
  render() {
    return <>
      <div className="container-login">
        <div className="logo">
          <img className="img" src={logo} />
        </div>
        <Formik
          initialValues={{
            email:'',
            password:''
          }}
          validationSchema={formSchema}
          enableReinitialize
          onSubmit={(values, actions) => {
            request
              .post("/api/login", {
                email:values.email,
                password:values.password,
                remember:values.remember,
                device_name:"WEB"
              }, {
                disableExpiredSession:true
              })
              .then(response => {
                Promise.resolve(this.props.submitLogin({
                  access_token: response,
                  remember:false
                })).then(() => {
                  this.props.history.push('/')
                })
              }).catch((er) => {
                actions.setErrors(er.response.data.errors)
              })
          }}
        >
          {({ errors, touched, values }) => (
            <Form action="">
              <div className="login-wrapper">
                <Field
                  name="email"
                  id="email"
                  component={Input}
                  tabIndex={1}
                  placeholder="Username"
                />
                <Field
                  name="password"
                  id="password"
                  type="password"
                  tabIndex={2}
                  component={Input}
                  placeholder="Password"
                />
                
                <div className="link">
                  RESETEAR CONTRASEÑA
                </div>
                <button className="button" type="submit">INGRESAR</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

    </>

  }
}


const mapStateToProps = state => {
  return {
    //values: state.auth.login
  }
}


export default connect(mapStateToProps, { submitLogin })(Login)
