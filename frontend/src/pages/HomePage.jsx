import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { Button, Flex, Spinner } from "@chakra-ui/react"
import { useRecoilValue } from 'recoil'
import useShowToast from "../../hooks/useShowToast"
import userAtom from "../../atoms/userAtom"
import Post from "../components/Post"

function HomePage() {
  const currentUser = useRecoilValue(userAtom)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const showToast = useShowToast()
  useEffect(()=>{
    const getFeedPosts = async()=>{
      setLoading(true)
      try {
        const res = await fetch(`/api/posts/feed/${currentUser._id}`)
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
        }
        console.log(data);
        setPosts(data)
      } catch (error) {
        showToast("Error",error.message,"error")
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  },[showToast])
  return (
    <>
      {!loading  && posts.length===0 && <h1>Follow some users to see posts</h1>}
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"}/>
        </Flex>
      )}
      {posts.map((post)=>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
    </>
  )
}

export default HomePage