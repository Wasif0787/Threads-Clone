import { Button } from '@chakra-ui/react'
import React from 'react'
import { FiLogIn } from "react-icons/fi"
import { Link } from 'react-router-dom'
function LogInButton() {
    return (
        <>
            <Link to="/">
                <Button
                    cursor={"pointer"}
                    position={"fixed"}
                    top={"30px"}
                    right={'30px' }
                    size={"sm"}
                    
                    margin={{ base: "md", md: "20px" }}
                >
                    <FiLogIn size={20} />
                </Button>
            </Link>
        </>
    )
}

export default LogInButton