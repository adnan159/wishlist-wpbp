import { useState } from 'react';
export default function InputColorPicker() {
	const [ color, setColor ] = useState( '#A82323' );
	return (
		<div className="wawl-flex wawl-justify-baseline wawl-w-full wawl-p-4 wawl-border wawl-border-gray-200  wawl-rounded-lg ">
			<div className="">
				<label
					className="wawl-text-base wawl-text-gray-900"
					for="color"
				>
					Background color
				</label>

				<input
					className="wawl-h-10 wawl-w-10 wawl-ml-4"
					type="color"
					onChange={ ( e ) => setColor( e.target.value ) }
				/>
				<h1>{ color }</h1>
			</div>
			<div className="">
				<label
					className="wawl-text-base wawl-text-gray-900"
					for="color"
				>
					Background color
				</label>

				<input
					className="wawl-h-10 wawl-w-10 wawl-ml-4"
					type="color"
					onChange={ ( e ) => setColor( e.target.value ) }
				/>
				<h1>{ color }</h1>
			</div>
		</div>
	);
}
