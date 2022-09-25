import React from "react"
import { Route, Routes } from "react-router-dom"

const Home = React.lazy(() => import("../pages/Home/Home"))
const NotFound = React.lazy(() => import("../pages/404/NotFound"))
function HomeRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/404" element={<NotFound />} />
    </Routes>
  );
}

export default HomeRoutes
