import { configureStore } from "@reduxjs/toolkit";
import taskslice from "./taskslice";

export default configureStore({
  reducer: {
    tasks: taskslice
  },
});
