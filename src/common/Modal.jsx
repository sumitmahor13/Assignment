import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { PiMinus, PiPlus } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { addToCart, getCartTotal, updateQuantity } from "../redux/cartSlice";
import { Link } from "react-router-dom";

const Modal = ({ isModalOpen, handleClose, data }) => {
  const [qty, setQty] = useState(1);
  const [addedItemToCart, setAddedItemToCart] = useState(false);

  const dispatch = useDispatch();

  const addItemToCart = (product) => {
    let totalPrice = qty * product.price;

    const tempProduct = {
      ...product,
      quantity: qty,
      totalPrice,
    };

    dispatch(addToCart(tempProduct));
    dispatch(getCartTotal());
    setAddedItemToCart(true);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add("modal-open");
    } else {
      setQty(1);
      setAddedItemToCart(false);
      document.body.classList.remove("modal-open");
    }
  }, [isModalOpen]);

  const increaseQuantity = (itemId, currentQuantity) => {
    const newQty = currentQuantity + 1;
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };
  const decreaseQuantity = (itemId, currentQuantity) => {
    const newQty = Math.max(currentQuantity - 1, 1);
    setQty(newQty);
    dispatch(updateQuantity({ id: itemId, quantity: newQty }));
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content w-2/3 relative bg-white overflow-hidden">
            <span
              className="absolute top-0 right-0 p-4"
              onClick={() => handleClose()}
            >
              <FaTimes />
            </span>
            <div className="flex">
              <div className="relative">
                <div className="flash_sale_img">
                  <img src={data.image} alt="img" />
                </div>
              </div>

              <div className="flex flex-col gap-y-2 ml-6">
                <p className="mb-2 font-bold text-xl">{data?.Name}</p>
                <p className="text-gray-500 font-semibold text-2xl">$ {(data?.Price)}</p>
                <p className="font-bold text-sm">Available: <span className="text-green-500">In-stock</span></p>
                <p className="my-2 text-sm">{data?.Desc}</p>
                <div className="flex items-center">
                  <div className="flex mr-3 ">
                    <button
                      className="border mt-4 py-2 px-6 "
                      onClick={() => decreaseQuantity(data.id, qty)}
                    >
                      <PiMinus />
                    </button>
                    <span className="border mt-4 py-2 px-6 count">
                      {qty || 1}
                    </span>
                    <button
                      className="border mt-4 py-2 px-6"
                      onClick={() => increaseQuantity(data.id, qty)}
                    >
                      <PiPlus />
                    </button>
                  </div>

                  <div className="addtocart mr-3">
                    {addedItemToCart ? (
                      <button className="mt-4 px-6 py-2 text-white">
                        <Link to="/cart">View Cart</Link>
                      </button>
                    ) : (
                      <button
                        onClick={() => addItemToCart(data)}
                        className="mt-4 px-7 py-2 text-white"
                      >
                        Add To Cart
                      </button>
                    )}
                  </div>
                </div>
                <div className="text-sm font-semibold mt-5">SKU: <span className="text-gray-500 font-thin">{data.SKU}</span></div>
                <div className="text-sm font-semibold">Category: <span className="text-gray-500 font-thin">{data.Category}</span></div>
                <div className="text-sm font-semibold mb-5">Tags: <span className="text-gray-500 font-thin">{data.tag}</span></div>
                <div className="text-sm mt-5">Share this item:</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
