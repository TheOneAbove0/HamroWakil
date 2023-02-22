import React, { useState, useEffect } from "react";
import { db } from "../../Firebase";
import { useAuth } from "../../contexts/AuthContext";
import {
  IconButton,
  Button,
  TextField,
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
import SendIcon from "@mui/icons-material/Send";
import DownloadIcon from "@mui/icons-material/Download";
import { jsPDF } from "jspdf";

const Suggestion = (props) => {
  const [open, setOpen] = useState(false);
  const { currentUser } = useAuth();
  const [lawyers, setLawyers] = useState([]);
  const [clients, setClients] = useState([]);
  const [suggestion, setSuggestion] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  var lawyerName = "";
  var lawyerSpeciality = "";
  var clientName = "";
  var clientAge = "";
  var clientGender = "";

  var date = new Date().toLocaleDateString("en-US");

  // FETCH Lawyer'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // FETCH Client'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  //FETCHING ALL SuggestionS FROM DATABASE
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

  //SEND Suggestion FUNCTION
  const sendSuggestion = (e) => {
    e.preventDefault();

    //PUSHING MESSAGE IN DATABASE
    db.collection("lawyers")
      .doc(`${props.lawyerUID}`)
      .collection("clients")
      .doc(`${props.clientUID}`)
      .collection("suggestions")
      .add({
        suggestion: suggestion,
        senderUid: props.lawyerUID,
        senderEmail: currentUser.email,
        sentAt: new Date(),
        appointmentID: props.meetingID,
      });

    setSuggestion("");
  };

  //DOWNLOAD Suggestion FUNCTION
  const downloadSuggestion = () => {
    var doc = new jsPDF();
    var i = 20;
    var j = 120;
    doc.setFontSize("15");
    doc.addImage("/images/Medicare.png", "PNG", 5, 5, 200, 15);
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
    suggestions.map((prescript) => {
      doc.text(prescript.suggestion, i, j);
      j = j + 10;
    });
    doc.save("lawyersuggestion.pdf");
  };

  return (
    <div>
      {/* Suggestion BUTTON */}

      <Tooltip title="Suggestion" placement="top">
        <IconButton onClick={handleClickOpen} style={{ color: "#ffffff" }}>
          <MedicationIcon />
        </IconButton>
      </Tooltip>

      {/* Suggestion DIALOG BOX */}

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
              <ListItem style={{ margin: "0" }}>
                <Typography sx={{ fontWeight: "bold" }}>
                  {currentUser.email}
                </Typography>
              </ListItem>
              {suggestions.map((prescript) => {
                if (prescript.appointmentID === props.meetingID)
                  return (
                    <>
                      <ListItem style={{ margin: "0" }}>
                        <Typography>{prescript.suggestion}</Typography>
                      </ListItem>
                    </>
                  );
              })}
            </List>
          </DialogContentText>

          {/* FORM TO WRITE Suggestion */}

          <form onSubmit={sendSuggestion}>
            <TextField
              id="outlined"
              required
              label="Suggestion"
              color="primary"
              placeholder="Enter suggestion..."
              value={suggestion}
              onChange={(e) => {
                setSuggestion(e.target.value);
              }}
            />
            <Button type="submit" startIcon={<SendIcon />} />
          </form>
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
