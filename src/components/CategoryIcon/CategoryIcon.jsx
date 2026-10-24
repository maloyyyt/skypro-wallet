const ICONS = {
  food: <path d="M1.5 5h11l-1 7h-9l-1-7Zm3.5 0L6 2m3 3 1-3" />,
  transport: <path d="M2.5 6 3.8 3h6.4L11.5 6h1v5h-2v-1.5h-7V11h-2V6h1Z" />,
  housing: <path d="M7 1.5 1.5 6.5H3V12h3V8.5h2V12h3V6.5h1.5L7 1.5Z" />,
  joy: <rect x="3" y="1.5" width="8" height="11" rx="1.5" />,
  education: (
    <path d="M7 2 1 5l6 3 6-3-6-3ZM3 7.5V10c0 1 2 2 4 2s4-1 4-2V7.5L7 9 3 7.5Z" />
  ),
  others: <rect x="3" y="2" width="8" height="10" rx="1.5" />,
};

function CategoryIcon({ name }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="currentColor"
      aria-hidden="true"
    >
      {ICONS[name]}
    </svg>
  );
}

export default CategoryIcon;
