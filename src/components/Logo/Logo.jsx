import "./Logo.css";

function Logo() {
  return (
    <div className="logo">
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <rect width="16" height="16" rx="4" fill="#000" />
        <rect x="3.5" y="8" width="2" height="4.5" rx="0.6" fill="#fff" />
        <rect x="7" y="4" width="2" height="8.5" rx="0.6" fill="#fff" />
        <rect x="10.5" y="6.5" width="2" height="6" rx="0.6" fill="#fff" />
      </svg>
      <span>Skypro.Wallet</span>
    </div>
  );
}

export default Logo;
