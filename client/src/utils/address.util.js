export const formatAddress = ({ city, street, country, streetNumber }) => {
    //
    const output = `${country}, ${city}, ${street}, ${streetNumber}`;

    return output;
};
