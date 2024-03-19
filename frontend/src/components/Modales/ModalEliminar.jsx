import { Dialog, Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useSalidasContext } from "../../context/SalidasProvider";
import client from "../../api/axios";
import { toast } from "react-toastify";

export const ModalEliminar = ({ eliminarModal, closeEliminar, obtenerId }) => {
  const { salidasMensuales, setSalidasMensuales } = useSalidasContext();

  const handleEliminarChofer = async (id) => {
    const res = await client.delete(`/salidas/${id}`);

    const updatedTipos = salidasMensuales.filter((chofer) => chofer.id !== id);
    setSalidasMensuales(updatedTipos);

    toast.error("Eliminado correctamente!", {
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
      closeEliminar();
    }, 500);
  };

  return (
    <Menu as="div" className="z-50">
      <Transition appear show={eliminarModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeEliminar}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-1/3 p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <div className="text-lg text-slate-700 mb-3 border-b-[1px] capitalize">
                  Elimar la salida
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEliminarChofer(obtenerId)}
                    className="bg-red-100 text-red-800 py-2 px-4 rounded-xl w-full"
                    type="button"
                  >
                    ELIMINAR
                  </button>
                  <button
                    onClick={closeEliminar}
                    className="bg-green-500 text-white py-2 px-4 rounded-xl w-full"
                    type="button"
                  >
                    CERRAR
                  </button>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 duration-300 cursor-pointer max-md:text-xs"
                    onClick={closeEliminar}
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Menu>
  );
};
