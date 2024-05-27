export const dateFormat = (date) => {
    // June 28, 2022
    const parsedDate = new Date(Date.parse(date));

    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = parsedDate.toLocaleDateString("en-US", options);

    return formattedDate;
};
