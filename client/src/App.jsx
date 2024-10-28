import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './home';
import Login from './Login';
import Signup from './Signup';
import Profile from './profile';
import Post from './Post';

const App = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/posts" element={<Post />} />
            </Routes>
        </Router>
    );
};

export default App;
