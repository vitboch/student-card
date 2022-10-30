import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserCard from "../components/userCard";

const MainPage = () => {
    const [data, setData] = useState();

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem("studentCard")));
    }, []);

    return (
        <>
            <div className="container mt-4">
                <h1 className="card-title">Карточка студента</h1>
                {data ? (
                    <UserCard {...data} />
                ) : (
                    <p className="card-text">нет данных</p>
                )}
                <Link to="/edit" className="btn btn-primary">
                    {data ? "Редактировать" : "Добавить"}
                </Link>
            </div>
        </>
    );
};

export default MainPage;
