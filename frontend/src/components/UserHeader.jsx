import { Avatar, Box, Button, Flex, Menu, MenuButton, MenuItem, MenuList, Portal, Text, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'


function UserHeader({ user }) {
    const toast = useToast()
    const currentUser = useRecoilValue(userAtom)
    const [following, setFollowing] = useState(user.followers.includes(currentUser._id))
    const [updating,setUpdating] = useState(false)
    const showToast = useShowToast()
    const handleFollowUnfollow = async () => {
        if(!currentUser){
            showToast("Error","Please login to follow","error")
            return
        }
        if(updating) return
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                console.log(data.error);
                return
            }
            if (following) {
                showToast("Success", `User unfollowed ${user.name}`,"success")
                user.followers.pop()
            } else {
                showToast("Success", `User followed ${user.name}`,"success")
                user.followers.push(currentUser._id)
            }
            setFollowing(!following)
            console.log(data);
        } catch (error) {
            showToast("Error", error, "error")
        } finally{
            setUpdating(false)
        }
    }
    const copyURL = () => {
        const currURl = window.location.href;
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
            <VStack gap={4} alignItems={"start"}>
                <Flex justifyContent={"space-between"} w="full">
                    <Box>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>{user.name}</Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"}>{user.username}</Text>
                            <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads.net</Text>
                        </Flex>
                    </Box>
                    <Box>
                        {user.profilePic && <Avatar
                            name={user.name}
                            src={user.profilePic}
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                        />}
                        {!user.profilePic && <Avatar
                            name="random"
                            src="https://bit.ly/broken-link"
                            size={{
                                base: "md",
                                md: "xl"
                            }}
                        />}
                    </Box>
                </Flex>
                <Text>{user.bio}</Text>
                {currentUser._id === user._id && (
                    <Link to='/update'>
                        <Button size={"sm"}>Update Profile</Button>
                    </Link>
                )}
                {currentUser._id !== user._id && (
                    <Button isLoading={updating} onClick={handleFollowUnfollow} size={"sm"}>{following ? "Unfollow" : "Follow"}</Button>
                )}
                <Flex w={"full"} justifyContent={"space-between"}>
                    <Flex alignItems={"center"} gap={2}>
                        <Text color={"gray.light"}>{user.followers.length} followers</Text>
                        <Box bg={"gray.light"} h={1} w={1} borderRadius={"full"}></Box>
                        <Link style={{ color: "#616161" }}>instagram.com</Link>
                    </Flex>
                    <Flex>
                        <Box className='icon-container'>
                            <BsInstagram size={24} cursor={"pointer"} />
                        </Box>
                        <Box className='icon-container'>
                            <Menu>
                                <MenuButton>
                                    <CgMoreO size={24} cursor={"pointer"} />
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
                <Flex w={"full"}>
                    <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                        <Text fontWeight={"bold"}>Threads</Text>
                    </Flex>
                    <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"#636361"} pb="3" cursor={"pointer"}>
                        <Text fontWeight={"bold"}>Replies</Text>
                    </Flex>
                </Flex>
            </VStack>
        </>
    )
}

export default UserHeader