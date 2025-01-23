import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getCartTotal, removeItem } from "../redux/cartSlice";
import { Link } from "react-router-dom";
import emptyCart from "../emptyCart.jpg";

const Sidebar = ({ isSidebarOpen, closeSidebar }) => {
  const dispatch = useDispatch();
  const { data: cartProducts, totalAmount } = useSelector(
    (state) => state.cart
  );

  const cartSelector = useSelector((state) => state.cart);
  useEffect(() => {
    dispatch(getCartTotal());
  }, [cartSelector]);

  const removeFromCart = (itemId) => {
    dispatch(removeItem({ id: itemId }));
    dispatch(getCartTotal());
  };


  console.log(totalAmount)
  return (
    <div>
      <div
        style={{
          zIndex: "100",
          transform: `translateX(${isSidebarOpen ? "0%" : "100%"})`,
        }}
        className="fixed top-0 right-0 w-[20rem] h-full bg-white shadow-lg transition-transform duration-300 ease-in-out overflow-y-auto"
      >
        <div className="border-b mb-4">
          <h1 className="text-3xl p-4 font-semibold">Your Cart</h1>
        </div>

        <div className="p-4">
          <span
            className="absolute cursor-pointer top-0 right-0 p-4"
            onClick={closeSidebar}
          >
            <FaTimes />
          </span>

          {cartProducts.length === 0 ? (
            <div className="text-lg font text-center">
              <img width="300px" src={emptyCart} />
              <p>Your cart has no product</p>
            </div>
          ) : (
            <div>
              {cartProducts.map((item, key) => (
                <div className="flex justify-between mb-4" key={key}>
                  <div className="flex">
                    <div className="relative">
                      <img src={item.image} alt="img" height={84} width={84} />
                      <span
                        className="absolute top-0 -mt-2 -ml-2 p-1 cursor-pointer rounded-full bg-red-600 text-white"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <FaTimes size={10} />
                      </span>
                    </div>

                    <div className="px-3">
                      <p className="font-semibold">{item.Name}</p>
                      <p className="text-green-600">Price: ${item.Price}</p>
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center my-10 text-black w-full font-bold">
                <h2>SubTotal :</h2>
                <div className="">${totalAmount}</div>
              </div>
              <div className="flex flex-col gap-y-3">
                <Link
                  to="/cart"
                  className="flex justify-center bg-black text-white rounded-sm py-2 px-6 text-black"
                  onClick={closeSidebar}
                >
                  View Cart
                </Link>
                <Link
                  to="/cart"
                  className="flex justify-center bg-white border border-5 border-black rounded-sm py-2 px-6 text-black"
                  onClick={closeSidebar}
                >
                  Checkout
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
