import { useState } from 'react';
import Img from '../../../asset/img/image.png';
import Button from './Button';

export default function IconImage() {
	const [ selected, setSelected ] = useState( [] );
	const [ color, setColor ] = useState( '' );

	const onSelectFile = ( event ) => {
		const selectedFiles = event.target.files;
		const selectedFilesArray = Array.from( selectedFiles );

		const imageArray = selectedFilesArray.map( ( file ) => {
			return URL.createObjectURL( file );
		} );

		setSelected( imageArray );
	};

	const handleRemoveClick = () => {
		setSelected( [] ); // Clear the selected images
		setColor( '#f00' ); // Change background color to red
	};

	return (
		<div>
			<div className="wawl-flex wawl-mx-auto wawl-items-center">
				<div className=" wawl-border wawl-border-gray-300 wawl-h-full wawl-rounded-md wawl-block wawl-mx-auto">
					{ selected.length > 0 ? (
						selected.map( ( image, index ) => (
							<div key={ index }>
								<img
									className="wawl-mx-auto wawl-object-fit wawl-h-32 wawl-w-32 wawl-px-4 wawl-py-2 "
									src={ image }
								/>
							</div>
						) )
					) : (
						<img
							className="wawl-mx-auto wawl-object-cover wawl-h-32 wawl-w-auto"
							src={ Img }
							alt="Default"
						/>
					) }
				</div>
				<div className="wawl-pl-4 wawl-grid wawl-gap-4">
					{ selected.length === 1 ? (
						<Button
							onClick={ () => {
								console.log( selected );
							} }
							buttonStyle="button-primary"
							iconPosition="after"
							addBgColor={ false }
							style={ {
								backgroundColor: color,
							} }
							classNames="!wawl-border-gray-300 wawl-text-gray-400"
							icon=""
						>
							Add Image
						</Button>
					) : (
						<label className="wawl-px-5 wawl-py-3 wawl-text-sm wawl-rounded-[0.1375rem] wawl-leading-4 wawl-items-center wawl-border wawl-border-gray-300 wawl-text-gray-500">
							<input
								className="wawl-hidden wawl-w-11"
								type="file"
								name="images"
								onChange={ onSelectFile }
								multiple
								accept="image/png,image/jpeg,image/webp"
							/>
							Add Image
						</label>
					) }
					<Button
						onClick={ handleRemoveClick }
						buttonStyle="button-primary"
						iconPosition="after"
						addBgColor={ false }
						classNames="!wawl-border-gray-300 wawl-text-gray-500"
						icon=""
					>
						Remove
					</Button>
				</div>
			</div>
		</div>
	);
}
