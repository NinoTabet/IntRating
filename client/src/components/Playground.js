import { useState } from 'react';
import MatchCard from './MatchCard';
import DisplayPlayerReviews from './DisplayPlayerReviews';

const Playground = () => {
  const [showRankedData, setShowRankedData] = useState(true);
  const [showHistory, setShowHistory] = useState(true);

  const handleButtonClick = (isRankedData) => {
    setShowRankedData(isRankedData);
    setShowHistory(isRankedData);
  };

  return (
    <>
      <div className='text-center'>
        <div className='d-flex flex-column'>
          <div className='d-flex justify-content-around sticky-top'>
            {/* Account Info */}
            <div className='col-3 flex-column d-flex align-items-center justify-content-center '>
              <div>
                <img
                  src='https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5057.jpg?image=q_auto,f_webp,w_auto&amp;v=1700641403304'
                  alt='profile image'
                  className='profile-pics border border-dark'
                />
                <div className='mt-1'>
                  <span className='rounded bg-dark w-25 p-1 text-light'>572</span>
                  <h1>Guitarmo <span className='text-secondary h6'>#NA1</span></h1>
                  <div>Total reviews: <span>69</span></div>
                  <div>Overall rating: <span>4.23/5</span></div>
                </div>
              </div>
              <div className='row'>
                <div className='d-flex mt-2'>
                <button onClick={() => handleButtonClick(true)} className={`btn btn-light btn-med flex-grow-1 me-1 ${showRankedData ? 'active' : ''}`}>Match History</button>
                  <button onClick={() => handleButtonClick(false)} className={`btn btn-dark border border-dark btn-med flex-grow-1 ${!showRankedData ? 'active' : ''}`}>Reviews</button>
                </div>
              </div>
            </div>
            {showRankedData ? (
            <div className='border border-primary d-flex col align-items-center justify-content-center'>
              <div className='d-flex justify-content-center'>
                <div className='me-5'>
                  <div className='h6'>Solo / Duo</div>
                  <img src='https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5057.jpg?image=q_auto,f_webp,w_auto&amp;v=1700641403304' alt='profile image ' className='profile-pics border border-dark'></img>
                  <div>
                    <div className='border'><div className='h3 mb-0'>Platinum<span className='ms-2 me-2'>II</span></div></div>
                    <p className='h6 text-secondary'>69 LP</p>
                    <div className='h6'><span className='text-primary'>200</span> | <span className='text-danger'>100</span></div>
                    <div className='h6 text-secondary'> </div>
                    <div className='h6 text-secondary'>60% WR</div>
                  </div>
                </div>
                <div>
                  <div className='h6'>Flex 5v5</div>
                  <img src='https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5057.jpg?image=q_auto,f_webp,w_auto&amp;v=1700641403304' alt='profile image ' className='profile-pics border border-dark'></img>
                  <div>
                    <div className='border'><div className='h3 mb-0'>Platinum<span className='ms-2 me-2'>II</span></div></div>
                    <p className='h6 text-secondary'>69 LP</p>
                    <div className='h6'><span className='text-primary'>200</span> | <span className='text-danger'>100</span></div>
                    <div className='h6 text-secondary'>60% WR</div>
                  </div>
                </div>
              </div>
            </div>
            ) : (
            <div className='col d-flex'>
            <div className='p1 col'>
              <div className='row '>
                <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
                <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
                <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
              </div>
              <div className='row '>
              <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
                <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
                <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
              </div>
              <div className='row '>
              <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
                <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
                <div className='col m-1'>
                  <div className='fw-bold'>Laning / Jungling</div>
                  <div>★★★☆☆</div>
                </div>
              </div>
              <div className='col'>
                  <div>Play again?</div>
                  <div>☆☆☆☆☆</div>
                </div>
            </div>
            </div>
            )}
          </div>
        </div>
      </div>
      {showHistory ? (
      <div className='d-flex justify-content-around mt-5'>
        <div className='col-6'>
          <MatchCard/>
        </div>
      </div>
      ):(
      <div className='d-flex justify-content-around mt-5'>
        <div className='col-6 border rounded border-dark'>
          <DisplayPlayerReviews/>
        </div>
      </div>
      )}
    </> 
  );
};

export default Playground;
