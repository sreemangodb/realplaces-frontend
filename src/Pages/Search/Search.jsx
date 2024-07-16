import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Footer from '../../Components/Footer/Footer';
import img01 from '../../Assets/Images/img01.jpg';
import { Link, useLocation } from 'react-router-dom';
import Ads from '../../Components/Ads/Ads';
import { base_url } from '../../data';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Search = () => {
  const [properties, setProperties] = useState([]);
  const query = useQuery();
  const districtCity = query.get('districtCity');
  let propertyType = query.get('propertyType');

  const fetchProperties = async () => {
    let adjustedPropertyType = propertyType;
  
    if (adjustedPropertyType === "Open") {
      adjustedPropertyType = "Open Plots";
    } else if (adjustedPropertyType === "Farm") {
      adjustedPropertyType = "Farm Lands";
    }
  
    console.log(`${districtCity}, ${adjustedPropertyType}`);
  
    try {
      const response = await axios.get(`${base_url}/property/property-list-type-location`, {
        params: {
          districtCity: districtCity,
          propertyType: adjustedPropertyType
        }
      });
      console.log("response", response.data);
      console.log("locations ", `${districtCity} ${adjustedPropertyType}`);
      setProperties(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [districtCity, propertyType]);

  const categories = [
    { label: '1 BHK', checked: true },
    { label: '2 BHK', checked: true },
    { label: '3 BHK', checked: true },
    { label: 'Above 3 BHK', checked: true },
  ];

  const locations = ['Suchitra', 'Kompally', 'Medchal', 'Athivil'];

  return (
    <>
      <Ads />
      <div className="list">
        <div className="list-in">
          <div className="list-left">
            <div className="realplaces-subtitle-01">Categories</div>
            <ul className="checkbox-list">
              {categories.map((category, index) => (
                <li key={index}>
                  <input type="checkbox" name="checkbox" defaultChecked={category.checked} /> {category.label}
                </li>
              ))}
            </ul>
            <div className="location-list">
              <h4>Medchal Locations</h4>
              <ul>
                {locations.map((location, index) => (
                  <li key={index}>
                    <a href="#">{location}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="list-right">
            <div className="tr01">
              <h1 style={{ textAlign: 'center', padding: '20px', width: '100%', border: 'solid 1px #b2b2b2' }}>Add Here</h1>
            </div>
            <div className="tr02">
              {properties.map((property, index) => (
                <div className="td04" key={index}>
                  <Link to={`/property-detail/${property.propertyid}`}>
                    <div className="img">
                      <img src={img01} alt={property.projectTitleData.projectTitle} />
                    </div>
                    <h4>{property.projectTitleData.projectTitle}</h4>
                    <h5>{property.location.districtCity}</h5>
                  </Link>
                </div>
              ))}
            </div>
            <div className="tr01">Google Add</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Search;
