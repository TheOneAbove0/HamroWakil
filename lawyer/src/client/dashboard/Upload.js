import React, { useState, useEffect } from "react";
import { Alert, Avatar, Button, LinearProgress } from "@mui/material";
import Title from "./Title";
import { db, storage } from "../../Firebase";
import { avatar } from "../styles";

const Upload = (props) => {
  const [clients, setClients] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState("");

  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (image == null) {
      setImageError("Choose file before uploading!");
    } else {
      const uploadTask = storage
        .ref(`client_profile_images/${image.name}`)
        .put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("client_profile_images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              db.collection("clients")
                .doc(props.uid)
                .update({
                  imageURL: `${url}`,
                });
            });
        }
      );
    }
  };

  return (
    <React.Fragment>
      {clients.map((client) => {
        if (client.uid === props.uid)
          return (
            <>
              <Title>{client.name}</Title>

              <Avatar
                alt="Client_Profile_Image"
                src={`${client.imageURL}`}
                sx={avatar}
              />
              <br />
              {imageError && <Alert severity="error">{imageError}</Alert>}
              <br />
              <LinearProgress variant="determinate" value={progress} />
              <br />
              <input type="file" onChange={handleChange} />
              <br />
              <Button variant="contained" onClick={handleUpload}>
                Upload
              </Button>
            </>
          );
      })}
    </React.Fragment>
  );
};

export default Upload;
