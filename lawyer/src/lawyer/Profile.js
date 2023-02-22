import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/Title";
import Ratings from "./Ratings";
import Reviews from "./Reviews";
import { container, paper, avatar, upload } from "./styles";

const LawyerProfile = () => {
  const { currentUser } = useAuth();
  const [lawyers, setLawyers] = useState([]);

  // FETCH LAWYER'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        {lawyers.map((lawyer) => {
          if (lawyer.uid === currentUser.uid)
            return (
              <Grid container spacing={3}>
                {/* LAWYER'S PROFILE IMAGE */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={upload}>
                    <Title>{lawyer.name}</Title>
                    <Avatar
                      alt="Lawyer_Profile_Image"
                      src={`${lawyer.imageURL}`}
                      sx={avatar}
                    />
                  </Paper>
                </Grid>

                {/* LAWYER'S PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper sx={paper}>
                    <Title>Profile</Title>
                    <Typography sx={{ fontStyle: "italic" }}>
                      (You can update these details by going to the dashboard
                      tab)
                    </Typography>
                    <br />

                    <Typography>Name: {lawyer.name}</Typography>
                    <Typography>
                      Law Speciality: {lawyer.lawSpeciality}
                    </Typography>
                    <Typography>
                      Experience: {lawyer.experience} years
                    </Typography>
                    <Typography>Age: {lawyer.age}</Typography>
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
                      {new Date(lawyer.startTime.seconds * 1000).getMinutes()}0
                      - {new Date(lawyer.endTime.seconds * 1000).getHours()}:
                      {new Date(lawyer.endTime.seconds * 1000).getMinutes()}0
                      hrs
                    </Typography>
                    <Typography variant="subtitle2">
                      Last updated at:{" "}
                      {new Date(
                        lawyer.updatedAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      , at{" "}
                      {new Date(lawyer.updatedAt.seconds * 1000).getHours()}:
                      {new Date(lawyer.updatedAt.seconds * 1000).getMinutes()}{" "}
                      hrs
                    </Typography>
                  </Paper>
                </Grid>

                {/* RATINGS */}
                <Grid item xs={12}>
                  <Ratings uid={currentUser.uid} />
                </Grid>

                {/* REVIEWS */}
                <Grid item xs={12}>
                  <Reviews uid={currentUser.uid} />
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default LawyerProfile;
