import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { IUser } from "../interfaces/user";
import Link from "next/link";
import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
    return (
        <div className="bg-gray-300 flex flex-col h-screen p-32  ">
            <div className="flex h-full bg-gray-200 border-8 rounded-md justify-center">
                <div className="w-1/4 h-12 py-3 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm text-center mt-10">
                    <Link href="/user">Ver usuarios</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
