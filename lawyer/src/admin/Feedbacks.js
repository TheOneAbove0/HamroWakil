import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Paper,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "./Navbar";
import { container, paper, typography } from "./styles";

const Feedbacks = () => {
  const [posts, setPosts] = useState([]);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container>
          <Grid item xs={12}>
            {/* LATEST UPDATES */}
            <Typography variant="h4" align="center" sx={typography}>
              Feedbacks
            </Typography>
            <Paper sx={paper}>
              <h1>No Feedbacks Yet!</h1>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Feedbacks;
