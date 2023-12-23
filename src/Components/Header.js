import React, { useState } from 'react';

// import { useContext } from 'react';
// import { AppContext } from './Context/Context';
const Header = () => {

    const [selectedOption, setSelectedOption] = useState('');
    // const { provideValue } = useContext(AppContext);
    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
        // provideValue(event.target.value)
    };

    return (
        <div>
            <select
                className="form-select"
                aria-label="Default select example"
                value={selectedOption}
                onChange={handleSelectChange}
            >
                <option value="" disabled>Select an option</option>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
            </select>
           
        </div>
    );
};

export default Header;
