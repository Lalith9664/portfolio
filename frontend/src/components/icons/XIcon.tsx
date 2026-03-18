/**
 * Custom X (formerly Twitter) brand icon component.
 * Designed to look like the X logo while matching Lucide icon sizing.
 */
const XIcon = ({ size = 24, className = "" }: { size?: number, className?: string }) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
        </svg>
    );
};

export default XIcon;
