import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import { Home, Login, Register, MyVideo } from './pages';
import { Navbar } from './components';

function App() {

  return (
    <div className='w-full'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='myvideo' element={<MyVideo />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
