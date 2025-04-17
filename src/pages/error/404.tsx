export default function NotFound() {
  return (
    <div className="flex-center w-full h-full">
      <div className="text-center">
        <p className="text-8xl font-bold text-[#e04242] text-center">404</p>
        <p className="text-3xl font-bold my-4">
          Chúng tôi không tìm thấy trang bạn yêu cầu
        </p>
        <p className="text-gray-500 text-lg">Có thể bạn đã nhập sai địa chỉ hoặc trang có thể không tồn tại</p>
      </div>
    </div>
  );
}
