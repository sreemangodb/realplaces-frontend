import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { base_url } from '../../data';

const SendEnquiry = () => { 
  const {agentEmail, propertyId} = useParams();
  const navigate = useNavigate();
  const userEmail = Cookies.get('userEmail');

  const [enquiry, setEnquiry] = useState({
    name: '',
    phone: '',
    required: '',
    note: '', 
    propertyId:propertyId,
    agentEmail:agentEmail 
  }); 
  

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setEnquiry((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${base_url}/enquiry/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enquiry),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      alert("Enquiry Send Successfully");
      navigate(-1);
    } catch (error) {
      console.error('There was a problem with the update request:', error);
    }
  };

  return (
    <div className="postproperty-right" style={{padding:'40px 20px'}}>
      <div className="box">
        <div className="realplaces-subtitle-01">Send Enquiry</div>


        <div className="custom-table">
          <div className="td1">Name</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="text"
              name="name"
              placeholder="Your Full Name"
              value={enquiry.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">Phone Number</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={enquiry.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">Required</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="text"
              name="required"
              placeholder="Required"
              value={enquiry.required}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">Note</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="text"
              name="note"
              placeholder="Note for the Aagent/Owner"
              value={enquiry.note}
              onChange={handleChange}
            />
          </div>
        </div>

        
        <div className="button-left">
          <button className="button-01" onClick={handleSubmit}>Send Enquiry</button>
        </div>
      </div>
    </div>
  );
};

export default SendEnquiry;
