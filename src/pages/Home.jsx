import { Link } from 'react-router-dom'

const featuredProducts = [
  {
    id: 1,
    name: 'Kursi Kayu Jati',
    price: 'Rp 2.500.000',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3',
  },
  {
    id: 2,
    name: 'Meja Makan Minimalis',
    price: 'Rp 4.800.000',
    image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3',
  },
  {
    id: 3,
    name: 'Lemari Pakaian Modern',
    price: 'Rp 6.300.000',
    image: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3',
  },
]

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[600px] object-cover"
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3"
            alt="Hero background"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
            Keindahan Kayu dalam Setiap Detail
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            Temukan koleksi furniture kayu berkualitas tinggi yang akan menghadirkan kehangatan dan elegansi ke dalam ruangan Anda.
          </p>
          <div className="mt-10">
            <Link
              to="/products"
              className="inline-block bg-primary border border-transparent rounded-md py-3 px-8 text-base font-medium text-white hover:bg-opacity-90"
            >
              Lihat Koleksi
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 font-serif">Produk Unggulan</h2>
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
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
                <p className="mt-1 text-sm text-gray-500">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* About Section */}
        <div className="mt-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-serif">Tentang WoodCraft</h2>
              <p className="mt-4 text-gray-600">
                WoodCraft adalah produsen furniture kayu premium yang mengutamakan kualitas dan desain. 
                Setiap produk kami dibuat dengan ketelitian tinggi menggunakan bahan kayu pilihan untuk 
                menghasilkan furniture yang tidak hanya indah tetapi juga tahan lama.
              </p>
              <Link
                to="/about"
                className="mt-8 inline-block text-primary hover:text-accent"
              >
                Pelajari lebih lanjut →
              </Link>
            </div>
            <div className="relative h-96">
              <img
                src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3"
                alt="Workshop"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home 