import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeTask, updateTask } from "../Redux/taskslice";

const TaskCard = ({ name, status, id, idx}) => {
  let [editable, setEditable] = useState({});

  let [editTaskInfo, setEditTaskInfo] = useState({});

  let dispatch = useDispatch();

  let options = {
    notstarted: "Not Started",
    inprogress: "In Progress",
    finished: "Finished",
  };

  function handleEditTaskInfo(id, name, status) {
    setEditTaskInfo((prev) => ({ ...prev, [id]: { id, name, status } }));
  }

  function handleEditable(id) {
    setEditable((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const statusClasses = {
    "Not Started": "bg-red-600",
    "In Progress": "bg-yellow-600",
    Finished: "bg-green-600",
  };
  const statusborderClasses = {
    "Not Started": "border-t-red-600",
    "In Progress": "border-t-yellow-600",
    Finished: "border-t-green-600",
  };
  let backgroundClass = statusClasses[status];

  let borderBg = statusborderClasses[status];
  return (
    <>
      <div className={`border-t-4 ${borderBg} rounded-lg`}>
        {!editable[id] ? (
          <div className=" hover:translate-x-2 duration-150 flex flex-col items-center justify-center w-full bg-white/20 shadow-lg text-white px-6 py-4 min-h-full rounded-lg ">
            <div
              className={`${backgroundClass}  text-white px-4 py-2 rounded-md mb-4`}
            >
              <p className="font-bold">{status}</p>
            </div>
            <div className="text-start leading-relaxed flex-grow w-[100%] break-words">
              <p className="break-words font-semibold">{name}</p>
            </div>
            <div className="flex mt-5 justify-start w-full gap-4">
              <button
                onClick={() => dispatch(removeTask(id, idx))}
                className="w-1/3 bg-[#37B7C3] text-black font-semibold py-2 rounded-lg hover:bg-[#43d2df] transition duration-200"
              >
                Delete
              </button>
              <button
                className="w-1/3 bg-[#2d8f9e] font-semibold text-black py-2 rounded-lg hover:bg-[#3ad3eb] transition duration-200"
                onClick={() => {
                  handleEditable(id);
                  handleEditTaskInfo(id, name, status);
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-grow bg-gray-800 p-4 rounded-lg shadow-lg">
            <textarea
              className="w-full h-32 p-3 border border-gray-500 rounded-md bg-gray-900 text-white placeholder-gray-400 resize-none"
              placeholder="Enter your text here..."
              value={editTaskInfo[id].name}
              onChange={(e) => handleEditTaskInfo(id, e.target.value, status)}
            ></textarea>
            <select
              className="w-full mt-3 p-2 border border-gray-500 rounded-md bg-gray-900 text-white"
              onChange={(e) => handleEditTaskInfo(id, editTaskInfo[id].name, e.target.value)}
              value={editTaskInfo[id].status}
            >
              {Object.keys(options).map((statusKey) => (
                <option
                  key={statusKey}
                  value={options[statusKey]}
                  className="bg-gray-800"
                >
                  {options[statusKey]}
                </option>
              ))}
            </select>
            <button
              onClick={() => {
                handleEditable(id);
                dispatch(updateTask(editTaskInfo[id]));
              }}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 w-full"
            >
              Submit Changes
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default TaskCard;
