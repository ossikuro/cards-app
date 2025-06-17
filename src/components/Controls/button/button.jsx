import './button.scss'
import { forwardRef } from 'react'

const Button = forwardRef(
    (
        {
            variant = 'transparent_txt',
            icon = null,
            active = false,
            children,
            ...rest
        },
        ref
    ) => {
        const className = `${variant}_btn${active ? ' active_btn' : ''}`
        return (
            <button ref={ref} className={className} {...rest}>
                {icon && <span className="icon">{icon}</span>}
                {children}
            </button>
        )
    }
)

export default Button
