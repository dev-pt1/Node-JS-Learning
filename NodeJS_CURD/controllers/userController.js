const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.json(users);
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const user = await User.findByIdAndUpdate(id, { name }, { new: true });
    res.json(user);
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({ message: 'User deleted' });
};
