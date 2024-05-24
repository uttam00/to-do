import { Fragment } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Todo from "./components/todo";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Todo />,
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);

  return (
    <Fragment>
      <RouterProvider
        router={router}
        fallbackElement={<Fragment>Loading...</Fragment>}
      />
    </Fragment>
  );
}

export default App;
