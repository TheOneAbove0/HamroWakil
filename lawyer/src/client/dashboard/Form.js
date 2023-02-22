import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CompleteDetails from "./Completedetails";
// import { Typography } from "@mui/material";
import EditDetails from "./edit_details/Editdetails";

const theme = createTheme();

const Form = (props) => {
  const [client, setClient] = useState([]);

  // FETCHING CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClient(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {client.map((client) => {
        if (client.uid === props.uid) {
          if (client.isVerified === "false")
            return <CompleteDetails uid={props.uid} />;
          else if (client.isVerified === "true")
            return <EditDetails uid={props.uid} />;
        }
      })}
    </ThemeProvider>
  );
};

export default Form;
