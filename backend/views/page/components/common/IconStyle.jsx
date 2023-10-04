import InputColor from '../common/InputColor';
import InputCSS from './InputCSS';

export default function IconStyle( { onChange, items, values } ) {
	return (
		<div className="wawl-grid wawl-grid-cols-1 wawl-w-72 wawl-px-4 wawl-border wawl-border-gray-200 wawl-rounded-lg">
			<div className=" wawl-col-span-1  wawl-gap-8  wawl-justify-between">
				{ items.map( ( style ) => (
					<div
						key={ style.name }
						className="wawl-flex wawl-justify-between wawl-items-center wawl-my-4"
					>
						<label
							className="wawl-text-base wawl-text-gray-500 wawl-mr-8"
							htmlFor={ style.name }
						>
							{ style.label }
						</label>
						{ style.name === 'icon_size' ? (
							<InputCSS
								className="wawl-h-10 wawl-w-10"
								id={ style.name }
								name={ style.name }
								value={ values[ style.name ] || '' }
								placeholder={
									`${ values[ style.name ] }` || '10px'
								}
								onChange={ onChange }
							/>
						) : (
							<InputColor
								className="wawl-h-10 wawl-w-10"
								name={ style.name }
								value={
									values[ style.name ]
										? values[ style.name ]
										: ''
								}
								onChange={ onChange }
							/>
						) }
					</div>
				) ) }
			</div>
		</div>
	);
}
