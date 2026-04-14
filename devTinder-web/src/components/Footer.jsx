const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
        <aside>
          <p className="text-sm">
            © {new Date().getFullYear()} DevTinder — Built by Arpit
          </p>
        </aside>
      </footer>
    </>
  );
};

export default Footer;
