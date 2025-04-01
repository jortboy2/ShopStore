import { useState } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <FaComments className="text-2xl" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-xl w-80 h-96 flex flex-col">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Chat với nhân viên</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:text-gray-200"
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm">Xin chào! Tôi có thể giúp gì cho bạn?</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg ml-auto max-w-[80%]">
                <p className="text-sm">Tôi cần hỗ trợ về sản phẩm</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nhập tin nhắn..."
                className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPopup; 