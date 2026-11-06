import { createBrowserRouter } from "react-router";
import { LoginPage } from "../pages/LoginPage";
import { LessonPage } from "../pages/LessonsPage";
import { PracticePage } from "../pages/PracticePage";
import { HomePage } from "../pages/HomePage";
import { AppLayout } from "./AppLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, element: <HomePage /> },
      { path: "lessons", element: <LessonPage /> },
      { path: "practice", element: <PracticePage /> },
    ],
  },
  {
    path: "/auth",
    element: <LoginPage />,
  },
]);
