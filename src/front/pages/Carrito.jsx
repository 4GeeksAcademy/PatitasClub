import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer"; 

export const Carrito = () => {
  const { store, dispatch } = useGlobalReducer();
  const cartItems = store.cart;

  const updateQuantity = (id, newQuantity) => {
    dispatch({
      type: "update_quantity",
      payload: { id, quantity: Math.max(1, newQuantity) },
    });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "remove_from_cart", payload: id });
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2 className="mb-4">🛒 Tu carrito está vacío</h2>
        <Link to="/" className="btn btn-primary">
          Ir a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">🛒 Carrito de Compras</h2>

      <div className="row">
        <div className="col-md-8">
          {cartItems.map((item) => (
            <div key={item.id} className="card mb-3">
              <div className="row g-0 align-items-center">
                <div className="col-md-2">
                  <img
                    src={item.image}
                    className="img-fluid rounded-start"
                    alt={item.name}
                  />
                </div>
                <div className="col-md-6">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <p className="card-text">💸 Precio: €{item.price}</p>
                  </div>
                </div>
                <div className="col-md-2 d-flex flex-column align-items-center">
                  <button
                    className="btn btn-outline-secondary mb-1"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="btn btn-outline-secondary mt-1"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="col-md-2 text-center">
                  <p className="fw-bold">
                    €{(item.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Quitar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="card p-3">
            <h4>Resumen</h4>
            <p className="fw-bold">Total: €{totalPrice.toFixed(2)}</p>
            <Link to="/checkout" className="btn btn-success w-100">
              Finalizar compra 💳
            </Link>
            <Link to="/" className="btn btn-link mt-2 text-decoration-none">
              🛍️ Seguir comprando
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
