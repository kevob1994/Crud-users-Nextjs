import React, { ChangeEvent } from "react";

interface InputProps {
    label: string;
    type: string;
    name: string;
    value: any;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
    const { label, ...inputProps } = props;
    return (
        <div>
            <label htmlFor="" className="text-sm font-bold text-gray-600 block">
                {label}
            </label>
            <input
                {...inputProps}
                className="w-full p-2 border border-gray-300 rounded mt-1"
            />
        </div>
    );
};
