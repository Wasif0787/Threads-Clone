import { Link } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { Box, Button, Flex, Spinner } from "@chakra-ui/react"
import { useRecoilState, useRecoilValue } from 'recoil'
import useShowToast from "../../hooks/useShowToast"
import userAtom from "../../atoms/userAtom"
import Post from "../components/Post"
import postsAtom from "../../atoms/postsAtom"
import SuggestedUsers from "../components/SuggestedUsers"

function HomePage() {
  const currentUser = useRecoilValue(userAtom)
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(true)
  const showToast = useShowToast()
  useEffect(()=>{
    const getFeedPosts = async()=>{
      setLoading(true)
      setPosts([])
      try {
        const res = await fetch(`/api/posts/feed/${currentUser._id}`)
        const data = await res.json()
        if(data.error){
          showToast("Error",data.error,"error")
        }
        setPosts(data)
      } catch (error) {
        showToast("Error",error.message,"error")
      } finally {
        setLoading(false)
      }
    }
    getFeedPosts()
  },[showToast,setPosts])
  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70} >
      {!loading  && posts.length===0 && <h1>Follow some users to see posts</h1>}
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"}/>
        </Flex>
      )}
      {posts.map((post)=>(
        <Post key={post._id} post={post} postedBy={post.postedBy}/>
      ))}
      </Box>
      <Box flex={30}>
        <SuggestedUsers/>
      </Box>
    </Flex>
  )
}

export default HomePage