import React from 'react';
import styled, {css} from 'styled-components';
import "../css/styles.css";
import {Link, useHistory} from "react-router-dom";

import anitaDenunzioQa8Bs887Id8Unsplash1 from "../assets/anita-denunzio-qa8bs887id8-unsplash-1-1@1x.png";
import rectangle19 from "../assets/rectangle-19-1@1x.svg";
// import signup from "../assets/signup@2x.svg";
// import vector from "../assets/vector@2x.svg";
// import vector1 from "../assets/vector-1@2x.svg";
import overlapGroup1 from "../assets/rectangle-20@1x.png"
// import overlapGroup2 from "../assets/searchbar-base@1x.svg";
import polygon1 from "../assets/polygon-1@1x.png";
import polygon2 from "../assets/polygon-2@1x.png";
import rectangle37 from "../assets/rectangle-37@1x.png";
import { Box, Center, Heading as Heading2 } from '@chakra-ui/react';
//import nav4 from "../assets/nav-4-1@1x.png"; // image of nice footer


function App(props) {
  const history = useHistory();
  if (window.location.pathname === "/" && props.user._id){
    history.push("/dashboard");
  }
  const mql = window.matchMedia('(max-width:1220px)');
  if (mql.matches){
    return <><Box h="100%"><Center w="100%" h={`${120}px`}>
      <Heading2 as="h1" size="3xl">GET THE APP!</Heading2>
      <Box h="30px" />
      {/*Buttons here*/}
    </Center></Box>
    <Center>
      <img src={rectangle37} alt=""/>
    </Center>
    </>
  }
  //return <NewConcept2 {...newConcept2Data} />;
  return <NewConcept2 />
}

 export const Logo = (props) => {
  return(
    <Link to="/">
      <TrentStyle>
        <Span0>trent</Span0>
        <Span1>.</Span1>
      </TrentStyle>
    </Link>
  )
}

export const LogoSmall = (props) => {
  return(
    <Link to="/">
      <TrentStyleSmall>
        <Span0>trent</Span0>
        <Span1>.</Span1>
      </TrentStyleSmall>
    </Link>
  )
}

export default App;

function NewConcept2(props) {
  return (
    <div className="container-center-horizontal">
      <div className="new-concept-2screen">
        <OverlapGroup>
          <Rectangle6></Rectangle6>
          <AnitaDenunzioQA8bs887iD8Unsplash1 src={anitaDenunzioQa8Bs887Id8Unsplash1} />
          <AnitaDenunzioQA8bs887iD8Unsplash1 src={rectangle19} />
          <Link to="/login"><LogIn>{logIn}</LogIn></Link>
          <TrentPos><Logo/></TrentPos>
          <Group1>
            <Text1>
              <Span01>{spanText3}</Span01>
              <Span11>{spanText4}</Span11>
            </Text1>
            <Text2>{text2}</Text2>
            {/*<FlexRow>
              <Login>
                <LogIn1>{logIn2}</LogIn1>
              </Login>
              <Signup src={signup} />
            </FlexRow>*/}
          </Group1>
          <Rectangle7></Rectangle7>
          {/*<SearchBar>
            <OverlapGroup2 style={{ backgroundImage: `url(${overlapGroup2})` }}>
              <Location>
                <Vector src={vector} />
                <OverlapGroup3>
                  <Place>{place}</Place>
                  <Vector1 src={vector1} />
                </OverlapGroup3>
              </Location>
            </OverlapGroup2>
          </SearchBar>*/}
          <Rectangle10></Rectangle10>
          <Rectangle21></Rectangle21>
          <Text3>Get the App.{/*later replace with text3 (Browse hundreds of products)*/}</Text3>
          {/*Insert Download in AppStore/Playstore here*/}
          <Link to="/signup"><SignUp>{signUp}</SignUp></Link>
          <Polygon1 src={polygon1} />
          <Polygon2 src={polygon2} />
          <Group10>
            <Text4>{text4}</Text4>
            <Text5>{text5}</Text5>
          </Group10>
          <Group9>
            <Text6>{text6}</Text6>
            <Text7>{text7}</Text7>
          </Group9>
          <Rectangle37 src={rectangle37} />
        </OverlapGroup>
        <OverlapGroup1 style={{ backgroundImage: `url(${overlapGroup1})` }}>
          <Group8>
            <BecomeALender>{becomeALender}</BecomeALender>
            <Text8>{text8}</Text8>
          </Group8>
        </OverlapGroup1>
        {/*<Nav4 src={nav4} />*/}
      </div>
    </div>
  );
}

