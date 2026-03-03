import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px] px-6 sm:px-12 md:px-16 lg:px-20 xl:px-24",
        className,
      )}
    >
      {children}
    </div>
  );
}
