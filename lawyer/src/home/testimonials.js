import * as React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { card, message, testimonialsTitle } from "./styles";

const theme = createTheme();

const Testimonials = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography variant="h3" sx={testimonialsTitle}>
            Our Clients Testimonials...
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card sx={card}>
                <CardMedia
                  component="img"
                  image="images/ts1.jpeg"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={message}
                  >
                    "I would like to let you know how much we appreciate the
                    special care our daughter was given by the lawyer and
                    staff."
                  </Typography>
                  <Typography variant="h6">- Hari</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={card}>
                <CardMedia
                  component="img"
                  image="images/ts2.jpeg"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={message}
                  >
                    "The waiting time for getting an appointment approved is too
                    less and that's why I like HamroWakil!"
                  </Typography>
                  <Typography variant="h6">- Shayam</Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Card sx={card}>
                <CardMedia
                  component="img"
                  image="images/ts3.jpeg"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h2"
                    sx={message}
                  >
                    " I recomment it all working professionals who don't have
                    much time to wait at a office or visit a lawyer
                    physically."
                  </Typography>
                  <Typography variant="h6">- Nyisha</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
};

export default Testimonials;
