import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

export const BusquedaPage = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const termino = queryParams.get("query")?.toLowerCase() || "";

  useEffect(() => {
    const buscarProductos = async () => {
      try {
        const respuesta = await fetch("https://sample-service-name-mqar.onrender.com/api/product");
        const data = await respuesta.json();

        // Filtrado por nombre o descripción desde el frontend
        const resultadosFiltrados = data.products.filter((producto) =>
          producto.name.toLowerCase().includes(termino) ||
          producto.description.toLowerCase().includes(termino)
        );

        setProductos(resultadosFiltrados);
      } catch (error) {
        console.error("Error al buscar productos:", error);
        setProductos([]);
      } finally {
        setCargando(false);
      }
    };

    if (termino) {
      buscarProductos();
    } else {
      setCargando(false);
      setProductos([]);
    }
  }, [termino]);

  return (
    <div className="container mt-4">
      <h2>Resultados de búsqueda para: "{termino}"</h2>
      {cargando ? (
        <p>Cargando...</p>
      ) : productos.length > 0 ? (
        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-4 mb-3" key={producto.id}>
              <div className="card h-100 d-flex flex-column">
                <img
                  src={producto.photo || "https://via.placeholder.com/300x200?text=Sin+Imagen"}
                  className="card-img-top"
                  alt={producto.name}
                  style={{ objectFit: "cover", height: "200px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{producto.name}</h5>
                  <p className="card-text">{producto.description}</p>
                  <p className="card-text"><strong>${producto.price}</strong></p>

                  <Link
                    to={`/vistaproducto/${producto.id}`}
                    className="btn btn-primary mt-auto"
                  >
                    Ver Detalles
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};
