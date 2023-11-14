import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../../hooks/useShowToast'

function UserPage() {
  const [user, setUser] = useState(null)
  const { username } = useParams()
  const showToast = useShowToast()
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`)
        const data =await  res.json() 
        if(data.error){
          showToast("Error",data.error,"error")
          return;
        }
        console.log(data);
        setUser(data)
      } catch (error) {
        showToast("Error",error,"error")
      }
    }
    getUser()
  }, [username,showToast])
  if(!user) return null
  return (
    <>
      <UserHeader user={user}/>
      <UserPost likes={120} replies={234} postImg="/post1.png" postTitle="lets talk on thread" />
      <UserPost likes={12} replies={34} postImg="/post2.png" postTitle="Kya bolti public" />
      <UserPost likes={244} replies={467} postImg="/post3.png" postTitle="Bhupinder Jogi" />
      <UserPost likes={75} replies={792} postTitle="i am iron man" />
    </>
  )
}

export default UserPage