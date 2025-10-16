import React, { Component, createRef, RefObject } from 'react';
import { Box, Button } from '@chakra-ui/react';
import {
  AiOutlineHome,
  AiOutlineSetting,
  AiOutlineCreditCard,
  AiOutlineBuild
} from 'react-icons/ai';
import Link from 'next/link';
import NavBar from '@/src/components/navbar';

const withSidebar = (App, props) => {
  return class BoardWithSidebar extends Component {
    private firstNavItemRef: RefObject<any>;
    constructor(props) {
      super(props);
      this.firstNavItemRef = createRef<any>();
    }

    static async getInitialProps(ctx) {
      let appProps = {};

      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      return {
        ...appProps
      };
    }
    componentDidMount() {
      // Simulate a click on the first navigation item after the component mounts
      if (this.firstNavItemRef.current) {
        this.firstNavItemRef.current.click();
      }
    }
    render() {
      const { page } = props;

      const sidebarMenu = [
        // { path: '/home', buttonName: 'Trang chủ', page: 'home', icon: AiOutlineHome },
        { path: '/boards', buttonName: 'Bảng', page: 'boards', icon: AiOutlineCreditCard }
        // { path: '/templates', buttonName: 'Templates', page: 'templates', icon: AiOutlineBuild },
        // { path: '/settings', buttonName: 'Settings', page: 'settings', icon: AiOutlineSetting }
      ];

      return (
        <>
          <NavBar bg="white" />
          <Box display="flex" mt="2%">
            <Box height="80vh" width="20vw" boxShadow="base" rounded="lg" p="1em" ml="20px">
              <Box display="flex" flexDirection="column">
                {sidebarMenu.map((menu, index) => (
                  <Link href={menu.path} key={index}>
                    <Button
                      ref={index === 0 ? this.firstNavItemRef : null}
                      mt="5px"
                      mb="5px"
                      height="4rem"
                      borderRadius="1rem"
                      boxShadow={page === menu.page ? 'inner' : 'base'}
                      display="flex"
                      justifyContent="left"
                      colorScheme="gray">
                      <>
                        <menu.icon size="20px" /> &nbsp; {menu.buttonName}
                      </>
                    </Button>
                  </Link>
                ))}
              </Box>
            </Box>
            <App />
          </Box>
        </>
      );
    }
  };
};

export default withSidebar;
