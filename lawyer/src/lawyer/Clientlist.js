import React, { useState, useEffect } from "react";
import { db } from "../Firebase";
import { Avatar, Button, Grid } from "@mui/material";
import Title from "./dashboard/Title";

const ClientList = (props) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {clients.map((client) => {
        if (client.uid === props.uid)
          return (
            <Grid container spacing={3}>
              <Grid item xs={12} sm={3} md={3}>
                <Avatar
                  alt="Client_Profile_Image"
                  src={`${client.imageURL}`}
                  sx={{
                    width: 100,
                    height: 100,
                    border: "1px solid #08475e",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <Title>{client.name}</Title>
              </Grid>

              <Grid item xs={12} sm={3} md={3}>
                <Button
                  variant="contained"
                  href={`/clientprofile/${props.uid}`}
                  target="_blank"
                >
                  See Profile
                </Button>
              </Grid>
            </Grid>
          );
      })}
    </>
  );
};

export default ClientList;
