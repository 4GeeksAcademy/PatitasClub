import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Swal from "sweetalert2"; 

export const VistaProducto = () => {
  const { id } = useParams();
  const { dispatch } = useGlobalReducer();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://sample-service-name-mqar.onrender.com/api/product/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      })
      .then((data) => {
        setProducto(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch({
      type: "add_to_cart",
      payload: {
        id: producto.id,
        name: producto.name,
        price: producto.price,
        image: producto.photo || "https://via.placeholder.com/150",
      },
    });

    
    Swal.fire({
      icon: "success",
      title: "Producto añadido",
      text: `"${producto.name}" se añadió al carrito.`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      toast: true,
      position: "center", 
    });
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <div className="card shadow">
        <div className="card-header text-center bg-primary text-white">
          <h3>{producto.name}</h3>
        </div>

        <div
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#f8f9fa",
          }}
        >
          <img
            src={producto.photo || "https://via.placeholder.com/300x200"}
            alt={producto.name}
            style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
          />
        </div>

        <div className="card-body">
          <p className="text-center fs-5">{producto.description}</p>
          <h4 className="text-success">€{producto.price.toFixed(2)}</h4>
          <button
            className="btn btn-success mt-3 w-100"
            onClick={handleAddToCart}
          >
            🛒 Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  );
};
