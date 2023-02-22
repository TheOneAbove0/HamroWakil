import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

const View_Profile = (props) => {
  return (
    <div>
      {/* VIEW Client PROFILE BUTTON */}

      <Tooltip title="View Client Profile" placement="top">
        <IconButton
          target="_blank"
          href={`/clientprofile/${props.clientUID}`}
          style={{ color: "#ffffff" }}
        >
          <PersonIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default View_Profile;
