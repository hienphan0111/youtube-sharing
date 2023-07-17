import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Home, Login, Register, MyVideo, PlayerVideo } from './pages';
import { Navbar } from './components';

function App() {

  return (
    <div className='w-full max-w-[1028px] mx-auto my-0 p-[2rem] flex justify-center flex-col items-center'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
          <Route path='myvideo' element={<MyVideo />} />
          <Route path='player/:id' element={<PlayerVideo />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
