import { useEffect, useState } from "react";
import ConsejoModal from "../components/ConsejoModal";
import { Productos } from "../components/Prouductos";

export function Perros() {
  const [showModal, setShowModal] = useState(true);
  const [productos, setProductos] = useState({
    comida: [],
    juguetes: [],
    accesorios: [],
    higiene: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sample-service-name-mqar.onrender.com/api/product")
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener productos");
        return res.json();
      })
      .then((data) => {
        const productosPerro = data.products.filter(
          (producto) => producto.pet_type?.id === 1
        );

        const comida = productosPerro.filter((p) =>
          p.categories?.some((cat) => cat.name.toLowerCase() === "comida")
        );
        const juguetes = productosPerro.filter((p) =>
          p.categories?.some((cat) => cat.name.toLowerCase() === "juguetes")
        );
        const accesorios = productosPerro.filter((p) =>
          p.categories?.some((cat) => cat.name.toLowerCase() === "accesorios")
        );
        const higiene = productosPerro.filter((p) =>
          p.categories?.some((cat) => cat.name.toLowerCase() === "higiene")
        );

        setProductos({
          comida,
          juguetes,
          accesorios,
          higiene,
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error en GET:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mt-4 mb-2">
      <h1 className="mb-4 text-decoration-underline">
        Productos para perros <i className="fa-solid fa-bone"></i>
      </h1>

      <ConsejoModal tipo="perros" show={showModal} onClose={() => setShowModal(false)} />

      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <>
          <h2 className="text-primary text-decoration-underline">Comida</h2>
          <Productos productos={productos.comida} />

          <h2 className="text-warning text-decoration-underline mt-3">Juguetes</h2>
          <Productos productos={productos.juguetes} />

          <h2 className="text-danger text-decoration-underline mt-3">Accesorios</h2>
          <Productos productos={productos.accesorios} />

          <h2 className="text-success text-decoration-underline mt-3">Higiene</h2>
          <Productos productos={productos.higiene} />
        </>
      )}
    </div>
  );
}
