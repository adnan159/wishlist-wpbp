import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWishlistSetting } from '../../redux/reducers/wishlistSlice';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' );
}

export default function Toggle( { active = false, settingName } ) {
	const dispatch = useDispatch();
	const [ enabled, setEnabled ] = useState( active );

	useEffect( () => {
		setEnabled( active );
	}, [ active ] );

	const togglePopupEnable = () => {
		const newEnabled = ! enabled;

		dispatch(
			updateWishlistSetting( {
				[ settingName ]: newEnabled,
			} )
		);

		setEnabled( newEnabled );
	};

	return (
		<div
			onClick={ togglePopupEnable }
			className={ classNames(
				enabled ? 'wawl-bg-accent' : 'wawl-bg-gray-200',
				'wawl-relative wawl-inline-flex wawl-h-8 wawl-w-[65px] wawl-flex-shrink-0 wawl-cursor-pointer wawl-rounded-full wawl-border-2 wawl-border-transparent wawl-transition-colors wawl-duration-200 wawl-ease-in-out focus:wawl-outline-none focus:wawl-ring-0 focus!:wawl-ring-gray-200 focus:wawl-ring-offset-0'
			) }
		>
			<span className="wawl-sr-only">Use setting</span>
			<span
				aria-hidden="true"
				className={ classNames(
					enabled
						? 'wawl-translate-x-9 wawl-translate-y-0.5'
						: 'wawl-translate-x-0.5 wawl-translate-y-0.5',
					'wawl-pointer-events-none wawl-inline-block wawl-h-6 wawl-w-6 wawl-transform wawl-rounded-full wawl-bg-white wawl-shadow wawl-ring-0 wawl-transition wawl-duration-200 wawl-ease-in-out'
				) }
			/>
		</div>
	);
}
