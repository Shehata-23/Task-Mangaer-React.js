import { createSlice } from "@reduxjs/toolkit";

function handleLocalStorage(tasks) {
  let stingTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", stingTasks);
}


let taskSlice = createSlice({
  name: "tasks",
  initialState: {
    count: 150,
    tasks: [],
    filter: "",
  },
  
  reducers: {
    addTask: (state, action) => {
      state.count += 1;
      state.tasks.push(action.payload);
      handleLocalStorage(state.tasks);
    },
    removeTask: (state, action) => {
      state.count -= 1;
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      handleLocalStorage(state.tasks);
    },
    updateTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, ...action.payload } : task
      );
      handleLocalStorage(state.tasks);

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
    updateFilter: (state, action) => {
      state.filter = action.payload
    }
  },
});

export const { addTask, removeTask, updateTask, cashedTasks, updateFilter} =
  taskSlice.actions;

export default taskSlice.reducer;
