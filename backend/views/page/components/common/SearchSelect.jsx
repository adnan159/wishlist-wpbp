import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { selectWishlist } from '../../redux/reducers/wishlistSlice';

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
	onChange,
	value,
} ) {
	const optionSelected = useSelector( selectWishlist );
	const [ selectedOptions, setSelectedOptions ] = useState( [] );
	const [ dataUpdated, setDataUpdated ] = useState( [] );

	const dispatch = useDispatch();
	// const [ optionList, setOptionList ] = useState( [] );
	const [ inputValue, setInputValue ] = useState( '' );
	const [ dataFetched, setDataFetched ] = useState( true );

	// let timer;
	// useEffect( () => {
	// 	const endpoint =
	// 		optionSelected.exclude_type === 'category'
	// 			? 'search-categories'
	// 			: 'search-product';
	// 	const url = `${ ww_admin_view_object.base_rest_url }/${ endpoint }?search-params=${ inputValue }`;

	// 	if ( inputValue.length >= 2 ) {
	// 		const fetchData = async () => {
	// 			try {
	// 				const headers = {
	// 					'Content-Type': 'application/json',
	// 					'X-WP-Nonce': ww_admin_view_object.rest_nonce,
	// 				};

	// 				const response = await axios.get( url, {
	// 					headers,
	// 				} );
	// 				dispatch( updateWishlistSetting( response.data ) );
	// 				setOptionList( response.data );
	// 				setDataFetched( true );
	// 			} catch ( error ) {
	// 				console.error( 'Error fetching data:', error );
	// 			}
	// 		};

	// 		// fetchData();

	// 		if (
	// 			optionSelected.exclude_type === 'category' ||
	// 			optionSelected.exclude_type === 'product'
	// 		) {
	// 			fetchData();
	// 			if ( inputValue ) {
	// 				clearTimeout( timer );
	// 				timer = setTimeout( () => {
	// 					fetchData();
	// 				}, 1000 );
	// 			}
	// 		}
	// 	}
	// 	setDataFetched( true );
	// }, [ inputValue, optionSelected.exclude_type ] );

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
	const optionList = [
		{
			id: 20,
			category_name: 'Accessories',
		},
		{
			id: 17,
			category_name: 'Clothing',
		},
		{
			id: 22,
			category_name: 'Decor',
		},
		{
			id: 19,
			category_name: 'Hoodies',
		},
		{
			id: 21,
			category_name: 'Music',
		},
		{
			id: 18,
			category_name: 'Tshirts',
		},
	];
	const ProductList = [
		{
			id: 39,
			product_name: 'WordPress Pennant',
		},
		{
			id: 38,
			product_name: 'Logo Collection',
		},
		{
			id: 37,
			product_name: 'Beanie with Logo',
		},
		{
			id: 36,
			product_name: 'T-Shirt with Logo',
		},
		{
			id: 29,
			product_name: 'Single',
		},
		{
			id: 28,
			product_name: 'Album',
		},
		{
			id: 27,
			product_name: 'Polo',
		},
		{
			id: 26,
			product_name: 'Long Sleeve Tee',
		},
		{
			id: 25,
			product_name: 'Hoodie with Zipper',
		},
		{
			id: 24,
			product_name: 'Hoodie with Pocket',
		},
		{
			id: 23,
			product_name: 'Sunglasses',
		},
		{
			id: 22,
			product_name: 'Cap',
		},
		{
			id: 21,
			product_name: 'Belt',
		},
		{
			id: 20,
			product_name: 'Beanie',
		},
		{
			id: 19,
			product_name: 'T-Shirt',
		},
		{
			id: 18,
			product_name: 'Hoodie with Logo',
		},
		{
			id: 17,
			product_name: 'Hoodie',
		},
		{
			id: 16,
			product_name: 'V-Neck T-Shirt',
		},
	];
	let mappedOptionList; // Use 'let' instead of 'const'

	if ( optionSelected.exclude_type === 'product' ) {
		mappedOptionList = ProductList.map( ( option ) => ( {
			value: option.id,
			label: option.product_name,
		} ) );
	} else {
		mappedOptionList = optionList.map( ( option ) => ( {
			value: option.id,
			label: option.category_name,
		} ) );
	}

	return (
		<div className={ `w-full ${ classes } ${ size } ` }>
			{ dataFetched ? (
				<Select
					options={ mappedOptionList }
					placeholder="Search"
					value={ value }
					onChange={ onChange }
					isSearchable={ true }
					isMulti
					styles={ customStyles }
					components={ {
						DropdownIndicator: CustomDropdownIndicator,
					} }
					menuShouldScrollIntoView={ false }
					filterOption={ ( option, input ) => {
						return input.length >= 1
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
