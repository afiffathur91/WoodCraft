import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Kursi Kayu Jati',
    category: 'Kursi',
    price: 'Rp 2.500.000',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3',
    description: 'Kursi kayu jati berkualitas tinggi dengan desain klasik yang elegan. Dibuat dari kayu jati pilihan yang tahan lama dan nyaman digunakan.',
    details: [
      'Material: Kayu Jati Grade A',
      'Dimensi: 60cm x 60cm x 90cm',
      'Finishing: Natural Wood',
      'Garansi: 1 Tahun',
    ],
  },
  // ... produk lainnya
]

const ProductDetail = () => {
  const { id } = useParams()
  const [quantity, setQuantity] = useState(1)
  
  const product = products.find(p => p.id === parseInt(id))
  
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p>Produk tidak ditemukan</p>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 font-serif">{product.name}</h1>
            <p className="mt-2 text-sm text-gray-500">{product.category}</p>
            <p className="mt-4 text-2xl font-medium text-primary">{product.price}</p>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Deskripsi</h3>
              <p className="mt-4 text-gray-600">{product.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium text-gray-900">Detail Produk</h3>
              <ul className="mt-4 space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="text-gray-600">• {detail}</li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-gray-600 hover:text-primary"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-gray-600 hover:text-primary"
                  >
                    +
                  </button>
                </div>
                <button className="flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90">
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail 