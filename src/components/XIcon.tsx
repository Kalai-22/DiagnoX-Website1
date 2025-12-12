import svgPaths from '../imports/svg-sppztv54cx';

interface XIconProps {
  size?: number;
  className?: string;
}

export function XIcon({ size = 20, className = '' }: XIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d={svgPaths.pdaf0200} />
    </svg>
  );
}
