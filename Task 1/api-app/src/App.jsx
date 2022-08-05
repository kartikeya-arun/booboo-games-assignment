import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import Axios from 'axios'
import './App.css'

function App() {
  const [username, setUsername] = useState('')
  const [email,setEmail]=useState('')
  const [post,setPost]=useState('')
  const [posts,setPosts]=useState([])
  const [likes,setLikes]=useState(0)

  useEffect(()=>{
    const fetch=async ()=>{
      const user=await Axios.get('http://www.notinstagram.com/:id/user')
      const uEmail=await Axios.get('http://www.notinstagram.com/:id/email')
      const uPosts=await Axios.get('http://www.notinstagram.com/:id/posts')
      const uLikes=await Axios.get('http://www.notinstagram.com/:id/posts/:id/likes')
      setUsername(user)
      setEmail(uEmail)
      setPosts(uPosts)
      setLikes(uLikes)
    }
    fetch()

    const send=async()=>{
      await Axios.post('http://www.notinstagram.com/user',username)
      await Axios.post('http://www.notinstagram.com/:id/email',email)
      await Axios.post('http://www.notinstagram.com/:id/posts',[...uPosts,post])
      await Axios.post('http://www.notinstagram.com/:id/posts/:id/likes',uLikes++)
    }
    send()

    const upd=async()=>{
      await Axios.put('http://www.notinstagram.com/:id/email',email)
      await Axios.put('http://www.notinstagram.com/:id/posts',[...uPosts,post])
    }
  },[])

  return (
    
  )
}

export default App
