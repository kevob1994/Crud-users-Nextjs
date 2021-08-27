import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { loadUsers, deleteUser } from "../../redux/actions/user";
import { connect, useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces/user";
import Modal from "react-modal";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

const Table = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const [modalIsOpen, setIsOpen] = useState(false);
    const [idSelect, setIdSelect] = useState("");

    const users = useSelector((state: any) => state.user.users);

    const getListUsers = () => dispatch(loadUsers());
    const deletedUsers = (id: string) => dispatch(deleteUser(id));

    useEffect(() => {
        getListUsers();
    }, []);

    const handleDelete = (id: any) => {
        setIdSelect(id);
        setIsOpen(true);
    };
    const infoUser = (id: any) => {
        router.push(`user/${id}`);
    };
    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Nombre
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            Edad
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                                        >
                                            Fecha de nacimiento
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3"
                                        >
                                            <span className="sr-only">
                                                Edit
                                            </span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="relative px-6 py-3"
                                        >
                                            <span className="sr-only">
                                                Delete
                                            </span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users &&
                                        users.map((user: IUser) => (
                                            <>
                                                <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {`${user.first_name} ${user.second_name}`}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {user.email}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">
                                                            {user.age}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {user.birthdate}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a
                                                            className="text-blue-700 hover:text-indigo-900"
                                                            onClick={() =>
                                                                infoUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >
                                                            Edit
                                                        </a>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <a
                                                            onClick={() =>
                                                                handleDelete(
                                                                    user.id
                                                                )
                                                            }
                                                            href="#"
                                                            className="text-red-600 hover:text-indigo-900"
                                                        >
                                                            Delete
                                                        </a>
                                                    </td>
                                                </tr>
                                            </>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div className="">
                    <h1 className="text-black font-bold text-4xl mb-5">
                        Eliminar usuario
                    </h1>
                    <p>Estas seguro que deseas eliminar el usuario?</p>
                    <div className=" w-full flex justify-around">
                        <div className="w-56 mr-5 ">
                            <button
                                className="button w-full py-5 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm text-center mt-10"
                                onClick={() => {
                                    closeModal();
                                    deletedUsers(idSelect);
                                }}
                            >
                                Eliminar
                            </button>
                        </div>

                        <div className="w-56">
                            <button
                                className="button w-full py-5 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm text-center mt-10"
                                onClick={() => closeModal()}
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};
export default Table;
