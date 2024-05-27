import { useState } from "react";
import Section from "./section/Section";
import Create from "./Create";
import Edit from "./Edit";
import Details from "./Details";
import * as userService from "../../services/userService";
import Delete from "./Delete";

export default function Main() {
    const [showCreate, setShowCreate] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);

    const showCreateForm = () => {
        setShowCreate(true);
    };

    const hideCreateForm = () => {
        setShowCreate(false);
    };

    const userCreateHandler = async (e) => {
        e.preventDefault();

        const data = Object.fromEntries(new FormData(e.currentTarget));

        try {
            const result = await userService.create(data);
            setUsers((state) => [...state, result]);
        } catch (error) {
            console.log(error);
        }

        setShowCreate(false);
    };

    const showEditForm = (userId) => {
        setSelectedUser(userId);
        setShowEdit(true);
    };

    const hideEditForm = () => {
        setShowEdit(false);
    };

    const editHandler = async (e) => {
        e.preventDefault();

        try {
            const data = Object.fromEntries(
                new FormData(e.currentTarget.parentNode.parentNode)
            );

            const result = await userService.update(data, selectedUser);

            setUsers((state) =>
                state.map((user) => (user._id === result._id ? result : user))
            );

            setShowEdit(false);
        } catch (error) {
            console.log(error);
        }
    };

    const showDetailsForm = (userId) => {
        setSelectedUser(userId);
        setShowDetails(true);
    };

    const hideDetailsForm = () => {
        setShowDetails(false);
    };

    const showDeleteForm = (userId) => {
        setSelectedUser(userId);
        setShowDelete(true);
    };

    const hideDeleteForm = () => {
        setShowDelete(false);
    };

    return (
        <main className="main">
            <Section
                showCreateForm={showCreateForm}
                showEditForm={showEditForm}
                showDetailsForm={showDetailsForm}
                showDeleteForm={showDeleteForm}
                users={users}
                setUsers={setUsers}
            />
            {showCreate && (
                <Create
                    userCreateHandler={userCreateHandler}
                    hideCreateForm={hideCreateForm}
                />
            )}
            {showEdit && (
                <Edit
                    userId={selectedUser}
                    hideEditForm={hideEditForm}
                    editHandler={editHandler}
                />
            )}
            {showDetails && (
                <Details
                    userId={selectedUser}
                    hideDetailsForm={hideDetailsForm}
                />
            )}
            {showDelete && (
                <Delete
                    userId={selectedUser}
                    hideDeleteForm={hideDeleteForm}
                    users={users}
                    setUsers={setUsers}
                />
            )}
        </main>
    );
}
