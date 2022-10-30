import React from "react";
import PropTypes from "prop-types";
import { getYear } from "../utils/getYear";

const UserCard = ({ firstName, lastName, yearBirth, portfolio }) => {
    const age = getYear(yearBirth).todayAge;
    const lastOne = Number(age.toString().slice(-1));
    let text = "";

    if (lastOne === 1) {
        text = "год";
    } else if ([2, 3, 4].indexOf(lastOne) >= 0) {
        text = "года";
    } else text = "лет";

    return (
        <>
            <p>
                <b>Имя: </b>
                {firstName}
            </p>
            <p>
                <b>Фамилия: </b>
                {lastName}
            </p>
            <p>
                <b>Год рождения: </b>
                {yearBirth} ({age} {text})
            </p>
            <p>
                <b>Портфолио: </b>
                <a href={portfolio} target="_blank" rel="noreferrer">
                    {portfolio}
                </a>
            </p>
        </>
    );
};
UserCard.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    yearBirth: PropTypes.string,
    portfolio: PropTypes.string
};

export default UserCard;
