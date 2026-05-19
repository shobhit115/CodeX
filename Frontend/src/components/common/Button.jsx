import React from 'react';

const Button = ({ 
  children, 
  href, 
  onClick, 
  variant = 'solid', 
  className = '', 
  ...props 
}) => {
  const baseStyle = 'button';
  const variantStyle = variant === 'outline' ? 'button--outline' : 'button--solid';
  const combinedClasses = `${baseStyle} ${variantStyle} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;