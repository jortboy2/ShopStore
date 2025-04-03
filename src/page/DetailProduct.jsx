import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart, FaHeart, FaShare, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useSnackbar } from "notistack";

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(response.data.data);
        if (response.data.data.colors && response.data.data.colors.length > 0) {
          setSelectedColor(response.data.data.colors[0]);
        }
        if (response.data.data.sizes && response.data.data.sizes.length > 0) {
          setSelectedSize(response.data.data.sizes[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        enqueueSnackbar("Không thể tải thông tin sản phẩm", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, enqueueSnackbar]);

  const handleAddToCart = () => {
    if (!selectedColor) {
      enqueueSnackbar("Vui lòng chọn màu sắc", { variant: "warning" });
      return;
    }
    if (!selectedSize) {
      enqueueSnackbar("Vui lòng chọn kích thước", { variant: "warning" });
      return;
    }
    
    // Add to cart logic here
    enqueueSnackbar("Đã thêm sản phẩm vào giỏ hàng", { variant: "success" });
  };

  const handleBuyNow = () => {
    if (!selectedColor) {
      enqueueSnackbar("Vui lòng chọn màu sắc", { variant: "warning" });
      return;
    }
    if (!selectedSize) {
      enqueueSnackbar("Vui lòng chọn kích thước", { variant: "warning" });
      return;
    }
    
    // Buy now logic here
    enqueueSnackbar("Đang chuyển đến trang thanh toán", { variant: "info" });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl font-semibold text-gray-700">Không tìm thấy sản phẩm</div>
      </div>
    );
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100) 
    : product.price;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square overflow-hidden rounded-lg border border-gray-200">
            <img 
              src={`${import.meta.env.VITE_API_URL}/uploads/products/${product.images[activeImage]}`} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <div 
                key={index}
                className={`aspect-square overflow-hidden rounded-md border cursor-pointer transition-all ${
                  activeImage === index ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img 
                  src={`${import.meta.env.VITE_API_URL}/uploads/products/${image}`} 
                  alt={`${product.name} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <span className="ml-2 text-sm text-gray-500">(4.5 - 120 đánh giá)</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {product.discount > 0 && (
              <span className="text-2xl font-bold text-red-600">
                {new Intl.NumberFormat('vi-VN').format(discountedPrice)}đ
              </span>
            )}
            <span className={`text-xl ${product.discount > 0 ? 'line-through text-gray-500' : 'font-bold text-gray-900'}`}>
              {new Intl.NumberFormat('vi-VN').format(product.price)}đ
            </span>
            {product.discount > 0 && (
              <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                -{product.discount}%
              </span>
            )}
          </div>

          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Danh mục:</span>
              <span className="font-medium">{product.category?.name || 'Chưa phân loại'}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-500">Tình trạng:</span>
              <span className={`font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
              </span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-500">Giới tính:</span>
              <span className="font-medium">{product.gender || 'Unisex'}</span>
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Màu sắc:</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 border rounded-md transition-all ${
                      selectedColor === color 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Kích thước:</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    className={`w-12 h-12 flex items-center justify-center border rounded-md transition-all ${
                      selectedSize === size 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-2">Số lượng:</h3>
            <div className="flex items-center">
              <button 
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md"
                onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input 
                type="number" 
                min="1" 
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                className="w-16 h-10 text-center border-t border-b border-gray-300"
              />
              <button 
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md"
                onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
            >
              <FaShoppingCart />
              <span>Thêm vào giỏ hàng</span>
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-3 px-6 rounded-md hover:bg-red-700 transition-colors"
            >
              <span>Mua ngay</span>
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FaHeart />
              <span>Yêu thích</span>
            </button>
            <button className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FaShare />
              <span>Chia sẻ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Mô tả sản phẩm</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: product.description }}></div>
      </div>
    </div>
  );
};

export default DetailProduct;
