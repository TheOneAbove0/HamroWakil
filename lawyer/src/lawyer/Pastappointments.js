import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { Grid, List, ListItem, Typography } from "@mui/material";
import { container, listItem, typography } from "./styles";
// import Appointments from "../client/Appointments";
import Title from "./dashboard/Title";

const PastAppointments = (props) => {
  const [appointments, setAppointments] = useState([]);

  // FETCHING APPOINTMENTS' DATA FROM DB
  useEffect(() => {
    db.collection("appointments")
      .orderBy("timeSlot", "desc")
      .onSnapshot((snapshot) => {
        setAppointments(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);

  return (
    <>
      <Title>Past Appointments</Title>
      <List>
        {appointments.map((appointment) => {
          if (
            appointment.isConfirmed === "true" &&
            appointment.lawyerUID === props.lawyerUID &&
            appointment.clientUID === props.clientUID
          )
            return (
              <ListItem sx={listItem}>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <b>Mode:</b> {appointment.mode} <br />
                      <b>Slot:</b>{" "}
                      {new Date(
                        appointment.timeSlot.seconds * 1000
                      ).toLocaleDateString("en-US")}
                      ,
                      {new Date(appointment.timeSlot.seconds * 1000).getHours()}
                      :
                      {new Date(
                        appointment.timeSlot.seconds * 1000
                      ).getMinutes()}
                      <br />
                      <b>Symptoms:</b> {appointment.markings}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <b>Suggestion: </b>
                      {/* <Appointments
                        appointmentID={appointment.id}
                        lawyerUID={appointment.lawyerUID}
                        clientUID={appointment.clientUID}
                      /> */}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            );
        })}
      </List>
    </>
  );
};

export default PastAppointments;
