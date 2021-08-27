import React, { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { connect, useDispatch, useSelector } from "react-redux";
import { IUser } from "../../interfaces/user";
import { createUser, editUser, selectUser } from "../../redux/actions/user";
import { v4 as uuidv4 } from "uuid";
import { Input } from "../Input";
import { Loader } from "../Loader";
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
const Form = (props: any) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { userId } = props;
    const [formValues, setFormValues] = useState<IUser>({
        id: "",
        first_name: null,
        second_name: null,
        email: null,
        age: null,
        birthdate: null,
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    
    const user = useSelector((state: any) => state.user.user);

    const createdUser = (user : IUser) => dispatch(createUser(user));
    const selectedUser = (id: string) => dispatch(selectUser(id));
    const editedUser = (user: IUser) => dispatch(editUser(user));



    useEffect(() => {
        if (userId) {
            selectedUser(userId);
        } else {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFormValues(user);
            setLoading(false);
        }
    }, [user]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value,
        });
    };

    const onSubmit = () => {
        if (
            !formValues.first_name ||
            !formValues.first_name ||
            !formValues.second_name ||
            !formValues.email ||
            !formValues.age ||
            !formValues.birthdate
        ) {
            setErrorMessage("Todos los campos son obligatorios");
        } else {
            if (userId) {
                editedUser({ ...formValues });
                setErrorMessage(null);
                router.back();
            } else {
                const idUser = uuidv4();
                createdUser({ ...formValues, id: idUser });
                setErrorMessage(null);
                reset();
            }
        }
    };
    const handleOnClick = () => {
        if (userId) {
        setIsOpen(true)
        } else {
            onSubmit()
        }
    }

    function closeModal() {
        setIsOpen(false);
    }

    const reset = () => {
        setFormValues({
            id: "",
            first_name: "",
            second_name: "",
            email: "",
            age: "",
            birthdate: "",
        });
    };
    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {errorMessage && (
                        <div className="bg-red-200 border border-red-500 px-5 py-5 mb-5 rounded-md">
                            <p className="text-center text-red-500">
                                {errorMessage}
                            </p>
                        </div>
                    )}
                    <form
                        action=""
                        className="space-y-6"
                        ref={(form) => (form = form)}
                        id="form-user"
                    >
                        <Input
                            label="Nombre"
                            type="text"
                            name="first_name"
                            onChange={handleChange}
                            value={formValues.first_name}
                        />
                        <Input
                            label="Apellido"
                            type="text"
                            name="second_name"
                            onChange={handleChange}
                            value={formValues.second_name}
                        />
                        <Input
                            label="Email"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={formValues.email}
                        />
                        <Input
                            label="Edad"
                            type="number"
                            name="age"
                            onChange={handleChange}
                            value={formValues.age}
                        />
                        <Input
                            label="Fecha de nacimiento"
                            type="date"
                            name="birthdate"
                            onChange={handleChange}
                            value={formValues.birthdate}
                        />
                    </form>
                    <button
                        className="button w-full py-5 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm text-center mt-10"
                        onClick={() => handleOnClick()}
                    >
                        {userId ? "Editar" : "Agregar"}
                    </button>
                </>
            )}
            <Modal
                style={customStyles}
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
            >
                <div className="">
                    <h1 className="text-black font-bold text-4xl mb-5">
                        Editar usuario
                    </h1>
                    <p>Estas seguro que deseas editar el usuario?</p>
                    <div className=" w-full flex justify-around">
                        <div className="w-56 mr-5 ">
                            <button
                                className="button w-full py-5 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm text-center mt-10"
                                onClick={() => onSubmit()}
                            >
                                Editar
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


export default Form;
