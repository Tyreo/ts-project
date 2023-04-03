import React from 'react';
import { RouterProps } from '@/interfaces';
import RouteView from '@/components/RouteView';

export default function Canvas(props: RouterProps) {
  return <RouteView {...props} />;
}
