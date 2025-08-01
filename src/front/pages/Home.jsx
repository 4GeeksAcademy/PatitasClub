import React, { useState } from "react";
import CurvedText from "../components/CurvedText";
import { Link } from "react-router-dom";
import dalmata from "/dalmata.png";
import fotoPrincipal from "/fotoPrincipal.png";
import Carrusel1 from "/Carrusel1.png";
import Carrusel2 from "/Carrusel2.png";
import Carrusel3 from "/Carrusel3.png";

const Home = () => {
  const [destacados, setDestacados] = useState([
    { id: 1, name: "Pienso premium", precio: 18, image: Carrusel1 },
    { id: 2, name: "Champú especial", precio: 15, image: Carrusel2 },
    { id: 3, name: "Pienso para gatos", precio: 21, image: Carrusel3 },
  ]);

  return (
    <section className="landing-body container-fluid my-0 py-0">
      <div className="row align-items-center justify-content-center col-12">
        <div
          id="carouselExampleDark"
          style={{
            width: "300px",
            display: "block",
            margin: "0 auto",
          }}
          className="carousel carousel-dark slide col-4"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleDark"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>

          <div className="carousel-inner">
            {destacados.map((producto) => (
              <div
                className={`carousel-item ${producto.id === 1 ? "active" : ""}`}
                key={producto.id}
              >
                <img
                  src={producto.image}
                  className="d-block w-75 mx-auto"
                  alt={producto.name}
                />
                <div className="carousel-caption d-none d-md-block">
                  <div className="d-flex justify-content-center gap-2 align-items-center fw-bold text-white">
                    <span>{producto.name}</span>
                    <span>€{producto.precio}</span>
                  </div>
                  <Link
                    to={`/producto/${producto.id}`}
                    style={{ color: "#3c6ca8" }}
                    className="btn btn-mt-2"
                  >
                    Ver producto
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <div className="col-md-4 text-center mt-3">
          <CurvedText text="Donde cada huellita cuenta..." direction="up" />

          <img
            src={fotoPrincipal}
            alt="Foto Principal"
            style={{
              width: "300px",
              display: "block",
              margin: "0 auto",
            }}
          />

          <CurvedText text="Conectando corazones y patitas" direction="down" />
        </div>

        <div className="col-md-4 text-center img-fluid ">
          <img 
            src={dalmata}
            alt="Dálmata"
            style={{
              width: "350px",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Home;
