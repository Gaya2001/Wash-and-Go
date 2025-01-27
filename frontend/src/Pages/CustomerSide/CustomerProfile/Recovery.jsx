import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CustomerHeader from '../../../components/CustomerDashboard/CustomerHeader';
import CustomerSideBar from '../../../components/CustomerDashboard/CustomerSideBar';

function Recovery() {


    return (
        <div className="flex h-screen bg-gray-100">
            <CustomerSideBar />
            <div className="flex flex-col flex-grow">
                <CustomerHeader />
                <div className="p-8 flex-grow">


                </div>
            </div>
        </div>
    );
}

export default Recovery;
