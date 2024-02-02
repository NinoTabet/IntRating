import "../Main.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Footer = () => {

    return (
    <div className="text-center p-3">
        <small> IntRating.net isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.</small>
        <div className="bottom-nav d-flex align-items-center justify-content-center mt-2">
            <nav className="navbar bg-light">
                <ul className="nav">
                    <li className="nav-item"><a href="https://discord.gg/k7CYMXUbTu" className="nav-link text-dark with-border nav-hover-effect" target="_blank" rel="noopener noreferrer">Discord</a></li>
                    <li className="nav-item"><a href="https://www.reddit.com/r/IntRating/" className="nav-link text-dark with-border nav-hover-effect" target="_blank" rel="noopener noreferrer">Reddit</a></li>
                    <li className="nav-item"><a href="https://www.tiktok.com/@coding.with.nino" className="nav-link text-dark nav-hover-effect" target="_blank" rel="noopener noreferrer">TikTok</a></li>
                </ul>
            </nav>
        </div>
    </div>
    );
};

export default Footer;