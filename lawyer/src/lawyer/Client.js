import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { db } from "../Firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/Title";
import { container, paper, avatar, upload } from "./styles";
import PastAppointments from "./Pastappointments";

const Client = () => {
  const [clients, setClients] = useState([]);
  const { currentUser } = useAuth();

  const location = useLocation();
  const uid = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  // FETCHING CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        {clients.map((client) => {
          if (client.uid === uid)
            return (
              <Grid container spacing={3}>
                {/* CLIENT'S PROFILE IMAGE */}
                <Grid item xs={12} md={4} lg={3}>
                  <Paper sx={upload}>
                    <Title>{client.name}</Title>
                    <Avatar
                      alt="Client_Profile_Image"
                      src={`${client.imageURL}`}
                      sx={avatar}
                    />
                  </Paper>
                </Grid>

                {/* CLIENT'S PROFILE */}
                <Grid item xs={12} md={8} lg={9}>
                  <Paper
                    sx={{
                      height: "100%",
                      p: 2,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Title>Profile</Title>
                    <Typography>Name: {client.name}</Typography>
                    <Typography>Age: {client.age}</Typography>
                    <Typography>Gender: {client.gender}</Typography>
                    <Typography>
                      Address: {client.address1}, {client.address2},{" "}
                      {client.city}, {client.state}, {client.country},{" "}
                      {client.pincode}
                    </Typography>
                  </Paper>
                </Grid>

                <Grid item xs={12}>
                  <Paper sx={paper}>
                    <PastAppointments
                      clientUID={client.uid}
                      lawyerUID={currentUser.uid}
                    />
                  </Paper>
                </Grid>
              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default Client;
