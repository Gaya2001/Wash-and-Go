import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import HomeNavbar from '../../../components/NavBar/HomeNavbar_LoggedIn';
import Footer from '../../../components/Footer/Footer';

function PackageDetails() {
    const { id } = useParams();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [services, setServices] = useState([]); // State for holding the list of services

    useEffect(() => {
        // Fetch the package details
        fetch(`http://localhost:5000/Packages/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch package: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setPkg(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        // Function to fetch each service by its ID
        const fetchServiceById = async (serviceId) => {
            try {
                const response = await fetch(`http://localhost:5000/services/${serviceId}`);
                if (!response.ok) {
                    throw new Error(`Failed to fetch service: ${response.status}`);
                }
                const serviceData = await response.json();
                return serviceData.name; // Assuming serviceData has a 'name' field
            } catch (error) {
                setError(error.message);
                return null;
            }
        };

        // Fetch all services associated with the package
        const fetchAllServices = async () => {
            if (pkg && pkg.services && pkg.services.length > 0) {
                const serviceNamesPromises = pkg.services.map((serviceId) => fetchServiceById(serviceId));
                const serviceNames = await Promise.all(serviceNamesPromises);
                setServices(serviceNames.filter((name) => name !== null)); // Filter out any failed requests
            }
        };

        fetchAllServices();
    }, [pkg]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pkg) {
        return <div>Package not found</div>;
    }

    return (
        <div className="bg-gray-100">
            <HomeNavbar />
            <div className="container mx-auto py-16 px-4">
                {/* Hero Section */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
                    <div className="relative">
                        {pkg.images && pkg.images.length > 0 ? (
                            <img src={`http://localhost:5000${pkg.images[0].url}`} alt={pkg.PackageName} className="w-full h-96 object-cover" />
                        ) : (
                            <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                                <span className="text-gray-500">No image available</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <h1 className="text-5xl font-bold text-blue-50">{pkg.PackageName}</h1>
                        </div>
                    </div>
                </div>

                {/* Package Details */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                    <h2 className="text-3xl font-semibold mb-4">Package Details</h2>
                    <p className="text-gray-700 mb-8">{pkg.Description2}</p>
                    <h3 className="text-xl font-semibold mb-2">Services Included:</h3>
                    
                    {services.length > 0 ? (
                        services.map((serviceName, idx) => (
                            <div key={idx} className="mb-4">
                                <ul type="text" value={serviceName} readOnly className="border border-gray-300 p-2 rounded w-full" >
                                    {serviceName}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <p>No services available.</p>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="font-semibold">Estimated Time:</h4>
                            <p>{pkg.EstimatedTime} Hours</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <h4 className="font-semibold">Price:</h4>
                            <p>RS: {pkg.Price}</p>
                        </div>
                    </div>
                    <div className="text-center mt-8">
                        <Link to="/appointment">
                        <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                            Make an Appointment
                        </button>
                        </Link>
                    </div>
                </div>

                {/* Images */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pkg.images && pkg.images.length > 1 ? (
                            pkg.images.slice(1).map((image, idx) => (
                                <img key={idx} src={`http://localhost:5000${image.url}`} alt={`Service Image ${idx + 1}`} className="w-full h-64 object-cover rounded-lg shadow-lg " />
                            ))
                        ) : (
                            <div className="w-full h-64 flex items-center justify-center bg-gray-200">
                                <span className="text-gray-500">No additional images available</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default PackageDetails;
