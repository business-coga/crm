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
  Table,
  TableCell,
  TableBody,
  TableRow
} from '@material-ui/core';
import {
  Alert
} from '@material-ui/lab';
import Page from 'src/components/Page';
import axios from 'axios'


class SettingsView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      ticket: {},
      dateActivated: ''
    }
  }

  handleCodeChange(event) {
    this.setState({ code: event.target.value });
  }

  active() {
    console.log('active')
    axios({
      method: 'PUT',
      url: `/api/v1/tickets/${this.state.ticket._id}`,
      data: { valid: false, activeDate: new Date() }
    })
      .then(res => {
        if (res.status === 200) {
          alert('Kích hoạt ticket thành công')
        } else {
          alert('Chưa kích hoạt được ticket !!!')
        }
        axios({
          method: 'GET',
          url: `/api/v1/tickets?code=${this.state.code}`,
        })
          .then(res => {
            if (res.status !== 200)
              return
            if (res.data[0]) {
              this.setState({ ticket: res.data[0] })
            } else {
              this.setState({ ticket: {} })
            }
          })
      })
  }

  formatDate(dateValue) {
    this.datePart = dateValue.getDate();
    this.monthPart = dateValue.getMonth() + 1;
    this.hourPart = dateValue.getHours();
    this.minutePart = dateValue.getMinutes();
    if (this.datePart < 10)
      this.datePart = "0" + this.datePart;
    if (this.monthPart < 10)
      this.monthPart = "0" + this.monthPart;
    if (this.hourPart < 10)
      this.hourPart = "0" + this.hourPart;
    if (this.minutePart < 10)
      this.minutePart = "0" + this.minutePart;
    return this.datePart + "/" + this.monthPart + "/" + dateValue.getFullYear() + " " + this.hourPart + ":" + this.minutePart;
  }
  checkTicket() {
    axios({
      method: 'GET',
      url: `/api/v1/tickets?code=${this.state.code}`,
    })
      .then(res => {
        if (res.status !== 200)
          return alert('Mã ticket không đúng !!!')
        if (res.data[0]) {
          this.setState({ ticket: res.data[0] })
        } else {
          alert('Mã ticket không đúng !!!')
          this.setState({ ticket: {} })
        }
      })
  }

  render() {
    return (
      <Page
        title="Voucher"
      >
        <Container maxWidth="lg">
          <div>
            <Card>
              <CardHeader
                // subheader="Manage the notifications"
                title="Kiểm tra mã voucher"
              >
              </CardHeader>
              <Divider />
              <CardContent>
                <Grid container>
                  <Grid
                    item
                    md={6}
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
                      {!this.state.ticket.valid ?
                        <Alert severity="error">Voucher đã được kích hoạt &amp; sử dụng!</Alert> :
                        <Alert severity="success">Voucher chưa được sử dụng. Vui lòng kích hoạt!</Alert>
                      }
                    </Grid>
                    <br /><br />
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell><strong>Mã voucher:</strong></TableCell>
                          <TableCell>{this.state.ticket.code}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Tên khách hàng:</strong></TableCell>
                          <TableCell>{this.state.ticket.customerName}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Nội dung:</strong></TableCell>
                          <TableCell>{this.state.ticket.description}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><strong>Số điện thoại:</strong></TableCell>
                          <TableCell>{this.state.ticket.phone}</TableCell>
                        </TableRow>
                        {!this.state.ticket.valid ? [<TableCell><strong>Thời điểm kích hoạt:</strong></TableCell>,
                          <TableCell>{(this.formatDate(new Date(this.state.ticket.activeDate)))}</TableCell>] : ''}
                        {this.state.ticket.valid ?
                          <TableRow><TableCell>
                            <Button
                              color="primary"
                              variant="contained"
                              onClick={this.active.bind(this)}
                            >
                              Kích hoạt
                              </Button>
                          </TableCell></TableRow>
                          : ''
                        }

                      </TableBody>
                    </Table>
                    <br /><br /><br />

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
