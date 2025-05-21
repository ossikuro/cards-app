import './button.scss'

const Button = ({
    variant = 'transparent_txt',
    icon = null,
    children,
    ...rest
}) => {
    const className = `${variant}_btn` // e.g. transparent_txt_btn
    return (
        <button className={className} {...rest}>
            {icon && <span className="icon">{icon}</span>}
            {children}
        </button>
    )
}

export default Button
