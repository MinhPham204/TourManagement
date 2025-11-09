# Website Quản lý Tour Du lịch

Đây là một trang web đặt tour du lịch được phát triển cho một công ty lữ hành. Dự án được xây dựng theo nhóm gồm 3 thành viên và bao gồm các luồng nghiệp vụ hoàn chỉnh cho cả khách hàng và quản trị viên, tích hợp cả thông báo theo thời gian thực.

**Kho lưu trữ:** [https://github.com/MinhPham204/TourManagement](https://github.com/MinhPham204/TourManagement)

## Các tính năng chính

### Tính năng cho Khách hàng
* **Quản lý tài khoản:** Đăng ký, đăng nhập và quản lý thông tin cá nhân.
* **Tìm kiếm nâng cao:** Duyệt, tìm kiếm và lọc các tour theo điểm đến, giá cả, thời gian, v.v.
* **Trang chi tiết Tour:** Xem thông tin đầy đủ, lịch trình và hình ảnh của tour.
* **Hệ thống Đặt tour:** Luồng công việc đặt tour và theo dõi thanh toán trực tuyến an toàn.
* **Đánh giá & Xếp hạng:** Khách hàng có thể gửi đánh giá và xếp hạng cho các tour đã hoàn thành.

### Trang tổng quan (Dashboard) cho Quản trị viên
* **Quản lý Tour:** Đầy đủ chức năng CRUD (Thêm, Đọc, Sửa, Xóa) cho các tour.
* **Quản lý Khách hàng:** Xem và quản lý tài khoản khách hàng.
* **Quản lý Đặt tour:** Phê duyệt hoặc hủy bỏ các đơn đặt tour của khách hàng.
* **Thống kê:** Xem thống kê về doanh thu và tổng số lượt đặt tour.
* **Kiểm duyệt Đánh giá:** Phê duyệt hoặc xóa các đánh giá do khách hàng gửi.

### Tính năng Thời gian thực (Real-time)
* **Thông báo trực tiếp:** Sử dụng **Socket.io** để cung cấp thông báo tức thì cho người dùng và quản trị viên (có đơn đặt tour mới, đơn tour đã được duyệt).

## Công nghệ sử dụng

Dự án sử dụng một loạt các công nghệ hiện đại cho cả frontend và backend.

### **Frontend (Giao diện người dùng)**
* **React.js:** Thư viện JavaScript để xây dựng giao diện người dùng.
* **Bootstrap:** Framework CSS cho thiết kế đáp ứng (responsive), ưu tiên thiết bị di động.
* **Axios:** Thư viện HTTP client dựa trên Promise để thực hiện các yêu cầu đến API.

### **Backend (Hệ thống máy chủ)**
* **Node.js:** Môi trường thực thi JavaScript phía máy chủ.
* **Express.js:** Framework ứng dụng web cho Node.js, được sử dụng để xây dựng RESTful API.
* **MongoDB:** Cơ sở dữ liệu NoSQL được sử dụng để lưu trữ dữ liệu tour, người dùng và đặt chỗ.
* **Mongoose:** Thư viện ODM (Object Data Modeling) cho MongoDB và Node.js.

### **Xác thực & Thời gian thực**
* **JSON Web Tokens (JWT):** Được sử dụng để bảo mật API và quản lý phiên đăng nhập của người dùng.
* **Bcrypt.js:** Thư viện để băm mật khẩu người dùng một cách an toàn.
* **Socket.io:** Cho phép giao tiếp hai chiều, thời gian thực giữa máy khách và máy chủ.

## Bắt đầu (Cài đặt)

Để chạy dự án này trên máy cục bộ của bạn, hãy làm theo các bước chung sau:

### **Yêu cầu:**
* Node.js
* MongoDB (Một phiên bản cục bộ hoặc chuỗi kết nối Atlas)

### **Cài đặt Backend**
1.  Sao chép kho lưu trữ và điều hướng đến thư mục server.
    ```bash
    git clone [https://github.com/MinhPham204/TourManagement.git](https://github.com/MinhPham204/TourManagement.git)
    cd TourManagement/server 
    ```
2.  Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    ```
3.  Tạo tệp `.env` và thêm các biến môi trường của bạn (ví dụ: `MONGO_URI`, `JWT_SECRET`).
4.  Khởi động máy chủ:
    ```bash
    npm start
    ```

### **Cài đặt Frontend**
1.  Điều hướng đến thư mục client:
    ```bash
    cd ../client
    ```
2.  Cài đặt các gói phụ thuộc:
    ```bash
    npm install
    ```
3.  Đảm bảo frontend được cấu hình để kết nối với API backend (ví dụ: qua proxy trong `package.json` hoặc đặt biến môi trường).
4.  Khởi động ứng dụng React:
    ```bash
    npm start
    ```
