import { NavLink } from 'react-router-dom';
import './styles.scss';
import useUser from '../../hooks/useUser';

export default function SideBar() {
  const { data } = useUser();
  const activeRouteStyle = 'linkTextStyle activeRoute';
  const inactiveRouteStyle = 'linkTextStyle';

  const routePermissions = {
    '/minha-area': [],
    '/documentos': ['SEE_DOCUMENTS'],
    '/clientes': ['SEE_CLIENTS'],
    '/tipo-de-documento': ['SEE_DOCUMENT_TYPES'],
    '/natureza': ['SEE_DOCUMENT_NATURES'],
    '/local-do-documento': ['SEE_DOCUMENT_LOCATION'],
    '/usuarios': ['SEE_USERS'],
    '/cargos': ['SEE_USERS'],
  };

  const hasRequiredPermissions = (requiredPermissions) => {
    const userPermissions = [
      ...data.permissions, ...data.rolePermissions,
    ];

    return requiredPermissions.every((permission) => userPermissions.includes(permission));
  };

  const renderNavLink = (to, text) => {
    const requiredPermissions = routePermissions[to];

    if (requiredPermissions.length === 0 || hasRequiredPermissions(requiredPermissions)) {
      return (
        <NavLink
          to={to}
          className={({ isActive }) => (isActive ? activeRouteStyle : inactiveRouteStyle)}
        >
          {text}
        </NavLink>
      );
    }

    return null;
  };

  return (
    <div className="sideBarContainer">
      {renderNavLink('/minha-area', 'Minha Área')}
      {renderNavLink('/documentos', 'Documentos')}
      {renderNavLink('/clientes', 'Clientes')}
      {renderNavLink('/tipo-de-documento', 'Tipo de Documento')}
      {renderNavLink('/natureza', 'Natureza')}
      {renderNavLink('/local-do-documento', 'Local do Documento')}
      {renderNavLink('/usuarios', 'Usuários')}
      {renderNavLink('/cargos', 'Cargos')}

    </div>
  );
}
