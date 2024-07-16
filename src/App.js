import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
// css
import '../src/css/backup-responsive-tr.css'
import '../src/css/max360.css'
import '../src/css/min361-max480.css'
import '../src/css/min481-max599.css'
import '../src/css/min600-max767.css'
import '../src/css/min768-max1024.css'
import '../src/css/min1025-max1280.css'
import '../src/css/min1281.css'
import '../src/css/realplaces.css'
import '../src/css/realplaces2.css'
import '../src/css/realplasecstyle.css'
import '../src/css/responsive-tr.css'
import PropertySearch from './Components/PropertySearch/PropertySearch';
import RightSideNavbar from './Components/RightSideNavbar/RightSideNavbar';
import LoginSignUp from './Pages/LoginSignUp/LoginSignUp';
import PostProperty from './Pages/PostProperty/PostProperty';
import Enquiry from './Pages/Enquiry/Enquiry';
import Search from './Pages/Search/Search';
import PropertyDetails from './Pages/PropertyDetails/PropertyDetails';
import SendEnquiry from './Components/SendEnquiry/SendEnquiry';

const App = () => {
  const [isLogin, setIsLogin] = useState(false)
  return (
    <div>
      <BrowserRouter>
        <RightSideNavbar isLogin={isLogin} setIsLogin={setIsLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property-search" element={<PropertySearch />} />
          <Route path="/login" element={<LoginSignUp isLogin={isLogin} setIsLogin={setIsLogin} login={true}/>} />
          <Route path="/registration" element={<LoginSignUp login={false}/>} />
          <Route path="/post-property" element={<PostProperty type={"property"}/>} />
          <Route path="/post-flats" element={<PostProperty type={"flat"}/>} />
          <Route path="/post-open-plots" element={<PostProperty type={"open-plots"}/>} />
          <Route path="/post-farm-land" element={<PostProperty type={"farm-land"}/>} />
          <Route path="/customer-enquiry" element={<PostProperty type={"enquiry"}/>} />
          <Route path="/my-ads" element={<PostProperty type={"my-ads"}/>} />
          <Route path="/profile" element={<PostProperty type={"profile"}/>} />
          <Route path="/edit-profile" element={<PostProperty type={"edit-profile"}/>} />
          <Route path="/list" element={<Search/>} />
          <Route path="/property-detail/:id" element={<PropertyDetails/>} />
          <Route path="/send-enquiry/:agentEmail/:propertyId" element={<SendEnquiry/> } />
          {/* Add more routes here as needed */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
