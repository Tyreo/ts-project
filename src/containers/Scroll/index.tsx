import React from 'react';
import { renderRoutes } from 'react-router-config';
import { RouterProps } from '@/interfaces';

import './style.scss';

export default function Scroll(props: RouterProps) {
  console.log('Scroll:', props);
  return <div className="scroll-router">{renderRoutes(props.route?.routes)}</div>;
}
