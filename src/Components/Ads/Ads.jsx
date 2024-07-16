import React from 'react'
import Search from '../../Pages/Search/Search'
import PropertySearch from '../PropertySearch/PropertySearch'
import SearchAllPages from '../SearchAllPages/SearchAllPages'

const Ads = () => {
  return (
    <div style={{width : "100%", padding:"5vh" }}>
        <div className="ad-space" style={{background:"#243534", height:"200px"}}>
            <h3>ADS</h3>
        </div>
        <SearchAllPages/>
    </div>
  )
}

export default Ads