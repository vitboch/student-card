import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { validator } from "../utils/validator";
import TextField from "../components/textField";
import { getYear } from "../utils/getYear";

const InputPage = () => {
    const history = useHistory();
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        yearBirth: "",
        portfolio: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const data = localStorage.getItem("studentCard");
        if (data) {
            setData(JSON.parse(data));
        }
    }, []);
    useEffect(() => {
        validate();
    }, [data]);

    const isDataInStorage = !!localStorage.getItem("studentCard");
    const validatorConfig = {
        firstName: {
            isRequired: { message: "Поле 'Имя' обязательно для заполнениня" }
        },
        lastName: {
            isRequired: {
                message: "Поле 'Фамилия' обязательно для заполнениня"
            }
        },
        yearBirth: {
            isRequired: {
                message: "Поле 'Год рождения' обязательно для заполнениня"
            },
            isCorrectYear: {
                message: "Поле 'Год рождения' не корректно",
                minValue: getYear().minus100,
                mixValue: getYear().today
            }
        },
        portfolio: {
            isRequired: {
                message: "Поле 'Портфолио' обязательно для заполнениня"
            },
            isLink: { message: "Поле 'Портфолио' должно быть ссылкой" }
        }
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    const handleChange = ({ target }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        localStorage.setItem("studentCard", JSON.stringify(data));
        alert("Обновлено!");
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <h3 className="mb-4">Создать</h3>
                        <TextField
                            label="Имя"
                            name="firstName"
                            value={data.firstName}
                            onChange={handleChange}
                            error={errors.firstName}
                        />
                        <TextField
                            label="Фамилия"
                            name="lastName"
                            value={data.lastName}
                            onChange={handleChange}
                            error={errors.lastName}
                        />
                        <TextField
                            label="Год рождения"
                            type="number"
                            name="yearBirth"
                            value={data.yearBirth}
                            onChange={handleChange}
                            error={errors.yearBirth}
                            min={getYear().minus100}
                            max={getYear().today - 1}
                        />
                        <TextField
                            label="Портфолио"
                            type="text"
                            name="portfolio"
                            value={data.portfolio}
                            onChange={handleChange}
                            error={errors.portfolio}
                        />
                        <div>
                            {isDataInStorage && (
                                <Link className="btn btn-secondary" to="/">
                                    Назад
                                </Link>
                            )}
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary m-2"
                                onClick={() => {
                                    history.goBack();
                                }}
                            >
                                {isDataInStorage ? "Обновить" : "Создать"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InputPage;
