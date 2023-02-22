import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../../Firebase";
import Chat from "./Chat";
import Suggestion from "./Suggestion";
import Feedback from "./Feedback";

const Controls = () => {
  const [meetings, setMeetings] = useState([]);
  var props = [];
  //FETCHING MEETING CODE FROM URL
  const location = useLocation();
  const meetingCode = location.pathname.substring(
    location.pathname.lastIndexOf("/") + 1
  );

  //FETCHING ALL MEETINGS FROM DATABASE
  useEffect(() => {
    db.collection(`meetings`).onSnapshot((snapshot) => {
      setMeetings(snapshot.docs.map((doc) => doc.data()));
    });
  }, [meetingCode]);

  {
    meetings.map((meeting) => {
      if (meeting.meetingID === meetingCode)
        props = {
          meetingID: meeting.meetingID,
          lawyerUID: meeting.lawyerUID,
          clientUID: meeting.clientUID,
        };
    });
  }

  return (
    <>
      {meetings.map((meeting) => {
        if (meeting.meetingID === meetingCode)
          return (
            <>
              <Chat {...props} />
              <Suggestion {...props} />
              <Feedback {...props} />
            </>
          );
      })}
    </>
  );
};

export default Controls;
