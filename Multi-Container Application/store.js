const mongoose = require("mongoose");

const todo = mongoose.model("todo", { title: String });

const getAll = async () => {
  return await todo.find({});
};

const getById = async (id) => {
  return await todo.findById(id);
};

const create = async (title) => {
  return new todo({ title: title }).save();
};

const update = async (id, title) => {
  return todo.findByIdAndUpdate(id, { title: title }, { new: true });
};

const remove = async (id) => {
  return await todo.findByIdAndDelete(id);
};

module.exports = { getAll, getById, create, update, remove };