export const Baloo2NormalWhite24px = css`
  color: var(--white);
  font-family: var(--font-family-baloo_2);
  font-size: var(--font-size-xs);
  font-weight: 400;
  font-style: normal;
`;

export const Title = css`
  font-family: var(--font-family-rubik);
  font-size: var(--font-size-xxl);
  letter-spacing: 0;
  font-weight: 700;
  font-style: normal;
`;

export const Subheading = css`
  font-family: var(--font-family-rubik);
  font-size: var(--font-size-m);
  letter-spacing: 0;
  font-weight: 400;
  font-style: normal;
`;

export const Heading = css`
  font-family: var(--font-family-rubik);
  font-size: var(--font-size-xl);
  letter-spacing: 0;
  font-weight: 700;
  font-style: normal;
`;

export const Subtitle = css`
  font-family: var(--font-family-rubik);
  font-size: var(--font-size-s);
  letter-spacing: 0;
  font-weight: 400;
  font-style: normal;
`;

const OverlapGroup = styled.div`
  width: 1710px;
  height: 3162px;
  position: relative;
`;

const Rectangle6 = styled.div`
  position: absolute;
  width: 1709px;
  height: 947px;
  top: 0;
  left: 1px;
  background-color: var(--white);
`;

const AnitaDenunzioQA8bs887iD8Unsplash1 = styled.img`
  position: absolute;
  width: 1708px;
  height: 935px;
  top: 0;
  left: 2px;
`;

const LogIn = styled.div`
  ${Baloo2NormalWhite24px}
  position: absolute;
  width: 70px;
  top: 33px;
  left: 1576px;
  letter-spacing: 0;
`;

const TrentPos = styled.div`
  position: absolute;
  width: 149px;
  top: 15px;
  left: 37px;
`;

const TrentStyle = styled.div`
  font-family: var(--font-family-rubik);
  font-weight: 700;
  color: transparent;
  font-size: var(--font-size-l);
  letter-spacing: 0;
`;

const TrentStyleSmall = styled.div`
  font-family: var(--font-family-rubik);
  font-weight: 700;
  color: transparent;
  font-size: var(--font-size-s);
  letter-spacing: 0;
`;

const Span0 = styled.span`
  color: var(--white);
`;

const Span01 = styled.span`
  ${Title}
  color: var(--white);
`;

const Span1 = styled.span`
  color: #ff3b3b;
`;

const Group1 = styled.div`
  position: absolute;
  width: 724px;
  top: 315px;
  left: 46px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text1 = styled.h1`
  ${Title}
  width: 722px;
  min-height: 140px;
  font-weight: 700;
  color: transparent;
  line-height: 70px;
`;

const Span11 = styled.span`
  ${Title}
  color: var(--main);
`;

const Text2 = styled.div`
  ${Subtitle}
  width: 637px;
  min-height: 80px;
  margin-top: 12px;
  color: var(--white);
`;

// const FlexRow = styled.div`
//   display: flex;
//   align-items: flex-start;
//   min-width: 254px;
//   margin-top: 23px;
// `;

// const Login = styled.div`
//   height: 47px;
//   margin-top: 1px;
//   display: flex;
//   padding: 8px 5.1px;
//   justify-content: flex-end;
//   align-items: flex-start;
//   min-width: 117px;
//   border-radius: 10px;
//   border: 2px solid var(--white);
// `;

// const LogIn1 = styled.div`
//   width: 104px;
//   min-height: 30px;
//   font-family: var(--font-family-baloo_tamma_2);
//   color: var(--white);
//   font-size: var(--font-size-xxs);
//   text-align: center;
//   letter-spacing: 0;
// `;

// const Signup = styled.img`
//   width: 126px;
//   height: 55px;
//   margin-left: 11px;
// `;

const Rectangle7 = styled.div`
  position: absolute;
  width: 1709px;
  height: 947px;
  top: 2215px;
  left: 1px;
  background-color: #eeeeee;
`;

// const SearchBar = styled.div`
//   position: absolute;
//   height: 63px;
//   top: 153px;
//   left: 240px;
//   display: flex;
//   justify-content: center;
//   align-items: flex-end;
// `;

// const OverlapGroup2 = styled.div`
//   height: 71px;
//   margin-bottom: -8px;
//   display: flex;
//   padding: 17px 17.2px;
//   justify-content: flex-end;
//   align-items: flex-start;
//   min-width: 1239px;
//   background-image: url(searchbar-base.svg);
//   background-size: 100% 100%;
// `;

