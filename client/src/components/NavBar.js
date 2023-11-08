import SearchBar from './SearchBar';

const NavBar = ({ currentPage, setCurrentPage, handleSearchSuccess }) => {
  const handleNavigation = (page) => {
    console.log('Changing page to', page);
    setCurrentPage(page);
  };
 
  return (
    <>
      <nav className="navbar navbar-dark justify-content-between mb-5 ">
        <div className="container-fluid">
          <button className="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="navbar-collapse collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link px-2 text-light ${currentPage === 'home' ? 'link-secondary' : ''}`}
                  onClick={() => handleNavigation('home')}
                >
                  Home
                </a>
              </li>
              <li className='nav-item'>
                <a href='#' className={`nav-link px-2 text-light ${currentPage === 'loginsignup' ? 'link-secondary' : ''}`}
                  onClick={() => handleNavigation('loginsignup')}>Log in / Sign up</a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link px-2 text-light ${currentPage === 'contribute' ? 'link-secondary' : ''}`}
                  onClick={() => handleNavigation('contribute')}
                >
                  Contribute rating
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="#"
                  className={`nav-link px-2 text-light ${currentPage === 'feedback' ? 'link-secondary' : ''}`}
                  onClick={() => handleNavigation('contact')}
                >
                  Feedback
                </a>
              </li>
            </ul> 
          </div>
            <div className="ms-auto mb-auto">
              <SearchBar handleSearchSuccess={handleSearchSuccess} />
            </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
