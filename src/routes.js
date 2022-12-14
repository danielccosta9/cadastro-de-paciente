/*!

=========================================================
* Now UI Dashboard React - v1.5.1
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Maps from "views/Maps.js";
import Upgrade from "views/Upgrade.js";

// Cadastros
import Paciente from "views/Cadastros/Paciente/Paciente.js";
import Hospital from "views/Cadastros/Hospital/Hospital";
import Agendamento from "views/Cadastros/Agendamento/Agendamento";

// Agendados
import Agendados from "views/Agendados";

var dashRoutes = [
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "design_app",
  //   component: Dashboard,
  //   layout: "/admin"
  // },
  {
    path: "/paciente",
    name: "Paciente",
    icon: "business_badge",
    component: Paciente,
    layout: "/admin"
  },
  {
    path: "/agendamento",
    name: "Agendamento",
    icon: "education_agenda-bookmark",
    component: Agendamento,
    layout: "/admin"
  },
  {
    path: "/hospital",
    name: "Hospital",
    icon: "health_ambulance",
    component: Hospital,
    layout: "/admin"
  },
  {
    path: "/agendados",
    name: "Agendados",
    icon: "ui-1_calendar-60",
    component: Agendados,
    layout: "/admin"
  },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "location_map-big",
  //   component: Maps,
  //   layout: "/admin"
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade,
  //   layout: "/admin"
  // }
];
export default dashRoutes;
