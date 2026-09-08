import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Home as HomeIcon,
  VideoCameraFront as VideoIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import "../styles/History.css";

export default function History() {
  const { getHistoryOfUser, deleteFromHistory } = useContext(AuthContext);

  const [meetings, setMeetings] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [meetingToDelete, setMeetingToDelete] = useState(null);

  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // IMPLEMENT SNACKBAR
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  const openConfirmDialog = (meetingId) => {
    setMeetingToDelete(meetingId);
    setConfirmOpen(true);
  };

  const closeConfirmDialog = () => {
    setMeetingToDelete(null);
    setConfirmOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteFromHistory(meetingToDelete);
      setMeetings((prev) => prev.filter((m) => m._id !== meetingToDelete));
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      closeConfirmDialog();
    }
  };

  return (
    <div className="historyContainer">
      <div className="historyHeader">
        <IconButton
          className="historyHomeIcon"
          onClick={() => {
            routeTo("/home");
          }}
        >
          <HomeIcon />
        </IconButton>
        <p className="historyTitle">Meeting history</p>
      </div>

      {meetings.length !== 0 ? (
        <div className="historyTimeline">
          {meetings.map((e) => (
            <div className="historyTimelineItem" key={e._id}>
              <div className="historyTimelineIcon">
                <VideoIcon />
              </div>
              <div className="historyTimelineContent">
                <p className="historyCode">{e.meetingCode}</p>
                <span className="historyDate">{formatDate(e.date)}</span>
              </div>
              <IconButton
                className="historyDeleteIcon"
                onClick={() => openConfirmDialog(e._id)}
              >
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
        </div>
      ) : (
        <p className="historyEmpty">No meetings yet</p>
      )}

      <Dialog
        open={confirmOpen}
        onClose={closeConfirmDialog}
        PaperProps={{ className: "confirmDialogPaper" }}
      >
        <DialogTitle className="confirmDialogTitle">
          Are you sure you want to delete?
        </DialogTitle>
        <DialogActions className="confirmDialogActions">
          <Button onClick={closeConfirmDialog} className="confirmCancelButton">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} className="confirmDeleteButton">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
