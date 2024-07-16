import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer/Footer';

import avatar from '../../Assets/Images/img_avatar.png';
import Property from '../../Components/PropertyForm/Property';
import Flat from '../../Components/PropertyForm/Flat';
import OpenPlots from '../../Components/PropertyForm/OpenPlots';
import { Link } from 'react-router-dom';
import FarmLands from '../../Components/PropertyForm/FarmLands';
import Enquiry from '../Enquiry/Enquiry';
import MyAds from '../../Components/Ads/MyAds';
import Profile from '../../Components/Profile/Profile';
import Ads from '../../Components/Ads/Ads';
import EditProfile from '../../Components/EditProfile/EditProfile';
import Cookies from 'js-cookie';
import { base_url } from '../../data';

const PostProperty = ({ type }) => {







  const userEmail = Cookies.get('userEmail');

  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    location: '',
    aboutUs: '',
    image_profile:''
  });

  
  useEffect(() => {
  
    const fetchUser = async () =>{
    try {
      const response = await fetch(`${base_url}/users/oneByEmail`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userEmail })
      });
      if (!response.ok) {
          throw new Error('Agent not found');
      }
      const data = await response.json();
      setProfile(data);
      console.log("Agent Data", profile)
    } catch (error) {
      console.log(error.message);
    }
    }
      fetchUser();
    
    }, []);







  const renderPropertyType = () => {
    switch (type) {
      case 'flat':
        return <Flat />;
        case 'open-plots':
          return <OpenPlots />;
          case 'farm-land':
            return <FarmLands />;
            case 'enquiry':
              return <Enquiry/>;
              case 'my-ads':
                return <MyAds/>;
                case 'edit-profile':
                  return <EditProfile/>;
      case 'profile':
        return <Profile/>;


      case 'property':
      default:
        return <Property />;
    }
  };

  return (
    <>
    <Ads/>
      <div className="post-property">
        <div className="postproperty-in">
          <div className="postproperty-left  property-out ">
            <div className="box">
              <div className="sub-title-02">My Dashboard</div>
              <div className="person">
                <div className="avatar"><img src={profile?profile.image_profile===''?avatar:profile.image_profile:""} alt="avatar" /></div>
                <h5>{profile?profile.name:""}</h5>
                <h6>Agent</h6>
                <Link to='/profile'>Edit</Link>
              </div>
              <ul className="list">
                <li><Link to={"/post-flats"}>Post Flats</Link></li>
                <li><Link to="/post-open-plots">Post Open Plots</Link></li>
                <li><Link to="/post-farm-land">Post Farm Land</Link></li>
                <li><Link to="/my-ads">My Ads</Link></li>
                <li><Link to="/customer-enquiry">Customer Enquiry</Link></li>
                <li><Link to="#">Log Out</Link></li>
              </ul>
            </div>
          </div>
          <div className="postproperty-right property-out">
            {renderPropertyType()}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PostProperty;
