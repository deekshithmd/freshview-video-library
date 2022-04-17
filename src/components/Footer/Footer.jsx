import "./footer.css";
export const Footer = () => {
  return (
    <footer className="footer">
      <span className="text-md footer-text">
        {" "}
        <span className="brand-style">FreshView</span> developed and maintained by
        Deekshith M D
      </span>
      <ul className="footer-social-icons">
        <li className="list-inline-item">
          <a
            href="https://github.com/deekshithmd"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link link-style-none"
          >
            <i className="fab fa-github nav-icon"></i>{" "}
          </a>
        </li>
        <li className="list-inline-item">
          <a
            href="https://in.linkedin.com/in/deekshith-m-d-42a306154"
            target="_blank"
            rel="noreferrer"
            className="nav-icon-link link-style-none"
          >
            <i className="fab fa-linkedin nav-icon"></i>
          </a>
        </li>
        <li className="list-inline-item">
          <a
            href="http://twitter.com/deekshith_md"
            target=" _blank"
            rel="noreferrer"
            className="nav-icon-link link-style-none"
          >
            <i className="fab fa-twitter nav-icon"></i>
          </a>
        </li>
      </ul>
    </footer>
  );
};
