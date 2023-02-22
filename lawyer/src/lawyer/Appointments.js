import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "../contexts/AuthContext";
import {
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  Button,
  ButtonGroup,
} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { db } from "../Firebase";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import {
  container,
  paper,
  listItem,
  confirmButton,
  cancelButton,
} from "./styles";
import Title from "./dashboard/Title";

const theme = createTheme();

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const history = useHistory();
  const { currentUser } = useAuth();

  // FETCHING APPOINTMENTS' DATA FROM DB
  useEffect(() => {
    db.collection("appointments")
      .orderBy("timeSlot", "asc")
      .onSnapshot((snapshot) => {
        setAppointments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  // HANDLE APPOINTMENT CONFIRM BUTTON
  const handleConfirm = (docID, clientUID) => {
    db.collection("appointments").doc(docID).update({
      isConfirmed: "true",
    });

    db.collection("lawyers")
      .doc(currentUser.uid)
      .collection("clients")
      .doc(clientUID)
      .set({
        clientUID: clientUID,
      });

    db.collection("clients")
      .doc(clientUID)
      .collection("lawyers")
      .doc(currentUser.uid)
      .set({
        lawyerUID: currentUser.uid,
      });

    db.collection("clients").doc(clientUID).collection("notifications").add({
      message:
        "Your appointment has been confirmed! You can check its details in the scheduled meetings section.",
      sentAt: new Date(),
    });

    db.collection("clients").doc(clientUID).update({
      unreadCount: 1,
    });

    history.push("/lawyer/scheduledmeetings");
  };

  // HANDLE APPOINTMENT CANCEL BUTTON
  const handleCancel = (docID, clientUID) => {
    db.collection("appointments").doc(docID).update({
      isConfirmed: "false",
    });

    db.collection("clients").doc(clientUID).collection("notifications").add({
      message: "Your appointment has been cancelled!",
      sentAt: new Date(),
    });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Grid container spacing={3}>
          {/* LIST OF NEW APPOINTMENTS */}
          <Grid item xs={12}>
            <Title>New Appointments</Title>
            <Paper sx={paper}>
              <List>
                {appointments.map((appointment) => {
                  if (
                    appointment.isConfirmed === "pending" &&
                    appointment.lawyerUID === currentUser.uid
                  )
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={6} md={9}>
                            <Typography>
                              Mode: {appointment.mode} <br />
                              Slot:{" "}
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).toLocaleDateString("en-US")}
                              ,
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getHours()}
                              :
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getMinutes()}
                              <br />
                              Symptoms: {appointment.markings}
                            </Typography>
                          </Grid>

                          {/* CONFIRM BUTTON */}
                          <Grid item xs={12} sm={6} md={3}>
                            <ButtonGroup
                              variant="contained"
                              sx={{
                                [theme.breakpoints.down("md")]: {
                                  size: "small",
                                },
                              }}
                            >
                              <div
                                onClick={(e) =>
                                  db.doc(`meetings/${appointment.id}`).set({
                                    meetingID: appointment.id,
                                    lawyerUID: appointment.lawyerUID,
                                    clientUID: appointment.clientUID,
                                    scheduledAt: appointment.timeSlot,
                                    mode: appointment.mode,
                                  })
                                }
                              >
                                <Button
                                  startIcon={<DoneIcon />}
                                  sx={confirmButton}
                                  onClick={() =>
                                    handleConfirm(
                                      appointment.id,
                                      appointment.clientUID
                                    )
                                  }
                                >
                                  Confirm
                                </Button>
                              </div>

                              {/* CANCEL BUTTON */}
                              <Button
                                startIcon={<CloseIcon />}
                                sx={cancelButton}
                                onClick={() =>
                                  handleCancel(
                                    appointment.id,
                                    appointment.clientUID
                                  )
                                }
                              >
                                Cancel
                              </Button>
                            </ButtonGroup>
                          </Grid>
                        </Grid>
                      </ListItem>
                    );
                })}
              </List>
            </Paper>
          </Grid>

          {/* LIST OF CONFIRMED APPOINTMENTS */}
          <Grid item xs={12}>
            <Title>Confirmed Appointments</Title>
            <Paper sx={paper}>
              <List>
                {appointments.map((appointment) => {
                  if (
                    appointment.isConfirmed === "true" &&
                    appointment.lawyerUID === currentUser.uid
                  )
                    return (
                      <ListItem sx={listItem}>
                        <Grid container>
                          <Grid item xs={12} sm={9}>
                            <Typography>
                              Mode: {appointment.mode} <br />
                              Slot:{" "}
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).toLocaleDateString("en-US")}
                              ,
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getHours()}
                              :
                              {new Date(
                                appointment.timeSlot.seconds * 1000
                              ).getMinutes()}
                              <br />
                              Symptoms: {appointment.markings}
                            </Typography>
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

export default Appointments;
