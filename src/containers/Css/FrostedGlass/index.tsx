import React from 'react';

import './style.scss';

export default function FrostedGlass() {
  return (
    <div className="frosted-glass-router">
      <div className="frosted-glass-bg">
        <div>Normal</div>
        <div className="frosted-glass-filter">filter</div>
        <div className="frosted-glass-backdrop-filter">backdrop-filter</div>
        <div className="frosted-glass-glossy" />
      </div>
    </div>
  );
}
