import { useWindowSize } from "./useWindowSize";

interface ScreenType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useScreenType(): ScreenType {
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;
  const isTablet = width ? width >= 768 && width < 1024 : false;
  const isDesktop = width ? width >= 1024 : false;
  return { isMobile, isTablet, isDesktop };
}
