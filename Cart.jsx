import { useNavigate } from 'react-router-dom';

// We add { cartItems } here so the component can receive the data
function Cart({ cartItems = [] }) { 
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <h1>Your Shopping Cart</h1>
      
      {/* If cart is empty, show a message. Otherwise, list the items */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div style={{ marginTop: '20px' }}>
          {cartItems.map((item, index) => (
            <div key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
              <span>{item.title}</span>
              <span style={{ fontWeight: 'bold' }}>${item.price}</span>
            </div>
          ))}
          <h3 style={{ marginTop: '20px' }}>
            Total: ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
          </h3>
        </div>
      )}

      <button className="add-btn" style={{ marginTop: '30px' }} onClick={() => navigate('/')}>
        Back to Shop
      </button>
    </div>
  );
}

export default Cart;
