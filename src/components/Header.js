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
} from "@chakra-ui/react";
import { Search2Icon, ChevronDownIcon } from "@chakra-ui/icons";

import {LogoSmall} from "./landing-page";

export default function Header (props) {
  const searchRef = useRef();
  const history = useHistory();

  const onSearch = () => {
    history.push(`/products?search=${searchRef.current.value}`)
  }

  return (
    <Box h="75px">
      <Box px={8} w="100%" py={2} bg="cyan.800" as="nav" align="center" wrap="wrap" position="fixed">
        <HStack justify="space-between">
          <HStack spacing={8} flex={1}>
            <LogoSmall />
            <InputGroup size="sm" maxW="400px" bg="gray.100" borderRadius="lg">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Search products"
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
              <MenuButton rightIcon={<ChevronDownIcon />}>
                <Avatar src={props.user.picture && `data:${props.user.picture.contentType};base64,${Buffer.from(props.user.picture.data.data).toString('base64')}`} />
              </MenuButton>
              <MenuList>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/chats"><MenuItem>Chats</MenuItem></Link>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to={`/profile/${props.user._id}`}><MenuItem>Your Profile</MenuItem></Link>
                <Link style={{ color: 'inherit', textDecoration: 'none' }} to="/transactions"><MenuItem>Transactions</MenuItem></Link>
                <MenuItem>
                  <Button w="100%" style={{ color: 'inherit', textDecoration: 'none' }} variant="link" onClick={props.handleLogout}>
                    <Box w="100%" textAlign="left">Log Out</Box>
                  </Button>
                </MenuItem>
              </MenuList>
            </Menu>
            :
            
            <Link style={{ color: 'inherit', textDecoration: 'none' }} to={"/signup"}>
              <Text color="white">Sign In</Text>
            </Link>
            }
          </Stack>
        </HStack>
      </Box>
    </Box>
  )
}

// import React from 'react';
// import {Link} from "react-router-dom";
// import {Button} from "react-bootstrap";

//try to make a box around signup link
// {/*<Box border="2px" borderRadius="lg" borderColor="white" w="100px" h="50px" justifyContent="flex-end" alignContent="flex-start">
//                 <Link to={"/signup"}>
//                   <Text color="white">Sign In</Text>
//                 </Link>
//             </Box>*/}


// export default function OldHeader(props) {
//     return (
//         <nav className="navbar navbar-expand navbar-dark bg-dark">
//         <Link to={"/"} className="navbar-brand" style={{marginLeft: "30px"}}>
//           TRENT
//         </Link>
//         <div className="navbar-nav mr-auto">
//           <li className="nav-item">
//             <Link to={"/products"} className="nav-link">
//               Search Products
//             </Link>
//           </li>
//         </div>
//         <div className="navbar-nav ml-auto"> {/*somehow not aligning to the right, but I will care for that later*/}
//           {props.user._id ? (
//             <>
//               {/*<li className="nav-item">
//                 <Link to={"/inventory"} className="nav-link">
//                   Inventory
//                 </Link>
//               </li>*/}
//               <li className="nav-item">
//                 <Link to={"/products/create"} className="nav-link">
//                   Add a product
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={`/profile/${props.user._id}`} className="nav-link">
//                   Your Profile
//                 </Link> {/* Somehow this does not align correctly, but I should not care about it now, because I will probably change it anyway*/}
//               </li>
//               <li className="nav-item">
//                 <Button variant="link" className="nav-link" onClick={props.handleLogout}>
//                   Log Out
//                 </Button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li className="nav-item">
//                 <Link to={"/signup"} className="nav-link">
//                   Sign Up
//                 </Link>
//               </li>
//               <li className="nav-item">
//                 <Link to={"/login"} className="nav-link">
//                   Log In
//                 </Link>
//               </li>
//             </>
//           )}
//         </div>
//       </nav>
//     )
// }
