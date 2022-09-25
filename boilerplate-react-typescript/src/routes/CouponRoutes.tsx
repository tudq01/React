import React from "react"
import { Route, Routes } from "react-router-dom"

const Discount = React.lazy(() => import("../pages/Coupon"))
function DiscountRoutes() {
  return (
    <Routes>
      <Route path='/discount' element={<Discount />} />
    </Routes>
  )
}

export default DiscountRoutes
