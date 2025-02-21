import { Link } from 'react-router-dom'
import { FaHeart, FaHome } from 'react-icons/fa'

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-orange-600">
          Recipe Finder
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-orange-600">
            <FaHome /> Home
          </Link>
          <Link to="/favorites" className="flex items-center gap-2 text-gray-600 hover:text-orange-600">
            <FaHeart /> Favorites
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar