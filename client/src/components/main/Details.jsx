import { useEffect, useState } from "react";
import * as userService from "../../services/userService";
import { dateFormat } from "../../utils/date.util";
import { formatAddress } from "../../utils/address.util";

export default function Details({ hideDetailsForm, userId }) {
    const [user, setUser] = useState({ address: {} });

    useEffect(() => {
        // fetch the user and set it to the state
        userService
            .getOne(userId)
            .then((data) => {
                // console.log(data);
                return setUser(data);
            })
            .catch((err) => console.log(err));
    }, [userId]);

    return (
        <div className="overlay">
            <div className="backdrop" onClick={hideDetailsForm}></div>
            <div className="modal">
                <div className="detail-container">
                    <header className="headers">
                        <h2>User Detail</h2>
                        <button className="btn close" onClick={hideDetailsForm}>
                            <svg
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fas"
                                data-icon="xmark"
                                className="svg-inline--fa fa-xmark"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 320 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"
                                ></path>
                            </svg>
                        </button>
                    </header>
                    <div className="content">
                        <div className="image-container">
                            <img
                                src={user?.imageUrl}
                                alt={user?.firstName}
                                className="image"
                            />
                        </div>
                        <div className="user-details">
                            <p>
                                User Id: <strong>{user?._id}</strong>
                            </p>
                            <p>
                                Full Name:
                                <strong>
                                    {user?.firstName} {user?.lastName}
                                </strong>
                            </p>
                            <p>
                                Email: <strong>{user?.email}</strong>
                            </p>
                            <p>
                                Phone Number:
                                <strong> {user?.phoneNumber}</strong>
                            </p>
                            <p>
                                Address:
                                <strong>{formatAddress(user?.address)}</strong>
                            </p>

                            <p>
                                Created on:{" "}
                                <strong>{dateFormat(user?.createdAt)}</strong>{" "}
                                {/*Wednesday, June 28, 2022*/}
                            </p>
                            <p>
                                Modified on:{" "}
                                <strong>{dateFormat(user?.updatedAt)}</strong>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
