import "./footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <p>© 2025 React Zero | Made by Bruyden</p>
      <div className="footer-links">
        <a href="/about">About</a> | <a href="/contact">Contact</a> |{" "}
        <a href="/privacy">Privacy Policy</a>
      </div>
    </div>
  );
};
export default Footer;
