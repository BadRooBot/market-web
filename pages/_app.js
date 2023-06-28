import store, { persistor } from '@/app/store'
import AppBar from '@/components/app-bar'
import '@/styles/globals.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'


export default function App({ Component, pageProps }) {
  return (

    <Provider store={store}>
    <AppBar/>
    <PersistGate  loading={null} persistor={persistor}>

    <Component {...pageProps} />
    </PersistGate>
    </Provider>
  )
}
