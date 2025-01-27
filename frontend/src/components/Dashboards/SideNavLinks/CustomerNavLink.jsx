import React from "react";
import { NavLink } from "react-router-dom";

export default function CustomerNavLink({ linkName, url }) {
    return (
        <NavLink
            to={url}
            className={({ isActive }) =>
                isActive ? "w-full text-2xl py-4 border-y-4 border-double border-blue-500" : "w-full text-2xl py-4"
            }
        >
            {linkName}
        </NavLink>
    );
}
