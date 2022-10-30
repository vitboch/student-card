export const getYear = (year) => {
    return {
        today: new Date(Date.now()).getFullYear(),
        todayAge: new Date(Date.now()).getFullYear() - year,
        minus100: new Date(Date.now()).getFullYear() - 100
    };
};
