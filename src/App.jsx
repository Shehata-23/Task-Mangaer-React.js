import "./App.css";
import LoginPage from "./Components/LoginPage/LoginPage";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import Layout from "./Components/Layout/Layout";
import store from "./Components/Redux/store";
import { Provider } from "react-redux";
import TaskCard from "./Components/TaskCard/TaskCard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <LoginPage /> },
        { path: "home", element: <MainPage /> },
      ],
    },
  ]);

  return (
    <>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </>
  );
}

export default App;
