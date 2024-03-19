import axios from "./axios";

export const crearNuevaSalida = (data) => axios.post("/salidas", data);

// export const obtenerIngresoRangoFechas = (fechaInicio, fechaFin) =>
//   axios.post("/ingresos/rango-fechas", fechaInicio, fechaFin);

export const obtenerSalidaMensual = () => axios.get("/salidas-mes");

// export const editarIngreso = (obtenerParams, data) =>
//   axios.put(`/ingresos/${obtenerParams}`, data);

export const obtenerUnicaSalida = (id) => axios.get(`/salidas/${id}`);

// export const eliminarIngreso = (id) => axios.delete(`/ingresos/${id}`);
