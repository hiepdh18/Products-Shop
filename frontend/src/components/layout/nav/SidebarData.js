import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as MdIcons from 'react-icons/md';

export const SidebarData = [
    {
        title: 'Products',
        path: '/product',
        icon: <FaIcons.FaCartPlus />,
        cName: "nav-link"
    },
    {
        title: 'Manage',
        path: '/manage',
        icon: <MdIcons.MdAssignment />,
        cName: "nav-link"
    }
];