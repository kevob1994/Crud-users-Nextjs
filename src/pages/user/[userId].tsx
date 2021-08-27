import type { NextPage } from "next";
import { useRouter } from "next/dist/client/router";
import Form from "../../components/Form";

const UserDetail: NextPage = () => {
    const router = useRouter();
    const { userId } = router.query;
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center">
            <div className="max-w-lg w-full mx-auto mt-4 bg-white p-8 border border-gray-300">
                <h1 className="text-black font-bold text-4xl mb-5">
                    Editar informacion del usuario
                </h1>
                <Form userId={userId} />
            </div>
        </div>
    );
};

export default UserDetail;
