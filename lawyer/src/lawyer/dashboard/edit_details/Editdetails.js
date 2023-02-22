import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Title from "../Title";
import Age from "./Age";
import Address from "./Address";
import Degree from "./Degree";
import Experience from "./Experience";
import TimeSlot from "./TimeSlot";

const theme = createTheme();

const EditDetails = (props) => {
  const [lawyers, setLawyers] = useState([]);

  // FETCHING CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {lawyers.map((lawyer) => {
          if (lawyer.uid === props.uid)
            return (
              <Grid container spacing={1} key={lawyer.uid}>
                <Grid item xs={12}>
                  <Title>Your Profile has been verified!</Title>
                  <Typography variant="subtitle2" gutterBottom>
                    (You can still edit your details)
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Name: {lawyer.name}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>Gender: {lawyer.gender}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <Typography>
                    Law Speciality: {lawyer.lawSpeciality}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Experience: {lawyer.experience} years
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Experience uid={lawyer.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Age: {lawyer.age} years</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Age uid={lawyer.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Degree: {lawyer.degree}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Degree uid={lawyer.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Address: {lawyer.address1}, {lawyer.address2},
                        <br />
                        {lawyer.city}, {lawyer.state}, {lawyer.country},{" "}
                        {lawyer.pincode}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Address uid={lawyer.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Time Slot :{" "}
                        {new Date(lawyer.startTime.seconds * 1000).getHours()}:
                        {new Date(lawyer.startTime.seconds * 1000).getMinutes()}
                        0 - {new Date(lawyer.endTime.seconds * 1000).getHours()}
                        :{new Date(lawyer.endTime.seconds * 1000).getMinutes()}0
                        hrs
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <TimeSlot uid={lawyer.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <br />
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Last updated at:
                    {new Date(
                      lawyer.updatedAt.seconds * 1000
                    ).toLocaleDateString("en-US")}
                    ,{new Date(lawyer.updatedAt.seconds * 1000).getHours()}:
                    {new Date(lawyer.updatedAt.seconds * 1000).getMinutes()}
                  </Typography>
                </Grid>
              </Grid>
            );
        })}
      </Box>
    </ThemeProvider>
  );
};
export default EditDetails;
