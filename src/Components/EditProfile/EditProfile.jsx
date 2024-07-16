import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { base_url } from '../../data';

const EditProfile = () => {
  const navigate = useNavigate();
  const userEmail = Cookies.get('userEmail');

  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    location: '',
    aboutUs: '',
    image_profile: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const fetchUser = async () => {
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
      } catch (error) {
        console.log(error.message);
      }
    };
  useEffect(() => {
  
    fetchUser();
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === 'image_profile' && files.length > 0) {
      const file = files[0];
      await handleImageUpload(file); // Pass the file directly to handleImageUpload
    } else {
      setProfile((prevProfile) => ({
        ...prevProfile,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = async (file) => {
    const formDataToSend = new FormData();
    formDataToSend.append('image', file);

    try {
      const response = await fetch(`${base_url}/image-upload`, {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      setProfile((prevProfile) => ({
        ...prevProfile,
        image_profile: data.imageUrl,
      }));

      profile.image_profile = data.imageUrl;
      console.log('File uploaded successfully:', data.imageUrl);
      console.log("Image Profile", profile.image_profile)
    } catch (error) {
      console.error('There was a problem with the upload request:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${base_url}/users`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const updatedUser = await response.json();
      console.log('User updated:', updatedUser);
      alert("Profile Updated");
      navigate('/profile');
    } catch (error) {
      console.error('There was a problem with the update request:', error);
    }
  };

  return (
    <div className="postproperty-right">
      <div className="box">
        <div className="realplaces-subtitle-01">Edit My Profile</div>

        <div className="custom-table">
          <div className="td1">Profile Picture</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="file"
              name="image_profile"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">Name</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={profile.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">Mobile Number</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              value={profile.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">Email ID</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="email"
              name="email"
              placeholder="Email ID"
              value={profile.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">City</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="text"
              name="city"
              placeholder="Hyderabad"
              value={profile.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">Location</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="text"
              name="location"
              placeholder="Jeedimetla"
              value={profile.location}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="custom-table">
          <div className="td1">About Us</div>
          <div className="td2">:</div>
          <div className="td3">
            <input
              type="text"
              name="aboutUs"
              placeholder="About Us"
              value={profile.aboutUs}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="button-left">
          <button className="button-01" onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
