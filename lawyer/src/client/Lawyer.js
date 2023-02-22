import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { db } from "../Firebase";
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import BookAppointment from "./Bookappointment";
import { container, paper, typography } from "./styles";
import Ratings from "../lawyer/Ratings";
import Reviews from "../lawyer/Reviews";

const Lawyer = () => {
  const [lawyers, setLawyers] = useState([]);
  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  // FETCHING CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        {lawyers.map((lawyer) => {
          if (lawyer.uid === uid)
            return (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography align="center" variant="h4" sx={typography}>
                    {lawyer.name}
                  </Typography>
                </Grid>

                {/* AVATAR */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={paper}>
                    <Avatar
                      alt="Lawyer's Profile Picture"
                      src={lawyer.imageURL}
                      sx={{ width: 100, height: 100, m: 2 }}
                    />
                    <BookAppointment
                      lawyerUID={uid}
                      startTime={lawyer.startTime}
                      endTime={lawyer.endTime}
                    />
                  </Paper>
                </Grid>

                {/* PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paper}>
                    <>
                      <Typography>Name: {lawyer.name}</Typography>

                      <Typography>
                        Law Speciality: {lawyer.lawSpeciality}
                      </Typography>
                      <Typography>
                        Experience: {lawyer.experience} years
                      </Typography>
                      <Typography>Age: {lawyer.age} years</Typography>
                      <Typography>Gender: {lawyer.gender}</Typography>
                      <Typography>Degree: {lawyer.degree}</Typography>
                      <Typography>
                        Address: {lawyer.address1}, {lawyer.address2},{" "}
                        {lawyer.city}, {lawyer.state}, {lawyer.country},{" "}
                        {lawyer.pincode}
                      </Typography>
                      <Typography>
                        Time Slot :{" "}
                        {new Date(lawyer.startTime.seconds * 1000).getHours()}:
                        {new Date(lawyer.startTime.seconds * 1000).getMinutes()}
                        0 - {new Date(lawyer.endTime.seconds * 1000).getHours()}
                        :{new Date(lawyer.endTime.seconds * 1000).getMinutes()}0
                        hrs
                      </Typography>
                    </>
                  </Paper>
                </Grid>

                {/* RATINGS */}
                <Grid item xs={12}>
                  <Ratings uid={lawyer.uid} />
                </Grid>

                {/* REVIEWS */}
                <Grid item xs={12}>
                  <Reviews uid={lawyer.uid} />
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </div>
  );
};

export default Lawyer;
