export function validator(data, config) {
    const errors = {};

    function validate(validateMetod, data, config) {
        let statusValidate;

        switch (validateMetod) {
            case "isRequired":
                statusValidate = data.trim() === "";
                break;
            case "isLink": {
                const linkRegExp = /^http(s)?:\/\/\S+\.\S+/g;
                statusValidate = !linkRegExp.test(data);
                break;
            }
            case "isCorrectYear": {
                statusValidate =
                    Number(data) < config.minValue ||
                    Number(data) >= config.mixValue;
                break;
            }
            case "min":
                statusValidate = data.length < config.value;
                break;
            default:
                break;
        }
        if (statusValidate) return config.message;
    }

    for (const fieldName in data) {
        for (const validateMetod in config[fieldName]) {
            const error = validate(
                validateMetod,
                data[fieldName],
                config[fieldName][validateMetod]
            );
            if (error && !errors[fieldName]) errors[fieldName] = error;
        }
    }

    return errors;
}
