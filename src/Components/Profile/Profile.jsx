// src/pages/Profile.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { base_url } from '../../data';
import Cookies from 'js-cookie';

const Profile = () => {
const Navigate = useNavigate()
  const goToEdit = () =>{
    Navigate('/edit-profile')
  }

  const userEmail = Cookies.get('userEmail');
  const [agent, setAgent] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    location: '',
    aboutUs: ''
  })

   
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
    setAgent(data);
    console.log("Agent Data", agent)
  } catch (error) {
    console.log(error.message);
  }
  }
    fetchUser();
  
  }, []);
  

  return (
    <div className="post-property">
        <div className="postproperty-right">
          <div className="box">
            <div className="realplaces-subtitle-01">My Profile</div>

            <div className="custom-table">
              <div className="td1">Name</div>
              <div className="td2">:</div>
              <div className="td3">{agent?agent.name:""}</div>
            </div>
            
            <div className="custom-table">
              <div className="td1">Mobile Number</div>
              <div className="td2">:</div>
              <div className="td3">{agent?agent.phone:""}</div>
            </div>
            
            <div className="custom-table">
              <div className="td1">Email ID</div>
              <div className="td2">:</div>
              <div className="td3">{agent?agent.email:""}</div>
            </div>
            
            <div className="custom-table">
              <div className="td1">City</div>
              <div className="td2">:</div>
              <div className="td3">{agent?agent.city:""}</div>
            </div>
            
            <div className="custom-table">
              <div className="td1">Location</div>
              <div className="td2">:</div>
              <div className="td3">{agent?agent.location:""}</div>
            </div>
            
            <div className="custom-table">
              <div className="td1">About Us</div>
              <div className="td2">:</div>
              <div className="td3">{agent?agent.aboutUs:""}</div>
            </div>
            
            <div className="button-left">
              <a onClick={()=>goToEdit()}>
                <button  className="button-01">Edit Profile</button>
              </a>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Profile;
