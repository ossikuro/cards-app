import './button.scss'

const Button = ({
    variant = 'transparent_txt',
    icon = null,
    active = false,
    children,
    ...rest
}) => {
    const className = `${variant}_btn${active ? ' active_btn' : ''}` // e.g. transparent_txt_btn
    return (
        <button className={className} {...rest}>
            {icon && <span className="icon">{icon}</span>}
            {children}
        </button>
    )
}

export default Button
