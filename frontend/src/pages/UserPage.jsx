import React, { useEffect, useState } from 'react'
import UserHeader from '../components/UserHeader'
import UserPost from '../components/UserPost'
import { useParams } from 'react-router-dom'
import useShowToast from '../../hooks/useShowToast'
import { Flex, Spinner } from '@chakra-ui/react'
import Post from "../components/Post"

function UserPage() {
  const [user, setUser] = useState(null)
  const { username } = useParams()
  const [loading,setloading] = useState(true)
  const [fetching,setFetching] = useState(true)
  const [posts,setPosts] = useState([])
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
        setUser(data)
      } catch (error) {
        showToast("Error",error,"error")
        console.log(error);
      } finally{
        setloading(false)
      }
    }

    const getPosts = async()=>{
      setFetching(true)
      try {
        const res = await fetch(`/api/posts/user/${username}`)
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
          return;
        }
        // console.log(data);
        setPosts(data)
        // console.log(posts);
      } catch (error) {
        showToast("Error",error,"error")
        setPosts([])
        console.log(error);
      } finally {
        setFetching(false)
      }
    }

    getUser()
    getPosts()
  }, [username,showToast])
  if(!user && loading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"}/>
      </Flex>
    )
  }
  if(!user && !loading) return <h1>User not found</h1>
  return (
    <>
      <UserHeader user={user}/>
      {!fetching && posts.length===0 && <h1>User has not posted anything.</h1>}
      {fetching && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"}/>
        </Flex>
      )}
      {posts.map((post) => (
        // ... some code
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  )
}

export default UserPage