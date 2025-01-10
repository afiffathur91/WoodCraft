const About = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[400px] object-cover"
            src="https://images.unsplash.com/photo-1581539250439-c96689b516dd?ixlib=rb-4.0.3"
            alt="Workshop"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
            Tentang Kami
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            Menghadirkan keindahan kayu dalam setiap detail furniture untuk menciptakan ruangan yang hangat dan nyaman.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-serif">Visi Kami</h2>
            <p className="mt-4 text-gray-600">
              Menjadi produsen furniture kayu terkemuka yang mengutamakan kualitas, 
              desain, dan keberlanjutan untuk menciptakan produk yang tidak hanya 
              indah tetapi juga ramah lingkungan.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-gray-900 font-serif">Misi Kami</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                <p className="ml-3 text-gray-600">
                  Menghasilkan furniture berkualitas tinggi dengan menggunakan bahan kayu pilihan
                </p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                <p className="ml-3 text-gray-600">
                  Menerapkan prinsip keberlanjutan dalam setiap proses produksi
                </p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-primary">•</span>
                <p className="ml-3 text-gray-600">
                  Memberikan pelayanan terbaik kepada pelanggan
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-serif">Keunggulan Kami</h2>
            <div className="mt-8 grid grid-cols-1 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Kualitas Premium</h3>
                <p className="mt-2 text-gray-600">
                  Setiap produk dibuat dengan bahan berkualitas tinggi dan dikerjakan 
                  oleh pengrajin berpengalaman.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Desain Eksklusif</h3>
                <p className="mt-2 text-gray-600">
                  Desain yang unik dan eksklusif yang mengkombinasikan unsur modern 
                  dan klasik.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Ramah Lingkungan</h3>
                <p className="mt-2 text-gray-600">
                  Komitmen kami terhadap lingkungan dengan menggunakan kayu dari 
                  sumber yang berkelanjutan.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 font-serif text-center">Tim Kami</h2>
          <div className="mt-12 grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3"
                alt="CEO"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Budi Santoso</h3>
              <p className="text-sm text-gray-500">CEO & Founder</p>
            </div>
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3"
                alt="Design Head"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Siti Rahayu</h3>
              <p className="text-sm text-gray-500">Head of Design</p>
            </div>
            <div className="text-center">
              <img
                className="mx-auto h-40 w-40 rounded-full object-cover"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3"
                alt="Production Head"
              />
              <h3 className="mt-4 text-lg font-medium text-gray-900">Ahmad Wijaya</h3>
              <p className="text-sm text-gray-500">Head of Production</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About 