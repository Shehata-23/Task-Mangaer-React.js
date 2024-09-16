import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateFilter } from "../Redux/taskslice";
import { useFormik } from "formik";
import * as Yup from "yup";

class Task {
  static myid = Date.now() + Math.random();
  constructor(name) {
    this.name = name;
    this.id = Task.myid + Math.random();
    this.status = "Not Started";
  }

  toPlainObject() {
    return {
      name: this.name,
      id: this.id,
      status: this.status,
    };
  }
}

const Form = () => {
  let tasks = useSelector((state) => state.tasks.tasks || []);
  let [filter, setFilter] = useState("");
  let options = {
    notstarted: "Not Started",
    inprogress: "In Progress",
    finished: "Finished",
  };
  const dispatch = useDispatch();

  function handleTaskCreation(name) {
    const task = new Task(name).toPlainObject();
    dispatch(addTask(task));
  }

  const formik = useFormik({
    initialValues: {
      task: "",
    },
    onSubmit: (values) => {
      handleTaskCreation(values.task);
      formik.resetForm();
      console.log(tasks);
    },
    validationSchema: Yup.object({
      task: Yup.string().required("Enter a task"),
    }),
  });

  function handleFilter(value) {
    setFilter(value);
    dispatch(updateFilter(value));
  }

  if (filter) {
    tasks = tasks.filter((task) => task.status === filter);
  }

  return (
    <>
      <form
        action=""
        className="flex justify-center items-center flex-col "
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <div className="w-[90%] md:w-[50%] flex flex-col ">
          <label htmlFor="task" className="font-semibold text-white rounded-sm">
            Task
          </label>
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Enter a task"
            className="rounded-sm mt-2 h-8 px-3 focus:outline-[#24138860] "
            onBlur={formik.handleBlur}
            value={formik.values.task}
            onChange={formik.handleChange}
          />
          {formik.touched.task && formik.errors.task ? (
            <div className="text-red-500">{formik.errors.task}</div>
          ) : null}
          <label htmlFor="filter" className="mt-4 font-semibold text-white">
            Filter
          </label>
          <select
            name="filter"
            id="filter"
            className="rounded-sm mt-2 h-8 px-3 focus:outline-[#24138860]"
            value={filter}
            onChange={(e) => handleFilter(e.target.value)}
          >
            <option value="" className="bg-white text-black font-semibold">
              No Filters
            </option>
            {Object.keys(options).map((statusKey) => (
              <option
                key={statusKey}
                value={options[statusKey]}
                className="bg-white text-black font-semibold"
              >
                {options[statusKey]}
              </option>
            ))}
          </select>

          <button className="self-start mt-3 px-5 py-2 hover:translate-x-2 duration-150 bg-green-600 rounded-md hover:bg-green-500 text-white font-semibold">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
