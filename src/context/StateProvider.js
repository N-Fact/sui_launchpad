import { createContext, useState } from "react";

const UserContext = createContext();
export const UserProvider = ({ children }) => {
    // console.log("wqewqe");
    const [user, setUser] = useState(null);
    const imageUrl = "https://suilaunchpad.novemyazilim.com/public/";
    const baseUrl = "https://suilaunchpad.novemyazilim.com/";

    const values = {
        user,
        setUser,
        imageUrl,
        baseUrl
    };

    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;

