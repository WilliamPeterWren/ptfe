function formatDate(string) {
    const newDate = new Date(string);
    const day = newDate.getDay() < 10 ? '0' + newDate.getDay() : newDate.getDay();
    const month = newDate.getMonth() + 1 < 10 ? '0' + newDate.getMonth() : newDate.getMonth();
    const year = newDate.getFullYear();

    return `${day} - ${month} - ${year}`;
}

export default formatDate;


