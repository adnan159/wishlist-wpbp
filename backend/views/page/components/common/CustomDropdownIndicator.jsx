const CustomDropdownIndicator = ( props ) => {
	return (
		<components.DropdownIndicator { ...props }>
			<div className="custom-dropdown-indicator">
				<svg
					width="12"
					height="12"
					viewBox="0 0 12 12"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3.29289 4.29289C3.68342 3.90237 4.31658 3.90237 4.70711 4.29289L6 5.58579L7.29289 4.29289C7.68342 3.90237 8.31658 3.90237 8.70711 4.29289C9.09763 4.68342 9.09763 5.31658 8.70711 5.70711L6.70711 7.70711C6.31658 8.09763 5.68342 8.09763 5.29289 7.70711L3.29289 5.70711C2.90237 5.31658 2.90237 4.68342 3.29289 4.29289Z"
						fill="#000000"
					/>
				</svg>
			</div>
		</components.DropdownIndicator>
	);
};
