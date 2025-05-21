import './input.scss'

const Input = ({
    label,
    error = false,
    placeholder = '',
    value,
    onChange,
    ...rest
}) => {
    const inputClass = `input_txt${error ? ' error' : ''}`
    const labelClass = `input-label error${error ? ' error' : ''}`
    return label ? (
        <div className="input_labeled_txt">
            <label className={labelClass}>{label}</label>
            <input
                className={inputClass}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...rest}
            />
        </div>
    ) : (
        <input
            className={inputClass}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...rest}
        />
    )
}

export default Input
