// File: src/context/LocationContext.js
import { createContext, useContext, useState } from 'react';

const LocationContext = createContext();
export const useLocation = () => useContext(LocationContext);
// ... your existing context code
