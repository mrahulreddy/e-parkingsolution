import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

import LandingPage from "./components/LandingPage";
import Dashboard from "./components/dashboard";
import Login from "./components/login";
import Signup from "./components/signup";
import { ContactUs } from "./components/contactus";
import Validation from "./components/validation";

const App = () => (
  <BrowserRouter>
    <Header />
    <main>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/signup/validation" element={<Validation />} />
      </Routes>
    </main>

    <Footer />
  </BrowserRouter>

  // <>
  //
  // </>
);

export default App;
