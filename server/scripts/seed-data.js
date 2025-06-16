const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const path = require("path")
require("dotenv").config({ path: path.join(__dirname, "../.env") })

// Import models
const Customer = require("../models/Customer")
const Employee = require("../models/Employee")
const Tour = require("../models/Tour")
const Booking = require("../models/Booking")
const Review = require("../models/Review")

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/tour_management", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    console.error("❌ Database connection error:", error)
    process.exit(1)
  }
}

// Generate unique IDs
const generateId = (prefix) => {
  return prefix + Date.now() + Math.floor(Math.random() * 1000)
}

async function seedData() {
  try {
    await connectDB()

    console.log("🧹 Clearing existing data...")
    // Clear existing data
    await Customer.deleteMany({})
    await Employee.deleteMany({})
    await Tour.deleteMany({})
    await Booking.deleteMany({})
    await Review.deleteMany({})

    console.log("👤 Creating admin user...")
    // Create admin user
    const hashedPassword = await bcrypt.hash("admin123", 10)
    const admin = new Employee({
      employeeId: generateId("EMP"),
      fullName: "Quản trị viên hệ thống",
      dateOfBirth: new Date("1990-01-01"),
      address: "123 Đường Nguyễn Huệ, Quận 1, TP.HCM",
      phoneNumber: "0901234567",
      email: "admin@tourmanagement.com",
      password: hashedPassword,
      role: "admin",
    })
    await admin.save()

    console.log("👥 Creating sample customers...")
    // Create sample customers
    const customers = []
    const customerData = [
      {
        fullName: "Nguyễn Văn An",
        email: "nguyenvanan@gmail.com",
        phoneNumber: "0987654321",
        address: "456 Đường Lê Lợi, Quận 3, TP.HCM",
        dateOfBirth: new Date("1995-05-15"),
      },
      {
        fullName: "Trần Thị Bình",
        email: "tranthibinh@gmail.com",
        phoneNumber: "0976543210",
        address: "789 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
        dateOfBirth: new Date("1988-08-20"),
      },
      {
        fullName: "Lê Minh Cường",
        email: "leminhcuong@gmail.com",
        phoneNumber: "0965432109",
        address: "321 Đường Võ Văn Tần, Quận 3, TP.HCM",
        dateOfBirth: new Date("1992-12-10"),
      },
    ]

    for (const customerInfo of customerData) {
      const hashedCustomerPassword = await bcrypt.hash("123456", 10)
      const customer = new Customer({
        customerId: generateId("CUST"),
        ...customerInfo,
        password: hashedCustomerPassword,
      })
      const savedCustomer = await customer.save()
      customers.push(savedCustomer)
    }

    console.log("🏖️ Creating sample tours...")
    // Create sample tours
    const tours = []
    const tourData = [
      {
        tourName: "Du lịch Hạ Long - Sapa 4N3Đ",
        departure: "Hà Nội",
        destination: "Hạ Long - Sapa",
        itinerary:
          "Ngày 1: Hà Nội - Hạ Long, tham quan vịnh Hạ Long, du thuyền qua đêm. Ngày 2: Hạ Long - Sapa, tham quan thị trấn Sapa, bản Cát Cát. Ngày 3: Chinh phục đỉnh Fansipan bằng cáp treo, tham quan Silver Waterfall. Ngày 4: Sapa - Hà Nội, mua sắm đặc sản.",
        startDate: new Date("2024-04-15"),
        endDate: new Date("2024-04-18"),
        transportation: "Xe khách limousine, cáp treo Fansipan",
        price: 3500000,
        availableSlots: 20,
        services: [
          "Khách sạn 3 sao view đẹp",
          "Ăn 3 bữa/ngày (buffet sáng, set menu trưa/tối)",
          "Hướng dẫn viên chuyên nghiệp",
          "Vé tham quan các điểm du lịch",
          "Bảo hiểm du lịch",
        ],
        images: ["/placeholder.svg?height=300&width=400"],
      },
      {
        tourName: "Phú Quốc - Thiên đường biển đảo 3N2Đ",
        departure: "TP.HCM",
        destination: "Phú Quốc",
        itinerary:
          "Ngày 1: TP.HCM - Phú Quốc, check-in resort, tự do tắm biển Sao. Ngày 2: Tour 4 đảo Nam, lặn ngắm san hô, câu cá, BBQ trên biển. Ngày 3: Tham quan làng chài Hàm Ninh, chợ đêm Dinh Cậu, về TP.HCM.",
        startDate: new Date("2024-04-20"),
        endDate: new Date("2024-04-22"),
        transportation: "Máy bay Vietnam Airlines, tàu cao tốc",
        price: 4200000,
        availableSlots: 15,
        services: [
          "Resort 4 sao gần biển",
          "Ăn sáng buffet tại resort",
          "Tour lặn biển có hướng dẫn viên",
          "Vé máy bay khứ hồi",
          "Xe đưa đón sân bay",
        ],
        images: ["/placeholder.svg?height=300&width=400"],
      },
      {
        tourName: "Đà Lạt - Thành phố ngàn hoa 2N1Đ",
        departure: "TP.HCM",
        destination: "Đà Lạt",
        itinerary:
          "Ngày 1: TP.HCM - Đà Lạt, tham quan hồ Xuân Hương, dinh Bảo Đại, chợ đêm Đà Lạt. Ngày 2: Tham quan thác Elephant, làng hoa Vạn Thành, đồi chè Cầu Đất, về TP.HCM.",
        startDate: new Date("2024-04-25"),
        endDate: new Date("2024-04-26"),
        transportation: "Xe khách giường nằm VIP",
        price: 1800000,
        availableSlots: 25,
        services: [
          "Khách sạn 3 sao trung tâm thành phố",
          "Ăn 2 bữa (1 sáng, 1 trưa)",
          "Hướng dẫn viên địa phương",
          "Vé tham quan các điểm du lịch",
        ],
        images: ["/placeholder.svg?height=300&width=400"],
      },
      {
        tourName: "Nha Trang - Biển xanh cát trắng 3N2Đ",
        departure: "TP.HCM",
        destination: "Nha Trang",
        itinerary:
          "Ngày 1: TP.HCM - Nha Trang, tắm biển, thưởng thức hải sản tươi sống. Ngày 2: Tour 4 đảo Nha Trang, lặn ngắm san hô, tắm bùn khoáng. Ngày 3: Tham quan Vinpearl Land, cáp treo vượt biển, về TP.HCM.",
        startDate: new Date("2024-05-01"),
        endDate: new Date("2024-05-03"),
        transportation: "Tàu hỏa SE, tàu cao tốc ra đảo",
        price: 2800000,
        availableSlots: 18,
        services: [
          "Khách sạn 4 sao view biển",
          "Ăn 3 bữa/ngày (hải sản tươi sống)",
          "Vé Vinpearl Land (full day)",
          "Tour 4 đảo bao gồm ăn trưa",
          "Tắm bùn khoáng I-Resort",
        ],
        images: ["/placeholder.svg?height=300&width=400"],
      },
      {
        tourName: "Hội An - Huế - Di sản văn hóa 4N3Đ",
        departure: "Đà Nẵng",
        destination: "Hội An - Huế",
        itinerary:
          "Ngày 1: Đà Nẵng - Hội An, tham quan phố cổ, chùa Cầu Nhật Bản. Ngày 2: Làng gốm Thanh Hà, rừng dừa Bảy Mẫu, đèn lồng Hội An. Ngày 3: Hội An - Huế, tham quan Đại Nội, lăng Tự Đức. Ngày 4: Chùa Thiên Mụ, lăng Khải Định, về Đà Nẵng.",
        startDate: new Date("2024-05-05"),
        endDate: new Date("2024-05-08"),
        transportation: "Xe khách, thuyền dragon boat sông Hương",
        price: 3200000,
        availableSlots: 22,
        services: [
          "Khách sạn 3 sao phố cổ Hội An",
          "Ăn đặc sản địa phương (cao lầu, bún bò Huế)",
          "Hướng dẫn viên chuyên về lịch sử",
          "Vé tham quan tất cả di tích",
          "Thuyền dragon boat sông Hương",
        ],
        images: ["/placeholder.svg?height=300&width=400"],
      },
      {
        tourName: "Mũi Né - Sa mạc thu nhỏ 2N1Đ",
        departure: "TP.HCM",
        destination: "Mũi Né - Phan Thiết",
        itinerary:
          "Ngày 1: TP.HCM - Mũi Né, tham quan đồi cát bay, suối tiên. Ngày 2: Ngắm bình minh tại đồi cát vàng, làng chài Mũi Né, về TP.HCM.",
        startDate: new Date("2024-05-10"),
        endDate: new Date("2024-05-11"),
        transportation: "Xe khách giường nằm",
        price: 1500000,
        availableSlots: 30,
        services: ["Resort 3 sao gần biển", "Ăn sáng buffet", "Xe jeep tham quan đồi cát", "Hướng dẫn viên"],
        images: ["/placeholder.svg?height=300&width=400"],
      },
    ]

    for (const tourInfo of tourData) {
      const tour = new Tour({
        tourId: generateId("TOUR"),
        ...tourInfo,
      })
      const savedTour = await tour.save()
      tours.push(savedTour)
    }

    console.log("📝 Creating sample bookings...")
    // Create sample bookings
    const bookings = []
    const bookingData = [
      {
        customerId: customers[0]._id,
        tourId: tours[0]._id,
        numberOfPeople: 2,
        status: "paid",
        notes: "Yêu cầu phòng đôi, không hút thuốc",
      },
      {
        customerId: customers[1]._id,
        tourId: tours[1]._id,
        numberOfPeople: 4,
        status: "confirmed",
        notes: "Có trẻ em 8 tuổi, cần ghế ngồi trẻ em",
      },
      {
        customerId: customers[2]._id,
        tourId: tours[2]._id,
        numberOfPeople: 1,
        status: "pending",
        notes: "Đi một mình, mong được sắp xếp phòng đơn",
      },
      {
        customerId: customers[0]._id,
        tourId: tours[3]._id,
        numberOfPeople: 3,
        status: "paid",
        notes: "Gia đình có người cao tuổi, cần hỗ trợ di chuyển",
      },
    ]

    for (const bookingInfo of bookingData) {
      const tour = tours.find((t) => t._id.equals(bookingInfo.tourId))
      const booking = new Booking({
        bookingId: generateId("BOOK"),
        ...bookingInfo,
        totalAmount: tour.price * bookingInfo.numberOfPeople,
        bookingDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date in last 30 days
      })
      const savedBooking = await booking.save()
      bookings.push(savedBooking)

      // Update tour available slots
      tour.availableSlots -= bookingInfo.numberOfPeople
      await tour.save()
    }

    console.log("⭐ Creating sample reviews...")
    // Create sample reviews for paid bookings
    const reviewData = [
      {
        customerId: customers[0]._id,
        tourId: tours[0]._id,
        rating: 5,
        comment:
          "Tour rất tuyệt vời! Hướng dẫn viên nhiệt tình, lịch trình hợp lý. Đặc biệt ấn tượng với cảnh đẹp Hạ Long và không khí trong lành ở Sapa. Sẽ giới thiệu cho bạn bè.",
        status: "approved",
      },
      {
        customerId: customers[0]._id,
        tourId: tours[3]._id,
        rating: 4,
        comment:
          "Tour Nha Trang rất vui, biển đẹp, hải sản ngon. Tuy nhiên lịch trình hơi gấp, mong có thêm thời gian nghỉ ngơi. Nhìn chung rất hài lòng với chuyến đi.",
        status: "approved",
      },
    ]

    for (const reviewInfo of reviewData) {
      const review = new Review({
        reviewId: generateId("REV"),
        ...reviewInfo,
        reviewDate: new Date(Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000), // Random date in last 15 days
      })
      await review.save()
    }

    console.log("✅ Seed data created successfully!")
    console.log("📊 Summary:")
    console.log(`   - Admin account: admin@tourmanagement.com / admin123`)
    console.log(`   - Sample customers: ${customers.length}`)
    console.log(`   - Sample tours: ${tours.length}`)
    console.log(`   - Sample bookings: ${bookings.length}`)
    console.log(`   - Sample reviews: ${reviewData.length}`)
    console.log("")
    console.log("🔐 Test accounts:")
    console.log("   Admin: admin@tourmanagement.com / admin123")
    console.log("   Customer 1: nguyenvanan@gmail.com / 123456")
    console.log("   Customer 2: tranthibinh@gmail.com / 123456")
    console.log("   Customer 3: leminhcuong@gmail.com / 123456")
  } catch (error) {
    console.error("❌ Error seeding data:", error)
  } finally {
    mongoose.connection.close()
    console.log("🔌 Database connection closed")
  }
}

// Run the seed function
seedData()
