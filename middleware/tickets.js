const Ticket = require("../models/ticket");
const User = require("../models/user");
const UserTicket = require("../models/userTicket");
const adminValidator = require("../helpers/adminValidator");

const validateAssignTicketBody = async (req, res, next) => {
  if (!adminValidator(req.user)) {
    return res.status(401).json({ Message: "Unauthorized!!!" });
  }

  const ticketUid = req.params.id;

  try {
    let ticketFound = await Ticket.findOne({ uid: ticketUid });

    if (!ticketFound) {
      return res
        .status(404)
        .json({ Messege: "Ticket must exist to be assigned!!!" });
    }
    req.ticket = ticketFound.id;
    let userFound = await User.findOne({ email: req.body.assignedTo });

    if (!userFound) {
      return res
        .status(404)
        .json({ Messege: "User must exist to be assigned!!!" });
    }

    req.assignedTo = userFound.id;
  } catch (error) {
    return res.status(500).json({ Messege: error.message });
  }

  return next();
};

const validateUpdateTicketBody = async (req, res, next) => {
  if (!adminValidator(req.user)) {
    return res.status(401).json({ Message: "Unauthorized!!!" });
  }

  const ticketUid = req.params.id;

  try {
    let ticketFound = await Ticket.findOne({ uid: ticketUid });

    if (!ticketFound) {
      return res
        .status(404)
        .json({ Messege: "Ticket must exist to be updated!!!" });
    }
  } catch (error) {
    return res.status(500).json({ Messege: error.message });
  }

  return next();
};

const validateCreateTicketBody = async (req, res, next) => {
  if (!adminValidator(req.user)) {
    return res.status(401).json({ Message: "Unauthorized!!!" });
  }
  return next();
};

const validateMarkAsDone = async (req, res, next) => {
  let user = req.user;
  try {
    let ticketFound = await Ticket.findOne({ uid: req.params.id });
    if (!ticketFound) {
      return res.status(404).json({ Messege: "Ticket Not found" });
    }

    let userTicketFound = await UserTicket.findOne({
      user: user.id,
      ticket: ticketFound.id,
    });

    if (!userTicketFound) {
      return res.status(404).json({ Messege: "Ticket not assigned to user" });
    }
    req.ticket = ticketFound;

    if (req.user.id !== userTicketFound.user.toString()) {
      return res
        .status(400)
        .json({
          Messege:
            "Ticket can only be marked as complete by the user whom it was asssigned to",
        });
    }
  } catch (error) {
    return res.status(500).json({ Messege: error.message });
  }
  return next();
};

module.exports = {
  validateCreateTicketBody,
  validateUpdateTicketBody,
  validateAssignTicketBody,
  validateMarkAsDone,
};
