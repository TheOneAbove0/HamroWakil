import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CompleteDetails from "./Completedetails";
import EditDetails from "./edit_details/Editdetails";
import Title from "./Title";

const theme = createTheme();

const Form = (props) => {
  const [lawyers, setLawyers] = useState([]);

  // FETCHING LAWYER'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {lawyers.map((lawyer) => {
        if (lawyer.uid === props.uid) {
          if (lawyer.isVerified === "false")
            return <CompleteDetails uid={props.uid} />;
          else if (lawyer.isVerified === "pending")
            return <Title>Verification is pending by Admin</Title>;
          else if (lawyer.isVerified === "true")
            return <EditDetails uid={props.uid} />;
        }
      })}
    </ThemeProvider>
  );
};

export default Form;
