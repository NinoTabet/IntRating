import "../Main.css";

const apiUrl = process.env.REACT_APP_API_URL;

const Footer = () => {

    return (
    <div className="text-center p-3">
       <small> IntRating.net is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing League of Legends. League of Legends and Riot Games are trademarks or registered trademarks of Riot Games, Inc. League of Legends © Riot Games, Inc.</small>
    </div>
    );
};

export default Footer;