import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    current_password: '',
    new_password: '',
    confirm_password: ''
  })

  // Fungsi untuk mengecek session
  const checkSession = async () => {
    try {
      const response = await fetch('http://localhost/Techno/api/auth/check-auth.php', {
        method: 'GET',
        credentials: 'include'
      })

      const data = await response.json()
      
      if (!data.success) {
        console.error('Server error:', data.message)
        return null
      }

      if (!data.isLoggedIn) {
        return null
      }

      return data.user || null
    } catch (err) {
      console.error('Session check error:', err)
      return null
    }
  }

  useEffect(() => {
    const initializeProfile = async () => {
      setIsLoading(true)
      try {
        // Coba ambil data dari localStorage dulu
        const localData = localStorage.getItem('user')
        let userData = localData ? JSON.parse(localData) : null

        // Cek session dan update data jika perlu
        const serverData = await checkSession()
        
        // Jika tidak ada data sama sekali, redirect ke login
        if (!userData && !serverData) {
          localStorage.removeItem('user')
          navigate('/login')
          return
        }

        // Gunakan data server jika ada, jika tidak gunakan data lokal
        userData = serverData || userData

        // Update localStorage dengan data terbaru
        if (serverData) {
          localStorage.setItem('user', JSON.stringify(serverData))
        }

        // Set user state
        setUser(userData)

        // Update form data
        const [firstName = '', lastName = ''] = (userData.full_name || '').split(' ')
        setFormData(prev => ({
          ...prev,
          first_name: firstName,
          last_name: lastName,
          email: userData.email || '',
          address: userData.address || ''
        }))

      } catch (err) {
        console.error('Profile initialization error:', err)
        setError('Gagal memuat data profile')
      } finally {
        setIsLoading(false)
      }
    }

    initializeProfile()
  }, [navigate])

  // Tambahkan handleChange function
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      // Validasi password
      if (formData.new_password || formData.confirm_password || formData.current_password) {
        if (!formData.current_password) {
          throw new Error('Password saat ini harus diisi untuk mengubah password')
        }
        if (formData.new_password !== formData.confirm_password) {
          throw new Error('Password baru tidak cocok dengan konfirmasi password')
        }
        if (formData.new_password.length < 6) {
          throw new Error('Password baru minimal 6 karakter')
        }
      }

      // Cek session
      const serverData = await checkSession()
      if (!serverData) {
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.')
      }

      const response = await fetch('http://localhost/Techno/api/auth/update-profile.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          full_name: `${formData.first_name} ${formData.last_name}`.trim(),
          email: formData.email,
          address: formData.address,
          current_password: formData.current_password || null,
          new_password: formData.new_password || null
        })
      })

      const data = await response.json()
      
      if (!data.success) {
        throw new Error(data.message || 'Terjadi kesalahan saat memperbarui profil')
      }

      // Update data
      localStorage.setItem('user', JSON.stringify(data.user))
      setUser(data.user)
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        current_password: '',
        new_password: '',
        confirm_password: ''
      }))

      alert('Profil berhasil diperbarui')
    } catch (err) {
      console.error('Update profile error:', err)
      setError(err.message)
      
      if (err.message.includes('Sesi Anda telah berakhir')) {
        localStorage.removeItem('user')
        navigate('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Error state
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Tidak dapat memuat data profile'}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
          >
            Kembali ke Login
          </button>
        </div>
      </div>
    )
  }

  // Main content
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              <div className="border-t pt-6">
                <h2 className="text-lg font-medium mb-4">Change Password</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="current_password" className="block text-sm font-medium text-gray-700">
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current_password"
                      name="current_password"
                      value={formData.current_password}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="new_password" className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new_password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      minLength={6}
                    />
                  </div>

                  <div>
                    <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>

          {/* Profile Picture Section */}
          <div className="text-center">
            <div className="relative w-48 h-48 mx-auto mb-4">
              <img
                src="https://i.pinimg.com/564x/eb/57/6f/eb576ff023487bcb1fa3ad61ee7b23ee.jpg"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h2 className="text-xl font-bold">{user.full_name || 'User'}</h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 