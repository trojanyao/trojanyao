'use client';

import React from 'react';

type ButtonVariant = 'primary' | 'default';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonShape = 'rect' | 'circle' | 'square';

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  shape = 'rect',
  className,
  onClick = () => {},
}: {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`
			${
        variant === 'default' &&
        'bg-middle-gray hover:bg-light-blue hover:text-primary'
      }
			${size === 'medium' && 'size-9'}
			${shape === 'circle' && 'rounded-full'}
      ${shape === 'square' && 'rounded-lg'}
			flex justify-center items-center transition-all duration-300 ease-in-out ${className}
			`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
