import { Avatar, Box, Button, Divider, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../components/Actions'
import Comment from '../components/Comment'

function PostPage() {
  const [liked, setLiked] = useState(false)
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
      <Flex justifyContent={"space-between"}>
        <Flex alignItems={"center"} w={"Full"} gap={3}>
          <Avatar src='/zuck-avatar.png' size={"md"} name='Mark' />
          <Flex alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>markzuckeberg</Text>
            <Image src='/verified.png' h={4} w={4} ml={2} />
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={"center"}>
          <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
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
      <Text my={3}>Lets talk about threads</Text>
      <Box borderRadius={6} overflow={"hidden"} border={"1px solid gray.light"}>
        <Image src="/post1.png" w={"full"} />
      </Box>
      <Flex gap={3} my={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex alignItems={"center"} gap={2}>
        <Text color={"gray.light"} fontSize={"sm"}>646 replies</Text>
        <Box bg={"gray.light"} h={0.5} w={0.5} borderRadius={"full"}></Box>
        <Text color={"gray.light"} fontSize={"sm"}>{200 + (liked ? 1 : 0)} likes</Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={"space-between"}>
        <Flex gap={2} alignItems={"center"}>
          <Text fontSize={"2xl"}>👋</Text>
          <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
        </Flex>
        <Button>GET</Button>
      </Flex>
      <Divider my={4} />
      <Comment likes={100} username="andrewtate" userImg="https://bit.ly/dan-abramov" createdAt="1d" postComment="This looks great" />
      <Comment likes={200} username="wasifhussain" userImg="https://bit.ly/prosper-baba" createdAt="2d" postComment="Amazing brother , keep it up" />
      <Comment likes={300} username="asadali" userImg="https://bit.ly/code-beast" createdAt="5d" postComment="Wonderful, please dm me " />
      <Comment likes={400} username="faiyazullah" userImg="https://bit.ly/dan-abramov" createdAt="10d" postComment="You are killing it" />
    </>
  )
}

export default PostPage