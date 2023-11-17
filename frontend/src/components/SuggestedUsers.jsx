import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import Suggesteduser from './Suggesteduser'

const SuggestedUsers = () => {
    const [loading, setLoading] = useState(false)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    return (
        <>
            <Text mb={4} fontWeight={"bold"}>Suggested Users</Text>
            <Flex direction={"column"} gap={4}>
                {!loading && [0,1,2,3,4].map((user) => <Suggesteduser key={user._id} user={user} />)}
                {loading && [0, 1, 2, 3, 4].map((_, idx) => (
                    <Flex key={idx} gap={2} alignItems={"center"} p={"1"} borderRadius={"md"}>
                        {/* Avatar */}
                        <Box>
                            <SkeletonCircle size={"10"} />
                        </Box>
                        {/* Username and fullname */}
                        <Flex w={"full"} flexDirection={"column"} gap={2}>
                            <Skeleton h={"8px"} w={"80px"} />
                            <Skeleton h={"8px"} w={"90px"} />
                        </Flex>
                        {/* Follow Button */}
                        <Flex>
                            <Skeleton h={"20px"} w={"60px"} />
                        </Flex>
                    </Flex>
                ))}
            </Flex>
        </>
    )
}

export default SuggestedUsers


    // < Box >
    // <SkeletonCircle size={"10"} />
    //                     </Box >
    // {/* Username and fullname */ }
    // < Flex w = { "full"} flexDirection = { "column"} gap = { 2} >
    //                         <Skeleton h={"8px"} w={"80px"} />
    //                         <Skeleton h={"8px"} w={"90px"} />
    //                     </Flex >
    // {/* Follow Button */ }
    // < Flex >
    // <Skeleton h={"20px"} w={"60px"} />
    //                     </Flex >
    //                 </Flex >