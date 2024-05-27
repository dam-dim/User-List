import Pagination from "./pagination/Pagination";
import Search from "./search/Search";
import Table from "./table/Table";

export default function Section({
    showCreateForm,
    showEditForm,
    showDetailsForm,
    showDeleteForm,
    users,
    setUsers,
}) {
    return (
        <section className="card users-container">
            <Search />

            <Table
                users={users}
                setUsers={setUsers}
                showEditForm={showEditForm}
                showDetailsForm={showDetailsForm}
                showDeleteForm={showDeleteForm}
            />

            <button className="btn-add btn" onClick={showCreateForm}>
                Add new user
            </button>

            <Pagination />
        </section>
    );
}
