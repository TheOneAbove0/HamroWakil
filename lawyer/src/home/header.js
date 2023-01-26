import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { box, headerBox, headerPaper, raleway, subtitle } from "./styles";

const Header = () => {
  return (
    <Paper sx={headerPaper}>
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: "none" }}
          src={process.env.PUBLIC_URL + "images/home.png"}
          alt="HamroWalil"
        />
      }
      <Box sx={box} />

      {/* Text above image */}
      <Grid container>
        <Grid item md={6}>
          <Box sx={headerBox}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={subtitle}
            >
              "We are here for your rights..."
            </Typography>
            <Typography variant="h5" color="inherit" paragraph sx={raleway}>
            Consult from the best lawyer just by sitting at your home because we are here to fight for your rights.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
