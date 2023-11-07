import { Avatar, Box, Divider, Flex, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from './Actions'

function Comment({likes,username,userImg,postComment,createdAt}) {
    const [liked, setLiked] = useState(false)
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={userImg} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text>{postComment}</Text>
                    <Actions liked={liked} setLiked={setLiked} />
                    <Text fontSize={"sm"} color={"gray.light"}>{likes +(liked?1:0)} likes</Text>
                </Flex>
            </Flex>
            <Divider/>
        </>
    )
}

export default Comment