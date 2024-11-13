import React from 'react';
import { useNavigate } from 'react-router-dom';

const Order = ({ order }) => {

  const naviagte = useNavigate()

  if (!order) {
    return (
      <div>
        <h2>Order not found</h2>
        <p>It seems like there is no order to display. Please place an order first.</p>
      </div>
    );
  }

  return (
    <div className='contianer mx-auto py-8 px-4 md:px-16 lg:px-24'>
      <h2 className='text-2xl font-semibold mb-4'>Thank you for your order</h2>
      <p>Your order has been placed successfully. You will receive an email confirmation shortly.</p>

      <div className='mt-6 p-4 border rounded-lg bg-gray-100'>
        <h3 className='text-lg font-semibold mb-2'>Order Summary</h3>
        <p>Order Number: {order.orderNumber}</p>

        <div className='mt-4'>
          <h2 className='tex-md font-semibold mb-2'>Shipping Information</h2>
          <p>{order.shippingInformation?.address || 'No address provided'}</p>
          <p>{order.shippingInformation?.city || 'No city provided'}</p>
          <p>{order.shippingInformation?.zip || 'No zip code provided'}</p>
        </div>

        <div className='mt-4'>
          <p className='text-md font-semibold mb-2'>Itmes Ordered</p>
          {Array.isArray(order.products) && order.products.length > 0 ? (
            order.products.map((product, index) => (
              <div className='flex justify-between mt-2' key={index}>
                <p>{product.name} x {product.quantity}</p>
                <p>${(product.price * product.quantity).toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>

        <div className='mt-4 flex justify-between'>
          <span className='font-semibold'>Total Price:</span>
          <span className='font-semibold'>${order.totalPrice?.toFixed(2)}</span>
        </div>

        <div className='mt-6'>
          <button className='bg-green-500 text-white py-2 px-4 hover:bg-green-600'>Track Order</button>
          <button className='ml-4 bg-red-600 text-white py-2 px-4 hover:bg-red-800'
          onClick={() => naviagte('/')}>Continue Shopping</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
