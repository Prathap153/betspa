import React, { useState,useEffect } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { getAllBusinessUnits } from './apis/BusinessUnitApis/businessUnit.apis'; 
import './Sidebar.css';  

const Sidebar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dispatch = useDispatch();
    const { businessUnits } = useSelector((state) => state.businessUnit);

    useEffect(() => {
        dispatch(getAllBusinessUnits()); 
    }, [dispatch]);

    const toggleDropdown = () => {
        setIsDropdownOpen(prev => !prev);
    };

    return (
        <div className="sidebarStyle"> 
            <div>
                <button onClick={toggleDropdown} className="buttonStyle">  
                    BU's Dropdown
                </button>
                {isDropdownOpen && (
                    <ul className="dropdownStyle"> 
                        {businessUnits.map((bu) => (
                            <li key={bu.id}>{bu.name}</li>  
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Sidebar;
