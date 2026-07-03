import user from "../models/user.js";

export const createUser = async (data) => {
    const newUser = new user(data);
    return await newUser.save();
}

export const getUser = async (id) => {
    return await user.findById(id);
}

export const updateUser = async (id, data) => {
    return await user.findByIdAndUpdate(
        id, data, {returnDocument: 'after', runValidators: true}
    );
}

export const deleteUser = async (id) => {
    return await user.findByIdAndDelete(id);
}

export const getUserByEmail = async (email) => {
    return await user.findOne({email: email});
}
