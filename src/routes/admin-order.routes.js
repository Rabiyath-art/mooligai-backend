// const express = require("express");

// const {
//     getAllOrders,
//     getOrderById,
//     updateOrderStatus
// } = require("../controllers/admin-order.controller");

// const {
//     requireAdmin
// } = require("../middleware/admin.middleware");

// const router = express.Router();


// // GET /api/admin/orders?status=pending
// // GET /api/admin/orders?status=processing
// // GET /api/admin/orders?status=shipped
// // GET /api/admin/orders?status=delivered
// // GET /api/admin/orders?paymentStatus=paid
// // GET /api/admin/orders?page=2&limit=10
// // GET /api/admin/orders?status=processing&page=1&limit=10

// // update Order
// // PUT /api/admin/orders/ORDER_ID/status

// // body
// // {
// //     "orderStatus": "shipped"
// // }


// // All routes require admin
// router.use(requireAdmin);


// // GET /api/admin/orders
// router.get(
//     "/",
//     getAllOrders
// );


// // GET /api/admin/orders/:id
// router.get(
//     "/:id",
//     getOrderById
// );


// // PUT /api/admin/orders/:id/status
// router.put(
//     "/:id/status",
//     updateOrderStatus
// );


// module.exports = router;

const express = require("express");

const {
    getAdminOrders,
    getAdminOrderById,
    updateOrderStatus
} = require("../controllers/admin-order.controller");

const {
    requireAdmin
} = require("../middleware/admin.middleware");

const router = express.Router();


// ========================================
// ALL ADMIN ORDER ROUTES
// ========================================

router.use(requireAdmin);


// ========================================
// ORDER LIST
// ========================================

// GET /api/admin/orders

router.get(
    "/",
    getAdminOrders
);


// ========================================
// ORDER STATUS
// ========================================

// PATCH /api/admin/orders/:id/status

router.patch(
    "/:id/status",
    updateOrderStatus
);


// ========================================
// ORDER DETAIL
// ========================================

// GET /api/admin/orders/:id

router.get(
    "/:id",
    getAdminOrderById
);


module.exports = router;