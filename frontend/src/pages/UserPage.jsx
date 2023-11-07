import React from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'

function UserPage() {
  return (
    <>
      <UserHeader />
      <UserPost likes={120} replies={234} postImg="/post1.png" postTitle="lets talk on thread" />
      <UserPost likes={12} replies={34} postImg="/post2.png" postTitle="Kya bolti public" />
      <UserPost likes={244} replies={467} postImg="/post3.png" postTitle="Bhupinder Jogi" />
      <UserPost likes={75} replies={792}  postTitle="i am iron man" />
    </>
  )
}

export default UserPage