const Order = require("../modules/orderModel");
const Ticket = require("../modules/ticketModel");
const uuid = require("uuid");

exports.createOrder = async (req, res) => {
  try {
    const orderId = uuid.v4();
    console.log(orderId);

    const ticketOrders = req.body.items;

    // Build items array with full ticket details and quantities
    const items = await Promise.all(
      ticketOrders.map(async (order) => {
        const found = await Ticket.findById(order._id);
        if (!found) {
          throw new Error(`Ticket not found: ${order._id}`);
        }
        return {
          _id: found._id,
          name: found.name,
          price: found.price,
          quantity: order.quantity,
        };
      })
    );

    // Calculate total
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // Save to DB
    await Order.create({
      _id: orderId,
      fullName: req.body.fullName,
      phone: req.body.phone,
      items,
      total,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      orderId: orderId,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getSalesSum = async (days) => {
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
  const result = await Order.aggregate([
    { $match: { createdAt: { $gte: startDate } } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: "$total" },
      },
    },
  ]);
  return result[0]?.totalSales || 0;
};

const getMostSoldTickets = async () => {
  const result = await Order.aggregate([
    { $unwind: "$items" },
    {
      $group: {
        _id: "$items.name",
        sold: { $sum: "$items.quantity" },
      },
    },
    { $sort: { sold: -1 } },
    { $limit: 6 },
    {
      $project: {
        _id: 0,
        name: "$_id",
        sold: 1,
      },
    },
  ]);
  return result;
};

exports.ordersStatus = async (req, res) => {
  try {
    const [last24Hours, last7Days, last30Days, lastYear, mostSold] = await Promise.all([
      getSalesSum(1),
      getSalesSum(7),
      getSalesSum(30),
      getSalesSum(365),
      getMostSoldTickets(),
    ]);

    res.status(200).json({
      salesData: [
        { title: "فروش 24 ساعت گذشته", totalPrice: last24Hours },
        { title: "فروش 7 روز گذشته", totalPrice: last7Days },
        { title: "فروش 30 روز گذشته", totalPrice: last30Days },
        { title: "فروش 1 سال گذشته", totalPrice: lastYear },
      ],
      mostSold,
    });
  } catch (error) {
    console.error("Error generating orders status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const reverse = req.query.reverse;
    let orders = await Order.find();

    if (reverse == "true") {
      orders = orders.reverse();
    }

    res.status(200).json({
      status: "success",
      data: { orders },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deleteResult = await Order.deleteOne({ _id: orderId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Order not found or already deleted.",
      });
    }

    res.status(200).json({
      data: {
        _id: orderId,
      },
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
