import { Link } from 'react-router-dom';

// Background images for categories
const ANIME_BG = 'https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
const TV_BG = 'https://images.unsplash.com/photo-1596405367208-63505402f113?q=80&w=3474&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const Home = () => {
  return (
    <div className="home-container">
      <div className="categories">
        <Link 
          to="/anime" 
          className="category" 
          style={{ backgroundImage: `url(${ANIME_BG})` }}
        >
          <div className="category-content">
            <h2>ANIME</h2>
          </div>
        </Link>
        
        <Link 
          to="/tvshow" 
          className="category" 
          style={{ backgroundImage: `url(${TV_BG})` }}
        >
          <div className="category-content">
            <h2>TV SHOWS</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
