import SearchBar from './SearchBar';

const NavBar = ({ currentPage, setCurrentPage, handleSearchSuccess }) => {
  const handleNavigation = (page) => {
    console.log('Changing page to', page);
    setCurrentPage(page);
  };
 
  return (
    <nav className="d-flex flex-wrap align-items-center justify-content-md-between py-3 px-3 mb-4 border-bottom">
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <a
            href="#"
            className={`nav-link px-2 text-light ${currentPage === 'home' ? 'link-secondary' : ''}`}
            onClick={() => handleNavigation('home')}
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`nav-link px-2 text-light ${currentPage === 'contribute' ? 'link-secondary' : ''}`}
            onClick={() => handleNavigation('contribute')}
          >
            Contribute rating
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`nav-link px-2 text-light ${currentPage === 'feedback' ? 'link-secondary' : ''}`}
            onClick={() => handleNavigation('contact')}
          >
            Feedback
          </a>
        </li>
      </ul>
      <SearchBar handleSearchSuccess={handleSearchSuccess} />
    </nav>
  );
};

export default NavBar;
