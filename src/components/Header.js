import React from 'react';
import {Link} from "react-router-dom";
import {
  Box,
  Stack,
  HStack,
  InputGroup,
  Input,
  InputRightElement,
  Heading,
  Flex,
  Spacer,
  Text,
  Button,
  useDisclosure
} from "@chakra-ui/react";
import { HamburgerIcon, Search2Icon } from "@chakra-ui/icons";

import {LogoSmall} from "./landing-page";

export default function Header (props) {
  return (
    <Box px={8} bg="green.400">
      <Box w="100%" py={2} as="nav" align="center" wrap="wrap">
        <HStack justify="space-between">
          <HStack spacing={8} flex={1}>
            <LogoSmall />
            <InputGroup size="sm" maxW="400px" bg="gray.100" rounded="lg">
              <Input
                pr="4.5rem"
                type="text"
                placeholder="Search products"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={()=>{}}>
                  <Search2Icon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </HStack>
          <Stack direction="row" align="center" spacing={8}>

            <HamburgerIcon />
          </Stack>
        </HStack>
      </Box>
    </Box>
  )
}

// import React from 'react';
// import {Link} from "react-router-dom";
// import {Button} from "react-bootstrap";

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
