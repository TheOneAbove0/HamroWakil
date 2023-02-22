import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import MedicationIcon from "@mui/icons-material/Medication";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

const Suggestion = (props) => {
  const [open, setOpen] = useState(false);
  const [lawyers, setLawyers] = useState([]);
  const [clients, setClients] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  var lawyerName = "";
  var lawyerSpeciality = "";
  var clientName = "";
  var clientAge = "";
  var clientGender = "";

  var date = new Date().toLocaleDateString("en-US");

  // FETCH LAWYER'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // FETCH CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  ///FETCHING ALL SUGGESTIONS FROM DATABASE
  useEffect(() => {
    db.collection(
      `lawyers/${props.lawyerUID}/clients/${props.clientUID}/suggestions`
    )
      .orderBy("sentAt", "asc")
      .onSnapshot((snapshot) => {
        setSuggestions(snapshot.docs.map((doc) => doc.data()));
      });
  }, [props.meetingID]);

  {
    lawyers.map((lawyer) => {
      if (lawyer.uid === props.lawyerUID) {
        lawyerName = lawyer.name;
        lawyerSpeciality = lawyer.lawSpeciality;
      }
    });
  }

  {
    clients.map((client) => {
      if (client.uid === props.clientUID) {
        clientName = client.name;
        clientAge = client.age;
        clientGender = client.gender;
      }
    });
  }

  //FUNCTIONS TO OPEN AND CLOSE DIALOG BOX
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //DOWNLOAD SUGGESTION FUNCTION
  const downloadSuggestion = () => {
    var doc = new jsPDF();
    var i = 20;
    var j = 120;
    doc.setFontSize("15");
    doc.addImage("/images/Hamrowakil.png", "PNG", 5, 5, 200, 15);
    doc.text("Date: ", 20, 30);
    doc.text(date, 50, 30);
    doc.text("Lawyer: ", 20, 40);
    doc.text(lawyerName, 50, 40);
    doc.text("Law Speciality: ", 20, 50);
    doc.text(lawyerSpeciality, 70, 50);
    doc.text("Client: ", 20, 70);
    doc.text(clientName, 50, 70);
    doc.text("Age: ", 20, 80);
    doc.text(clientAge, 50, 80);
    doc.text("Gender: ", 20, 90);
    doc.text(clientGender, 50, 90);
    doc.text("Suggestion: ", 20, 110);
    suggestions.map((suggest) => {
      doc.text(suggest.suggestion, i, j);
      j = j + 10;
    });
    doc.save("lawyersuggestion.pdf");
  };

  return (
    <div>
      {/* SUGGESTION BUTTON */}

      <Tooltip title="Suggestion" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <MedicationIcon />
        </IconButton>
      </Tooltip>

      {/* SUGGESTION DIALOG BOX */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">SUGGESTION</DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText>
            <List>
              {suggestions.map((suggest) => {
                if (suggest.appointmentID === props.meetingID)
                  return (
                    <>
                      <ListItem style={{ margin: "0" }}>
                        <Typography>{suggest.suggestion}</Typography>
                      </ListItem>
                    </>
                  );
              })}
            </List>
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          {/* DOWNLOAD REPORT BUTTON */}
          <Button
            onClick={downloadSuggestion}
            style={{
              textTransform: "none",
              margin: "2%",
            }}
            startIcon={<DownloadIcon />}
          >
            Download Suggestion
          </Button>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Suggestion;
