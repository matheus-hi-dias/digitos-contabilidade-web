import { NavLink } from "react-router-dom";
import "./styles.scss";
export const SideBar = () => {
  const activeRouteStyle = "linkTextStyle activeRoute";
  const inactiveRouteStyle = "linkTextStyle";
  return (
    <div className="sideBarContainer">
      <ul>
        <li>
          <NavLink
            to="minha-area"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Minha Área
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/documentos"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Documento
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Cliente
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/tipo-de-documento"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Tipo de Documento
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/natureza"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Natureza
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/local-do-documento"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Local do Documento
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/usuarios"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Usuários
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/relatorios"
            className={({ isActive }) =>
              isActive ? activeRouteStyle : inactiveRouteStyle
            }
          >
            Relatórios
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
