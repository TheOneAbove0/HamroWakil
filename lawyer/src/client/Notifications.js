import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../Firebase";
import { Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

const Notifications = () => {
  const [clients, setClients] = useState([]);
  const { currentUser } = useAuth();

  // FETCHING CLIENT'S DATA FROM DB
  useEffect(() => {
    db.collection("clients").onSnapshot((snapshot) => {
      setClients(snapshot.docs.map((doc) => doc.data()));
    });
  }, []);

  return (
    <>
      {clients.map((client) => {
        if (client.uid === currentUser.uid)
          return (
            <Badge badgeContent={client.unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          );
      })}
    </>
  );
};

export default Notifications;
