import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropertySearch from '../../Components/PropertySearch/PropertySearch'
import img01 from '../../Assets/Images/img01.jpg'
import icon_location from '../../Assets/Images/icon-location.png'
import whyrealestate_01 from '../../Assets/Images/whyrealestate-01.png'
import { Link } from 'react-router-dom'
import { base_url } from '../../data'
import Footer from '../../Components/Footer/Footer'
import SearchAllPages from '../../Components/SearchAllPages/SearchAllPages'
const Home = () => {
  const [activePopup, setActivePopup] = useState(null);
  const [data, setData] = useState([]);
  const [propertyTime, setpropertyTime] = useState([]);
  const [topProperty, setTopPrroperty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${base_url}/property/district-city`);
        const sortedData = response.data.sort((a, b) => b.propertyCount - a.propertyCount);
        const slicedData = sortedData.slice(0, 6);
        setData(slicedData); 
      } catch (err) {
        console.log(err.message); 
      }
    };   
    const getAllPropertywithTime = async () => {
      try {
        const response = await axios.get(`${base_url}/property/property-date`);
        const sortedData = response.data.sort((a, b) => b.propertyCount - a.propertyCount);
        const slicedData = sortedData.slice(0, 6);
        setpropertyTime(slicedData); 
      } catch (err) {
        console.log(err.message); 
      }
    };
    const getTopProperty = async () => {
      try {
        const response = await axios.get(`${base_url}/property/top-projects`);
        setTopPrroperty(response.data); 
      } catch (err) {
        console.log(err.message); 
      }
    };   

    getTopProperty();
    getAllPropertywithTime();
    fetchData();
  }, []);


  const openPopup = (id) => setActivePopup(id);
  const closePopup = () => setActivePopup(null);
  const ProjectCard = ({id, imgSrc, price, title, location }) => {
    return (
      <Link to={`property-detail/${id}`} className="td04 border">
        <div className="img">
          <img src={imgSrc} />
        </div>
        <p className="projectprice">{price}</p>
        <h4>{title}</h4>
        <h5>{location}</h5>
      </Link>
    );
  };
  const cities = [
    {
      id: 'popup-modal01',
      name: 'Hyderabad',
      properties: '500+ Properties',
      areas: ['Ameerpet', 'SR Nagar', 'Sanath Nagar']
    },
    {
      id: 'popup-modal02',
      name: 'Yadadri',
      properties: '500+ Properties',
      areas: ['Yadadri', 'Aleri', 'Kolanupaka']
    },
    {
      id: 'popup-modal03',
      name: 'Medchal Malkajgiri',
      properties: '500+ Properties',
      areas: ['Medchal', 'Kompally', 'Atvili', 'Kandla Koya']
    },
    {
      id: 'popup-modal04',
      name: 'Mumbai Highway',
      properties: '500+ Properties',
      areas: ['Mumbai Highway', 'Patancheru', 'Muttangi', 'Sankarpally']
    },
    {
      id: 'popup-modal05',
      name: 'Warangal Highway',
      properties: '500+ Properties',
      areas: ['Warangal', 'Hanumakonda']
    },
    {
      id: 'popup-modal06',
      name: 'Vijayawada',
      properties: '500+ Properties',
      areas: ['Vijayawada', 'Eluru', 'Penamaluru']
    }
  ];

  const projects = [
    {
      price: '₹ 15 L',
      title: 'Flats 2 BHK Apartments near Shamerpet',
      location: 'Shamerpet, Hyderabad',
      image: img01
    },
    {
      price: '₹ 16 L',
      title: 'Open Plots Near Yadadri',
      location: 'Yadagirigutta, Yadadri',
      image: img01
    }
  ];const projects2 = [
    {
      price: '₹ 15 L',
      title: 'Flats 2 BHK Apartments near Shamerpet',
      location: 'Shamerpet, Hyderabad',
      image: img01
    },{
      price: '₹ 15 L',
      title: 'Flats 2 BHK Apartments near Shamerpet',
      location: 'Shamerpet, Hyderabad',
      image: img01
    },{
      price: '₹ 15 L',
      title: 'Flats 2 BHK Apartments near Shamerpet',
      location: 'Shamerpet, Hyderabad',
      image: img01
    },
    {
      price: '₹ 16 L',
      title: 'Open Plots Near Yadadri',
      location: 'Yadagirigutta, Yadadri',
      image: img01
    }
  ];


  return (
    <div className="App">
      <PropertySearch/>
      <SearchAllPages/>
      <main>
        <section className="top-cities">
          <div className="realplaces-title01">
            <h1>Real Estate Listed Companies in India</h1>
            <h2>
              <strong>Top</strong> Areas
              <em>Explore Real Estate Popular Cities in Hyderabad, Telangana</em>
              <span className="line"></span>
            </h2>
          </div>

          <div className="topcity-tr06">
            {data.map((city, id) => (
              <div className="td06 border" key={id}>
                <label className="popupmodal01-btn" >
                  <img src={icon_location} alt="location" title="location" />
                  <h5>{city.districtCity}</h5>
                  <h6>{city.propertyCount}+ Properties</h6>
                </label>
                {activePopup === city.id && (
                  <div className="popupmodal01-wrapper">
                    <label className="popupmodal01-btn-close" onClick={closePopup}>×</label>
                    <div className="popupmodal01-container">
                      <h3>{city.name} Local Areas</h3>
                      <div className="tr04">
                        {city.areas.map((area, index) => (
                          <div className="td04" key={index}>
                            <ul>
                              <li><a href="#">{area}</a></li>
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="top-projects">
          <div className="topprojects-in">
            <div className="title-02">
              <h4><span className="line"></span><span className="text"><strong>Top Projects</strong></span></h4>
            </div>
            <div className="topprojects-tr02">
              {topProperty.map((project, index) => (
                <div className="td02 border" key={index}>
                  <Link to={`property-detail/${project.propertyid}`}>
                    <div className="img">
                      <img src={img01} alt="project" title="project" />
                    </div>
                    <p className="projectprice">{project.price}</p>
                    <h4>{project.projectTitleData.projectTitle}</h4>
                    <h5>{`${project.location.districtCity}, ${project.location.state}`}</h5>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="postyourproject">
          Post Your Project in <Link to={'/'}> realplaces.in </Link>
        </section>

        <section className="features-projects">
          <div className="featuresprojects-in">
            <div className="title-02">
              <h4><span className="line"></span><span className="text"><strong>Recent Projects</strong></span></h4>
            </div>
            <div className="featuresprojects-tr04">
            {propertyTime.map((project, index) => (
            <ProjectCard
            id={project.propertyid}
              key={index}
              imgSrc={img01}
              price={"15L"}
              title={project.projectTitleData.projectTitle}
              location={project.location.districtCity}
            />
          ))}
            </div>
          </div>
        </section>

        <section className="locallist">
          <h2>Real Places</h2>
          <div className="locallist-in">
            <div className="locallist-left">
              <img src={whyrealestate_01} alt="location" title="location" />
            </div>
            <div className="locallist-right">
              <h3>Open Plots in Hyderabad</h3>
              <ul>
                <li><a href="#">Shadnagar</a></li>
                <li><a href="#">Balanagar</a></li>
                <li><a href="#">Chowtuppal</a></li>
                <li><a href="#">Vijayawada Highway</a></li>
                <li><a href="#">Warangal Highway</a></li>
                <li><a href="#">Adibatla</a></li>
                <li><a href="#">Srisailam Highway</a></li>
                <li><a href="#">Medchal</a></li>
              </ul>
              <h3>Flats in Hyderabad</h3>
              <ul>
                <li><a href="#">Medchal Highway</a></li>
                <li><a href="#">Kompally</a></li>
                <li><a href="#">Chowtuppal</a></li>
                <li><a href="#">Vijayawada Highway</a></li>
                <li><a href="#">Warangal Highway</a></li>
                <li><a href="#">Adibatla</a></li>
                <li><a href="#">Srisailam Highway</a></li>
              </ul>
              <h3>Farm Lands in Hyderabad</h3>
              <ul>
                <li><a href="#">Yadadri</a></li>
                <li><a href="#">Aleru</a></li>
                <li><a href="#">Chowtuppal</a></li>
                <li><a href="#">Vijayawada Highway</a></li>
                <li><a href="#">Warangal Highway</a></li>
                <li><a href="#">Adibatla</a></li>
                <li><a href="#">Srisailam Highway</a></li>
              </ul>
            </div>
          </div>
        </section>
      </main>

          <Footer/>
    </div>
  );
}

export default Home