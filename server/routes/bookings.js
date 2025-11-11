const express = require("express")
const { auth, customerAuth, employeeAuth } = require("../middleware/auth")
const { createBooking, getAllBooking, getUserBooking, updateBookingStatus} = require("../controllers/bookingController");
const router = express.Router()


// Create booking (chỉ customer được phép tạo booking)
router.post("/", customerAuth, createBooking); 
router.get("/my-bookings", auth, getUserBooking); 
// Get all bookings (chỉ employee/admin mới xem toàn bộ hệ thống)
router.get("/", employeeAuth, getAllBooking); 
router.put("/:id/status", employeeAuth, updateBookingStatus);

module.exports = router;
