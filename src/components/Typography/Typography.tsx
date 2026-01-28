
import React from 'react';
import '../../../src/styles/tokens.css';

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'overline'
  | 'button'
  | 'inherit';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  className?: string;
  children?: React.ReactNode; 
  variant?: Variant;


  ariaLabel?: string;
  ariaLabelledby?: string;
  ariaDescribedby?: string;
  ariaHidden?: boolean;
  ariaLive?: 'off' | 'polite' | 'assertive';
}


const variantTagMap: Record<Variant, React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  subtitle1: 'p', 
  subtitle2: 'p', 
  body1: 'p',
  body2: 'p',
  caption: 'span',
  overline: 'span',
  button: 'span',
  inherit: 'span',
};

const variantClassMap: Record<Variant, React.CSSProperties> = {
  h1: { fontSize: 'var(--font-size-2xl)', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' },
  h2: { fontSize: '1.75rem', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-bold)' },
  h3: { fontSize: 'var(--font-size-xl)', lineHeight: 'var(--line-height-tight)', fontWeight: 'var(--font-weight-semibold)' },
  h4: { fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-semibold)' },
  h5: { fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-semibold)' },
  h6: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-medium)' },
  subtitle1: { fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' },
  subtitle2: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-normal)', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' },
  body1: { fontSize: 'var(--font-size-md)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--text-primary)' },
  body2: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--text-primary)' },
  caption: { fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-normal)', color: 'var(--text-secondary)' },
  overline: { fontSize: 'var(--font-size-xs)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' },
  button: { fontSize: 'var(--font-size-sm)', textTransform: 'uppercase', fontWeight: 'var(--font-weight-medium)', color: 'var(--color-primary)' },
  inherit: {},
};

const Typography: React.FC<TypographyProps> = ({
  id,
  className = '',
  children,
  variant = 'body1',
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  ariaHidden,
  ariaLive,
  ...rest
}) => {
  const ComponentTag = variantTagMap[variant] || 'p';
  const variantStyle = variantClassMap[variant] || {};

  const baseStyle: React.CSSProperties = {
    display: 'block',
    ...variantStyle,
  };

  const props: React.HTMLAttributes<HTMLElement> = {
    id,
    className,
    style: baseStyle,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-describedby': ariaDescribedby,
    'aria-hidden': ariaHidden,
    'aria-live': ariaLive,
    ...rest,
  };

  return React.createElement(ComponentTag as React.ElementType, props, children);
};

export default Typography;
