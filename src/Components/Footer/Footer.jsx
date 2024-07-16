import React from 'react';
import facebook_icon from '../../Assets/Images/icon-facebook.png'
import linkedin_icon from '../../Assets/Images/icon-linkedin.png'
import telegram_icon from '../../Assets/Images/icon-telegram.png'
import youtube_icon from '../../Assets/Images/icon-youtube.png'
const Footer = () => {
    return (
        <div className="realplaces-footer">
            <div className="realplaces-footer-in">
                <div className="footer-tr02">
                    <div className="footer-left">
                        <h4>Real Places</h4>
                        <p>Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum is dummy text of the printing.</p>
                        <h4>Social Media</h4>
                        <ul className="socialmedia-links">
                            <li><a href="#"><img src={facebook_icon} alt="facebook" title="facebook" /> </a></li>
                            <li><a href="#"><img src={linkedin_icon} alt="linkedin" title="linkedin" /></a></li>
                            <li><a href="#"><img src={telegram_icon} alt="telegram" title="telegram" /></a></li>
                            <li><a href="#"><img src={youtube_icon} alt="youtube" title="youtube" /></a></li>
                        </ul>
                    </div>
                    <div className="footer-right">
                        <div className="footerright-tr02">
                            <div className="td02">
                                <h4>Quick Links</h4>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="sitemap.xml">Sitemap</a></li>
                                </ul>
                            </div>
                            <div className="td02">
                                <h4>Real Places</h4>
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                    <li><a href="#">Terms & Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                    <li><a href="sitemap.xml">Sitemap</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="realplaces-copyrights">Copy Rights Reserved @ Real places</div>
        </div>
    );
};

export default Footer;
