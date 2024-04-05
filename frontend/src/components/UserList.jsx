import { Avatar, Box, Button, Divider, Flex, Text } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import useHandleFollowAndUnfollow from '../../hooks/useHandleFollowAndUnfollow'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'

const UserList = ({ user }) => {
    const currentUser = useRecoilValue(userAtom)
    const baseURL = window.location.origin;
    const navigateLink = `${baseURL}/${user.username}`;
    const { handleFollowUnfollow, updating, following } = useHandleFollowAndUnfollow({ user })
    return (
        <>
            <Flex gap={2} justifyContent={"space-between"} alignItems={"center"} p={{ base: "3", md: "0" }} mb={{ base: "3", md: "6" }}>
                <Flex gap={2} >
                    <Avatar src={user.profilePic} as={Link} to={navigateLink} />
                    <Box>
                        <Text fontSize={"sm"} fontWeight={"bold"} >
                            {user.username}
                        </Text>
                        <Text color={"gray.light"} fontSize={"xs"} fontWeight={"bold"} >
                            {user.name}
                        </Text>

                    </Box>
                </Flex>
                {currentUser._id !== user._id && (
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
                )}
            </Flex>
            <Divider border={"5px"} />
        </>
    )
}

export default UserList