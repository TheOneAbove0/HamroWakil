import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { db } from "../Firebase";
import { useAuth } from "../contexts/AuthContext";
import {
  Avatar,
  Button,
  Container,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import { container, listItem, typography } from "./styles";
import Title from "./dashboard/Title";

const ViewLawyers = () => {
  const [lawyers, setLawyers] = useState([]);
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const { currentUser } = useAuth();

  // FETCHING CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClients(snapshot.docs.map((doc) => doc.data()));
    });
  });

  // FETCHING LAWYER'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  useEffect(() => {
    setSearch("");
  }, []);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Typography align="center" variant="h4" sx={typography}>
          Book Appointment with any Lawyer - Click on See More
        </Typography>

        {/* SEARCH BAR */}
        <TextField
          margin="normal"
          fullWidth
          id="search"
          label="Search by Name/Speciality/City"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {clients.map((client) => {
          if (client.uid === currentUser.uid)
            if (client.isVerified === "true") {
              return (
                <List>
                  {lawyers
                    .filter((lawyer) => {
                      if (lawyer.isVerified === "true") {
                        if (search == "") return lawyer;
                        else if (
                          lawyer.name
                            .toLowerCase()
                            .includes(search.toLocaleLowerCase())
                        )
                          return lawyer;
                        else if (
                          lawyer.lawSpeciality
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                          return lawyer;
                        else if (
                          lawyer.city
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                          return lawyer;
                      }
                    })
                    .map((lawyer) => {
                      return (
                        <ListItem sx={listItem}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={3} md={3}>
                              <Avatar
                                alt="Lawyer_Profile_Image"
                                src={`${lawyer.imageURL}`}
                                sx={{
                                  width: 100,
                                  height: 100,
                                  border: "1px solid #08475e",
                                }}
                              />
                            </Grid>

                            <Grid item xs={12} sm={6} md={6}>
                              <Typography
                                variant="h6"
                                color="primary"
                                gutterBottom
                                sx={{ fontWeight: "bold" }}
                              >
                                {lawyer.name} <br />
                                {lawyer.lawSpeciality} <br />
                                {lawyer.city} <br />
                                Time Slot :{" "}
                                {new Date(
                                  lawyer.startTime.seconds * 1000
                                ).getHours()}
                                :
                                {new Date(
                                  lawyer.startTime.seconds * 1000
                                ).getMinutes()}
                                0 -{" "}
                                {new Date(
                                  lawyer.endTime.seconds * 1000
                                ).getHours()}
                                :
                                {new Date(
                                  lawyer.endTime.seconds * 1000
                                ).getMinutes()}
                                0 hrs
                              </Typography>
                            </Grid>

                            <Grid item xs={12} sm={3} md={3}>
                              <Button
                                variant="contained"
                                href={`/lawyerprofile/${lawyer.uid}`}
                                target="_blank"
                              >
                                See more
                              </Button>
                            </Grid>
                          </Grid>
                        </ListItem>
                      );
                    })}
                </List>
              );
            } else {
              return (
                <Title>
                  <br />
                  You first need to complete your details! <br />
                  Head on to the Dashboard Section.
                </Title>
              );
            }
        })}
      </Container>
    </>
  );
};

export default ViewLawyers;
