import React, {useRef} from 'react';
import {Link, useHistory} from "react-router-dom";
import {
  Box,
  Stack,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Button,
  Center,
  useMediaQuery
} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from 'react-i18next';

import {LogoSmall} from "./landing-page";

export default function Header (props) {
  const {t, i18n} = useTranslation();

  const [isLargerMd] = useMediaQuery("(min-width: 860px)")

  const searchRef = useRef();
  const history = useHistory();

  const onSearch = () => {
    history.push(`/products?search=${searchRef.current.value}`)
  }

  return (
    <Box h="75px">
      <Box px={{base: 4, md: 8}} w="100%" bg="gray.900" as="nav" align="center" wrap="wrap" position="fixed" zIndex={999}>
        <HStack justify="space-between">
          <HStack spacing={{base: 4, md: 8}} flex={1} h="75px">
            <LogoSmall />
            <InputGroup size="sm" maxW="400px" bg="gray.100" borderRadius="lg">
              <Input
                pr="4.5rem"
                type="text"
                placeholder={t("header.search")}
                ref={searchRef}
                onKeyDown={e => {if (e.key === "Enter") {onSearch()}}}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={onSearch}>
                  <Search2Icon />            
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack>
          <Stack direction="row" align="center" spacing={8}>
            {props.user._id ? 
            <Menu>
              <MenuButton>
                <HStack spacing="5px">
                  <Avatar src={props.user.picture && `data:${props.user.picture.contentType};base64,${Buffer.from(props.user.picture.data.data).toString('base64')}`} />
                  <Center><ChevronDownIcon color="white"/></Center>
                </HStack>
              </MenuButton>
              <MenuList>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/profile/${props.user._id}`}><MenuItem>{t("header.dropmenu.a")}</MenuItem></Link>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/account-settings"><MenuItem>{t("header.dropmenu.b")}</MenuItem></Link>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/chats"><MenuItem>{t("header.dropmenu.c")}</MenuItem></Link>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/transactions"><MenuItem>{t("header.dropmenu.d")}</MenuItem></Link>
                <MenuItem>
                  <Button w="100%" style={{ color: 'inherit', textDecoration: 'none' }} variant="link" onClick={props.handleLogout}>
                    <Box w="100%" textAlign="left">Log Out</Box>
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
            :
            <>{ isLargerMd ? <HStack spacing="20px">
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/login"}>
                <Text color="white">{t("header.Log In")}</Text>
              </Link>
              <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/signup"}>
                <Text color="white">{t("header.Sign Up")}</Text>
              </Link>
            </HStack>
            :
            <Menu>
              <MenuButton>
                <Text color="white">{t("header.Sign In")}</Text>
              </MenuButton>
              <MenuList>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/login"}>
                  <MenuItem>{t("header.Log In")}</MenuItem>
                </Link>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/signup"}>
                  <MenuItem>{t("header.Sign Up")}</MenuItem>
                </Link>
              </MenuList>
            </Menu>
            }</>
            }
          </Stack>
        </HStack>
      </Box>
    </Box>
  )
}
