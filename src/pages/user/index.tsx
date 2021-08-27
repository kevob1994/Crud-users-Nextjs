import type { NextPage } from "next";
import Form from "../../components/Form";
import Table from "../../components/Table";

const User: NextPage = (props: any) => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="grid grid-cols-3 gap-4 p-20">
                <div className="max-w w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                    <h1 className="text-black font-bold text-4xl mb-5">
                        Agregar usuario
                    </h1>
                    <Form />
                </div>
                <div className="max-w w-full mx-auto mt-4 bg-white p-8 border border-gray-300 col-span-2">
                    <h1 className="text-black font-bold text-4xl mb-5">
                        Usuarios
                    </h1>
                    <Table />
                </div>
            </div>
        </div>
    );
};
export default User;
