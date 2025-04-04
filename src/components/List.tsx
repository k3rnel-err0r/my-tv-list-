import { useState, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShowItem, SortConfig } from '../types';
import { animeData, tvShowData } from '../data';

// Icon components for sort indicators
const SortAscIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
  </svg>
);

const SortDescIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
    <path d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1z"/>
  </svg>
);

const List = () => {
  const { category } = useParams<{ category: string }>();
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'year',
    direction: 'desc'
  });

  // Determine which data set to use based on category
  const data = useMemo(() => {
    return category === 'anime' ? animeData : tvShowData;
  }, [category]);

  // Sort the data based on the current sort configuration
  const sortedData = useMemo(() => {
    const sortableData = [...data];
    
    sortableData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return sortableData;
  }, [data, sortConfig]);

  // Handle sorting when a column header is clicked
  const handleSort = (key: keyof ShowItem) => {
    setSortConfig(prevConfig => ({
      key: key as any,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Get the appropriate link based on the category
  const getTitleLink = (item: ShowItem) => {
    if (item.link) {
      return item.link;
    }
    
    // Fallback to a search if no direct link is provided
    const searchQuery = encodeURIComponent(item.title);
    return category === 'anime'
      ? `https://myanimelist.net/search/all?q=${searchQuery}&cat=all`
      : `https://www.imdb.com/find/?q=${searchQuery}`;
  };

  return (
    <div className="list-container">
      <div className="list-header">
        <h1>{category === 'anime' ? 'Anime' : 'TV Shows'}</h1>
        <Link to="/" className="back-button">
          ← Back to Categories
        </Link>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort('title')}>
                <div className="table-header">
                  Title
                  {sortConfig.key === 'title' && (
                    sortConfig.direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('year')}>
                <div className="table-header">
                  Year
                  {sortConfig.key === 'year' && (
                    sortConfig.direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('seasons')}>
                <div className="table-header">
                  Seasons
                  {sortConfig.key === 'seasons' && (
                    sortConfig.direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('streamer')}>
                <div className="table-header">
                  Streamer
                  {sortConfig.key === 'streamer' && (
                    sortConfig.direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('status')}>
                <div className="table-header">
                  Status
                  {sortConfig.key === 'status' && (
                    sortConfig.direction === 'asc' ? <SortAscIcon /> : <SortDescIcon />
                  )}
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item, index) => (
              <tr key={index}>
                <td>
                  <a href={getTitleLink(item)} target="_blank" rel="noopener noreferrer">
                    {item.title}
                  </a>
                </td>
                <td>{item.year}</td>
                <td>{item.seasons}</td>
                <td>{item.streamer}</td>
                <td>
                  <span className={`status-badge status-${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
