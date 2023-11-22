//LoginSignup

const LoginSignup = ({ currentPage, setCurrentPage }) => {

  const handleNavigation = (page) => {
    console.log('Changing page to', page);
    setCurrentPage(page);
  };

return (
  <>
    <div className="container mt-lg-5 middle_page w-50">
    <h1 className='text-center text-dark'>Signup or Login!</h1>
        <div className='text-center mt-5 justify-content-center d-flex'>
            <button
                type="button"
              className={`btn btn-lg btn-dark text-light me-3 ${currentPage === 'signup'}`}
              onClick={() => handleNavigation('signup')}
                >SIGN UP
            </button>
            <button
                type="button"
                className={`btn btn-lg btn-light text-dark border border-dark ${currentPage === 'login'}`}
              onClick={() => handleNavigation('login')}>LOG IN
            </button>
        </div>
    </div>
  </>
);
};

export default LoginSignup;
