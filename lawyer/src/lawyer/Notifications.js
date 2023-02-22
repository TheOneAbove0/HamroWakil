import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
  const [lawyers, setLawyers] = useState([]);
  const { currentUser } = useAuth();

  // FETCHING PATIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("lawyers").onSnapshot((snapshot) => {
      setLawyers(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {lawyers.map((lawyer) => {
        if (lawyer.uid === currentUser.uid)
          return (
            <Badge badgeContent={lawyer.unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          );
      })}
    </>
  );
};

export default Notifications;
