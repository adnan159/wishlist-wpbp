import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
	return useContext( DataContext );
};

export const DataProvider = ( { children } ) => {
	const [ butonStyles, setButonStyles ] = useState( {
		bgColor: '',
		bgHoverColor: '',
		borderColor: '',
		borderHoverColor: '',
	} );

	const updateButtonStyles = ( newValue = {} ) => {
		setButonStyles( newValue );
	};

	return (
		<DataContext.Provider value={ { butonStyles, updateButtonStyles } }>
			{ children }
		</DataContext.Provider>
	);
};
