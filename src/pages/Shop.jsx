import React, { useContext, useState } from "react";
import { products } from "../data/Data";
import Modal from "../common/Modal";
import "rc-slider/assets/index.css";
import { IoBagOutline } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdAdd } from "react-icons/io";
import { AppContext } from "../context/AppContext";

const Shop = () => {
  const [isModalOpen, setIsModalOpen] = useState(null);

  const { data } = useContext(AppContext);

  const handleOpen = (productId) => {
    setIsModalOpen(productId);
  };
  const handleClose = () => {
    setIsModalOpen(null);
  };

  return (
    <div>
      <div>
        <div className="w-10/12 m-auto flex gap-3 items-start mt-8 ">
          <div className="w-full">
            <div className="grid grid-cols-4 gap-3 grid-wrap">
              {data.map((item) => (
                <div key={item.id}>
                  <div className="overflow-hidden relative ml-4">
                    <div className="image-container relative">
                      <div className="rounded-3xl">
                        <img src={item.image} alt="img" />
                      </div>

                      <div className="opacity-0 absolute top-32 left-16">
                        <div className="flex gap-4">
                          <div className="bg-white p-4 rounded-full mb-2">
                            <IoMdHeartEmpty />
                          </div>
                          <div className="bg-white p-4 rounded-full mb-2">
                            <IoBagOutline />
                          </div>
                          <div
                            onClick={() => handleOpen(item.id)}
                            className="bg-white p-4 rounded-full mb-2"
                          >
                            <IoMdAdd />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="product-details my-2">
                      <p className=" font-semibold">{item.Name}</p>
                      <p>$ {item.Price.toLocaleString("en-IN")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Modal
          data={data.find((item) => item.id === isModalOpen)}
          isModalOpen={isModalOpen}
          handleClose={handleClose}
        />
      </div>
    </div>
  );
};

export default Shop;
