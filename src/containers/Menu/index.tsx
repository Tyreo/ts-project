import React, { Fragment } from 'react';
import { RouteConfig } from 'react-router-config';
import routes from '@/routes';

import { Link } from 'react-router-dom';

import './style.scss';

export default function Menu() {
  const renderMenu = (routes: RouteConfig[] | undefined) =>
    (routes || []).map(({ title, path, routes }, index) => {
      if (routes && routes.length > 0) {
        return (
          <Fragment key={index}>
            {title ? <div className="menu-inner-title">{title}</div> : null}
            <div className="menu-inner-items">{renderMenu(routes)}</div>
          </Fragment>
        );
      }

      return title ? (
        <Link className="menu-inner-item" key={index} to={path as string}>
          {title}
        </Link>
      ) : null;
    });

  return <div className="menu-router">{renderMenu(routes)}</div>;
}
