import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase";
import { Avatar, Container, Grid, Paper, Typography } from "@mui/material";
import Title from "./dashboard/Title";
import { container, paper, avatar, upload } from "./styles";


const ClientProfile = () => {
  const { currentUser } = useAuth();
  const [client, setClient] = useState([]);

  // FETCHING CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClient(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        {client.map((client) => {
          if (client.uid === currentUser.uid)
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
                  <Paper sx={paper}>
                    <Title>Profile</Title>
                    <Typography sx={{ fontStyle: "italic" }}>
                      (You can update these details by going to the dashboard
                      tab)
                    </Typography>
                    <Typography>Name: {client.name}</Typography>
                    <Typography>Age: {client.age}</Typography>
                    <Typography>Gender: {client.gender}</Typography>
                    <Typography>Blood Group: {client.bloodGroup}</Typography>
                    <Typography>
                      Address: {client.address1}, {client.address2},{" "}
                      {client.city}, {client.state}, {client.country}
                    </Typography>
                    <Typography>Pincode: {client.pincode}</Typography>
                    <Typography variant="subtitle2">
                      Last updated at:{" "}
                      {new Date(
                        client.updatedAt.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      , at{" "}
                      {new Date(client.updatedAt.seconds * 1000).getHours()}:
                      {new Date(client.updatedAt.seconds * 1000).getMinutes()}{" "}
                      hrs
                    </Typography>
                  </Paper>
                </Grid>

              </Grid>
            );
        })}
      </Container>
    </>
  );
};

export default ClientProfile;
