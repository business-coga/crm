import React from 'react';
import {
  Button,
  Card,
  Grid,
  Container,
  makeStyles,
  Divider,
  CardHeader,
  CardContent,
  TextField,
  TextareaAutosize
} from '@material-ui/core';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="SMS"
    >
      <Container maxWidth="lg">
        <Card>
          <CardHeader
          title="Gửi SMS"
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
                <TextField
                    fullWidth
                    label="Người nhận"
                    margin="normal"
                    name="code"
                    type="text"
                    variant="outlined"
                />
              </Grid>
              <Grid
                    item
                    md={12}
                    sm={12}
                    xs={12}
                  >
                  <TextareaAutosize
                  style = {{width: '-webkit-fill-available'}}
                    rowsMax={100}
                    rowsMin={20}
                    aria-label="maximum height"
                    defaultValue=""
                  />
              </Grid>
              <br /><br /><br />
              <Grid
                    item
                    md={12}
                    sm={12}
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
                >
                  Gửi
                </Button>
              </Grid>

            </Grid>

          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default SettingsView;
