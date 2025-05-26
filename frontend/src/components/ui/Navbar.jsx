import { Button, Container, Flex } from '@chakra-ui/react'
import { HStack } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

import React from 'react'

// import { useColorMode } from './color-mode';
import { CiSquarePlus } from "react-icons/ci";
import { useColorMode, useColorModeValue } from './color-mode'
import { IoMoonOutline } from 'react-icons/io5'
import { IoIosSunny } from 'react-icons/io'
import { Link } from 'react-router-dom';
// import { IoMoonOutline } from "react-icons/io5";
// import { IoIosSunny } from "react-icons/io";



const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const textColor = useColorModeValue("gray.600", "gray.200");
    return (
        <Container maxW={"1140px"} px={4}>
            <Flex
                h={16}
                alignItems="center"
                justifyContent="space-between"
                flexDir={{
                    base: "column",
                    sm: "row",
                }}
            >
                <Text
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    bgClip={"text"}
                    color={textColor}
                >
                    <Link to={"/"}>Product Store 🛒</Link>
                </Text>

                <HStack
                    direction="row"
                    spacing={2}
                    alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button>
                            <CiSquarePlus fontSize={20} />
                        </Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <IoMoonOutline /> : <IoIosSunny size='20' />}
                    </Button>
                </HStack>
            </Flex>
        </Container>
    )
}

export default Navbar
