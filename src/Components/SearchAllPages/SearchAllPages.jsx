import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { base_url } from '../../data';
const SearchAllPages = () => {
  const navigate = useNavigate()
    const [projectType, setProjectType] = useState('');
    const [location, setLocation] = useState('');
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post(`${base_url}/property/district-city`);
          const sortedData = response.data.sort((a, b) => b.propertyCount - a.propertyCount);
          setData(sortedData); 
        } catch (err) {
          console.log(err.message); 
        }
      };   
  
      fetchData();
    }, []);
    const handleProjectTypeChange = (e) => {
      setProjectType(e.target.value);
    };
  
    const handleLocationChange = (e) => {
      setLocation(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      navigate(`/list?propertyType=${projectType}&districtCity=${location}`)
      
    };
  
    return (
      <div className="search-allpages">
        <div className="search-allpages-in">
          <form onSubmit={handleSubmit}>
            <div className="search-allpages-tr03">
              <div className="category">
                <select value={projectType} onChange={handleProjectTypeChange}>
                <option value="Property">Property</option>
                <option value="Flat">Flat</option>
                <option value="Open Plots">Open Plots</option>
                <option value="Farm Lands">Farm Lands</option>
                  
                </select>
              </div>
              <div className="location">
                <select value={location} onChange={handleLocationChange}>
                  {
                    data.map((e)=>(
                      <option value={`${e.districtCity}`}>{`${e.districtCity}, ${e.state}`}</option>
                    ))
                  }
                    </select>
              </div>
              <div className="search">
                <button className="search-button" type="submit" style={{ width: '100%' }}>
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
}

export default SearchAllPages