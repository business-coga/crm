import React from 'react';
import {
  Button,
  Grid,
  Container,
  Card,
  Divider,
  CardHeader,
  CardContent,
  TextField,
} from '@material-ui/core';
import Page from 'src/components/Page';
import axios from 'axios'


class SettingsView extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      code : '',
      ticket : {}
    }
  }
  
  handleCodeChange(event){
    this.setState({code: event.target.value});
  }

  active(){
    console.log('active')
  }

  checkTicket(){
      axios({
        method : 'GET',
        url: `/api/v1/tickets?code=${this.state.code}`,
      })
      .then(res => {
        if(res.status !== 200)
          return alert('Mã ticket không đúng !!!')
        if(res.data[0]){
          this.setState({ticket : res.data[0]})
        }else{
          alert('Mã ticket không đúng !!!')
          this.setState({ticket : {}})
        }
      })
  }

  render(){


  
  
    return (
      <Page
        title="Ticket"
      >
        <Container maxWidth="lg">
          <div>
            <Card>
              <CardHeader 
              // subheader="Manage the notifications"
              title="Kiểm tra mã Ticket"
              >
              </CardHeader>
              <Divider />
              <CardContent>
                <Grid container>
                  <Grid
                    item
                    md={4}
                    sm={6}
                    xs={12}
                  >
                  <TextField
                    fullWidth
                    label="Mã voucher"
                    margin="normal"
                    name="code"
                    type="text"
                    variant="outlined"
                    value={this.state.code} 
                    onChange={this.handleCodeChange.bind(this)}
                  />
                  </Grid>
                  <Grid
                    item
                    md={2}
                    sm={6}
                    xs={12}
                    style={{
                      'display': 'flex',
                      'alignItems': 'center',
                      'justifyContent': 'center'
                    }}
                  >
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.checkTicket.bind(this)}
                    >
                      Kiểm tra
                    </Button>
                  </Grid>
                </Grid>
                <br></br><br></br>
                {this.state.ticket.code ? 
                                <Grid container>
                                <Grid item md={12} sm={12} xs={12}>                                   
                                  <label style={{color : '#2874A6'}}><b>Mã</b></label> : {this.state.ticket.code}
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <label style={{color : '#2874A6'}}><b>Tên khách hàng</b></label> : {this.state.ticket.customerName}
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <label style={{color : '#2874A6'}}><b>Diễn giải</b></label> : {this.state.ticket.description}
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <label style={{color : '#2874A6'}}><b>Số điện thoại</b></label> : {this.state.ticket.phone}
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <label style={{color : '#2874A6'}}><b>Giá trị</b></label> : {this.state.ticket.value}
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <label style={{color : '#2874A6'}}><b>Chứng thực</b></label> : {this.state.ticket.valid}
                                </Grid>
                                <Grid item md={12} sm={12} xs={12}>
                                <label style={{color : '#2874A6'}}><b>Ngày kích hoạt</b></label> : {this.state.ticket.activeDate}
                                </Grid>
                                <br /><br /><br />
                                {this.state.ticket.activeDate ? 
                                '':
                                <Button
                                color="primary"
                                variant="contained"
                                onClick={this.active.bind(this)}
                              >
                                Kích hoạt
                              </Button>
                              }
                              </Grid> : <div></div>
              
              
              }

  
              
              </CardContent>
            </Card>
          </div>
        </Container>
      </Page>
    );
  }
}

// const SettingsView = () => {
  
// };

export default SettingsView;
