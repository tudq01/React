import React, { Suspense } from "react"

import "./App.css"
import { BrowserRouter } from "react-router-dom"
import Navbar from "./layouts/Navbar/Navbar"
import HomeRoutes from "./routes/HomeRoutes"
import VillaRoutes from "./routes/VillaRoutes"
import DiscountRoutes from "./routes/CouponRoutes"
import ScrollToTop from "./components/shared/ScrollTop/ScrollToTop";
import ContactRoutes from "./routes/ContactRoutes"
import Footer from "./layouts/footer/Footer"
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div>Loading ...</div>}>
        <HomeRoutes />
        <VillaRoutes />
        <DiscountRoutes />
        <ContactRoutes />
      </Suspense>
      <ScrollToTop />
      <Footer />
    </BrowserRouter>
  );
}

export default App
