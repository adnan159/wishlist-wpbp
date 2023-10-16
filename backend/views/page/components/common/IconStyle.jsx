import InputColor from '../common/InputColor';
import InputCSS from './InputCSS';

export default function IconStyle( { onChange, items, values } ) {
	return (
		<div className="wm-grid wm-grid-cols-1 wm-w-72 wm-px-4 wm-border wm-border-gray-200 wm-rounded-lg">
			<div className=" wm-col-span-1  wm-gap-8  wm-justify-between">
				{ items.map( ( style ) => (
					<div
						key={ style.name }
						className="wm-flex wm-justify-between wm-items-center wm-my-4"
					>
						<label
							className="wm-text-base wm-text-gray-500 wm-mr-8"
							htmlFor={ style.name }
						>
							{ style.label }
						</label>
						{ style.name === 'icon_size' ? (
							<InputCSS
								className="wm-h-10 wm-w-10"
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
								className="wm-h-10 wm-w-10"
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
