
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6 md:px-16 mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

        <div>
          <h2 className="text-2xl font-bold text-white">ShuttleX</h2>
          <p className="mt-3 text-sm text-gray-400">
            Smart campus transportation made simple.  
            Book rides safely, quickly, and effortlessly.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer"> <a href="#Hero"></a>Home</li>
            <li className="hover:text-white cursor-pointer">Ride</li>
            <li className="hover:text-white cursor-pointer">Drive</li>
            <li className="hover:text-white cursor-pointer">Gallery</li>
            <li className="hover:text-white cursor-pointer">About</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">FAQs</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
            <li className="hover:text-white cursor-pointer">Safety Tips</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">
            Get updates on new features and improvements.
          </p>

          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l bg-gray-800 outline-none text-sm"
            />
            <button className="bg-blue-600 px-4 rounded-r text-white text-sm hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShuttleX. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
