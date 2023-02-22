import React, { useState, useEffect } from "react";
import { db } from "../../../Firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Grid, Typography } from "@mui/material";
import Title from "../Title";
import Name from "./Name";
import Gender from "./Gender";
import Age from "./Age";
import Address from "./Address";

const theme = createTheme();

const EditDetails = (props) => {
  const [client, setClient] = useState([]);

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClient(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {client.map((client) => {
          if (client.uid === props.uid)
            return (
              <Grid container spacing={1} key={client.uid}>
                <Grid item xs={12}>
                  <Title>Your Profile has been verified!</Title>
                  <Typography variant="subtitle2" gutterBottom>
                    (You can still edit your details)
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Name: {client.name}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Name uid={client.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Gender: {client.gender}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Gender uid={client.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>Age: {client.age}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Age uid={client.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Grid container>
                    <Grid item xs={10}>
                      <Typography>
                        Address: {client.address1}, {client.address2},
                        <br />
                        {client.city}, {client.state}, {client.country},{" "}
                        {client.pincode}
                      </Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Address uid={client.uid} />
                    </Grid>
                  </Grid>
                </Grid>

                <br />
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Last updated at:
                    {new Date(
                      client.updatedAt.seconds * 1000
                    ).toLocaleDateString("en-US")}
                    ,{new Date(client.updatedAt.seconds * 1000).getHours()}:
                    {new Date(client.updatedAt.seconds * 1000).getMinutes()}
                  </Typography>
                </Grid>
              </Grid>
            );
        })}
      </Box>
    </ThemeProvider>
  );
};
export default EditDetails;
