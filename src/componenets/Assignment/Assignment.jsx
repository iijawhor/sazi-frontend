import React, { useEffect, useState } from "react";
import "./Assignment.css";
import { Button, truncateText } from "../../exportFiles";
import FileDownloadSharpIcon from "@mui/icons-material/FileDownloadSharp";
import RemoveSharpIcon from "@mui/icons-material/RemoveSharp";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAssignment } from "../../store/slices/assignmentSlice";
const Assignment = ({
  assignment,
  updateAssignmentPopup,
  showCreateAssignment,
  setMode
}) => {
  const dispatch = useDispatch();
  const [response, setResponse] = useState("");
  const userDetails = useSelector((state) => state.user.userDetails);
  const accessToken = userDetails.accessToken;
  const [assignmentData, setAssignmentData] = useState();

  const deleteAssignment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/assignments/delete-assignment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}` // Include the token in the Authorization header
          }
        }
      );
      setResponse(response.data.data);
    } catch (error) {
      console.error(
        "Error while deleting the assignment:",
        error.response?.data || error.message
      );
    }
  };
  // fetch assignment which button is clicked
  const getAssignmentAndUpdate = async (id) => {
    setMode("update");
    updateAssignmentPopup(!showCreateAssignment);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/assignments/get-assignment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}` // Ensure correct format
          }
        }
      );
      dispatch(getAssignment(response.data));
      console.log("Assignment fetched successfully:", response.data);
    } catch (error) {
      console.error(
        "Error fetching assignment:",
        error.response?.data || error.message
      );
    }
  };

  const title = truncateText(assignment.title, 30);
  const description = truncateText(assignment.description, 120);
  return (
    <div className="assignment">
      <div className="assignment-header">
        <div className="assignment-header-title-container">
          <h5 className="assignment-header-title">{title}</h5>
          <p className="assignment-header-subject">{assignment.subject}</p>
        </div>
        <div className="assignment-header-right-buttons">
          <FileDownloadSharpIcon
            className="assignment-header-icon"
            style={{ fontSize: "22px", fontWeight: "400", color: "black" }}
          />
          <EditSharpIcon
            onClick={() => getAssignmentAndUpdate(assignment._id)}
            className="assignment-header-icon"
            style={{ fontSize: "22px", fontWeight: "400", color: "green" }}
          />
          <RemoveSharpIcon
            onClick={() => deleteAssignment(assignment._id)}
            className="assignment-header-icon"
            style={{ fontSize: "22px", fontWeight: "400", color: "red" }}
          />
        </div>
      </div>
      <div className="assignment-description">
        <p>{description}</p>
      </div>
      <div className="asssignment-bottom-container">
        <p>Due date : {assignment.dueDate}</p>
      </div>
    </div>
  );
};

export default Assignment;
