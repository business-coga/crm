import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  Divider,
  Drawer,
  Hidden,
  makeStyles
} from '@material-ui/core';
import {

  ShoppingBag as ShoppingBagIcon,
} from 'react-feather';
import NavItem from './NavItem';
import { Navigate } from 'react-router-dom';

// const user = {
//   avatar: '/static/images/avatars/avatar_6.png',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith'
// };


const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));


class LogoutView extends React.Component{ 
  constructor(props){
    super(props)
    this.state = {
      auth : window.localStorage.auth ? true : false
    }
  }

  logout(){
    window.localStorage.removeItem('auth')
    this.setState({auth : undefined})
  }

  render(){
    return (
      <Button
        onClick={this.logout.bind(this)}
      >
        {this.state.auth ? '' : <Navigate to="/login" />}
        Đăng xuất
      </Button> 
    )
  }
}

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();




  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >

      {/* <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        p={2}
      >
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          src={user.avatar}
          to="/app/account"
        />
        <Typography
          className={classes.name}
          color="textPrimary"
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {user.jobTitle}
        </Typography>
      </Box> */}
      <Divider />
      <Box p={2}>
        <NavItem href="/app/ticket" key="ticket" title="Voucher" icon={ShoppingBagIcon} />        
        <NavItem href="/" key="feedback" title="Feedback" icon={ShoppingBagIcon} onClick={function openTab(){
                console.log('abc')
                window.open("http://beauty.deeplink.vn/vi/quachthuyspa","_blank",);
              }} />
        <NavItem href="/app/reports-voucher" key="reports-voucher" title="Báo cáo voucher" icon={ShoppingBagIcon} />        
      </Box>
      <div></div>
      <Box flexGrow={1} />
        <LogoutView></LogoutView>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
