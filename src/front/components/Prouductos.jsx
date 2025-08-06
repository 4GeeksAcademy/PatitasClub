import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Productos = ({ productos }) => {
  const { dispatch } = useGlobalReducer();

  if (!productos || productos.length === 0) {
    return <p>No hay productos disponibles.</p>;
  }

  const handleAddToCart = (producto) => {
    dispatch({
      type: "add_to_cart",
      payload: {
        id: producto.id,
        name: producto.name,
        price: producto.price,
        image: producto.photo || "https://via.placeholder.com/150",
      },
    });
    alert(`Producto "${producto.name}" añadido al carrito.`);
  };

  return (
    <div className="container mt-4">
      <div className="row g-4">
        {productos.map((producto) => (
          <div key={producto.id} className="col-6 col-sm-4 col-md-3 col-lg-custom">
            <div className="card h-100 d-flex flex-column">
              <img
                src={producto.photo || "https://via.placeholder.com/150"}
                className="card-img-top producto-img"
                alt={producto.name}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{producto.name}</h5>
                <p className="card-text">{producto.description}</p>
                <p className="card-text">
                  <small className="text-muted">€{producto.price}</small>
                </p>
                <div className="mt-auto d-flex gap-2">
                  <Link
                    to={`/vistaproducto/${producto.id}`}
                    className="btn btn-primary flex-grow-1"
                  >
                    Ver Detalles
                  </Link>
                  <button
                    onClick={() => handleAddToCart(producto)}
                    className="btn btn-outline-success"
                    title="Agregar al carrito"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
