import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmptyCart from '../assets/Images/empty.png';
import { FaTrashAlt } from 'react-icons/fa';
import Modal from '../components/Modal';
import ChangeAddress from '../components/ChangeAddress';
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';


function Cart() {
  const cart = useSelector(state => state.cart);
  const [address, setAddress] = useState('main street, 0012');
  const [isModelOpen, setIsModelOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate();

  return (
    <div className='container mx-auto py-8 min-h-96 px-4 md:px-16 lg:px-24'>
      {cart.products.length > 0 ? (
        <div>
          <h3 className='text-2xl font-semibold mb-4'>SHOPPING CART</h3>
          <div className='flex flex-col md:flex-row justify-between space-x-10 mt-8'>

            <div className='md:w-2/3'>
              <div className='flex justify-between border-b items-center mb-4 text-xs font-semibold'>
                <p>PRODUCTS</p>
                <div className='flex space-x-8'>
                  <p>Price</p>
                  <p>QUANTITY</p>
                  <p>SUBTOTAL</p>
                  <p>REMOVE</p>
                </div>
              </div>
              <div>
                {cart.products.map((product) => (
                  <div key={product.id} className='flex items-center justify-between border-b'>
                    <div className='md:flex items-center space-x-4'>
                      <img src={product.image} alt={product.name} className='w-16 h-16 object-contain rounded' />
                      <div className='flex-1 ml-4'>
                        <h3 className='text-lg font-semibold'>{product.name}</h3>
                      </div>
                    </div>
                    <div className='flex space-x-12 items-center'>
                      <p>${product.price}</p>
                      <div className='flex items-center justify-center border'>
                        <button
                          className='text-xl font-bold px-1.5 border-r'
                          onClick={() => dispatch(decreaseQuantity(product.id))}>-</button>
                        <p className='text-xl px-2'>{product.quantity}</p>
                        <button
                          className='text-xl px-1 border-1'
                          onClick={() => dispatch(increaseQuantity(product.id))}>+</button>
                      </div>
                      <p>${(product.quantity * product.price).toFixed(2)}</p>
                      <button className='text-red-500 hover:text-red-700' onClick={() => dispatch(removeFromCart(product.id))}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='md:w-1/3 bg-white p-6 rounded-lg shadow-md border'>
              <h3 className='text-sm font-semibold mb-5'>CART TOTAL:</h3>
              <div className='flex justify-between mb-2 border-b pb-1'>
                <span className='text-sm'>Total items:</span>
                <span>{cart.totalQuantity}</span>
              </div>
              <div className='mb-4 border-b pb-2'>
                <p>Shipping:</p>
                <p>Shipping to: <span className='text-xs font-bold'>{address}</span></p>
              </div>
              <button className='text-blue-500 underline mb-4' onClick={() => setIsModelOpen(true)}>Change address</button>
              <div className='flex justify-between mb-2'>
                <span>Total Price:</span>
                <span>${cart.totalPrice.toFixed(2)}</span>
              </div>
              <button className='mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-800 w-full'
                onClick={() => navigate('/checkout')}>
                Proceed to Checkout
              </button>
            </div>

          </div>
          <Modal isModelOpen={isModelOpen} setIsModelOpen={setIsModelOpen}>
            <ChangeAddress setAddress={setAddress} setIsModelOpen={setIsModelOpen} />
          </Modal>
        </div>
      ) : (
        <div className='flex justify-center'>
          <img src={EmptyCart} alt="Cart is empty" className='h-96' />
        </div>
      )}
    </div>
  );
}

export default Cart;
