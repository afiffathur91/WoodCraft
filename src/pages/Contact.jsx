import { useState } from 'react'
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log(formData)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="absolute inset-0">
          <img
            className="w-full h-[400px] object-cover"
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3"
            alt="Contact"
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50"></div>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl font-serif">
            Hubungi Kami
          </h1>
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            Kami siap membantu Anda dengan segala pertanyaan dan kebutuhan furniture Anda.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-serif">Kirim Pesan</h2>
            <p className="mt-4 text-gray-600">
              Silakan isi form di bawah ini dan kami akan menghubungi Anda secepatnya.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Pesan
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 font-serif">Informasi Kontak</h2>
            <p className="mt-4 text-gray-600">
              Kunjungi showroom kami atau hubungi kami melalui kontak di bawah ini.
            </p>

            <div className="mt-8 space-y-8">
              <div className="flex items-start">
                <MapPinIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Alamat</h3>
                  <p className="mt-2 text-gray-600">
                    Jl. Ambon 2 No 7<br />
                    Padang, Indonesia
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <PhoneIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Telepon</h3>
                  <p className="mt-2 text-gray-600">(021) 1234-5678</p>
                </div>
              </div>

              <div className="flex items-start">
                <EnvelopeIcon className="h-6 w-6 text-primary flex-shrink-0" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">Email</h3>
                  <p className="mt-2 text-gray-600">afif83@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="mt-12">
              <h3 className="text-lg font-medium text-gray-900">Lokasi Kami</h3>
              <div className="mt-4 bg-gray-200 rounded-lg h-80">
                {/* Add your map component here */}
                <div className="w-full h-full rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.06713328245!2d106.7891577!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sPadang%2C%20Daerah%20Khusus%20Ibukota%20Padang!5e0!3m2!1sid!2sid!4v1637123456789!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact 