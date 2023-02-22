import React from "react";
import { Grid, Paper, Container } from "@mui/material";
import { useAuth } from "../../contexts/AuthContext";
import Navbar from "../Navbar";
import Form from "./Form";
import Upload from "./Upload";
import { container, paper } from "../styles";
import { upload } from "../../client/styles";

const LawyerDashboard = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* UPLOAD PROFILE IMAGE */}
          <Grid item xs={12} md={4} lg={3}>
            <Paper sx={upload}>
              <Upload uid={currentUser.uid} />
            </Paper>
          </Grid>

          {/* FORM TO UPDATE DETAILS */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper sx={paper}>
              <Form uid={currentUser.uid} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default LawyerDashboard;
