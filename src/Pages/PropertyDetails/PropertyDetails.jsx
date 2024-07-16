import React, { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { base_url } from '../../data';

const PropertyDetails = () => {
  const {id} = useParams();
  const navigate = useNavigate()
  const [property, setProperty] = useState([
    
  ]);
  const [agent, setAgent] = useState(null);



 const goToEnquiry=  ()=>{
  
navigate(`/send-enquiry/${property.agentEmail}/${id}`)
 }

  useEffect(() => {
    const increaseViewProperty = async () => {
      try {
        const response = await fetch(`${base_url}/property/increase-view`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ propertyid: id })
        });
        
        if (!response.ok) {
          throw new Error('Property not found');
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    increaseViewProperty();
  }, [id]);


  useEffect(() => {
    const fetchProperty = async () => {
        try {
            const response = await fetch(`${base_url}/property/oneById`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ propertyid: id })
            });
            if (!response.ok) {
                throw new Error('Property not found');
            }
            const data = await response.json();
            setProperty(data);
            const agentEmail = property.agentEmail;
            console.log("Agent Email", agentEmail)
        } catch (error) {
            console.log(error.message);
        }
    };

    fetchProperty();
}, [id]);

useEffect(() => {
  
const fetchUser = async () =>{
try {
  const response = await fetch(`${base_url}/users/oneByEmail`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: property?.agentEmail })
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

}, [property]);

    return (
        <>

          <div className="project-details">
            <div className="projectdetails-in">
              <div className="projectdetails-left">
                <Box>
                  <h1>{property?property?.projectTitleData?.projectTitle:"Apartment Flats Details"}</h1>
                  <h2>{property?property?.projectTitleData?.projectSubtitle:"Flats Near Shameerpet"}</h2>
                </Box>
    
                <Box>
                  <OnlyCssSlide />
                </Box>
    
                <Box>
                  <div className="realplaces-subtitle-01">About Us</div>
                  <p>
                  {property?property?.aboutProjectData?.aboutProject:"Project Description"} </p>
                  <ul className="list-02">
                    <li><span>Project Area :</span> {property?property?.aboutProjectData?.projectArea:""} </li>
                    <li><span>Project Size :</span> {property?property?.aboutProjectData?.projectSize:""} </li>
                    <li><span>Launch Date :</span> {property?property?.aboutProjectData?.launchDate:""} </li>
                    <li><span>Possession Starts :</span> {property?property?.aboutProjectData?.possessionStarts:""} </li>
                    <li><span>Size :</span> {property?property?.aboutProjectData?.size:""} </li>
                    <li><span>Avg Sft Price :</span> {property?property?.aboutProjectData?.avgSftPrice:""} </li>
                    <li><span>L.P.No. :</span> {property?property?.aboutProjectData?.lpNumber:""} </li>
                    <li><span>RERA No. :</span> {property?property?.aboutProjectData?.reraNumber:""} </li>
                  </ul>
                </Box>
    
                <Box>
                  <div className="realplaces-subtitle-01">Project Highlights</div>
                  <ul className="list-03">
                    {
                      property?.projectHighlight?.map((e)=>{
                        return <li>{`${e.projectArea}, ${e.projectSize}`}</li>
                      })
                    }
                    
                  
                  </ul>
                </Box>
    
                <Box>
                  <div className="realplaces-subtitle-01">Location Highlights</div>
                  <ul className="list-03">
                  {
                      property?.locationHighlight?.map((e)=>{
                        return <li>{`${e.projectArea}, ${e.projectSize}`}</li>
                      })
                    }
                    
                  </ul>
                </Box>
    
                <Box>
                  <div className="realplaces-subtitle-01">Floor Plans</div>
                  <TabSlider id={id} />
                </Box>
    
                <Box>
                  <div className="google-map">
                    <iframe
                      src={property?.googleMap}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                    ></iframe>
                  </div>
                </Box>
    
                <Box>
                  <div className="realplaces-subtitle-01">Videos</div>
                  <div className="videolink">
                    <div className="videolink-in">
                      {
                        property?.videoLinks?.map((e)=>
                          <div className="videolink-info">
                        <iframe
                          src={e}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                        )
                      }
                      {/* <div className="videolink-info">
                        <iframe
                          src="https://www.youtube.com/embed/Sxpr_xSNJr4"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                      <div className="videolink-info">
                        <iframe
                          src="https://www.youtube.com/embed/Sxpr_xSNJr4"
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div> */}
                    </div>
                  </div>
                </Box>
              </div>
    
              <div className="projectdetails-right">
                <Box>
                  <div className="person">
                    <div className="avatar"><img src={agent?agent.image_profile:""} alt="Avatar" /></div>
                    <h5>{agent?agent.name:""}</h5>
                    <h6>{property?property.select==="agent"?"Agent":"Owner":""}</h6>
                  </div>
                  <div className="realplaces-subtitle-01">Contact Info</div>
                  <ul className="contact-list">
                    <li><b>Location :</b>{agent?agent.location:""}</li>
                    <li><b><a href="tel:+9181430344**">Mobile :</a></b>{agent?agent.phone:""}</li>
                    <li><b>Business Time :</b>{agent?agent.businessTime:""}</li>
                    <li><b>Holiday :</b> {agent?agent.holiday:""}</li>
                  </ul>
                  <div className="vivers">Viewed : {property?`${property.propertyViews} Members`:"No Views"} </div>
                  <div className="brochure-download">Brochure Download</div>
                  <div onClick={()=>goToEnquiry()} className="customer-contact">Contact Us</div>
                </Box>
              </div>
            </div>
          </div>



          <Footer/>
        </>
      );
    };
    
    const RealPlacesHeader = () => <header>/* RealPlaces Header */</header>;
    const RealPlacesRightSideNav = () => <nav>/* RealPlaces RightSide Nav */</nav>;
    const SearchAllPages = () => <div>/* Search All Pages Component */</div>;
    const RealPlacesFooter = () => <footer>/* RealPlaces Footer */</footer>;
    
    const Box = ({ children }) => (
      <div className="box">
        {children}
      </div>
    );
    
    const OnlyCssSlide = () => (
      <div className="onlycss-slide">
        <div className="css-slider-withbuttons">
          <input type="radio" name="slide" id="slide-1" defaultChecked />
          <input type="radio" name="slide" id="slide-2" />
          <input type="radio" name="slide" id="slide-3" />
    
          <div className="slides">
            <div className="slide slide-1">
              <div className="img">
                <img src="images/realestate-slide-01.jpg" alt="Slide 1" />
              </div>
            </div>
            <div className="slide slide-2">
              <div className="img">
                <img src="images/realestate-slide-01.jpg" alt="Slide 2" />
              </div>
            </div>
            <div className="slide slide-3">
              <div className="img">
                <img src="images/realestate-slide-01.jpg" alt="Slide 3" />
              </div>
            </div>
          </div>
    
          <div className="arrows arrow-left">
            <label htmlFor="slide-3">
              <span> &lt; </span>
            </label>
            <label htmlFor="slide-1">
              <span> &lt;  </span>
            </label>
            <label htmlFor="slide-2">
              <span> &lt; </span>
            </label>
          </div>
    
          <div className="arrows arrow-right">
            <label htmlFor="slide-2">
              <span> &gt; </span>
            </label>
            <label htmlFor="slide-3">
              <span> &gt; </span>
            </label>
            <label htmlFor="slide-1">
              <span> &gt; </span>
            </label>
          </div>
    
          <div className="dots">
            <label htmlFor="slide-1"></label>
            <label htmlFor="slide-2"></label>
            <label htmlFor="slide-3"></label>
          </div>
        </div>
      </div>
    );
    
    
    
