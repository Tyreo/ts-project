import React from 'react';
import { RouterProps } from '@/interfaces';
import RouteView from '@/components/RouteView';

export default function Css(props: RouterProps) {
  return <RouteView {...props} />;
}
