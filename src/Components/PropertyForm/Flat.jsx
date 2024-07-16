import React, { useState } from 'react';
import { base_url } from '../../data';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
//  FarmLands
const Flat = () => {
    const navigate = useNavigate();
    const userEmail = Cookies.get('userEmail');
    const [formData, setFormData] = useState({
        select: 'agent',
        propertyType: 'Flat',
        agentEmail: userEmail,
        location: {
            state: '',
            districtCity: '',
            mandalLocation: '',
            address: '',
            pinCode: '',
            displayName: '',
            displayNumber: '',
        },
        projectTitleData: {
            projectTitle: '',
            projectSubtitle: ''
        },
        aboutProjectData: {
            aboutProject: '',
            projectArea: '',
            projectSize: '',
            size: '',
            avgSftPrice: '',
            launchDate: '',
            possessionStarts: '',
            lpNumber: '',
            reraNumber: '',
        },
        projectHighlight: [
            { projectArea: '', projectSize: '' }
        ],
        locationHighlight: [
            { projectArea: '', projectSize: '' }
        ],
        floorPlan: [
            {
                typeOf: '',
                flatSize: '',
                bathRoom: '',
                balcony: '',
                others: '',
                floorPlanImage: null,
            }
        ],
        googleMap: '',
        videoLinks: ['', ''],
        keywords: [],
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'file') {
            setFormData(prevState => ({
                ...prevState,
                floorPlan: prevState.floorPlan.map((plan, index) =>
                    index === 0 ? { ...plan, [name]: files[0] } : plan
                )
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleNestedChange = (e, section, field) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: value
            }
        }));
    };

    const handleArrayChange = (index, section, field, value) => {
        const updatedArray = formData[section].map((item, i) =>
            i === index ? { ...item, [field]: value } : item
        );
        setFormData({
            ...formData,
            [section]: updatedArray
        });
    };

    const handleVideoLinksChange = (index, value) => {
        const updatedVideoLinks = formData.videoLinks.map((link, i) =>
            i === index ? value : link
        );
        setFormData({
            ...formData,
            videoLinks: updatedVideoLinks
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = { ...formData };
        formDataToSend.floorPlan = formDataToSend.floorPlan.map(plan => {
            const { floorPlanImage, ...rest } = plan;
            return rest;
        });

        try {
            const response = await fetch(`${base_url}/property`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formDataToSend)
            });

            if (!response.ok) {
                throw new Error('Property Not Added');
            }
                console.log("formData", formDataToSend)
            alert('Property Added');
            // navigate('/'); // Adjust the path as needed
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="postproperty-right">
            <form onSubmit={handleSubmit}>
                <div className="box">
                    <div className="tr01">
                        <div className="realplaces-subtitle-01"> Post - Flat Details </div>
                    </div>
                    <hr />
                    <div className="tr01" style={{ verticalAlign: 'middle' }}>
                        <div className="td01">
                            <div className="radio-button01">
                                <input
                                    type="radio"
                                    name="select"
                                    id="option-1"
                                    value="agent"
                                    checked={formData.select === 'agent'}
                                    onChange={handleChange}
                                />
                                <input
                                    type="radio"
                                    name="select"
                                    id="option-2"
                                    value="owner"
                                    checked={formData.select === 'owner'}
                                    onChange={handleChange}
                                />
                                <label htmlFor="option-1" className="option option-1">
                                    <div className="dot"></div>
                                    <span> Agent </span>
                                </label>
                                <label htmlFor="option-2" className="option option-2">
                                    <div className="dot"></div>
                                    <span> Owner / Builder</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Location Details */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> Location </div>
                    <div className="tr03">
                        <div className="td03">
                            <label> State* </label>
                            <input
                                type="text"
                                name="state"
                                placeholder="Ex :- Telangana"
                                value={formData.location.state}
                                onChange={(e) => handleNestedChange(e, 'location', 'state')}
                            />
                        </div>
                        <div className="td03">
                            <label>District / City* </label>
                            <input
                                type="text"
                                name="districtCity"
                                placeholder="Ex :- Hyderabad"
                                value={formData.location.districtCity}
                                onChange={(e) => handleNestedChange(e, 'location', 'districtCity')}
                            />
                        </div>
                        <div className="td03">
                            <label> Mandal / Location* </label>
                            <input
                                type="text"
                                name="mandalLocation"
                                placeholder="Ex :- LB Nagar"
                                value={formData.location.mandalLocation}
                                onChange={(e) => handleNestedChange(e, 'location', 'mandalLocation')}
                            />
                        </div>
                    </div>
                    <div className="tr02">
                        <div className="td02">
                            <label>Address </label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Ex :- Netaji Street"
                                value={formData.location.address}
                                onChange={(e) => handleNestedChange(e, 'location', 'address')}
                            />
                        </div>
                        <div className="td02">
                            <label> Pin Code* </label>
                            <input
                                type="text"
                                name="pinCode"
                                placeholder="Ex :- 500 005"
                                value={formData.location.pinCode}
                                onChange={(e) => handleNestedChange(e, 'location', 'pinCode')}
                            />
                        </div>
                    </div>
                    <div className="tr02">
                        <div className="td02">
                            <label> Display Name* </label>
                            <input
                                type="text"
                                name="displayName"
                                placeholder="Ex :- Raghavaiah"
                                value={formData.location.displayName}
                                onChange={(e) => handleNestedChange(e, 'location', 'displayName')}
                            />
                        </div>
                        <div className="td02">
                            <label> Display Number* </label>
                            <input
                                type="text"
                                name="displayNumber"
                                placeholder="Ex :- 0000000000"
                                value={formData.location.displayNumber}
                                onChange={(e) => handleNestedChange(e, 'location', 'displayNumber')}
                            />
                        </div>
                    </div>
                </div>

                {/* Project Titles */}
                <div className="box">
                    <div className="tr01">
                        <div className="realplaces-subtitle-01"> Project Titles </div>
                    </div>
                    <div className="tr02">
                        <div className="td02">
                            <label>Project Title* </label>
                            <input
                                type="text"
                                name="projectTitle"
                                placeholder="Ex :- Janani Apartments"
                                value={formData.projectTitleData.projectTitle}
                                onChange={(e) => handleNestedChange(e, 'projectTitleData', 'projectTitle')}
                            />
                        </div>
                        <div className="td02">
                            <label>Project Sub Title* </label>
                            <input
                                type="text"
                                name="projectSubtitle"
                                placeholder="Ex :- Flats Near Laxmi Nagar"
                                value={formData.projectTitleData.projectSubtitle}
                                onChange={(e) => handleNestedChange(e, 'projectTitleData', 'projectSubtitle')}
                            />
                        </div>
                    </div>
                </div>

                {/* About Project */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> About Project</div>
                    <textarea
                        name="aboutProject"
                        placeholder="About Project Message Max 500 Letters Only"
                        value={formData.aboutProjectData.aboutProject}
                        onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'aboutProject')}
                    />
                    <div className="tr03">
                        <div className="td03">
                            <label> Project Area (in Acers) </label>
                            <input
                                type="text"
                                name="projectArea"
                                value={formData.aboutProjectData.projectArea}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'projectArea')}
                            />
                        </div>
                        <div className="td03">
                            <label> Project Size </label>
                            <input
                                type="text"
                                name="projectSize"
                                value={formData.aboutProjectData.projectSize}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'projectSize')}
                            />
                        </div>
                        <div className="td03">
                            <label>Size </label>
                            <input
                                type="text"
                                name="size"
                                placeholder="Ex :- 100 - 1500 SFT"
                                value={formData.aboutProjectData.size}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'size')}
                            />
                        </div>
                    </div>
                    <div className="tr02">
                        <div className="td02">
                            <label> Avg SFT Price (Rupees) </label>
                            <input
                                type="text"
                                name="avgSftPrice"
                                placeholder="Ex :- 4000 /-"
                                value={formData.aboutProjectData.avgSftPrice}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'avgSftPrice')}
                            />
                        </div>
                        <div className="td02">
                            <label> Launch Date </label>
                            <input
                                type="date"
                                name="launchDate"
                                value={formData.aboutProjectData.launchDate}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'launchDate')}
                            />
                        </div>
                        <div className="td02">
                            <label> Possession Starts </label>
                            <input
                                type="date"
                                name="possessionStarts"
                                value={formData.aboutProjectData.possessionStarts}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'possessionStarts')}
                            />
                        </div>
                    </div>
                    <div className="tr02">
                        <div className="td02">
                            <label>LP Number </label>
                            <input
                                type="text"
                                name="lpNumber"
                                placeholder="Ex :- LP Number"
                                value={formData.aboutProjectData.lpNumber}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'lpNumber')}
                            />
                        </div>
                        <div className="td02">
                            <label> RERA Number </label>
                            <input
                                type="text"
                                name="reraNumber"
                                placeholder="Ex :- RERA Number"
                                value={formData.aboutProjectData.reraNumber}
                                onChange={(e) => handleNestedChange(e, 'aboutProjectData', 'reraNumber')}
                            />
                        </div>
                    </div>
                </div>

                {/* Project Highlights */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> Project Highlights</div>
                    {formData.projectHighlight.map((highlight, index) => (
                        <div className="tr02" key={index}>
                            <div className="td02">
                                <label>Project Area</label>
                                <input
                                    type="text"
                                    name="projectArea"
                                    value={highlight.projectArea}
                                    onChange={(e) => handleArrayChange(index, 'projectHighlight', 'projectArea', e.target.value)}
                                />
                            </div>
                            <div className="td02">
                                <label>Project Size</label>
                                <input
                                    type="text"
                                    name="projectSize"
                                    value={highlight.projectSize}
                                    onChange={(e) => handleArrayChange(index, 'projectHighlight', 'projectSize', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Location Highlights */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> Location Highlights</div>
                    {formData.locationHighlight.map((highlight, index) => (
                        <div className="tr02" key={index}>
                            <div className="td02">
                                <label>Project Area</label>
                                <input
                                    type="text"
                                    name="projectArea"
                                    value={highlight.projectArea}
                                    onChange={(e) => handleArrayChange(index, 'locationHighlight', 'projectArea', e.target.value)}
                                />
                            </div>
                            <div className="td02">
                                <label>Project Size</label>
                                <input
                                    type="text"
                                    name="projectSize"
                                    value={highlight.projectSize}
                                    onChange={(e) => handleArrayChange(index, 'locationHighlight', 'projectSize', e.target.value)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Floor Plans */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> Floor Plans</div>
                    {formData.floorPlan.map((plan, index) => (
                        <div key={index}>
                            <div className="tr02">
                                <div className="td02">
                                    <label>Type Of</label>
                                    <input
                                        type="text"
                                        name="typeOf"
                                        value={plan.typeOf}
                                        onChange={(e) => handleArrayChange(index, 'floorPlan', 'typeOf', e.target.value)}
                                    />
                                </div>
                                <div className="td02">
                                    <label>Flat Size</label>
                                    <input
                                        type="text"
                                        name="flatSize"
                                        value={plan.flatSize}
                                        onChange={(e) => handleArrayChange(index, 'floorPlan', 'flatSize', e.target.value)}
                                    />
                                </div>
                                <div className="td02">
                                    <label>Bath Room</label>
                                    <input
                                        type="text"
                                        name="bathRoom"
                                        value={plan.bathRoom}
                                        onChange={(e) => handleArrayChange(index, 'floorPlan', 'bathRoom', e.target.value)}
                                    />
                                </div>
                                <div className="td02">
                                    <label>Balcony</label>
                                    <input
                                        type="text"
                                        name="balcony"
                                        value={plan.balcony}
                                        onChange={(e) => handleArrayChange(index, 'floorPlan', 'balcony', e.target.value)}
                                    />
                                </div>
                                <div className="td02">
                                    <label>Others</label>
                                    <input
                                        type="text"
                                        name="others"
                                        value={plan.others}
                                        onChange={(e) => handleArrayChange(index, 'floorPlan', 'others', e.target.value)}
                                    />
                                </div>
                                <div className="td02">
                                    <label>Floor Plan Image</label>
                                    <input
                                        type="file"
                                        name="floorPlanImage"
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Google Map */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> Google Map Link</div>
                    <input
                        type="text"
                        name="googleMap"
                        placeholder="Google Map Link"
                        value={formData.googleMap}
                        onChange={handleChange}
                    />
                </div>

                {/* Video Links */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> Video Links</div>
                    {formData.videoLinks.map((link, index) => (
                        <input
                            key={index}
                            type="text"
                            name={`videoLink${index}`}
                            placeholder={`Video Link ${index + 1}`}
                            value={link}
                            onChange={(e) => handleVideoLinksChange(index, e.target.value)}
                        />
                    ))}
                </div>

                {/* Keywords */}
                <div className="box">
                    <div className="realplaces-subtitle-01"> Keywords</div>
                    <input
                        type="text"
                        name="keywords"
                        placeholder="Keywords"
                        value={formData.keywords.join(', ')}
                        onChange={(e) => setFormData({ ...formData, keywords: e.target.value.split(', ') })}
                    />
                </div>

                <div className="box">
                    <button type="submit" className="button-01">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default Flat;
