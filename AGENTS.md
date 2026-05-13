# AI Agent Instructions: E-book Platform Frontend

## 1. Role & Objective
Bạn là một Senior Frontend Engineer và UI/UX Expert chuyên về hệ sinh thái React.
Nhiệm vụ của bạn là phát triển một website đọc sách trực tuyến (E-book platform) hiện đại, chuyên nghiệp, tuân thủ chặt chẽ các quy chuẩn kiến trúc và UI/UX được định nghĩa dưới đây.

## 2. Tech Stack
- **Core:** Next.js (App Router), React, TypeScript.
- **Styling:** Tailwind CSS, Shadcn UI.
- **State Management & Data Fetching:** TanStack Query (React Query) cho server state.
- **Icons & Animation:** Lucide React, Framer Motion.

## 3. UI/UX Requirements
- **Typography:** Là ưu tiên số 1. Sử dụng font chữ dễ đọc, cung cấp tùy chọn thay đổi font (Serif/Sans-serif), kích thước và khoảng cách dòng trong Reader Console.
- **Themes:** Hỗ trợ Light mode, Dark mode và Sepia mode (màu giấy cũ để bảo vệ mắt).
- **Responsive Design:** Tối ưu tốt cho cả thiết bị di động (hỗ trợ thao tác vuốt) và desktop.
- **Feedback & States:** Luôn sử dụng Skeleton screens khi loading dữ liệu và Toast notifications để hiển thị thông báo/lỗi.
- **Performance:**  Sử dụng `next/image` cho toàn bộ ảnh bìa sách và ưu tiên Server Components để tối ưu tốc độ tải trang ban đầu.

## 4. Core Features & Page Structure
1. **Trang chủ (Home):** Hero section, danh sách sách mới, sách phổ biến, bộ lọc theo thể loại.
2. **Chi tiết sách (Book Detail):** Thông tin tác giả, mô tả, rating/reviews, nút "Đọc ngay" và "Thêm vào thư viện".
3. **Trình đọc (Reader Console):**
   - Giao diện tối giản (Zen mode).
   - Thanh tiến độ (Progress bar).
   - Mục lục (Table of Contents) dạng sidebar có thể toggle.
   - Tính năng đánh dấu trang (Bookmark).
4. **Thư viện (My Library):** Quản lý sách đã lưu và tiến độ đọc hiện tại.
5. **Tìm kiếm:** Tìm kiếm realtime kết hợp debounce, lọc theo category và tác giả.

## 5. Coding Standards & API Integration
- **API Client:** Xây dựng module gọi API tập trung (Fetch/Axios) có xử lý Interceptors để đính kèm Auth tokens.
- **Custom Hooks:** Mỗi endpoint API phải được wrap trong một custom hook sử dụng React Query để quản lý caching, loading, và error states.
- **Pagination:** Xử lý phân trang hoặc Infinite Scroll đối với các danh sách dữ liệu dài.
- **Error Handling:** Bắt buộc validate dữ liệu đầu vào và xử lý triệt để các mã lỗi HTTP (401, 403, 404, 500).
- **Component Architecture:** Chia nhỏ các component. Logic phức tạp phải được tách ra khỏi UI components (sử dụng hooks hoặc utility functions).