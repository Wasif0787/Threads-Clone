import { Flex, Image, useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import {AiFillHome} from "react-icons/ai"
import {RxAvatar} from "react-icons/rx"
import React from 'react'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'

function Header() {
    const {colorMode,toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
  return (
    <Flex justifyContent={"space-between"} mt={6} mb={12}>
        {user && (
          <Link to="/">
            <AiFillHome size={24}/>
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
          <Link to={`/${user.username}`}>
            <RxAvatar size={24}/>
          </Link>
        )}
    </Flex>
  )
}

export default Header