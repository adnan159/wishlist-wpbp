import axios from 'axios';
import { useEffect, useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import {
	selectWishlist,
	updateWishlistSetting,
} from '../../redux/reducers/wishlistSlice';

const CustomDropdownIndicator = ( props ) => {
	return (
		<div className="custom-dropdown-indicator" { ...props }>
			<HiSearch
				className="wawl-h-5 wawl-w-5 wawl-text-gray-400 wawl-mr-2"
				aria-hidden="true"
			/>
		</div>
	);
};

export default function SearchSelect( {
	classes = 'wawl-border-red-500',
	size = 'wawl-h-12 wawl-w-72',
} ) {
	const optionSelected = useSelector( selectWishlist );
	const [ selectedOptions, setSelectedOptions ] = useState(
		optionSelected.exclude_items.map( ( option ) => ( {
			value: option.id,
			label: option.category_name,
		} ) )
	);
	const dispatch = useDispatch();
	const [ optionList, setOptionList ] = useState( [] );
	const [ inputValue, setInputValue ] = useState( '' );

	const handleSelect = ( selectedValues ) => {
		setSelectedOptions( selectedValues );

		const selectedOptionIds = selectedValues.map( ( option ) => ( {
			id: option.value,
			category: option.label,
		} ) );

		dispatch(
			updateWishlistSetting( {
				...optionSelected,
				exclude_items: selectedOptionIds,
			} )
		);
	};

	let timer;
	const [ dataFetched, setDataFetched ] = useState( false ); // Track if data is fetched

	useEffect( () => {
		if ( optionSelected.exclude_type === 'category' ) {
			const url =
				ww_admin_view_object.base_rest_url +
				'/search-categories?search-params=' +
				inputValue;

			if ( inputValue.length >= 2 ) {
				const fetchData = async () => {
					try {
						const headers = {
							'Content-Type': 'application/json',
							'X-WP-Nonce': ww_admin_view_object.rest_nonce,
						};

						const response = await axios.get( url, {
							headers,
						} );
						dispatch( updateWishlistSetting( response.data ) );
						setOptionList( response.data );
						setDataFetched( true ); // Set dataFetched to true when data is fetched
					} catch ( error ) {
						console.error( 'Error fetching data:', error );
					}
				};

				// fetchData();
				if ( inputValue ) {
					clearTimeout( timer );
					timer = setTimeout( () => {
						fetchData();
					}, 1000 );
				}
			}
		} else {
			setDataFetched( true );
		}
	}, [ inputValue, optionSelected.exclude_type ] );

	const customStyles = {
		input: ( provided ) => ( {
			...provided,
			padding: '4px 8px',
			borderRadius: '4px',
			outline: 'none',
			boxShadow: 'none',
			minWidth: '20px',
			'&:focus': {
				...provided[ '&:focus' ],
				backgroundColor: 'red',
			},
		} ),
		multiValueLabel: ( provided ) => ( {
			...provided,
			backgroundColor: 'lightblue',
			padding: '4px',
			borderRadius: '4px',
			color: 'blue',
			minWidth: '20px',
		} ),
		control: ( provided ) => ( {
			...provided,
			borderRadius: '4px',
			boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
			border: '1px solid rgba(241, 243, 247, 1)',
			'&:hover': {
				color: 'red',
			},
		} ),
		indicatorSeparator: ( provided ) => ( {
			...provided,
			backgroundColor: 'blue',
			height: '0',
		} ),
		dropdownIndicator: ( provided, state ) => ( {
			...provided,
			color: 'blue',
			'&:hover': {
				color: 'red',
			},
		} ),
	};

	const mappedOptionList = optionList.map( ( option ) => ( {
		value: option.id,
		label: option.category_name,
	} ) );

	return (
		<div className={ `w-full ${ classes } ${ size } ` }>
			{ dataFetched ? (
				<Select
					options={ mappedOptionList }
					placeholder="Search"
					value={ selectedOptions }
					onChange={ handleSelect }
					isSearchable={ true }
					isMulti
					styles={ customStyles }
					components={ {
						DropdownIndicator: CustomDropdownIndicator,
					} }
					menuShouldScrollIntoView={ false }
					filterOption={ ( option, input ) => {
						return input.length >= 2
							? option.label
									.toLowerCase()
									.includes( input.toLowerCase() )
							: false;
					} }
					onInputChange={ ( newValue ) => {
						setInputValue( newValue );
						if ( ! newValue ) {
							setSelectedOptions( [] );
						}
					} }
				/>
			) : (
				<h1>Show nothing</h1>
			) }
		</div>
	);
}
