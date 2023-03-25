import { ReactComponent as Logo } from "../../assets/vector/default-monochrome.svg";

const Footer = () => {
  return (
    <div className="text-base-content">
      <footer className="footer p-10">
        <Logo className="btn-xs" />
        <div>
          <span className="footer-title">Resources</span>
          <a className="link link-hover">Documentation</a>
          <a className="link link-hover">FAQ</a>
          <a className="link link-hover">Github</a>
        </div>
        <div>
          <span className="footer-title">Company</span>
          <a className="link link-hover">Home</a>
          <a className="link link-hover">Blog</a>
        </div>
        <div>
          <span className="footer-title">Social Media</span>
          <a className="link link-hover">Twitter</a>
          <a className="link link-hover">Discord</a>
          <a className="link link-hover">Reddit</a>
        </div>
        <div>
          <span className="footer-title">Legal</span>
          <a className="link link-hover">Terms of service</a>
          <a className="link link-hover">Privacy policy</a>
        </div>
      </footer>
      <footer className="footer footer-center p-4">
        <div>
          <p>Copyright © 2023 - All right reserved by Third Board</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
