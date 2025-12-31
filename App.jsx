import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { ShoppingCart, Search } from 'lucide-react'
import Cart from './cart.jsx' // Ensure filename is Cart.jsx


function App() {
  const [products, setProducts] = useState([]) 
  const [searchTerm, setSearchTerm] = useState('') 
  // WISER MOVE: We use an array [] instead of a number to store actual product objects
  const [cart, setCart] = useState([]) 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Fetch error:", err))
  }, [])

  // Function to add the entire product object to our cart array
  const addToCart = (product) => {
    setCart([...cart, product])
  }

  const filteredProducts = products.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app-container">
      {/* NAVIGATION BAR - Visible on all pages */}
      <nav className="navbar">
        <Link to="/" style={{textDecoration: 'none'}}>
          <h1 style={{color: '#1e40af', margin: 0}}>TrendStore 2025</h1>
        </Link>
        
        <div className="search-wrapper">
          <Search size={18} style={{position: 'absolute', left: '12px', color: '#9ca3af'}} />
          <input 
            className="search-input"
            type="text" 
            placeholder="Search 'SSD', 'laptop'..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
        </div>

        <Link to="/cart" className="cart-icon" style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
          <ShoppingCart size={28} color="#374151" />
          {/* Badge now shows cart.length (the number of items in the array) */}
          <span className="badge">{cart.length}</span>
        </Link>
      </nav>

      {/* ROUTING SECTION */}
      <Routes>
        {/* SHOP PAGE */}
        <Route path="/" element={
          <>
            <div className="product-grid">
              {filteredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <img className="product-image" src={product.image} alt={product.title} />
                  <h3 style={{fontSize: '0.9rem', height: '40px', overflow: 'hidden'}}>{product.title}</h3>
                  <p style={{fontSize: '1.1rem', fontWeight: 'bold'}}>${product.price}</p>
                  
                  {/* Updated click handler to pass the 'product' object */}
                  <button className="add-btn" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{textAlign: 'center', marginTop: '3rem'}}>
                <p>No products found matching "{searchTerm}"</p>
              </div>
            )}
          </>
        } />

        {/* CART PAGE - We pass the 'cart' array as a prop called 'cartItems' */}
        <Route path="/cart" element={<Cart cartItems={cart} />} />
      </Routes>
    </div>
  )
}

export default App

/* 
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/