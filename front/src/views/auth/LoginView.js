import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  // Link,
  TextField,
  // Typography,
} from '@material-ui/core';
import axios from 'axios'
import Page from 'src/components/Page';
import { Navigate } from 'react-router-dom';


class LoginView extends React.Component{ 
  constructor(props){
    super(props);
    this.state = {
      username : '',
      password : '',
      auth : window.localStorage.auth ? true : false
    }
  }

handleUsernameChange(event){
  this.setState({
    username : event.target.value.toLowerCase()
  })
}

handlePasswordChange(event){
  this.setState({
    password : event.target.value.toLowerCase()
  })
}


login(){

  axios({
    method : 'POST',
    url : `/api/v1/login`,
    data : {
      username : this.state.username,
      password : this.state.password
    }
  })
  .then(res => {
    if(res.status === 200){
      console.log(res.data)
      window.localStorage.auth =  JSON.stringify(res.data)
      this.setState({auth : true})
    }else{
      alert(res.data.message)
    }
  })
  .catch(err =>{
    this.setState({password : ''})
    // alert(err.response.data.message)
    // alert(err)
    alert('Tài khoản chưa chính xác')
    console.log(this.state)
  })
}

render(){
  return (
    <Page
      title="Login"
      style={{
        height: '100%',
        paddingBottom: 3,
        paddingTop: 3,
        backgroundImage: '/static/back.png'
      }}
    >
      {this.state.auth ? <Navigate to="/app/ticket" />  : ''}
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          <TextField
            fullWidth
            label="Tài khoản"
            margin="normal"
            name="username"
            type="text"
            variant="outlined"
            value={this.state.username} 
            onChange={this.handleUsernameChange.bind(this)}
          />
          <TextField
            fullWidth
            label="Mật khẩu"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
            value={this.state.password} 
            onChange={this.handlePasswordChange.bind(this)}
          />
          <Box my={2}>
            <Button
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              onClick={this.login.bind(this)}
            >
              Đăng nhập
            </Button>
          </Box>
          {/* <Typography
            color="textSecondary"
            variant="body1"
          >
            Bạn chưa có tài khoản?
            {' '}
            <Link
              component={RouterLink}
              to="/register"
              variant="h6"
            >
              Tạo tài khoản
            </Link>
          </Typography> */}
        </Container>
      </Box>
    </Page>
  )}
}


export default LoginView
