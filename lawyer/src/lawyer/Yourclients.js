import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "./Navbar";
import { db } from "../Firebase";
import { Container, List, ListItem, Typography } from "@mui/material";
import { container, listItem, typography } from "./styles";
import ClientList from "./Clientlist";

const YourClients = () => {
  const [yourClients, setYourClients] = useState([]);
  const { currentUser } = useAuth();

  // FETCHING LAWYER'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers")
      .doc(currentUser.uid)
      .collection("clients")
      .onSnapshot((snapshot) => {
        setYourClients(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  // console.log(yourClients);

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={container}>
        <Typography variant="h4" align="center" sx={typography}>
          Your Clients
        </Typography>
        <List>
          {yourClients.map((yourClient) => {
            {
              return (
                <ListItem sx={listItem} key={yourClient.clientUID}>
                  <ClientList uid={yourClient.clientUID} />
                </ListItem>
              );
            }
          })}
        </List>
      </Container>
    </>
  );
};

export default YourClients;
