
import React from 'react';
import './App.css';
import Loginpage from './All pages/Login page';
import Forgetpass from './All pages/Forgetpass';
import Main from './All pages/main';
import "./All pages/main.css";
import "./All pages/Login.css";
import "./All pages/Forgetpass.css";
import "react-toastify/dist/ReactToastify.css";
import Signuppage from './All pages/Signup';
import Sidebar from './All pages/Sidebar/sidebar';
import "./All pages/Sidebar/sidebar.css";
import Navbar from './All pages/Navbar/navbar';
import "./All pages/Navbar/navbar.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Upload from './All pages/Upload/upload';
import "./All pages/Upload/upload.css";
import "./All pages/Signup.css";
import Datapreproccessing from './All pages/datapreproccessing/datapreproccess';
import "./All pages/datapreproccessing/datapreproccess.css";
import Textpreproccessing from './All pages/textpreproccessing/textpreproccess';
import "./All pages/textpreproccessing/textpreproccess.css";
import Featureengineer from './All pages/featureengineering/featureengineer';
import "./All pages/featureengineering/featureengineer.css";
import Imbalanceddataset from './All pages/imbalanceddataset/imbalanceddataset';
import "./All pages/imbalanceddataset/imbalanceddataset.css";
import Mlpipeline from './All pages/mlpipeline/mlpipeline';
import "./All pages/mlpipeline/mlpipeline.css";
import { CsvProvider } from './All pages/csvcontext/csvcontext';
import background from "./blue.jpg";

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh', // Adjust as needed
      }}
    >
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
      <CsvProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Loginpage />} />
            <Route path='/main' element={
              <>
                <Navbar />
                <Sidebar />
                <Main />
              </>
            } />
            <Route path='/upload' element={
              <>
                <Navbar />
                <Sidebar />
                <Upload />
              </>
            } />
            <Route path='/data-preproccess' element={
              <>
                <Navbar />
                <Sidebar />
                <Datapreproccessing />
              </>
            } />
            <Route path='/text-preproccess' element={
              <>
                <Navbar />
                <Sidebar />
                <Textpreproccessing />
              </>
            } />
            <Route path='/Featureengineering' element={
              <>
                <Navbar />
                <Sidebar />
                <Featureengineer />
              </>
            } />
            <Route path='/Imbalanceddataset' element={
              <>
                <Navbar />
                <Sidebar />
                <Imbalanceddataset />
              </>
            } />
            <Route path='/Mlpipeline' element={
              <>
                <Navbar />
                <Sidebar />
                <Mlpipeline />
              </>
            } />
            <Route path='/signup' element={<Signuppage />} />
            <Route path='/forgetpass' element={<Forgetpass />} />
          </Routes>
        </Router>
      </CsvProvider>
    </div>
  );
}

export default App;
