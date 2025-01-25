import React, { useEffect, useState } from "react";
import "./AssignmentPage.css";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import {
  Assignment,
  AssignmentSubmission,
  Button,
  CreateAssignment
} from "../../exportFiles";
import { allAssignments } from "../../store/slices/assignmentSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
const AssignmentPage = ({ props }) => {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const accessToken = user?.accessToken;
  const [mode, setMode] = useState("create");
  const userId = user.user?._id;
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const showCreateAssignmentHandler = () => {
    setMode("create");
    setShowCreateAssignment((prevState) => !prevState);
  };
  // make an api call to fetch all the assignments created by the user
  const getAsssignments = async () => {
    try {
      const assignments = await axios.get(
        `http://localhost:4000/api/v1/assignments/search?userId=${userId}`,
        {
          headers: {
            Authorization: accessToken
          }
        }
      );
      dispatch(allAssignments(assignments.data.data.docs));
    } catch (error) {
      console.log("Error while fetching the assignment");
    }
  };
  useEffect(() => {
    getAsssignments();
  }, []);
  const assignments = useSelector((state) => state.assignment.assignments);
  return (
    <div className="assignmentPage">
      <div className="assignmentPage-header">
        <p>Manage your assignments</p>
        <div className="create-assignmentPage-container ">
          <button
            className="showCreateAssignmentPagePopup"
            onClick={showCreateAssignmentHandler}
          >
            Create assignment.
            <span className="assign-icon">
              <NoteAddIcon style={{ fontSize: "20px" }} />
            </span>
          </button>
        </div>
      </div>
      {showCreateAssignment && (
        <div className="create-assignmentPage-popup-container ">
          <CreateAssignment
            closeCreateAssignmentPopup={showCreateAssignmentHandler}
            mode={mode}
          />
        </div>
      )}
      {/* assignment container and other things */}
      <div className="assignment-page-container">
        <h1 className="">Assignments</h1>
        <div className="assignment-capsules">
          {assignments?.map((assignment) => (
            <div className="assignment-capsule">
              <Assignment
                assignment={assignment}
                key={assignment._id}
                mode={mode}
                setMode={setMode}
                showCreateAssignment={showCreateAssignment}
                updateAssignmentPopup={setShowCreateAssignment}
                updateAssignmentHandler={showCreateAssignmentHandler}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="assignment-page-container">
        <h1 className="assignment-submission-title">Assignment Submissions</h1>
        <AssignmentSubmission />
      </div>
    </div>
  );
};

export default AssignmentPage;
