
import { Provider, } from 'react-redux'
import './App.css'
import { appStore } from './utils/appStore'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Body from "./components/Body"
import Home from './components/Home'
import PredictorSearchBar from './components/PredictorSearchBar'
import Login from './components/Login'
import Profile from './components/Profile'
import SignUp from './components/SignUp'

function App() {

  return (
    
      <Provider store={appStore}> 

        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home/>}>
               <Route path='/body' element={<Body/>}/>  
               <Route path='/predictor' element={<PredictorSearchBar/>}/>
               <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SignUp/>}/>
               <Route path='/profile' element={<Profile/>}/>

              </Route>

            </Routes>
        </BrowserRouter>

      </Provider>
  
  )
}

export default App
