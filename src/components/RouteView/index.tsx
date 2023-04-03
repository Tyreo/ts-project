import React from 'react';
import { renderRoutes } from 'react-router-config';
import { RouterProps } from '@/interfaces';

export default function RouteView(props: RouterProps) {
  return <div className="route-view-router">{renderRoutes(props.route?.routes)}</div>;
}
