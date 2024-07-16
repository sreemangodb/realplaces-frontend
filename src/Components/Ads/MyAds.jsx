import React from 'react';
import editIcon from '../../Assets/Images/icon-edit.png';
import viewIcon from '../../Assets/Images/icon-view.png';
import deleteIcon from '../../Assets/Images/icon-delet.png';


const MyAds = () => {
  const adsData = [
    {
      name: 'Happy Momes - Sampet, Hyderabad',
      category: 'Apartments',
      status: 'Published',
      editLink: '#',
      viewLink: '#',
      deleteLink: '#'
    },
    {
      name: 'Anandavanam - Kolanupaka, Yadagirigutta',
      category: 'Farm Land',
      status: 'Published',
      editLink: 'post-property.php',
      viewLink: 'project-details.php',
      deleteLink: '#'
    }
  ];

  return (
    <div className="postproperty-right" >
       <div className="realplaces-subtitle-01">My Ads</div>
        <hr />
        <div className="myads-table">
          <div className="td1"><b>ITEMS</b></div>
          <div className="td1"><b>CATEGORY</b></div>
          <div className="td1"><b>AD STATUS</b></div>
          <div className="td1"><b>ACTION</b></div>
        </div>
        {adsData.map((ad, index) => (
          <div className="myads-table" key={index}>
            <div className="td1"><span>{ad.name}</span></div>
            <div className="td1">{ad.category}</div>
            <div className="td1">{ad.status}</div>
            <div className="td1">
              <div className="tr03">
                <div className="td03">
                  <a href={ad.editLink}><img src={editIcon} alt="Edit" /></a>
                </div>
                <div className="td03">
                  <a href={ad.viewLink}><img src={viewIcon} alt="View" /></a>
                </div>
                <div className="td03">
                  <a href={ad.deleteLink}><img src={deleteIcon} alt="Delete" /></a>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default MyAds;
