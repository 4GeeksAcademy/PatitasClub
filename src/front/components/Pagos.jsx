import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Pagos = () => {
  const [metodoPago, setMetodoPago] = useState("tarjeta");
  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "¡Pago procesado!",
      text: "Tu pago se ha realizado con éxito, disfrutarás de tu compra en los proximos días",
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      dispatch({ type: "clear_cart" });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4 text-center text-primary">Formulario de Pago</h2>
        <form onSubmit={handleSubmit} className="needs-validation" noValidate>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label fw-bold">
              Nombre de Usuario
            </label>
            <input type="text" className="form-control" id="userName" required />
          </div>

          <div className="mb-3">
            <label htmlFor="location" className="form-label fw-bold">
              Dirección (Calle, Número, Piso)
            </label>
            <input type="text" className="form-control" id="location" required />
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Método de Pago</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="metodoPago"
                value="tarjeta"
                id="pagoTarjeta"
                checked={metodoPago === "tarjeta"}
                onChange={(e) => setMetodoPago(e.target.value)}
              />
              <label className="form-check-label" htmlFor="pagoTarjeta">
                Tarjeta de Crédito / Débito
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="metodoPago"
                value="transferencia"
                id="pagoTransferencia"
                checked={metodoPago === "transferencia"}
                onChange={(e) => setMetodoPago(e.target.value)}
              />
              <label className="form-check-label" htmlFor="pagoTransferencia">
                Transferencia Bancaria
              </label>
            </div>
          </div>

          {metodoPago === "tarjeta" && (
            <>
              <div className="mb-3">
                <label htmlFor="cardName" className="form-label fw-bold">
                  Nombre del Titular
                </label>
                <input type="text" className="form-control" id="cardName" required />
              </div>

              <div className="mb-3">
                <label htmlFor="cardNumber" className="form-label fw-bold">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="cardNumber"
                  placeholder="XXXX XXXX XXXX XXXX"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiryDate" className="form-label fw-bold">
                    Fecha de Vencimiento
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expiryDate"
                    placeholder="MM/AA"
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label fw-bold">
                    CVV
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="cvv"
                    placeholder="123"
                    required
                  />
                </div>
              </div>
            </>
          )}

          {metodoPago === "transferencia" && (
            <div className="alert alert-warning text-center fw-bold mt-4">
              Realiza la transferencia a la siguiente cuenta:<br />
              <span className="fs-5">ES12 3456 7890 1234 5678 9012</span>
            </div>
          )}

          <button type="submit" className="btn btn-success w-100 mt-3">
            Pagar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Pagos;
