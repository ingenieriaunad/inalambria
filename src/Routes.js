import Proveedores from "./Pages/Proveedores";


const AppRoutes = [
  {
    index: true,
    element: <Proveedores />
  },
  {
    path: '/*',
    element: <Proveedores />
  }
];

export default AppRoutes;
