export const CubeOff = ({
  className,
  size = 24,
  ...props
}: {
  className?: string
  size?: number
} & React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M20.83 16.809c.11 -.248 .17 -.52 .17 -.801v-8.018a1.98 1.98 0 0 0 -1 -1.717l-7 -4.008a2.016 2.016 0 0 0 -2 0l-3.012 1.725m-2.547 1.458l-1.441 .825c-.619 .355 -1 1.01 -1 1.718v8.018c0 .709 .381 1.363 1 1.717l7 4.008a2.016 2.016 0 0 0 2 0l5.544 -3.174" />
    <path d="M12 22v-10" />
    <path d="M14.532 10.538l6.198 -3.578" />
    <path d="M3.27 6.96l8.73 5.04" />
    <path d="M3 3l18 18" />
  </svg>
) 