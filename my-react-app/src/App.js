import "./App.css";
import NavBar from "./components/NavBar";
import {
    BrowserRouter,
    Routes,
    Route,
   
  } from "react-router-dom";
import  Home  from "./components/Pages/Home";
import  About  from "./components/Pages/About";
import  Blog  from "./components/Pages/Blog";
import  Contact  from "./components/Pages/Contact";
import Footer from "./components/Footer/Footer";

/*npm start */
function App() {
  return (
    <>
         
        <NavBar></NavBar>
            <Routes>
             <Route path="/" element={<Home/>} />
              <Route path="/about"  element={<About/>} />
              <Route path="/blog" element={<Blog/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
        <Footer></Footer>
        
    
    </>
  );
}

export default App;