const TabSlider = ({ id }) => {
  const [property, setProperty] = useState(null);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${base_url}/property/oneById`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ propertyid: id }),
        });
        if (!response.ok) {
          throw new Error('Property not found');
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div>Loading...</div>;
  }

  const floorPlans = property.floorPlan || [];

  return (
    <div className="tab-slider-01">
      {floorPlans.map((_, index) => (
        <input 
          type="radio" 
          name="slider" 
          onClick={() => setTab(index)} 
          id={`floorplan${index}`} 
          key={index} 
        />
      ))}

      <nav>
        {floorPlans.map((_, index) => (
          <label 
            htmlFor={`floorplan${index}`} 
            className={`floorplan${index} ${index === tab ? 'tab-slide-active' : ''}`} 
            key={index}
          >
            Floor Plan - {index + 1}
          </label>
        ))}
        <div className="slider"></div>
      </nav>

      <div>
        <div className={`tab-content content-1`}>
          <div className="tab-content-in">
            <div className="tab-content-info">
              <div className="item-img">
                <img src="images/floorplan.jpeg" alt="Floor Plan" />
              </div>
            </div>
            <div className="tab-content-info">
              <h5>Flat Details</h5>
              <ul>
                <li><span>Type :</span> {floorPlans[tab]?.typeOf}</li>
                <li><span>Flat Size :</span> {floorPlans[tab]?.flatSize}</li>
                <li><span>Bedrooms :</span> {floorPlans[tab]?.bedrooms}</li>
                <li><span>Bathrooms :</span> {floorPlans[tab]?.bathRoom}</li>
                <li><span>Balcony :</span> {floorPlans[tab]?.balcony}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const TabContent = ({ id, type, size, bedrooms, bathrooms, balcony }) => (
//   <div className={`tab-content content-1`}>
//     <div className="tab-content-in">
//       <div className="tab-content-info">
//         <div className="item-img">
//           <img src="images/floorplan.jpeg" alt={`Floor plan ${type}`} />
//         </div>
//       </div>
//       <div className="tab-content-info">
//         <h5>Flat Details</h5>
//         <ul>
//           <li><span>Type :</span> {type}</li>
//           <li><span>Flat Size :</span> {size}</li>
//           <li><span>Bedrooms :</span> {bedrooms}</li>
//           <li><span>Bathrooms :</span> {bathrooms}</li>
//           <li><span>Balcony :</span> {balcony}</li>
//         </ul>
//       </div>
//     </div>
//   </div>
// );

export default PropertyDetails