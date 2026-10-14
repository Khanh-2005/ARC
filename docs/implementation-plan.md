Mình không thể mở file Figma trực tiếp vì Figma yêu cầu đăng nhập. Nhưng dựa trên những gì bạn đã chọn trước đó (employee list, leave, payroll, recruitment + admin roles + employee self-service), mình có đủ thông tin để đề xuất cụ thể.

---

## Ý tưởng bổ sung UI cho 2 role còn lại

### Nguyên tắc chung
Giữ nguyên design system (màu sắc, typography, component) từ Figma HR Manager kit. Chỉ thêm màn hình mới, không phá vỡ consistency.

---

### Role: Admin

Có toàn bộ quyền của HR Manager, bổ sung thêm:

**1. User & Roles Management**
- Table: avatar + tên + email + role badge + trạng thái + nút Edit/Deactivate
- Modal tạo/sửa account: tên, email, chọn role (dropdown), phòng ban
- Role badge màu phân biệt: Admin (tím), HR Manager (xanh), Employee (xám)

**2. System Settings**
- Sidebar phụ trong Settings: Phòng ban / Vị trí / Ca làm / Loại nghỉ phép
- Mỗi mục là danh sách đơn giản với Add / Edit / Delete inline

**3. Payroll Config**
- Form cấu hình: thuế TNCN (%), BHXH (%), BHYT (%), BHTN (%)
- Bảng phụ cấp theo cấp bậc (có thể thêm/xóa dòng)

---

### Role: Employee (Self-Service)

Layout khác biệt: không cần sidebar đầy đủ, dùng top nav + card-based.

**1. My Profile**
- Hero card: ảnh, tên, vị trí, phòng ban, ngày vào làm
- Tabs: Thông tin cá nhân / Liên hệ khẩn cấp / Tài khoản ngân hàng
- Nút "Yêu cầu cập nhật" thay vì edit trực tiếp (cần HR duyệt)

**2. Leave Request**
- Số ngày phép còn lại: 3 thẻ nhỏ (Năm / Ốm / Cá nhân) với progress bar
- Form xin nghỉ: loại nghỉ, từ ngày, đến ngày, lý do, upload đính kèm
- Tab lịch sử: timeline dạng list, badge trạng thái màu (chờ / duyệt / từ chối)

**3. Payslip**
- Dropdown chọn tháng/năm
- Card payslip: thu nhập (lương cơ bản + phụ cấp) | khấu trừ | thực nhận (highlighted)
- Nút Download PDF

**4. Contract**
- List hợp đồng theo thời gian (newest first)
- Badge: Hiệu lực (xanh) / Sắp hết hạn (vàng) / Hết hạn (đỏ)
- Nút xem PDF / download

---

### Cấu trúc điều hướng theo role

```
Admin          → Full sidebar (tất cả modules + Settings + User Management)
HR Manager     → Sidebar hiện tại từ Figma kit
Employee       → Top nav: Home / Nghỉ phép / Lương / Hợp đồng / Hồ sơ
```

---

### Gợi ý workflow trong Figma

1. Duplicate page "HR Manager" làm base cho Admin — thêm section "Admin Only"
2. Tạo page mới "Employee Portal" với layout top-nav, card-based
3. Dùng Figma Variables để toggle role và ẩn/hiện component theo quyền

---

Bạn muốn mình lên **plan chi tiết để build app này trong Arc Studio** không? Có thể build thẳng React + Tailwind từ spec này, với routing theo role và mock data để demo đầy đủ 3 role.
