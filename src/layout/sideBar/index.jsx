import { NavLink } from "react-router-dom";
import "./styles.scss";
export const SideBar = () => {
  const activeRouteStyle = "linkTextStyle activeRoute";
  const inactiveRouteStyle = "linkTextStyle";
  return (
    <div className='sideBarContainer'>
        <NavLink 
        to="/minha-area"
        className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>
          Minha Área
          </NavLink>
          
        <NavLink to="/documentos" className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>Documento</NavLink>
        <NavLink to="/clientes" className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>Cliente</NavLink>
        <NavLink to="/tipo-de-documento" className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>Tipo de Documento</NavLink>
        <NavLink to="/natureza" className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>Natureza</NavLink>
        <NavLink to="/local-do-documento" className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>Local do Documento</NavLink>
        <NavLink to="/usuarios" className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>Usuários</NavLink>
        <NavLink to="/relatorios" className={ ({isActive}) => isActive ? activeRouteStyle : inactiveRouteStyle}>Relatórios</NavLink>
    </div>
  );
};