// const Location = styled.div`
//   display: flex;
//   align-items: center;
//   min-width: 155px;
// `;

// const Vector = styled.img`
//   width: 16px;
//   height: 16px;
//   margin-left: -1px;
//   margin-top: 1px;
// `;

// const OverlapGroup3 = styled.div`
//   width: 121px;
//   height: 29px;
//   position: relative;
//   margin-left: 18px;
// `;

// const Place = styled.div`
//   position: absolute;
//   width: 109px;
//   top: 0;
//   left: 0;
//   opacity: 0.8;
//   font-family: var(--font-family-baloo_2);
//   color: var(--black);
//   font-size: var(--font-size-xxs);
//   letter-spacing: 0;
// `;

// const Vector1 = styled.img`
//   position: absolute;
//   width: 12px;
//   height: 7px;
//   top: 14px;
//   left: 109px;
// `;

const Rectangle10 = styled.div`
  position: absolute;
  width: 1709px;
  height: 1280px;
  top: 935px;
  left: 1px;
  background-color: var(--white);
  box-shadow: 0px 0px 50px #00000040;
`;

const Rectangle21 = styled.div`
  position: absolute;
  width: 1709px;
  height: 1280px;
  top: 935px;
  left: 1px;
  background-color: var(--third);
  box-shadow: 0px 0px 50px #00000040;
`;

const Text3 = styled.div`
  ${Heading}
  position: absolute;
  width: 584px;
  top: 2531px;
  left: 123px;
  font-weight: 700;
  color: var(--black);
`;

// const Group = styled.div`
//   position: absolute;
//   height: 86px;
//   top: 3036px;
//   left: 233px;
//   display: flex;
//   align-items: flex-start;
//   min-width: 275px;
//   background-image: url(vector-2.svg);
//   background-size: 100% 100%;
// `;

// const OverlapGroup4 = styled.div`
//   width: 274px;
//   height: 85px;
//   position: relative;
//   margin-top: -0.49px;
// `;

// const Vector2 = styled.img`
//   position: absolute;
//   width: 273px;
//   height: 84px;
//   top: 1px;
//   left: 1px;
// `;

// const Group2 = styled.div`
//   position: absolute;
//   height: 55px;
//   top: 14px;
//   left: 27px;
//   display: flex;
//   justify-content: center;
//   align-items: flex-start;
// `;

// const OverlapGroup21 = styled.div`
//   width: 43px;
//   height: 56px;
//   position: relative;
//   margin-top: -0.67px;
// `;

// const Vector3 = styled.img`
//   position: absolute;
//   width: 43px;
//   height: 43px;
//   top: 13px;
//   left: 0;
// `;

// const Vector4 = styled.img`
//   position: absolute;
//   width: 11px;
//   height: 14px;
//   top: 0;
//   left: 21px;
// `;

// const Group3 = styled.div`
//   position: absolute;
//   height: 37px;
//   top: 39px;
//   left: 87px;
//   display: flex;
//   align-items: flex-start;
// `;

// const Vector5 = styled.img`
//   width: 24px;
//   height: 29px;
//   margin-top: 0.24px;
// `;

// const Vector6 = styled.img`
//   width: 20px;
//   height: 31px;
//   align-self: flex-end;
//   margin-left: 2px;
//   margin-bottom: -0.77px;
// `;

// const Vector7 = styled.img`
//   width: 18px;
//   height: 31px;
//   margin-left: 7px;
//   margin-top: -0.77px;
// `;

// const Vector8 = styled.img`
//   width: 13px;
//   height: 28px;
//   margin-left: 1px;
//   margin-top: 2.36px;
// `;

// const Vector9 = styled.img`
//   width: 20px;
//   height: 23px;
//   align-self: center;
//   margin-left: 1px;
//   margin-top: 0.04px;
// `;

// const Vector10 = styled.img`
//   width: 12px;
//   height: 22px;
//   align-self: center;
//   margin-left: 2px;
//   margin-bottom: 0.43px;
// `;

// const Vector11 = styled.img`
//   width: 18px;
//   height: 23px;
//   align-self: center;
//   margin-bottom: 0.09px;
// `;

// const Group4 = styled.img`
//   position: absolute;
//   width: 159px;
//   height: 16px;
//   top: 14px;
//   left: 89px;
// `;

const SignUp = styled.div`
  ${Baloo2NormalWhite24px}
  position: absolute;
  width: 86px;
  top: 33px;
  left: 1466px;
  letter-spacing: 0;
`;

