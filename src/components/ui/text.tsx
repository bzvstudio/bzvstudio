import React from "react";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  as?: React.ElementType;
  htmlFor?: string;
  [key: string]: unknown;
}

export function Text({ children, className = "", as, ...props }: TextProps) {
  const Component = as || "p";
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}

// Huge headings for Hero / Contact sections
export function Display100({ as = "h1", className = "", ...props }: TextProps) {
  return (
    <Text
      as={as}
      className={`text-5xl leading-[1.1] font-bold tracking-tighter md:text-7xl md:leading-none lg:text-8xl ${className}`}
      {...props}
    />
  );
}

export function Display200({ as = "h2", className = "", ...props }: TextProps) {
  return (
    <Text
      as={as}
      className={`text-5xl leading-[1.1] font-bold tracking-tight md:text-6xl lg:text-7xl ${className}`}
      {...props}
    />
  );
}

// Section headings
export function Header100({ as = "h2", className = "", ...props }: TextProps) {
  return (
    <Text
      as={as}
      className={`text-3xl font-bold tracking-tight md:text-5xl ${className}`}
      {...props}
    />
  );
}

export function Header200({ as = "h2", className = "", ...props }: TextProps) {
  return (
    <Text
      as={as}
      className={`text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl ${className}`}
      {...props}
    />
  );
}

export function SubHeader100({
  as = "h3",
  className = "",
  ...props
}: TextProps) {
  return (
    <Text as={as} className={`text-xl font-medium ${className}`} {...props} />
  );
}

// Body text
export function Body200({ as = "p", className = "", ...props }: TextProps) {
  return (
    <Text
      as={as}
      className={`text-lg leading-relaxed md:text-xl ${className}`}
      {...props}
    />
  );
}

export function Body100({ as = "p", className = "", ...props }: TextProps) {
  return (
    <Text
      as={as}
      className={`text-base leading-relaxed ${className}`}
      {...props}
    />
  );
}

export function Body50({ as = "p", className = "", ...props }: TextProps) {
  return (
    <Text
      as={as}
      className={`text-sm leading-relaxed ${className}`}
      {...props}
    />
  );
}

export function Caption({ as = "span", className = "", ...props }: TextProps) {
  return <Text as={as} className={`text-xs ${className}`} {...props} />;
}
