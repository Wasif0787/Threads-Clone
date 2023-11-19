import { Avatar, Box, Button, Divider, Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import useHandleFollowAndUnfollow from '../../hooks/useHandleFollowAndUnfollow'

const SearchedUser = ({ user }) => {
    const { handleFollowUnfollow, updating, following } = useHandleFollowAndUnfollow({ user })
    return (
        <>
            <Flex gap={2} justifyContent={"space-between"} alignItems={"center"} p={{ base: "3", md: "0" }} mb={10}>
               
                    <Flex gap={2} as={Link} to={`${user.username}`}>
                        <Avatar src={user.profilePic} />
                        <Box>
                            <Text fontSize={"sm"} fontWeight={"bold"} >
                                {user.username}
                            </Text>
                            <Text color={"gray.light"} fontSize={"xs"} fontWeight={"bold"} >
                                {user.name}
                            </Text>

                        </Box>
                    </Flex>
                    <Button
                        marginLeft={{ base: 'auto' }}
                        size={"sm"}
                        color={following ? "black" : "white"}
                        bg={following ? "white" : "blue.400"}
                        onClick={handleFollowUnfollow}
                        isLoading={updating}
                        _hover={{
                            color: following ? "black" : "white",
                            opacity: ".8",
                        }}
                    >
                        {following ? "Unfollow" : "Follow"}
                    </Button>
                </Flex>
            <Divider border={"5px"} />
        </>
    )
}

export default SearchedUser