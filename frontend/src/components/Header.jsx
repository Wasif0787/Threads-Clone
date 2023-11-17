import { Button, Flex, Image, Text, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {AiFillHome} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"
import React from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import userAtom from '../../atoms/userAtom'
import { FiLogOut } from 'react-icons/fi'
import useLogout from '../../hooks/useLogout'
import authScreenAtom from '../../atoms/authAtom'

function Header() {
    const {colorMode,toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
    const logout = useLogout()
    const setAuthScreen = useSetRecoilState(authScreenAtom)
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
        {user && (
          <Link to="/">
            <AiFillHome size={24}/>
          </Link>
        )}
        {!user && (
          <Link to="/" onClick={()=>setAuthScreen("login")}>
            <Text fontWeight={"bold"}>LogIn</Text>
          </Link>
        )}
        <Flex justifyContent={"center"} alignItems={"center"}>  
        <Image
        cursor={'pointer'}
        w={6}
        alt='logo'
        src={colorMode==='dark'?"/light-logo.svg":"/dark-logo.svg"}
        onClick={toggleColorMode}
        />
        </Flex>
        {user && (
          <Flex alignItems={"center"} gap={4}>
          <Link to={`/${user.username}`}>
            <RxAvatar size={24}/>
          </Link>
          <Button size={"xs"} onClick={logout}>
            <FiLogOut size={"sm"}/>
          </Button>
          </Flex>
        )}
        {!user && (
          <Link to="/" onClick={()=>setAuthScreen("signup")}>
            <Text fontWeight={"bold"}>Signup</Text>
          </Link>
        )}
    </Flex>
  )
}

export default Header