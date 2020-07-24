import React from "react"
import Router from "./Router"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "react-perfect-scrollbar/dist/css/styles.css"
import "prismjs/themes/prism-tomorrow.css"

import { connect } from "react-redux"
import Loading from "./components/Loading"

const App = props => {
  return <> 
    <Router />
    <ToastContainer/>
    {
      props.loading > 0 ? <Loading/>: null
    }
  </>
}


const mapStateToProps = (state) => {
  return {
    loading :state.saveReducer.loading
  }
}
export default connect(mapStateToProps)(App)
