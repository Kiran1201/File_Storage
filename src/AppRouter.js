// src/AppRouter.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FileUpload from './component/File/FileUpload';
import ListFile from './component/File/ListFile';
import RacList from './component/File/RacList';
import FolderList from './component/File/FolderList';


const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<ListFile />} /> {/* Default route */}
            <Route path="/files" element={<ListFile />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/racs" element={<RacList />} />
            <Route path="/folders" element={<FolderList />} />
        </Routes>
    );
};

export default AppRouter;
