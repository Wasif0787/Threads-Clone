/* eslint-disable no-unused-vars */
    import React, { useState } from 'react'
    import { CiSearch } from "react-icons/ci";
    import { useRecoilValue } from 'recoil';
    import userAtom from '../../atoms/userAtom';
    import { Box, Button, Flex, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Skeleton, SkeletonCircle, Text, useDisclosure } from '@chakra-ui/react';
    import { Link } from 'react-router-dom';
    import useShowToast from '../../hooks/useShowToast';
    import _debounce from 'lodash/debounce';
    import UserList from './UserList';

    const SearchUser = () => {
        const [searchedUsers,setSearchedusers]= useState([])
        const [text,setText] = useState("")
        const [loading, setLoading] = useState(false);
        const { isOpen, onOpen, onClose } = useDisclosure()
        const showToast = useShowToast()
        

        const debouncedSearch = _debounce(async (inputText) => {
            setLoading(true);
            try {
                const res = await fetch(`/api/users/search/${inputText}`);
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    setSearchedusers([]);
                    return;
                }
                if (!data) {
                    setLoading(false);
                    return;
                }
                setSearchedusers(data);
            } catch (error) {
                showToast("Error", error, "error");
            } finally {
                setLoading(false);
            }
        }, 300); 

        const handleChange = (e) => {
            const inputText = e.target.value;
            setText(inputText);
            if (inputText.length > 0) {
                debouncedSearch(inputText);
            } else {
                // Clear the results if the input is empty
                setSearchedusers([]);
            }
        };
        const handleClose = ()=>{
            onClose(true)
            setSearchedusers([])
            setText("")
            setLoading(false)
        }
        const handleSearchUser = async ()=>{
            setLoading(true)
            if(text.length===0){
                setLoading(false)
                showToast("Error","Input required","error")
                return
            }
            try {
                const res = await fetch(`/api/users/search/${text}`)
                const data = await res.json()
                if(data.error){
                    showToast("Error",data.error,"error")
                    setText("")
                    return
                }
                console.log(data.length);
                if(!data){
                    setLoading(false)
                    return
                }
                setSearchedusers(data)
                console.log(searchedUsers);
            } catch (error) {
                showToast("Error",error,"error")
            } finally {
                setLoading(false)
            }
        }
        return (
            <>
                <Button bg={"transparent"} onClick={onOpen}>
                    <CiSearch size={24}/>
                </Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent w={{base:"300px",md:"full"}}>
                        <ModalHeader>Search Users</ModalHeader>
                        <ModalCloseButton onClick={handleClose}/>
                        <ModalBody pb={6}>
                            <FormControl display={"flex"} flexDirection={'row'} alignItems={"center"} mb={5}>
                                <Input  value={text} required type='text' onChange={handleChange} placeholder='search users...'/>
                                <Button onClick={handleSearchUser}><CiSearch size={24}/></Button>
                            </FormControl>
                            {loading &&
                                [0, 1, 2].map((_, idx) => (
                                    <Flex
                                        key={idx}
                                        gap={2}
                                        alignItems={"center"}
                                        p={"1"}
                                        borderRadius={"md"}
                                    >
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
                                <Box>
                                {!loading && searchedUsers.map((user) => <UserList key={user._id} user={user} />)}
                                </Box>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        )
    }

    export default SearchUser