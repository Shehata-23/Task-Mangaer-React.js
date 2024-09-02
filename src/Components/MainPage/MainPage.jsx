import { useDispatch, useSelector } from "react-redux";
import { addTask, cashedTasks } from "../Redux/taskslice";
import { useFormik } from "formik";
import * as Yup from "yup";
import TaskCard from "../TaskCard/TaskCard";
import { useEffect, useState } from "react";

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

const MainPage = () => {
  const dispatch = useDispatch();
  let tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(cashedTasks());
  }, [dispatch]);

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

  let [currentPage, setCurrentPage] = useState(1);

  let [filter, setFilter] = useState("");

  function handleFilter(value) {
    setFilter(value);
  }

  let options = {
    notstarted: "Not Started",
    inprogress: "In Progress",
    finished: "Finished",
  };

  if (filter) {
    tasks = tasks.filter((task) => task.status === filter);
  }

  // if (tasks.length === 0) {
  //   setCurrentPage(0)
  // }

  let tasksPerPage = 4;

  let totalPages = Math.ceil(tasks.length / tasksPerPage)
    ? Math.ceil(tasks.length / tasksPerPage)
    : 0;

  let indexOfLastTask = currentPage * tasksPerPage;
  let indexOfFirstTask = indexOfLastTask - tasksPerPage;
  let currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }
  if (currentPage < 1 && totalPages > 0) {
    setCurrentPage(1);
  }

  return (
    <div className="bg-[#03346E] min-h-screen pt-9 p-0 md:p-12">
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
      <div className=" ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
          {currentTasks.map((task, idx) => (
            <TaskCard
              key={task.id}
              name={task.name}
              id={task.id}
              status={task.status}
              idx={idx}
            />
          ))}
        </div>

        <div className="flex justify-around mt-4 w-[50%] mx-auto pb-8">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="w-2/6 md:w-1/6 bg-[#37B7C3]  text-black rounded font-semibold  disabled:bg-gray-300"
          >
            Previous
          </button>

          <p className="px-4 py-1 bg-slate-400/65 rounded-md font-semibold ">
            {currentPage}/{totalPages}
          </p>

          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className=" w-2/6 md:w-1/6 bg-[#37B7C3]  text-black rounded font-semibold  disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
