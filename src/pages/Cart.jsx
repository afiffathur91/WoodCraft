import { useState } from 'react'
import { Link } from 'react-router-dom'
import { TrashIcon } from '@heroicons/react/24/outline'

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Kursi Kayu Jati',
      price: 'Rp 2.500.000',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3',
    },
    {
      id: 2,
      name: 'Meja Makan Minimalis',
      price: 'Rp 4.800.000',
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3',
    },
  ])

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ))
  }

  const subtotal = "Rp 7.300.000" // In real app, calculate this from items

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 font-serif">Keranjang Belanja</h1>

        {cartItems.length === 0 ? (
          <div className="mt-8 text-center">
            <p className="text-gray-500">Keranjang belanja Anda kosong</p>
            <Link
              to="/products"
              className="mt-4 inline-block text-primary hover:text-accent"
            >
              Lanjutkan Belanja →
            </Link>
          </div>
        ) : (
          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="md:col-span-2">
                <div className="space-y-8">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">
                          <Link to={`/products/${item.id}`} className="hover:text-primary">
                            {item.name}
                          </Link>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{item.price}</p>
                        <div className="mt-2 flex items-center space-x-4">
                          <div className="flex items-center border border-gray-300 rounded-md">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 text-gray-600 hover:text-primary"
                            >
                              -
                            </button>
                            <span className="px-4 py-2 text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-primary"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h2 className="text-lg font-medium text-gray-900">Ringkasan Pesanan</h2>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Subtotal</p>
                      <p className="text-sm font-medium text-gray-900">{subtotal}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600">Pengiriman</p>
                      <p className="text-sm font-medium text-gray-900">Gratis</p>
                    </div>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <p className="text-base font-medium text-gray-900">Total</p>
                        <p className="text-base font-medium text-gray-900">{subtotal}</p>
                      </div>
                    </div>
                  </div>
                  <button className="mt-6 w-full bg-primary text-white py-3 px-4 rounded-md hover:bg-opacity-90">
                    Lanjutkan ke Pembayaran
                  </button>
                  <Link
                    to="/products"
                    className="mt-4 block text-center text-sm text-primary hover:text-accent"
                  >
                    Lanjutkan Belanja
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart 