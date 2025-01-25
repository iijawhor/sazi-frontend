import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import { getData } from "../../exportFiles";

const initialState = {
  // assignments: [
  //   {
  //     id: 1,
  //     textAsssignment: "",
  //     pdfFile: "",
  //     title: "",
  //     grade: [],
  //     subject: "",
  //     totalMarks: "",
  //     createdBy: "",
  //     submittedBy: "",
  //     dueDate: "",
  //     isPublished: false
  //   }
  // ],
  loading: false,
  grades: [],
  subjects: [],
  assignments: [],
  assignment: [],
  error: ""
};
// export const getGrades = createAsyncThunk(
//   "assignments/get-grades",
//   async () => {
//     try {
//       const grades = await getData("/api/v1/assignments/get-grades");
//       return grades.json();
//     } catch (error) {
//       throw error.message;
//     }
//   }
// );
export const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    createAssignment: (state, action) => {
      const assignment = {
        id: nanoid(),
        textAsssignment: action.payload.textAsssignment,
        pdfFile: action.payload.pdfFile,
        title: action.payload.title,
        grade: action.payload.grade,
        subject: action.payload.subject,
        totalMarks: action.payload.totalMarks,
        createdBy: action.payload.createdBy,
        submittedBy: action.payload.submittedBy,
        dueDate: action.payload.dueDate,
        isPublished: action.payload.isPublished
      };
      state.assignments.push(assignment);
    },
    removeAssignment: (state, action) => {
      state.assignments = state.assignments.filter(
        (assignment) => assignment.id !== action.payload.id
      );
    },

    updateAssignment: (state, action) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment.id === action.payload
          ? { ...assignment, ...action.payload }
          : assignment
      );
    },

    getGrades: (state, action) => {
      state.grades = action.payload;
    },

    getSubjects: (state, action) => {
      state.subjects = action.payload;
    },
    allAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    getAssignment: (state, action) => {
      state.assignment = action.payload;
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getGrades.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(getGrades.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.grades = action.payload.grades || [];
  //     })
  //     .addCase(getGrades.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload || "Something went wrong";
  //     });
  // }
});

export const {
  createAssignment,
  removeAssignment,
  updateAssignment,
  getGrades,
  getSubjects,
  allAssignments,
  getAssignment
} = assignmentSlice.actions;
export default assignmentSlice.reducer;
