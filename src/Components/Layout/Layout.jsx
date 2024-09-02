import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  return (
    <div className="w-full flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
