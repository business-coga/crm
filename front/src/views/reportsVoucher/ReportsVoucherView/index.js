import React from 'react';
import {
  Card,
  Grid,
  Container,
  Divider,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import Page from 'src/components/Page';
import DataGrid, {SearchPanel,Export, FilterRow, HeaderFilter,Column} from 'devextreme-react/data-grid';
import axios from 'axios'

class ReportsVoucherView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets : []
    }

    axios({
      method : 'GET',
      url : '/api/v1/tickets',
    })
    .then(res => {
      res.data.forEach((e,i)=>{
        res.data[i].valid = e.valid ? 'Chưa sử dụng' : 'Đã sử dụng'
        res.data[i].activeDate = e.activeDate ? (new Date(e.activeDate)).toLocaleString() : ''//this.formatDate(new Date(e.activeDate))
      })
      this.setState({
        tickets : res.data
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
  render(){
    return (
      <Page
        style={{
          minHeight: '100%',
          paddingBottom: '3%',
          paddingTop: '3%'
        }}
        title="SMS"
      >
        <Container maxWidth="lg">
          <Card>
            <CardHeader
            title="Báo cáo voucher"
            >
  
            </CardHeader>
            <Divider />
            <CardContent>
              <Grid container>
                <Grid
                      item
                      md={12}
                      sm={12}
                      xs={12}
                    >
                    <DataGrid
                      dataSource={this.state.tickets}
                      // defaultColumns={columns}
                      showBorders={true}
                    >
                      <HeaderFilter visible={true} />
                      <FilterRow visible={true} applyFilter={true} />
                      <SearchPanel visible={true} highlightCaseSensitive={true} />
                      <Export enabled={true} allowExportSelectedData={true} fileName="Dữ liệu khách hàng" />
                      <Column dataField="code" caption="Mã" width={80}/>
                      <Column dataField="customerName" caption="Họ và Tên" width={200}/>
                      {/* <Column dataField="name" caption="Mã" /> */}
                      <Column dataField="description" caption="Diễn giải" width={350}/>
                      <Column dataField="phone" caption="SĐT" width={100}/>
                      <Column dataField="nhaMang" caption="Nhà mạng" width={150}/>
                      <Column dataField="valid" caption="Kích hoạt" width={150}/>
                      <Column dataField="activeDate" caption="Ngày kích hoạt" width={150}/>
                    </DataGrid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Page>
    );
  }
}


export default ReportsVoucherView;
