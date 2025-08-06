// src/routes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import Home from "../front/pages/Home.jsx";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import React from "react";
import CurvedText from "./components/CurvedText";
import { Perros } from "./pages/Perros.jsx";
import { Gatos } from "./pages/Gatos.jsx";
import { Registro } from "./pages/Registro.jsx";
import { Carrito } from "./pages/Carrito.jsx";
import { Login } from "./pages/Login.jsx";
import { Dashboard } from "./pages/Dashboard";
import { VistaProducto } from "./components/VistaProducto.jsx";
import { BusquedaPage } from "./components/BusquedaPage.jsx"; 
import Pagos from "./components/Pagos.jsx";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/curved-text" element={<CurvedText />} />
      <Route path="/perros" element={<Perros />} />
      <Route path="/gatos" element={<Gatos />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/vistaproducto/:id" element={<VistaProducto />} />
      <Route path="/busqueda" element={<BusquedaPage />} />
      <Route path="/pagos" element={<Pagos />} />
    </Route>
  )
);
