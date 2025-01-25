import React, { useEffect, useState } from "react";
import "./CreateAssignment.css";
import { Button, Input } from "../../exportFiles";
import { postData } from "../../exportFiles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getGrades, getSubjects } from "../../store/slices/assignmentSlice";
const CreateAssignment = ({ closeCreateAssignmentPopup, setMode, mode }) => {
  const userDetails = useSelector((state) => state.user.userDetails);

  const grades = useSelector((state) => state.assignment.grades);
  const subjects = useSelector((state) => state.assignment.subjects);
  const accessToken = userDetails.accessToken;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchGrads = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/assignments/get-grades",
          {
            headers: {
              Authorization: accessToken // Add the token to the Authorization header
            }
          }
        );
        const { grades, subjects } = response.data.data;

        dispatch(getGrades(grades));
        dispatch(getSubjects(subjects));
      } catch (error) {
        console.log("Not able to fetch the enums", error);
      }
    };
    fetchGrads();
  }, []);
  const [error, setError] = useState();
  const [response, setResponse] = useState();
  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    subject: "",
    grade: "",
    totalMarks: "",
    dueDate: "",
    pdfFile: null // Initialize pdfFile as null
  });
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      setError(null); // Clear any previous errors
      setAssignmentData((prev) => ({
        ...prev,
        pdfFile: file // Update the pdfFile field with the selected file
      }));
    } else {
      setAssignmentData((prev) => ({
        ...prev,
        [name]: value // Update other text fields dynamically
      }));
    }
  };
  // Fetch assignment data from the Redux store (you should ensure you have this data in your state)
  const assignment = useSelector((state) => state.assignment.assignment);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        assignmentData.title,
        assignmentData.totalMarks,
        assignmentData.grade,
        assignmentData.subject,
        assignmentData.dueDate
      ].some((field) => field?.trim() === "")
    ) {
      setResponse("All fields are required");
      return; // Prevent form submission if validation fails
    }

    if (!assignmentData.description && !assignmentData.pdfFile) {
      throw new Error("Either a PDF file or text assignment is required");
    }

    let formData = new FormData();

    // If creating a new assignment
    Object.entries(assignmentData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      // Handle create or update request based on the mode
      await axios.post(
        "http://localhost:4000/api/v1/assignments/create-assignment",
        formData,
        {
          headers: {
            Authorization: accessToken,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResponse(response);
      setError("");

      // Reset the form fields if successful
      setAssignmentData({
        title: "",
        description: "",
        grade: "",
        totalMarks: "",
        subject: "",
        dueDate: "",
        pdfFile: null
      });
    } catch (error) {
      setError(error?.response);
    }
  };

  return (
    <div className="create-assignment">
      <div className="create-assignment-header">
        <p>Create Assignment</p>
        <Button
          onClick={closeCreateAssignmentPopup}
          button="Close
        "
          className="close-button"
        />
      </div>
      <div>
        <form className="create-assignment-form" onSubmit={handleSubmit}>
          <div className="assignment-form-input-container">
            <Input
              onChange={(e) => handleChange(e)}
              name="title"
              value={assignmentData.title}
              placeholder="Add title"
              className="title-input assignment-input"
            />
          </div>
          <div className="assignment-form-input-container assignment-description-file-container">
            <textarea
              onChange={(e) => handleChange(e)}
              name="description"
              value={assignmentData.description}
              placeholder="Add Description"
              className="description-input assignment-input"
            />

            <Input
              onChange={(e) => handleChange(e)}
              name="pdfFile"
              type="file"
              accept="*"
              //   placeholder="Add title"
              className="title-input assignment-input"
            />
          </div>

          <div className="assignment-form-input-container assignment-subject-grade-option-container">
            <div>
              <label className="assignment-lebel" for="languages">
                Select subject:
              </label>
              <select
                name="subject"
                id="subject"
                onChange={(e) => handleChange(e)}
                value={assignmentData.subject} // Ensure this binds correctly to the state
              >
                <option value="">Select Subject</option> {/* Default option */}
                {subjects.map((subject) => (
                  <option
                    className="assignment-option"
                    key={subject}
                    value={subject}
                  >
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="assignment-lebel" for="grades">
                Select Grade:
              </label>
              <select
                name="grade"
                id="grades"
                onChange={(e) => handleChange(e)}
                value={assignmentData.grade} // Ensure this binds correctly to the state
              >
                <option value="">Select Grade</option> {/* Default option */}
                {grades.map((grade) => (
                  <option
                    className="assignment-option"
                    key={grade}
                    value={grade}
                  >
                    {grade}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="assignment-lebel" for="grades">
                Enter Marks
              </label>
              <Input
                onChange={(e) => handleChange(e)}
                name="totalMarks"
                value={assignmentData.totalMarks}
                placeholder="Assignment marks"
                className="title-input assignment-input"
              />
            </div>
          </div>
          <div>
            <div>
              <label className="assignment-lebel" for="dueDate">
                Due Date
              </label>
              <Input
                onChange={(e) => handleChange(e)}
                type="datetime-local"
                name="dueDate"
                value={assignmentData.dueDate}
                className="title-input assignment-input"
              />
            </div>
          </div>
          <Button
            type="submit"
            button={
              mode === "update" ? "update assignment" : "create assignment"
            }
            className="create-assignment-button"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
