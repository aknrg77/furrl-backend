const shortid = require("shortid");
require("dotenv").config();

const User = require("../models/user");
const Ticket = require("../models/ticket");
const UserTicket = require("../models/userTicket");

const createTicket = async (req, res) => {
  let { title, description } = req.body;

  let ticket = new Ticket();
  ticket.uid = shortid.generate();
  ticket.title = title;
  ticket.description = description;

  try {
    await ticket.save();
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
  return res.status(201).json(ticket);
};

const updateTicket = async (req, res) => {
  let newTitle = req.body?.title || "";
  let newDescription = req.body?.description || "";
  let newStatus = req.body?.status || "ToDo";
  try {
    await Ticket.findOneAndUpdate(
      { id: req.params.id },
      { title: newTitle, description: newDescription, status: newStatus }
    );
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
  return res.status(201).json({ Messege: `${req.params.id} updated` });
};

const assignTicket = async (req, res) => {
  try {
    await Ticket.findOneAndUpdate({ id: req.ticket }, { status: "InProgress" });
    await UserTicket.findOneAndUpdate(
      { ticket: req.ticket },
      { user: req.assignedTo },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
  return res.status(201).json({
    Message: `Ticket successfully assigned to: ${req.body.assignedTo}`,
  });
};

const getAllTicket = async (req, res) => {
  try {
    var tickets = await Ticket.find({});
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }
  if (!tickets.length) {
    return res.status(200).json({ Message: "There are No tickets" });
  }
  return res.status(201).json(tickets);
};

const getTicket = async (req, res) => {
  let conditions = {};

  if (req.query.status) {
    conditions.status = req.query.status;
  }
  if (req.query.title) {
    conditions.title = req.query.title;
  }
  console.log(conditions);
  try {
    var tickets = await Ticket.find(conditions);
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }

  if (!tickets.length) {
    return res.status(200).json({ Message: "There are No tickets" });
  }
  return res.status(201).json(tickets);
};

const markAsDone = async (req, res) => {
  try {
    await Ticket.findOneAndUpdate({ _id: req.ticket.id }, { status: "Done" });
  } catch (error) {
    return res.status(500).json({ Messege: error.message });
  }
  return res.status(200).json({ Messege: `${req.ticket.id} marked as Done` });
};

module.exports = {
  createTicket,
  updateTicket,
  assignTicket,
  getAllTicket,
  getTicket,
  markAsDone,
};
