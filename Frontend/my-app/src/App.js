import './App.css';
import Loginpage from './All pages/Login page';
import Forgetpass from './All pages/Forgetpass';
import Main from './All pages/main';
import "./All pages/Login.css"
import "./All pages/Forgetpass.css"
import "react-toastify/dist/ReactToastify.css";
import Signuppage from './All pages/Signup';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
function App() {
  return (
     <div>
         <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    <Router>
      <Routes>
        <Route path='/' element={<Loginpage />} />
        <Route path='/main' element={<Main />} />
        <Route path='/signup' element={<Signuppage />} />
        <Route path='/forgetpass' element={<Forgetpass/>} />
      </Routes>
    </Router>
    
    </div>
  );
}

export default App;
