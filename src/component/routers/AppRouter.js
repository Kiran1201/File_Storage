// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from '../File/FileUpload';
import ListFile from '../File/ListFile';
import App from '../../App';
import { ToastContainer } from 'react-toastify';
import Header from '../Pages/Header';
import Footer from '../Pages/Footer';
import MainLayout from '../Pages/MainLayout';

const AppRouter = () => {
    return (
        <div className="app-container"> {/* Flexbox container */}
            <Header />
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/main" element={<MainLayout />} />
                    <Route path="/file" element={<ListFile />} />
                    <Route path="/upload" element={<FileUpload />} />

                </Routes>
            </Router>
            <Footer className="footer" /> {/* Footer */}
            <ToastContainer />
        </div>
    );
};

export default AppRouter;
