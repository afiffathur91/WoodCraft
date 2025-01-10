import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FunnelIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const products = [
  {
    id: 1,
    name: 'Kursi Kayu Jati',
    category: 'Kursi',
    price: 'Rp 2.500.000',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'Meja Makan Minimalis',
    category: 'Meja',
    price: 'Rp 4.800.000',
    image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3',
  },
  {
    id: 3,
    name: 'Lemari Pakaian Modern',
    category: 'Lemari',
    price: 'Rp 6.300.000',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3',
  },
  {
    id: 4,
    name: 'Kursi Santai',
    category: 'Kursi',
    price: 'Rp 3.200.000',
    image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?ixlib=rb-4.0.3',
  },
  {
    id: 5,
    name: 'Meja Kerja',
    category: 'Meja',
    price: 'Rp 2.800.000',
    image: 'https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?ixlib=rb-4.0.3',
  },
  {
    id: 6,
    name: 'Rak Buku Minimalis',
    category: 'Rak',
    price: 'Rp 1.800.000',
    image: 'https://images.unsplash.com/photo-1594620302200-9a34a4ccd203?ixlib=rb-4.0.3',
  },
]

const categories = ['Semua', 'Kursi', 'Meja', 'Lemari', 'Rak']

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua')
  const [sortBy, setSortBy] = useState('name')
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const filteredProducts = products.filter(product => 
    selectedCategory === 'Semua' ? true : product.category === selectedCategory
  )

  const handleSearch = (e) => {
    e.preventDefault()
    navigate(`/search?q=${searchQuery}`)
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900 font-serif">Koleksi Produk</h1>
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari produk..."
                className="border border-gray-300 rounded-l-md px-4 py-2 focus:ring-primary focus:border-primary"
              />
              <button
                type="submit"
                className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90"
              >
                <MagnifyingGlassIcon className="h-5 w-5" />
              </button>
            </form>

            <FunnelIcon className="h-5 w-5 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border-gray-300 rounded-md text-sm focus:ring-primary focus:border-primary"
            >
              <option value="name">Urutkan berdasarkan nama</option>
              <option value="price">Urutkan berdasarkan harga</option>
            </select>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">
                  <Link to={`/products/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                <p className="mt-1 text-lg font-medium text-primary">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
