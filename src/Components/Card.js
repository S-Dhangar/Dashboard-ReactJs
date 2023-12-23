import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

const Card = ({ cardData, color }) => {
    const cardDarkStyle = {
        textAlign: "start",
        backgroundColor: "#161B22",
        marginBottom: "20px",
        borderRadius: "6px",
        border: "1px solid #4a4a4a",
        boxShadow: "0px 0px 8px 0px #ffffff22",
    }
    const cardStyle = {
        textAlign: "start",
        marginBottom: "20px",
        borderRadius: "6px",
        boxShadow: "0px 0px 8px 0px #0000001a"
    }
    const idStyle = {
        fontSize: "1rem",
        color: "#8D8D8D"
    }
    const titleStyle = {
        fontSize: "1rem",
        color: color ? "#ebebeb" : "#373737",
        fontWeight: "500",
        lineHeight: "102%"
    }
    const tagStyle = {
        display: "flex",
        gap: "5px",
        alignItems: "center",
        border: !color ? "1px solid #e6e7eb" : "1px solid rgb(58 58 59)",
        borderRadius: "3px",
        padding: " 1px 5px",
        marginBottom:"0px",
        color: "#8D8D8D",
        fontWeight: "420",
        fontSize:"0.85rem"
    }
    return (
        <div class="card" style={color ? cardDarkStyle : cardStyle}>
            <div class="card-body">
                <p class="card-title" style={idStyle}> {cardData.id}</p>
                <p class="card-text" style={titleStyle}>  {cardData.title}</p>
                <p style={tagStyle}><FontAwesomeIcon color='gray' icon={faCircle} />Feature Request</p>
            </div>
        </div>


    )
}

export default Card