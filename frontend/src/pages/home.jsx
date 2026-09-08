import { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import { Restore as RestoreIcon } from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";

function Home() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const handleJoinVideoCall = async () => {
    try {
      if (!meetingCode.trim()) return;

      navigate(`/${meetingCode}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="homeContainer">
      <div className="homeNavBar">
        <p className="homeLogo">
          Link<span>Live</span>
        </p>

        <div className="homeNavRight">
          <IconButton
            onClick={() => navigate("/history")}
            className="homeHistoryIcon"
          >
            <RestoreIcon />
          </IconButton>

          <p className="homeHistoryText" onClick={() => navigate("/history")}>
            History
          </p>

          <Button
            className="homeLogoutButton"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      <div className="homeMeetContainer">
        <div className="homeLeftPanel">
          <h2 className="homeHeading">
            Your space to <span>connect live</span>
          </h2>
          <p className="homeSubtext">
            Enter a code to join, or start a new meeting
          </p>

          <div className="homeJoinRow">
            <TextField
              className="homeTextField"
              value={meetingCode}
              onChange={(e) => setMeetingCode(e.target.value)}
              label="Meeting code"
              variant="outlined"
            />

            <Button
              className="homeJoinButton"
              onClick={handleJoinVideoCall}
              variant="contained"
            >
              Join
            </Button>
          </div>
        </div>

        <div className="homeRightPanel">
          <svg
            viewBox="0 0 160 220"
            width="160"
            height="220"
            className="homePhoneIllustration"
          >
            <rect
              x="35"
              y="10"
              width="90"
              height="180"
              rx="14"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
            />
            <rect x="70" y="18" width="20" height="4" rx="2" fill="white" />
            <circle
              cx="80"
              cy="95"
              r="34"
              fill="#0a0e27"
              stroke="#d97500"
              strokeWidth="2.5"
            />
            <circle cx="80" cy="86" r="12" fill="#d97500" />
            <path
              d="M60 118 Q80 100 100 118 L100 130 L60 130 Z"
              fill="#d97500"
            />
            <line
              x1="10"
              y1="200"
              x2="150"
              y2="200"
              stroke="#333"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Home);
