const Ticket = require("../modules/ticketModel");
const ticket = require("../modules/ticketModel");
const ObjectId = require("bson").ObjectId;

// Create ticket -> (It Needs Auth!)
exports.createTicket = async (req, res) => {
  try {
    const id = new ObjectId();
    const ticketId = `ticket_${id.toString()}`;
    const newTicket = await ticket.insertOne({
      _id: ticketId,
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    });
    res.status(201).json({
      status: "success",
      data: newTicket,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create get all tickets
exports.getAllTickets = async (req, res) => {
  try {
    const tickets = await ticket.find();
    res.status(200).json({
      status: "success",
      data: { tickets },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete ticket -> (It Needs Auth!)
exports.deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const deleteResult = await Ticket.deleteOne({ _id: ticketId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found or already deleted.",
      });
    }
    res.status(200).json({
      data: {
        _id: ticketId,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update ticket -> (It Needs Auth!)
exports.updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const updateResult = await Ticket.findByIdAndUpdate(ticketId, {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    });

    if (updateResult.updatedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found.",
      });
    }

    const ticket = await Ticket.findById(ticketId);
    res.status(200).json({
      data: {
        ticket,
      },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
