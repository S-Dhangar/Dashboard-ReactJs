import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMoon, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-regular-svg-icons';

import Card from './Card';

const Home = () => {
    const [selectedOption, setSelectedOption] = useState('status');
    const [popoverVisible, setPopoverVisible] = useState(false);
    const [displayHeading, setDisplayHeading] = useState([]);
    const [displayData, setDisplayData] = useState([]);
    const [status, setStatus] = useState([{ name: "Backlog" }, { name: "Todo" }, { name: "In progress" }, { name: "Done" }, { name: "Cancelled" }]);
    const [priority, setPriority] = useState([{ name: "No Priority" }, { name: "Low" }, { name: "Medium" }, { name: "High" }, { name: "Urgent" }]);
    const [bgColor, setBgColor] = useState(false);
    const [cardbg, setCardbg] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const headingStyle = {
        display: "flex",
        fontSize: "1rem",
        fontWeight: "600",
        color: cardbg ? "#ebebeb" : "#373737"
    }
    const headerDivStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "10vh",
        backgroundColor: bgColor ? "#161B22" : "#F4F5F8", height: "40px"
    }
    const headerStyle = {
        width: "97%",
        margin: "0 auto",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    }
    const lengthStyle = {
        fontSize: "1rem",
        fontWeight: "400",
        marginLeft: "10px",
        color: "gray"
    }

    const popoverStyle = {
        display: "flex",
        flexDirection: "column",
        padding: "1rem 1.5rem",
        gap: "10px",
        marginTop: "50px",
        marginLeft: "30px",
        borderRadius: "8px",
        backgroundColor: bgColor ? "#161B22" : "#F4F5F8",
        border: "1px solid #4a4a4a",
        boxShadow: "0 0 8px 0 #ffffff22",
        height: "100px",
        width: "600px",
    }
    const popoverBox1Style = {
        display: "flex",
        alignItems: "center",
        gap: "3rem",
        justifyContent: "space-between",
        fontSize: "0.9rem",
    }
    const selectStyle = {
        backgroundColor: bgColor ? "#161B22" : "#F4F5F8",
        textTransform: "capitalize",
        border: "none",
        outline: "none",
        cursor: "pointer",
        fontSize: "1rem",
        color: cardbg ? "#cbcbcb" : "#373737",
        width: "80px",
        borderRadius: "6px",
        border: "1px solid #4a4a4a"
    }
    const popoverButtonStyle = {

        borderRadius: "6px",
        padding: "0.1rem 0.2rem",
        border: "2px solid #4a4a4a",
        cursor: "pointer",
        color: cardbg ? "#cbcbcb" : "#373737",
        backgroundColor: bgColor ? "#161B22" : "#F4F5F8",
        boxShadow: " 0 0 8px 0 #ffffff22"
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handlebgColorChange = () => {
        setBgColor(!bgColor);
        setCardbg(!cardbg);
    }

    const fetchData = async () => {
        try {
            console.log("calling api");
            const response = await fetch('https://tfyincvdrafxe7ut2ziwuhe5cm0xvsdu.lambda-url.ap-south-1.on.aws/ticketAndUsers');
            const data = await response.json();
            setTickets(data.tickets || []); // Ensure that tickets is an array
            setUsers(data.users || []); // Ensure that users is an array
        } catch (err) {
            console.error("Error fetching data: ", err);
        }
    }

    useEffect(() => {
        if (tickets.length > 0 && users.length > 0) {
            handleSelectChange({ target: { value: selectedOption } });
        }
    }, [tickets]);

    const handleSelectChange = (event) => {
        const selectedValue = event.target.value;
        let userDisplayData = [];

        switch (selectedValue) {
            case "status":
                setDisplayHeading(status);
                userDisplayData = [];
                for (let i = 0; i < status.length; i++) {
                    const filteredTickets = tickets.filter(ticket => ticket.status === `${status[i].name}`);
                    userDisplayData.push(filteredTickets);
                }
                setDisplayData(userDisplayData);
                break;
            case "user":
                setDisplayHeading(users);
                userDisplayData = [];
                for (let i = 0; i < users.length; i++) {
                    const filteredTickets = tickets.filter(ticket => ticket.userId === `usr-${i + 1}`);
                    userDisplayData.push(filteredTickets);
                }
                setDisplayData(userDisplayData);
                break;
            case "priority":
                setDisplayHeading(priority);
                userDisplayData = [];
                for (let i = 0; i < priority.length; i++) {
                    const filteredTickets = tickets.filter(ticket => ticket.priority === i);
                    userDisplayData.push(filteredTickets);
                }
                setDisplayData(userDisplayData);
                break;
            default:
                setDisplayHeading([]); // Default to empty if none selected
                setDisplayData([]);
                break;
        }

        setSelectedOption(selectedValue);
    };

    const togglePopover = () => {
        setPopoverVisible(!popoverVisible);
    };
    const [selectedOrderOption, setSelectedOrderOption] = useState('');

    useEffect(() => {
        if (selectedOrderOption) {
            const sortedDisplayData = [...displayData];
            sortedDisplayData.forEach((array) =>
                array.sort((a, b) => {
                    if (selectedOrderOption === 'priority') {
                        return a[selectedOrderOption] - b[selectedOrderOption];
                    } else {
                        return a[selectedOrderOption].localeCompare(b[selectedOrderOption]);
                    }
                })
            );
            setDisplayData(sortedDisplayData);
        }
    }, [selectedOrderOption, displayData]);
    const handleSelectOrderChange = (event) => {
        setSelectedOrderOption(event.target.value);
    };

    return (
        <div>
            <div style={headerDivStyle}>

                <div style={headerStyle}>
                    <button style={popoverButtonStyle} type="button" onClick={togglePopover}>
                        Display
                    </button>

                    {popoverVisible && (
                        <div style={popoverStyle} className="popover">
                            <div style={popoverBox1Style}>
                                <div style={{color: cardbg ? "#cbcbcb" : "#373737" }}>Grouping</div>
                                <select
                                    style={selectStyle}
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={selectedOption}
                                    onChange={handleSelectChange}
                                >
                                    <option value="" disabled>
                                        Select an option
                                    </option>
                                    <option value="status">Status</option>
                                    <option value="user">User</option>
                                    <option value="priority">Priority</option>
                                </select>

                            </div>
                            <div style={popoverBox1Style}>
                                <div style={{color: cardbg ? "#cbcbcb" : "#373737" }}>Ordering</div>
                                <select
                                    style={selectStyle}
                                    className="form-select"
                                    aria-label="Default select example"
                                    value={selectedOrderOption}
                                    onChange={handleSelectOrderChange}
                                >
                                    <option value="" disabled>
                                        Select an option
                                    </option>
                                    <option value="title">Title</option>
                                    <option value="priority">Priority</option>
                                </select>

                            </div>
                        </div>
                    )}


                    {
                        bgColor ? <FontAwesomeIcon onClick={handlebgColorChange} color='white' icon={faSun} /> : <FontAwesomeIcon onClick={handlebgColorChange} icon={faMoon} />
                    }
                </div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: bgColor ? "#010409" : "#F4F5F8" }}>
                <div className='row justify-content-md-center'>
                    {displayHeading.length > 0 && displayHeading.map((heading, index) => (
                        <div key={index} className='col p-2'>
                            <div style={{ display: "flex", padding: "20px", justifyContent: "space-between", width: "" }}>
                                <div style={headingStyle}>{heading.name}
                                    {displayData[index] && <div style={lengthStyle}>{displayData[index].length}</div>}
                                </div>
                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                    <FontAwesomeIcon color='gray' icon={faPlus} />
                                    <FontAwesomeIcon color='gray' icon={faEllipsisH} />
                                </div>

                            </div>
                            {displayData[index] && displayData[index].map((data, i) => (
                                <Card key={i} cardData={data} color={cardbg} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
