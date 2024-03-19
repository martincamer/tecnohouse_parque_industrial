//import {}
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthProvider";
import { NotFound } from "./routes/pages/protected/NotFound";
import { Login } from "./routes/pages/Login";
import { Register } from "./routes/pages/Register";
import { Home } from "./routes/pages/protected/Home";
import { SideBar } from "./components/sidebar/Sidebar";
import { SalidasProvider } from "./context/SalidasProvider";
import { Salidas } from "./routes/pages/protected/Salidas";
import { NavbarStatick } from "./components/ui/NavbarStatick";
import { CrearSalida } from "./routes/pages/protected/CrearSalida";
import { ResumenView } from "./routes/pages/protected/ResumenView";
import { ViewPdf } from "./routes/pages/protected/ViewPdf";
import { EditarSalida } from "./routes/pages/protected/EditarSalida";
import { ViewPdfFletes } from "./routes/pages/protected/ViewPdfFletes";
//import normales
import RutaProtegida from "./layouts/RutaProtejida";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import { ViewPdfArmadores } from "./routes/pages/protected/ViewPdfArmadores";
import { SalidasRegistradas } from "./routes/pages/protected/SalidasRegistradas";
import { Remuneraciones } from "./routes/pages/protected/Remuneraciones";
import { RemuneracionProvider } from "./context/RemuneracionesProvider";
import { CrearRemuneracion } from "./routes/pages/protected/CrearRemuneracion";

function App() {
  const { isAuth } = useAuth();

  return (
    <>
      <BrowserRouter>
        <NavbarStatick />
        <Routes>
          <Route
            element={<RutaProtegida isAllowed={!isAuth} redirectTo={"/"} />}
          >
            <Route index path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route
            element={<RutaProtegida isAllowed={isAuth} redirectTo={"/login"} />}
          >
            <Route
              element={
                <SalidasProvider>
                  <RemuneracionProvider>
                    <main className="flex gap-2 w-full min-h-full max-h-full">
                      <SideBar />
                      <Outlet />
                    </main>
                  </RemuneracionProvider>
                </SalidasProvider>
              }
            >
              <Route index path="/" element={<Home />} />
              <Route index path="/salidas" element={<Salidas />} />
              <Route
                index
                path="/remuneraciones"
                element={<Remuneraciones />}
              />
              <Route
                index
                path="/salidas-registradas"
                element={<SalidasRegistradas />}
              />
              <Route index path="/crear-salida" element={<CrearSalida />} />
              <Route
                index
                path="/crear-remuneracion"
                element={<CrearRemuneracion />}
              />

              <Route index path="/editar/:id" element={<EditarSalida />} />
              <Route index path="/resumen/:id" element={<ResumenView />} />
              <Route
                index
                path="/control-redencion-de-viajes/:id"
                element={<ViewPdf />}
              />
              <Route index path="/fletes/:id" element={<ViewPdfFletes />} />
              <Route
                index
                path="/viaticos-armadores/:id"
                element={<ViewPdfArmadores />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
