const baseUrl = "http://localhost:3030/jsonstore/users";

export const getAll = async () => {
    try {
        const response = await fetch(baseUrl);
        const result = await response.json();

        const data = Object.values(result);

        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const create = async (data) => {
    try {
        const body = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            imageUrl: data.imageUrl,
            phoneNumber: data.phoneNumber,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            address: {
                country: data.country,
                city: data.city,
                street: data.street,
                streetNumber: data.streetNumber,
            },
        };

        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const update = async (data, userId) => {
    const current = await getOne(userId);

    const body = {
        _id: current._id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        imageUrl: data.imageUrl,
        phoneNumber: data.phoneNumber,
        createdAt: current.createdAt,
        updatedAt: new Date().toISOString(),
        address: {
            country: data.country,
            city: data.city,
            street: data.street,
            streetNumber: data.streetNumber,
        },
    };

    const response = await fetch(baseUrl + "/" + userId, {
        method: "PUT",
        headers: {
            "content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    const result = await response.json();

    return result;
};

export const deleteOne = async (userId) => {
    //
    const response = await fetch(baseUrl + "/" + userId, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const result = await response.json();

    return result;
};

export const getOne = async (userId) => {
    const response = await fetch(baseUrl + "/" + userId);
    const result = await response.json();

    return result;
};
