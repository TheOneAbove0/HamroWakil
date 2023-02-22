import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  Container,
  Typography,
  ListItem,
  List,
  Button,
} from "@mui/material";
import Navbar from "./Navbar";
import { db } from "../Firebase";
import { container, paper, listItem, typography } from "./styles";

const Lawyers = () => {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // FUNCTION TO VERIFY DOCTOR'S PROFILE
  const handleVerify = (uid) => {
    db.collection("lawyers").doc(uid).update({
      isVerified: "true",
      unreadCount: 1,
      updatedAt: new Date(),
    });

    db.collection("lawyers").doc(uid).collection("notifications").add({
      message: "Your profile has been verified by the admin!",
      sentAt: new Date(),
    });
  };

  // FUNCTION TO UNVERIFY DOCTOR'S PROFILE
  const handleUnverify = (uid) => {
    db.collection("lawyers").doc(uid).update({
      isVerified: "false",
      unreadCount: 1,
      updatedAt: new Date(),
    });

    db.collection("lawyers").doc(uid).collection("notifications").add({
      message: "Your profile has been unverified by the admin!",
      sentAt: new Date(),
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* UNVERIFIED DOCTORS */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={typography}>
              Unverified Lawyers
            </Typography>
            <Paper sx={paper}>
              <List>
                {lawyers.map((lawyer) => {
                  if (lawyer.isVerified === "pending")
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Name: {lawyer.name} <br />
                              Age: {lawyer.age} years <br />
                              Gender: {lawyer.gender} <br />
                              Lawyer Speciality: {
                                lawyer.lawSpeciality
                              }{" "}
                              <br />
                              Degree: {lawyer.degree} <br />
                              Experience: {lawyer.experience} years <br />
                              Reg. No.: {lawyer.regNumber} <br />
                              State Medical Council:{" "}
                              {lawyer.stateMedicalCouncil} <br />
                              Address: {lawyer.address1}, {lawyer.address2},{" "}
                              {lawyer.city}, {lawyer.state}, {lawyer.country},{" "}
                              {lawyer.pincode}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleVerify(lawyer.uid)}
                            >
                              Verify
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>

          {/* VERIFIED DOCTORS */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={typography}>
              Verified Lawyers
            </Typography>
            <Paper sx={paper}>
              <List>
                {lawyers.map((lawyer) => {
                  if (lawyer.isVerified == "true")
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Name: {lawyer.name} <br />
                              Age: {lawyer.age} years <br />
                              Gender: {lawyer.gender} <br />
                              Medical Speciality: {
                                lawyer.medicalSpeciality
                              }{" "}
                              <br />
                              Degree: {lawyer.degree} <br />
                              Experience: {lawyer.experience} years <br />
                              Reg. No.: {lawyer.regNumber} <br />
                              State Medical Council:{" "}
                              {lawyer.stateMedicalCouncil} <br />
                              Address: {lawyer.address1}, {lawyer.address2},{" "}
                              {lawyer.city}, {lawyer.state}, {lawyer.country},{" "}
                              {lawyer.pincode}
                            </Typography>
                          </Grid>
                          <Grid item xs={12} sm={3}>
                            <Button
                              variant="contained"
                              onClick={() => handleUnverify(lawyer.uid)}
                            >
                              Unverify
                            </Button>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Lawyers;