const Polygon1 = styled.img`
  position: absolute;
  width: 855px;
  height: 640px;
  top: 1575px;
  left: 1px;
`;

const Polygon2 = styled.img`
  position: absolute;
  width: 855px;
  height: 640px;
  top: 935px;
  left: 854px;
`;

const Group10 = styled.div`
  position: absolute;
  width: 585px;
  top: 1106px;
  left: 163px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text4 = styled.div`
  ${Heading}
  width: 700px;
  min-height: 59px;
  margin-left: 2px;
  font-weight: 700;
  color: var(--white);
`;

const Text5 = styled.div`
  ${Subheading}
  width: 583px;
  min-height: 135px;
  margin-top: 20px;
  color: var(--white);
`;

const Group9 = styled.div`
  position: absolute;
  width: 729px;
  top: 1775px;
  left: 918px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Text6 = styled.div`
  ${Heading}
  width: 700px;
  line-height: 1.15;
  min-height: 100px;
  font-weight: 700;
  color: var(--white);
`;

const Text7 = styled.div`
  ${Subheading}
  width: 729px;
  min-height: 90px;
  margin-top: 20px;
  color: var(--white);
`;

const Rectangle37 = styled.img`
  position: absolute;
  width: 854px;
  height: 968px;
  top: 2194px;
  left: 847px;
  object-fit: cover;
`;

const OverlapGroup1 = styled.div`
  height: 947px;
  display: flex;
  padding: 0 190px;
  align-items: center;
  min-width: 1709px;
  background-image: url(rectangle-20.png);
  background-size: cover;
  background-position: 50% 50%;
`;

const Group8 = styled.div`
  width: 730px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-height: 321px;
`;

const BecomeALender = styled.div`
  ${Heading}
  width: 633px;
  min-height: 100px;
  font-weight: 700;
  color: var(--white);
`;

const Text8 = styled.div`
  ${Subheading}
  width: 728px;
  min-height: 219px;
  margin-top: 2px;
  color: var(--white);
`;

// const Nav4 = styled.img`
//   width: 1709px;
//   height: 278px;
// `;

const logIn = "Log In";
// const spanText = "trent";
// const spanText2 = ".";
const spanText3 = "Renting made ";
const spanText4 = "awesome.";
const text2 = "Get anything quickly and cheaply with a few clicks.";
// const logIn2 = "Log in";
// const place = "Heidelberg";
// const text3 = "Browse hundreds of products";
const signUp = "Sign Up";
const text4 = "We’ve got you covered";
const text5 = "Rent tools, drones, camping equipment and much more as you need it";
const text6 = "Get ready for new experiences";
const text7 = "Explore new activities and get the gear using trent.";
const becomeALender = "Become a lender";
const text8 = <>Help others.<br />Help the environment.<br />Make money.</>;

/*const newConcept2Data = {
  anitaDenunzioQa8Bs887Id8Unsplash1: "anita-denunzio-qa8bs887id8-unsplash-1-1.png",
  rectangle19: "rectangle-19-1.svg",
  logIn: "Log In",
  spanText: "trent",
  spanText2: ".",
  spanText3: "Renting made ",
  spanText4: "awesome.",
  text2: "Get anything quickly and cheaply with a few clicks.",
  logIn2: "Log in",
  signup: "signup.svg",
  overlapGroup2: "searchbar-base.svg",
  place: "Heidelberg",
  vector1: "vector-1.svg",
  text3: "Browse hundreds of products",
  group: "vector-2.svg",
  vector2: "vector-3.svg",
  vector3: "vector-4.svg",
  vector4: "vector-5.svg",
  vector5: "vector-6.svg",
  vector6: "vector-7.svg",
  vector7: "vector-8.svg",
  vector8: "vector-9.svg",
  vector9: "vector-10.svg",
  vector10: "vector-11.svg",
  vector11: "vector-12.svg",
  vector12: "vector-13.svg",
  group2: "group.svg",
  signUp: "Sign Up",
  polygon1: "polygon-1.png",
  polygon2: "polygon-2.png",
  text4: "We’ve got you covered",
  text5: "Rent tools, drones, camping equipment and much more as you need it",
  text6: "Get ready for new experiences",
  text7: "Explore new activities and get the gear using trent.",
  rectangle37: "rectangle-37.png",
  overlapGroup1: "rectangle-20.png",
  becomeALender: "Become a lender",
  text8: <>Help others<br />Help the environment<br />Make money</>,
  nav4: "nav-4-1.png",
};*/

