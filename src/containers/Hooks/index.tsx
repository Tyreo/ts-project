import React from 'react';
import { renderRoutes } from 'react-router-config';
import { RouterProps } from '@/interfaces';

import './style.scss';

export default function Hooks(props: RouterProps) {
  return <div className="hooks-router">{renderRoutes(props.route?.routes)}</div>;
}
