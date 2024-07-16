import React, { useEffect, useState } from 'react'
import avatar from '../../Assets/Images/img_avatar.png'
import deleteIcon from '../../Assets/Images/icon-delet.png'
import Footer from '../../Components/Footer/Footer';
import Cookies from 'js-cookie';
import { base_url } from '../../data';
const Enquiry = () => {
const [enquiry, setEnquiry] = useState([])
const userEmail = Cookies.get('userEmail');

  const getEnquiry = async ()=>{
    try {
      const response = await fetch(`${base_url}/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ agentEmail: userEmail }) 
      });
      
      if (!response.ok) {
        throw new Error('Property not found');
      }
      const data = await response.json();
      setEnquiry(data);
    } catch (error) {
      console.log(error.message);
    }
  }

const deleteEnquiry = async(id)=>{
  try {
    const response = await fetch(`${base_url}/enquiry/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enquiryId: id }) 
    });
    
    if (!response.ok) {
      throw new Error('Property not found');
    }
    const data = await response.json();
    getEnquiry()
    console.log( data);
  } catch (error) {
    console.log(error.message);
  }
}






useEffect(()=>{
  getEnquiry()
},[])

    return (
        <div>
           <div className="postproperty-right" >
                <div className="box">
                  <div className="customer-enuiry">
                    <div className="customer-enuiry-in">
                      <div className="sub-title-02">Customer Enquiry Details</div>
                   { 
                    enquiry?.map((e,i)=>{
                      return <table key={i}>
                      <tbody>
                        <tr className="tr">
                          <td className="td01">Property ID</td>
                          <td className="td02">:</td>
                          <td className="td01">{e.propertyId}</td>
                        </tr>
                        <tr className="tr">
                          <td className="td01">Date</td>
                          <td className="td02">:</td>
                          <td className="td01">{e.date}</td>
                        </tr>
                        <tr className="tr">
                          <td className="td01">Name</td>
                          <td className="td02">:</td>
                          <td className="td01">{e.name}</td>
                        </tr>
                        <tr>
                          <td>Phone Number</td>
                          <td>:</td>
                          <td>{e.phone}</td>
                        </tr>
                        <tr>
                          <td>Required</td>
                          <td>:</td>
                          <td>{e.required}</td>
                        </tr>
                        <tr className="tr">
                          <td className="td01">
                            Note
                            <br />
                            <input type="text" placeholder="Agent Column | Enter Customer Feedback" />
                          </td>
                          <td className="td02">:</td>
                          <td className="td01">{e.note}</td>
                        </tr>
                        <tr className="tr">
                          <td className="td01"></td>
                          <td className="td02"></td>
                          <td className="td01">
                            <img onClick={()=>deleteEnquiry(e.enquiryId)} src={deleteIcon} alt="Delete" />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  
                    })
                   }
                    </div>
                  </div>
                </div>
              </div>
        </div>
      );
}

export default Enquiry