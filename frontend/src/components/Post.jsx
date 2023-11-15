import { Avatar, Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link, useNavigate } from 'react-router-dom'
import Actions from './Actions'
import useShowToast from '../../hooks/useShowToast'
import {formatDistanceToNow} from "date-fns"

function Post({ post,postedBy }) {
    const [liked, setLiked] = useState(false)
    const [user,setuser] = useState(null)
    const naviagte = useNavigate()
    const showToast = useShowToast()
    const toast = useToast()

    useEffect(()=>{
        const getUser = async()=>{
            try {
                const res = await fetch(`/api/users/profile/${postedBy}`)
                const data = await res.json()
                if(data.error){
                    showToast("Error",data.error,"error")
                }
                setuser(data)
            } catch (error) {
                showToast("Error",error.message,"error")
                setuser(null)
            }
        }
        getUser()
    },[postedBy,showToast])
    if(!user) return null
    const copyURL = () => {
        const currURl = window.location.href+`/${user.username}/post/${post._id}`;
        navigator.clipboard.writeText(currURl).then(() => {
            toast({
                title: 'Copied URL',
                description: "URL has been copied to clipboard",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        })
    }
    return (
        <>
            <Link to={`/${user.username}/post/${post._id}`}>
                <Flex gap={3} mb={4} py={5}>
                    <Flex flexDirection={"column"} alignItems={"center"}>
                        <Avatar
                            size="md"
                            name={user.name}
                            src={user?.profilePic}
                            onClick={(e)=>{
                                e.preventDefault()
                                naviagte(`/${user.username}`)
                            }}
                        />
                        <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
                        <Box position={"relative"} w={"full"}>
                            {post.replies.length===0 && <Text textAlign={"center"}>🥱</Text>}
                            {post.replies[0] && (
                                <Avatar
                                size="xs"
                                name='John Doe'
                                src={post.replies[0].userProfilePic}
                                position={'absolute'}
                                top={"0px"}
                                left={"15px"}
                                padding={"2px"}
                            />
                            )}
                            {post.replies[1] && (
                                <Avatar
                                size="xs"
                                name='John Doe'
                                src={post.replies[1].userProfilePic}
                                position={'absolute'}
                                bottom={"0px"}
                                right={"-5px"}
                                padding={"2px"}
                            />
                            )}
                            {post.replies[2] && (
                                <Avatar
                                size="xs"
                                name='John Doe'
                                src={post.replies[2].userProfilePic}
                                position={'absolute'}
                                bottom={"0px"}
                                left={"4px"}
                                padding={"2px"}
                            />
                            )}
                            
                        </Box>
                    </Flex>
                    <Flex flex={1} flexDirection={"column"} gap={2}>
                        <Flex justifyContent={"space-between"} w={"full"}>
                            <Flex w={"full"} alignItems={"center"}>
                                <Text fontSize={"sm"} fontWeight={"bold"} onClick={(e)=>{
                                e.preventDefault()
                                naviagte(`/${user.username}`)
                            }}>{user?.username}</Text>
                                <Image src='/verified.png' w={4} h={4} ml={1} />
                            </Flex>
                            <Flex gap={4} alignItems={"center"}>
                                <Text fontSize={"xs"} textAlign={"right"} color={"gray.light"}>
                                    {formatDistanceToNow(new Date(post.createdAt))} ago
                                </Text>
                                <Box className='icon-container' onClick={(e) => e.preventDefault()}>
                                    <Menu>
                                        <MenuButton>
                                            <BsThreeDots />
                                        </MenuButton>
                                        <Portal>
                                            <MenuList>
                                                <MenuItem onClick={copyURL}>Copy Link</MenuItem>
                                            </MenuList>
                                        </Portal>
                                    </Menu>
                                </Box>

                            </Flex>
                        </Flex>
                        <Text fontSize={"sm"}>{post.text}</Text>
                        {post.img && <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
                            <Image src={post.img} w={"full"} />
                        </Box>}
                        <Flex gap={3} my={1}>
                            <Actions liked={liked} setLiked={setLiked} />
                        </Flex>
                        <Flex alignItems={"center"} gap={2}>
                            <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
                            <Box bg={"gray.light"} h={0.5} w={0.5} borderRadius={"full"}></Box>
                            <Text color={"gray.light"} fontSize={"sm"}>{post.likes.length} likes</Text>
                        </Flex>
                    </Flex>
                </Flex>
            </Link>
        </>
    )
}

export default Post