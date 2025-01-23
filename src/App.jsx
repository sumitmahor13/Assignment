import Header from "./common/Header";
import Footer from "./common/Footer";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Shop from "./pages/Shop";

const App = () => {

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
};

export default App;