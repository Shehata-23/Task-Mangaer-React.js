import { createSlice } from "@reduxjs/toolkit";

let taskSlice = createSlice({
  name: "tasks",
  initialState: {
    count: 150,
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.count += 1;
      state.tasks.push(action.payload);
      let stingTasks = JSON.stringify(state.tasks);
      localStorage.setItem("tasks", stingTasks);
    },
    removeTask: (state, action) => {
      state.count -= 1;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      let stingTasks = JSON.stringify(state.tasks);
      localStorage.setItem("tasks", stingTasks);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      let stingTasks = JSON.stringify(state.tasks);
      localStorage.setItem("tasks", stingTasks);
      console.log(state.tasks);
    },
    cashedTasks: (state) => {
      const storedTasks = localStorage.getItem("tasks");
      if (storedTasks.length > 0) {
        
          state.tasks = JSON.parse(storedTasks);
      } else {
        state.tasks = []; 
      }
    },
  },
});

export const { addTask, removeTask, updateTask, cashedTasks } =
  taskSlice.actions;

export default taskSlice.reducer;
