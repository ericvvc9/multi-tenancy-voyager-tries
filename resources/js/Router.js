import React, { Suspense, lazy } from "react"
import { Router, Switch, Route } from "react-router-dom"
import { history } from "./history"
import { connect } from "react-redux"
import { Redirect } from "react-router-dom"
import { ContextLayout } from "./utility/context/Layout"
import { request } from "./utils"


// Route-based code splitting
const analyticsDashboard = lazy(() =>
import("./views/dashboard/analytics/AnalyticsDashboard")
)
const Login = lazy(() =>
  import("./views/Login")
)
const Administration = lazy(() =>
  import("./views/Administration")
) 
const Patients = lazy(() =>
  import("./views/Patients")
) 
const CRM = lazy(() =>
  import("./views/CRM")
) 
const Cash = lazy(() =>
  import("./views/Cash")
) 
const Reports = lazy(() =>
  import("./views/Reports")
) 
const Calendar = lazy(() => {
  return import("./views/Calendar")
})
const error404 = lazy(() => import("./views/404"))
/*

const error500 = lazy(() => import("./views/pages/misc/error/500"))
const authorized = lazy(() => import("./views/pages/misc/NotAuthorized"))
const maintenance = lazy(() => import("./views/pages/misc/Maintenance"))
const Login = lazy(() => import("./views/pages/authentication/login/Login"))
const forgotPassword = lazy(() =>
  import("./views/pages/authentication/ForgotPassword")
)
const lockScreen = lazy(() => import("./views/pages/authentication/LockScreen"))
const resetPassword = lazy(() =>
  import("./views/pages/authentication/ResetPassword")
)
const register = lazy(() =>
  import("./views/pages/authentication/register/Register")
) */

// Set Layout and Component Using App Route
const RouteConfig = ({ component: Component, fullLayout, publicR, onlyPublic, user,role, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <ContextLayout.Consumer>
          {context => {
            let LayoutTag =
              fullLayout === true
                ? context.fullLayout
                : context.state.activeLayout === "horizontal"
                  ? context.horizontalLayout
                  : context.VerticalLayout
            return (
              <div>
                {publicR ?
                  <LayoutTag {...props} permission={props.user}>
                    <Suspense fallback={<div />}>
                      <Component {...props}  role={role}/>
                    </Suspense>
                  </LayoutTag>
                  :
                  onlyPublic && !user ?
                    <LayoutTag {...props} permission={props.user}>
                      <Suspense fallback={<div />}>
                        <Component {...props} role={role} />
                      </Suspense>
                    </LayoutTag>
                    :
                    onlyPublic && user ?
                      <Redirect to='/home' />
                      :
                      !user ?
                        <Redirect to='/login' />
                        : (
                          <LayoutTag {...props} permission={user}>
                            <Suspense fallback={<div />}>
                              <Component {...props}  role={role}/>
                            </Suspense>
                          </LayoutTag>
                        )
                }
              </div>
            )
          }}
        </ContextLayout.Consumer>
      )
    }}
  />
)
const mapStateToProps = state => {
  return {
    user: state.auth.login.user
  }
}

const AppRoute = connect(mapStateToProps)(RouteConfig)

class AppRouter extends React.Component {
  constructor() {
    super();
    
  }
  render() {
    return (
      // Set the directory path if you are deploying in sub-folder
      <Router history={history}>
        <Switch>
          <AppRoute path="/" exact component={Calendar} />
          <AppRoute key="home" path="/home" component={Calendar} />
          <AppRoute key="administration" path="/administration" component={Administration} />
          <AppRoute key="patients" path="/patients" component={Patients} />
          <AppRoute key="crm" path="/crm" component={CRM} />
          <AppRoute key="cash" path="/cash" component={Cash} />
          <AppRoute key="reports" path="/reports" component={Reports} />
          <AppRoute key="login" path="/login" component={Login} fullLayout onlyPublic />
          <AppRoute component={error404} fullLayout /> 
          {/* <AppRoute path="/misc/error/404" component={error404} fullLayout publicR />
          <AppRoute path="/register" component={register} onlyPublic fullLayout />
          <AppRoute path="/" exact component={analyticsDashboard} />
          */}
        </Switch>
      </Router>
    )
  }
}

export default AppRouter
