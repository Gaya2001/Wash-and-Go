import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeNavbar from '../../../components/NavBar/HomeNavbar_LoggedIn';
import Footer from '../../../components/Footer/Footer';

const Packages = () => {
    const [packages, setPackages] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true); // Add a loading state
    const [error, setError] = useState(null); // Add an error state

    useEffect(() => {
        fetch('http://localhost:5000/Packages')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch packages: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log("Fetched Data:", data); // Debugging message to see the structure of the response
                setPackages(data.Packages || []); // Ensure the packages are always an array
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <HomeNavbar />
            <div>
                <h1 className='w-full text-center mt-10 font-bold text-4xl'>Service Packages</h1>
            </div>
            <div className='mx-20'>
                <h1 className='w-full text-justify mt-10 text-lg'>
                    Our service packages cater to various vehicle maintenance needs, from basic routine maintenance to 
                    comprehensive inspections and diagnostics. Each package includes essential services to keep your 
                    vehicle in top condition, enhance its performance, and ensure your safety on the road. Whether you 
                    need a simple oil change and tire rotation or a detailed inspection and engine diagnostics, our 
                    packages offer the flexibility and quality you need for peace of mind.
                </h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mx-16 p-16 h-fit my-12 rounded-2xl bg-blue-100">
                {packages.length > 0 ? (
                    packages
                        .filter(pkg => pkg.Statues === "Active") // Filter packages by status
                        .map((pkg) => (
                            <Link to={`/packages/${pkg._id}`} key={pkg._id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl">
                                <div className="p-6">
                                    {pkg.images && pkg.images.length > 0 && (
                                        <img src={`http://localhost:5000${pkg.images[0].url}`} alt={pkg.PackageName} className="w-full h-48 object-cover mb-4" />
                                    )}
                                    <h3 className="text-2xl font-bold mb-2 text-gray-800">{pkg.PackageName}</h3>
                                    <p className="text-gray-600 mb-4">{pkg.Description1}</p>
                                    <ul className="list-disc list-inside">
                                        {Array.isArray(pkg.services) && pkg.services.length > 0 ? (
                                            pkg.services.map((service, idx) => (
                                                <li key={idx} className="bg-gray-100 p-2 rounded mb-2">{service.name}</li>
                                            ))
                                        ) : (
                                            <li className="bg-gray-100 p-2 rounded mb-2">No services listed</li>
                                        )}
                                    </ul>
                                </div>
                            </Link>
                        ))
                ) : (
                    <p>No packages available</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Packages;
