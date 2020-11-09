import React, { Suspense, lazy } from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { IntlProviderWrapper } from "./utility/context/Internationalization"
import { Layout } from "./utility/context/Layout"
import * as serviceWorker from "./serviceWorker"
import { store, persistor } from "./redux/storeConfig/store"
import "./index.scss"
import { PersistGate } from 'redux-persist/integration/react'
import 'animate.css';

const LazyApp = lazy(() => import("./App"))

// configureDatabase()

ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<div>Cargando...</div>} persistor={persistor}>
        <Suspense fallback={<div>Cargando...</div>}>
          <Layout>
            <IntlProviderWrapper>
              <LazyApp />
            </IntlProviderWrapper>
          </Layout>
        </Suspense>
      </PersistGate>
    </Provider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
