import { createContext } from 'react';
import { IGlobalContext } from 'typing/globals';

export const GlobalContext = createContext<IGlobalContext>(null);
