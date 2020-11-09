import React from 'react';
import Input from '../components/Input';
import { Formik, Form, Field } from 'formik';
import * as Yup from "yup"
import { submitLogin } from '../redux/actions/auth/loginActions';
import { connect } from 'react-redux';
import logo from '../assets/img/logo.png'
import { request } from '../utils';
import facebook from '../assets/img/pages/login/facebook.svg';
import whatsapp from '../assets/img/pages/login/whatsapp.svg';
import instagram from '../assets/img/pages/login/instagram.svg';
import youtube from '../assets/img/pages/login/youtube.svg';


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
        <h2 className="text-primary">
          <b>Bienvenidx a KIRU</b>
        </h2>
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
        <div className="wrap-social-icons">
          <a className="icon-social" href="" target="_blank">
            <img src={whatsapp} />
          </a>
          <a className="icon-social" href="" target="_blank">
            <img src={facebook} />
          </a>
          <a className="icon-social" href="" target="_blank">
            <img src={instagram} />
          </a>
          <a className="icon-social" href="" target="_blank">
            <img src={youtube} />
          </a>
        </div>
        <div style={{
          marginTop: 10,
          
        }}>
          <p className="text-primary">
            Plataforma de Grupo Proefex - Derechos reservados
          </p>
        </div>
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
