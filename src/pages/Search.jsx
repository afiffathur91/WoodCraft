import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Search = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'livingroom', name: 'Living Room' },
    { id: 'bedroom', name: 'Bedroom' },
    { id: 'kitchen', name: 'Kitchen & Dining' }
  ]

  const priceRanges = [
    { id: 'all', name: 'Semua Harga' },
    { id: '0-250', name: 'Dibawah Rp 250.000' },
    { id: '250-500', name: 'Rp 250.000 - Rp 500.000' },
    { id: '500-1000', name: 'Rp 500.000 - Rp 1.000.000' },
    { id: '1000+', name: 'Diatas Rp 1.000.000' }
  ]

  // Data produk statis untuk contoh
  const dummyProducts = [
    {
      id: 1,
      name: 'Comfort Green 2-Seater Velvet Sofa',
      category: 'livingroom',
      price: 299,
      image: 'https://i.pinimg.com/564x/eb/57/6f/eb576ff023487bcb1fa3ad61ee7b23ee.jpg',
      rating: 4.5,
      reviews: 257
    },
    {
      id: 2,
      name: 'Ancient Green 2-Seater Velvet Sofa',
      category: 'livingroom',
      price: 159,
      image: 'https://i.pinimg.com/564x/eb/57/6f/eb576ff023487bcb1fa3ad61ee7b23ee.jpg',
      rating: 4.2,
      reviews: 187
    },
    {
      id: 3,
      name: 'Classy Brown 3-Seater Velvet Sofa',
      category: 'livingroom',
      price: 699,
      image: 'https://i.pinimg.com/564x/eb/57/6f/eb576ff023487bcb1fa3ad61ee7b23ee.jpg',
      rating: 4.8,
      reviews: 427
    }
  ]

  useEffect(() => {
    // Simulasi loading data dari API
    setIsLoading(true)
    setTimeout(() => {
      setProducts(dummyProducts)
      setFilteredProducts(dummyProducts)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    filterProducts()
  }, [selectedCategory, priceRange, searchQuery])

  const filterProducts = () => {
    let filtered = [...products]

    // Filter berdasarkan kategori
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter berdasarkan range harga
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number)
      filtered = filtered.filter(product => {
        if (priceRange === '1000+') {
          return product.price > 1000
        }
        return product.price >= min && product.price <= max
      })
    }

    // Filter berdasarkan pencarian
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {priceRanges.map(range => (
              <option key={range.id} value={range.id}>
                {range.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-primary">Rp {product.price}.000</span>
                <Link
                  to={`/product/${product.id}`}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-opacity-90 transition-colors"
                >
                  Detail
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            Tidak ada produk yang ditemukan
          </h3>
          <p className="text-gray-600">
            Coba ubah filter atau kata kunci pencarian Anda
          </p>
        </div>
      )}
    </div>
  )
}

export default Search 