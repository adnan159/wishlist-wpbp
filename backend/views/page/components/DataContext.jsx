import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useData = () => {
	return useContext( DataContext );
};

export const DataProvider = ( { children } ) => {
	const [ butonStyles, setButonStyles ] = useState( {
		background_color: '',
		background_hover_color: '',
		border_color: '',
		border_hover_color: '',
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
