import { useEffect, useState } from "react";
import { crearNuevaSalida } from "../../../api/ingresos";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSalidasContext } from "../../../context/SalidasProvider";
import { ModalCrearCliente } from "../../../components/Modales/ModalCrearCliente";
import { ModalCrearChoferes } from "../../../components/Modales/ModalCrearChoferes";
import client from "../../../api/axios";
import { ModalVerChoferes } from "../../../components/Modales/ModalVerChoferes";

export const CrearSalida = () => {
  const fechaActual = new Date();

  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const nombresDias = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];

  const numeroDiaActual = fechaActual.getDay(); // Obtener el día del mes actual

  const numeroMesActual = fechaActual.getMonth() + 1; // Obtener el mes actual

  const nombreMesActual = nombresMeses[numeroMesActual - 1]; // Obtener el nombre del mes actual

  const nombreDiaActual = nombresDias[numeroDiaActual]; // Obtener el nombre del día actual

  //useContext
  const { salidasMensuales, setSalidasMensuales } = useSalidasContext();
  const { choferes, setChoferes } = useSalidasContext();

  //obtenerChoferes
  useEffect(() => {
    async function loadData() {
      const res = await client.get("/chofer");

      setChoferes(res.data);
    }

    loadData();
  }, []);

  //daots del cliente
  const [datosCliente, setDatosCliente] = useState([]);
  //eliminar cliente
  const eliminarCliente = (nombreClienteAEliminar) => {
    // Filtrar la lista de clientes para obtener una nueva lista sin el cliente a eliminar
    const nuevaListaClientes = datosCliente.filter(
      (cliente) => cliente.cliente !== nombreClienteAEliminar
    );
    // Actualizar el estado con la nueva lista de clientes
    setDatosCliente(nuevaListaClientes);
  };

  //modales
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenChofer, setIsOpenChofer] = useState(false);
  const [isOpenVerChofer, setIsOpenVerChofer] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModalChofer = () => {
    setIsOpenChofer(true);
  };

  const closeModalChofer = () => {
    setIsOpenChofer(false);
  };

  const openModalVerChofer = () => {
    setIsOpenVerChofer(true);
  };

  const closeModalVerChofer = () => {
    setIsOpenVerChofer(false);
  };

  //formulario submit
  const navigate = useNavigate();
  //estados del formulario
  const [chofer, setChofer] = useState("");
  const [km_viaje_control, setKmViajeControl] = useState("");
  const [km_viaje_control_precio, setKmViajeControlPrecio] = useState("");
  const [fletes_km, setKmFletes] = useState("");
  const [fletes_km_precio, setKmFletesPrecio] = useState("");
  const [armadores, setArmadores] = useState("");
  const [total_viaticos, setTotalViaticos] = useState("");
  const [motivo, setMotivo] = useState("");
  const [salida, setSalida] = useState("");
  const [fabrica, setFabrica] = useState("");
  const [espera, setEspera] = useState("");

  // const [total_flete, setTotalFlete] = useState("");
  // const [total_control, setTotalControl] = useState("");

  const onSubmit = async () => {
    try {
      // e.preventDefault();
      const res = await crearNuevaSalida({
        chofer,
        km_viaje_control,
        km_viaje_control_precio,
        fletes_km,
        fletes_km_precio,
        armadores,
        total_viaticos,
        motivo,
        salida,
        fabrica,
        total_control: Number(km_viaje_control * km_viaje_control_precio),
        total_flete: Number(fletes_km * fletes_km_precio),
        espera,
        datos_cliente: { datosCliente },
      });

      // Verificar si el tipo ya existe antes de agregarlo al estado
      const tipoExistente = salidasMensuales.find(
        (tipo) => tipo.id === res.data.id
      );

      if (!tipoExistente) {
        // Actualizar el estado de tipos agregando el nuevo tipo al final
        setSalidasMensuales((prevTipos) => [...prevTipos, res.data]);
      }

      toast.success("Salida creada correctamente!", {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/salidas");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full h-full min-h-full max-h-full px-12 max-md:px-4 flex flex-col gap-20 pb-36 py-14 relative">
      <ToastContainer />
      <div className="absolute right-28 text-white bg-slate-800 py-2 px-6 rounded-xl font-bold">
        Mes {nombreMesActual}, Día {nombreDiaActual}
      </div>

      <div className="bg-white border-slate-300 border-[1px] py-8 px-10 rounded-xl max-w-xs flex justify-center shadow">
        <div className="text-lg font-bold uppercase text-green-500 flex">
          <p className="border-b-[3px] border-slate-700">Crear nueva salida</p>
        </div>
      </div>

      <form
        // onSubmit={onSubmit}
        className=" border-slate-300 border-[1px] py-12 px-10 rounded-xl shadow flex flex-col gap-5 h-full max-h-full"
      >
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => openModalChofer()}
            className="bg-orange-500 py-2 px-4 rounded-xl text-white shadow text-base"
          >
            Crear choferes
          </button>
          <button
            type="button"
            onClick={() => openModalVerChofer()}
            className="bg-green-500 py-2 px-4 rounded-xl text-white shadow text-base"
          >
            Ver choferes creados
          </button>
        </div>
        <article className="flex flex-col gap-2">
          <div>
            <h3 className="font-bold text-xl text-slate-700">
              Seleccionar Fabrica de Salida y Localidad
            </h3>
            <label className="relative block rounded-xl border border-slate-300 shadow-sm my-5 w-1/4">
              <select
                onChange={(e) => setFabrica(e.target.value)}
                value={fabrica}
                type="text"
                className="peer border-none bg-white/10 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3  px-3 text-slate-900"
              >
                <option value="">Fabrica</option>
                <option value="iraola">Iraola</option>
                <option value="long">Long</option>
              </select>

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                Seleccionar fabrica
              </span>
            </label>

            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 shadow-sm">
                <input
                  value={salida}
                  onChange={(e) => setSalida(e.target.value)}
                  type="text"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  Localidad o Provincia de salida
                </span>
              </label>
            </div>
          </div>
        </article>
        <article className="flex flex-col gap-2 mt-6">
          <div>
            <h3 className="font-bold text-xl text-slate-700">
              Ingresar datos de la salida
            </h3>
          </div>
          {/* datos del formulario  */}
          <div className="flex flex-col gap-3 mt-5">
            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 shadow-sm">
                <select
                  onChange={(e) => setChofer(e.target.value)}
                  value={chofer}
                  type="text"
                  className="peer border-none bg-white/10 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3  px-3 text-slate-900"
                >
                  <option value="">Seleccionar chofer</option>
                  {choferes.map((c) => (
                    <option>{c.chofer}</option>
                  ))}
                </select>

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  Chofer
                </span>
              </label>
            </div>
            <div className="flex flex-col gap-2 items-start mt-3">
              <button
                onClick={() => openModal()}
                type="button"
                className="bg-black text-white text-sm py-2 px-4 shadow rounded-xl"
              >
                Crear Clientes
              </button>

              <div className="flex gap-3 mt-2">
                {datosCliente.map((c, index) => (
                  <div
                    key={index}
                    className="bg-white border-[1px] border-slate-300 rounded-xl py-8 px-4 relative shadow"
                  >
                    <div
                      className="absolute top-2 right-4 cursor-pointer"
                      onClick={() => eliminarCliente(c.cliente)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-800"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                    <p>
                      Nombre y Apellido{" "}
                      <span className="font-bold capitalize text-slate-700">
                        {c.cliente}
                      </span>
                    </p>
                    <p>
                      Localidad{" "}
                      <span className="font-bold capitalize text-slate-700">
                        {c.localidad}
                      </span>
                    </p>
                    <p>
                      Numero de contrato{" "}
                      <span className="font-bold capitalize text-slate-700">
                        {c.numeroContrato}
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </article>
        <article className="flex flex-col gap-6 mt-5">
          <div>
            <h3 className="font-bold text-xl text-slate-700">
              Control y Rendición de viajes
            </h3>
          </div>
          <div className="flex gap-3">
            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 shadow-sm">
                <span className="font-bold text-slate-500 px-3">KM</span>
                <input
                  value={km_viaje_control}
                  onChange={(e) => setKmViajeControl(e.target.value)}
                  type="text"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  KM de viaje
                </span>
              </label>
            </div>
            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 bg-white shadow-sm">
                <span className="font-bold text-slate-500 px-3">$</span>
                <input
                  value={km_viaje_control_precio}
                  onChange={(e) => setKmViajeControlPrecio(e.target.value)}
                  type="text"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  KM Precio
                </span>
              </label>
            </div>
            <div className="bg-slate-100 py-3 px-4 rounded-xl shadow font-bold text-slate-700 text-lg border-slate-300 border-[1px]">
              {Number(
                km_viaje_control * km_viaje_control_precio
              ).toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumIntegerDigits: 2,
              })}
            </div>
          </div>
        </article>

        <article className="flex flex-col gap-6 mt-5">
          <div>
            <h3 className="font-bold text-xl text-slate-700">Fletes</h3>
          </div>
          <div className="flex gap-3">
            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 shadow-sm">
                <span className="font-bold text-slate-500 px-3">KM</span>
                <input
                  value={fletes_km}
                  onChange={(e) => setKmFletes(e.target.value)}
                  type="text"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  KM de viaje
                </span>
              </label>
            </div>
            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 bg-white shadow-sm">
                <span className="font-bold text-slate-500 px-3">$</span>
                <input
                  value={fletes_km_precio}
                  onChange={(e) => setKmFletesPrecio(e.target.value)}
                  type="text"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  KM Precio
                </span>
              </label>
            </div>
            <div className="bg-slate-100 py-3 px-4 rounded-xl shadow font-bold text-slate-700 text-lg border-slate-300 border-[1px]">
              {Number(fletes_km * fletes_km_precio).toLocaleString("es-AR", {
                style: "currency",
                currency: "ARS",
                minimumIntegerDigits: 2,
              })}
            </div>
          </div>

          <div className="w-1/4">
            <label className="relative block rounded-xl border border-slate-300 shadow-sm">
              <span className="font-bold text-slate-500 px-3">$</span>
              <input
                value={espera}
                onChange={(e) => setEspera(e.target.value)}
                type="text"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                Espera del Fletero
              </span>
            </label>
          </div>
        </article>

        <article className="flex flex-col gap-6 mt-5">
          <div>
            <h3 className="font-bold text-xl text-slate-700">
              Viaticos Armadores
            </h3>
          </div>
          <div className="flex gap-3">
            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 shadow-sm">
                <input
                  value={armadores}
                  onChange={(e) => setArmadores(e.target.value)}
                  type="text"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  Armador/Nombre/Apellido
                </span>
              </label>
            </div>
            <div className="w-1/4">
              <label className="relative block rounded-xl border border-slate-300 bg-white shadow-sm">
                <span className="font-bold text-slate-500 px-3">$</span>
                <input
                  value={total_viaticos}
                  onChange={(e) => setTotalViaticos(e.target.value)}
                  type="text"
                  className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-3 text-slate-700 px-3"
                />

                <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-base text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-base">
                  Total en Viaticos
                </span>
              </label>
            </div>
          </div>
          <div>
            <p className="text-slate-700 underline">Motivo</p>
            <div className="mt-2">
              <select
                className="py-2 px-3 bg-white border-slate-300 border-[1px] shadow rounded-xl text-slate-700 font-semibold"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              >
                <option value="">Seleccionar motivo</option>
                <option value="refuerzo">Refuerzo</option>
                <option value="cobra en base"> No cobra en base</option>
              </select>
            </div>
            <div className="flex gap-2 mt-2">
              {motivo === "refuerzo" ? (
                <p className="bg-green-500 py-2 px-2 rounded-xl shadow text-white cursor-pointer">
                  Refuerzo
                </p>
              ) : (
                <p className="bg-red-800 py-2 px-2 rounded-xl shadow text-white cursor-pointer">
                  No cobra en base
                </p>
              )}
            </div>
          </div>
        </article>

        <div>
          <button
            // type="submit"
            type="button"
            onClick={() => onSubmit()}
            className="bg-black text-white rounded-xl shadow py-2 px-6"
          >
            Crear nueva salida
          </button>
        </div>
      </form>

      <ModalCrearCliente
        setDatosCliente={setDatosCliente}
        isOpen={isOpen}
        closeModal={closeModal}
        datosCliente={datosCliente}
      />
      <ModalCrearChoferes isOpen={isOpenChofer} closeModal={closeModalChofer} />

      <ModalVerChoferes
        isOpen={isOpenVerChofer}
        closeModal={closeModalVerChofer}
      />
    </section>
  );
};
