import React, { useState, useEffect } from "react";
import { Alert, Avatar, Button, LinearProgress } from "@mui/material";
import Title from "./Title";
import { db, storage } from "../../Firebase";
import { avatar } from "../styles";

const Upload = (props) => {
  const [lawyers, setLawyers] = useState([]);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const [imageError, setImageError] = useState("");

  // FETCHING LAWYER'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  // FUNCTION TO HANDLE CHANGE IN IMAGE SELECTED TO UPLOAD
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // FUNCTION TO HANDLE UPLOAD OF IMAGE TO DB AND STORAGE
  const handleUpload = () => {
    if (image == null) {
      setImageError("Choose file before uploading!");
    } else {
      const uploadTask = storage
        .ref(`lawyer_profile_images/${image.name}`)
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
            .ref("lawyer_profile_images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              db.collection("lawyers")
                .doc(props.uid)
                .update({
                  imageURL: `${url}`,
                });
            });
        }
      );
      setImageError("");
    }
  };

  return (
    <React.Fragment>
      {lawyers.map((lawyer) => {
        if (lawyer.uid === props.uid)
          return (
            <>
              {/* LAWYER'S NAME */}
              <Title>{lawyer.name}</Title>

              {/* LAWYER'S PROFILE PICTURE */}
              <Avatar
                alt="Lawyer_Profile_Image"
                src={`${lawyer.imageURL}`}
                sx={avatar}
              />
              <br />
              {imageError && <Alert severity="error">{imageError}</Alert>}
              <br />
              {/* UPLOADING IMAGE PROGRESS BAR */}
              <LinearProgress variant="determinate" value={progress} />
              <br />
              {/* FILE INPUT OPTION */}
              <input type="file" onChange={handleChange} />
              <br />
              {/* UPLOAD IMAGE BUTTON */}
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
