const path = require('path');
const User = require('../models/userModel');

// Serve the registration page
const showRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/register.html'));
};

// Handle registration form submissions
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    console.log(user);
    res.sendFile(path.join(__dirname, '../public/login.html'));
};

// Handle login form submissions
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('Email not found');
            return res.sendFile(path.join(__dirname, '../public/login.html'), {
                error: 'Email not found. Please register or try again.'
            });
        }
        if (user.password !== password) {   
            console.log('Incorrect password');
            return res.sendFile(path.join(__dirname, '../public/login.html'), {
                error: 'Incorrect password. Please try again.'
            });
        }
        if (user.role === 'admin') {
            console.log('Admin login successful');
            return res.sendFile(path.join(__dirname, '../public/cafe.html'));
        } else if (user.role === 'employee') {
            console.log('Employee login successful');
            return res.sendFile(path.join(__dirname, '../public/employeego.html'));
        } else {
            console.log('Role not recognized');
            return res.sendFile(path.join(__dirname, '../public/login.html'), {
                error: 'Invalid role. Please try again.'
            });
        }
    } catch (err) {
        console.log('Error during login:', err);
        res.sendFile(path.join(__dirname, '../public/login.html'));
    }
};

module.exports = {
    showRegisterPage,
    registerUser,
    loginUser
};
