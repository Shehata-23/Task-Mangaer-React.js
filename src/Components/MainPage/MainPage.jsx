import { useDispatch, useSelector } from "react-redux";
import { addTask, cashedTasks } from "../Redux/taskslice";
import { useFormik } from "formik";
import * as Yup from "yup";
import TaskCard from "../TaskCard/TaskCard";
import { useEffect, useState } from "react";
import Form from "../Form/Form";


const MainPage = () => {
  const dispatch = useDispatch();
  let tasks = useSelector((state) => state.tasks.tasks || []);
  let filter = useSelector((state) => state.tasks.filter);
  let [currentPage, setCurrentPage] = useState(1);

  
  if (!localStorage.getItem("tasks")){
    localStorage.setItem("tasks", [])
  }
  
  useEffect(() => {
    dispatch(cashedTasks());
  }, [dispatch]);



  

 
  if (filter) {
    tasks = tasks.filter((task) => task.status === filter);
  }

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

      <Form /> 
      
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
