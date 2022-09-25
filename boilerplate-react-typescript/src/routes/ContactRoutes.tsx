import React from "react";
import { Route, Routes } from "react-router-dom";

const Contact = React.lazy(() => import("../pages/Contact/Contact"));
function ContactRoutes() {
  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}

export default ContactRoutes;
