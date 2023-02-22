import React from "react";
import { Grid, Paper, Container, Typography } from "@mui/material";
import Navbar from "./Navbar";
import { container, paper, typography } from "./styles";

const AdminDashboard = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" sx={typography}>
              ADMIN DASHBOARD
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={paper}>
              <Typography variant="h6">
                <b>Your job is to: </b>
                <br />
                Verify lawyers by visiting the National Lawyer Council Page{" "}
                <br />
                Keep a check on clients <br />
                Create new posts/updates for all users <br />
                Read feedbacks and respond to them!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default AdminDashboard;
