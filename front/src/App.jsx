import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import PostForm from './components/PostForm'
import DetailPost from './components/DetailPost'
function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route exac path='/' element={<Home />} />
          <Route path='/posts/add' element={<PostForm />} />
          <Route path='/posts/:id' element={<DetailPost />} />
          <Route path='/posts/:id/update' element={<PostForm />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
