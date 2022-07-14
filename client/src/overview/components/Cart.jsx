import React, {useEffect, useState} from 'react';

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '100px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0 , .7)',
  zIndex: 1000
}

let Cart = ({showCart, cart, setCart, updateCart}) => {
  if (!showCart || !cart) return null

  const [checkout, setCheckout] = useState(cart);

  let rmItem = (key) => {
    let filtered = cart.filter((product, i) => i !== key);
    updateCart(filtered)
  }

  useEffect(() => {
    setCheckout(prevState => cart);
  }, [cart])

  return (
    <div>
      <div style={OVERLAY_STYLES}>
        <div style={MODAL_STYLES}>
          <div>
            <h3> Cart </h3>
          </div>
          {checkout.map((product, i) => (
              <div key={i}>
                <img src={product.photo} witdh="25" height="25"/>
                <span>Product : {product.name} </span>
                <span>Price : ${product.price} </span>
                <span>Quantity : {product.quantity} </span>
                <span>Size : {product.size} </span>
                <span><button onClick={() => rmItem(i)}>Remove</button></span>
              </div>
          ))}
          <div>
            <button onClick={() => setCart(false)}>Close Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart;