import { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Select from 'react-select';
// import CustomDropdownIndicator from './CustomDropdownIndicator';
// Custom DropdownIndicator component
const CustomDropdownIndicator = ( props ) => {
	return (
		<div className="custom-dropdown-indicator" { ...props }>
			<HiMagnifyingGlass
				className="wawl-h-5 wawl-w-5 wawl-text-gray-400 wawl-mr-2"
				aria-hidden="true"
			/>
			{ /* You can use any icon library here */ }
		</div>
	);
};
export default function SearchSelect( {
	classes = 'wawl-border-red-500',
	size = 'wawl-h-12 wawl-w-72',
} ) {
	const [ selectedOptions, setSelectedOptions ] = useState( [] );

	const optionList = [
		{ id: 1, category: 'Red' },
		{ id: 2, category: 'Green' },
		{ id: 3, category: 'Yellow' },
		{ id: 4, category: 'Blue' },
		{ id: 5, category: 'White' },
	];

	function handleSelect( selectedValues ) {
		setSelectedOptions( selectedValues );
	}

	const customStyles = {
		input: ( provided ) => ( {
			...provided,
			padding: '4px 8px',
			border: 'none',
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
			/* Your custom styles for the selected value label */
			backgroundColor: 'lightblue',
			padding: '4px',
			borderRadius: '4px',
			color: 'blue',
			minWidth: '20px',
		} ),
		control: ( provided ) => ( {
			...provided,
			border: 'none',
			borderRadius: '4px',
			boxShadow: ' rgba(0, 0, 0, 0.16) 0px 1px 4px',
			border: '1px solid rgba(241, 243, 247, 1)',
			'&:hover': {
				color: 'red', // Change the color on hover
			},
		} ),
		indicatorSeparator: ( provided ) => ( {
			...provided,
			backgroundColor: 'blue', // Custom background color for the separator
			height: '0', // Custom height for the separator
		} ),
		dropdownIndicator: ( provided, state ) => ( {
			...provided,
			color: 'blue', // Change the color of the dropdown icon
			'&:hover': {
				color: 'red', // Change the color on hover
			},
		} ),
	};

	const mappedOptionList = optionList.map( ( option ) => ( {
		value: option.id,
		label: option.category,
	} ) );

	return (
		<div className={ `w-full ${ classes } ${ size } ` }>
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
			/>
		</div>
	);
}
