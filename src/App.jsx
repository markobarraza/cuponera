import { Route, Routes } from 'react-router-dom'
import './App.css'
import Contadores from './components/Contadores'
import Cuponera from './components/Cuponera'
import NavBar from './components/NavBar'

function App() {
  

  return (
    <>
      
        <NavBar/>

        <Routes>
          <Route
            path='/cuponera'
            element= {<Cuponera/>}
          >
          </Route>
          
          <Route
            path='/contadores'
            element= {<Contadores/>}
          >
          </Route>
        </Routes>
      
    </>
  )
}

export default App
