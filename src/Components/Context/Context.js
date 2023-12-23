import React, { useState } from 'react'
import { createContext } from 'react';
export const ContextProvider = createContext();

export const AppContext = ({ children }) => {
    const [priority, setPriority] = useState("");
    const provideValue = (values) => {
        setPriority(values);
    }
    const getValues = () => {
        return priority;
    }
    const contextValue = {
        provideValue,getValues
    }
    return (
        <div>
            <ContextProvider.Provider value={contextValue}>
                {children}
            </ContextProvider.Provider>
        </div>
    )
}

