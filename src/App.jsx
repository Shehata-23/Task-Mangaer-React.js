import "./App.css";
import LoginPage from "./Components/LoginPage/LoginPage";
import { createHashRouter, RouterProvider } from "react-router-dom";
import MainPage from "./Components/MainPage/MainPage";
import Layout from "./Components/Layout/Layout";
import store from "./Components/Redux/store";
import { Provider } from "react-redux";

function App() {
  const router = createHashRouter([
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
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;