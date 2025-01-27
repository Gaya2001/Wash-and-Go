// import React, { createContext, useState, useEffect, useContext } from 'react';
// import axios from 'axios';

// // Create a Context object for session data
// const SessionContext = createContext();

// // Create a Provider component to wrap your app
// export const SessionProvider = ({ children }) => {
//     const [userData, setUserData] = useState(null);  // Holds the session data

//     // Fetch session data when the app loads
//     useEffect(() => {
//         const fetchUserData = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/Session');
//                 setUserData(response.data);  // Store session data in state
//                 console.log('User data fetched:', response.data);
//             } catch (error) {
//                 console.error('Error fetching user data:', error);
//             }
//         };

//         fetchUserData();
//     }, []);

//     return (
//         <SessionContext.Provider value={{ userData }}>
//             {children}
//         </SessionContext.Provider>
//     );
// };

// // Custom hook to access session data in components
// export const useSession = () => useContext(SessionContext);

