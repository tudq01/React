import React from "react"
import { Route, Routes } from "react-router-dom"

const Villa = React.lazy(() => import("../pages/Villa"))
const Resort = React.lazy(() => import("../pages/Resort/Resort"))
const ResortDetail = React.lazy(() => import("../pages/Resort/ResortDetail/ResortDetail"));
const Chat = React.lazy(() => import("../pages/Chat/Chat"));
const SaleChat = React.lazy(() => import("../pages/SaleChat/SaleChat"));
function VillaRoutes() {
  return (
    <Routes>
      <Route path="/resort" element={<Resort />} />
      <Route path="/resort/:resortId" element={<ResortDetail />} />
      <Route path="/chat/" element={<Chat />} />
      <Route path="/sale-chat/" element={<SaleChat />} />
      <Route path="/villa" element={<Villa />} />
    </Routes>
  );
}

export default VillaRoutes
