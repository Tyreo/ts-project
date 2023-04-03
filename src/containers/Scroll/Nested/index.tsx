import React from 'react';

import ScrollNested from '@/components/ScrollNested';

import './style.scss';
import { RouterProps } from '@/interfaces';
export default function Scroll(props: RouterProps) {
  console.log(props);
  return (
    <div className="scroll-nested-router">
      <ScrollNested scrollY>
        <ScrollNested scrollX needY>
          <div className="scroll-content">scroll-nested-router</div>
        </ScrollNested>
      </ScrollNested>
    </div>
  );
}
