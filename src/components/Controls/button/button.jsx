import './button.scss'
import { forwardRef } from 'react'

const Button = forwardRef(
    (
        {
            variant = 'transparent_txt',
            icon = null,
            active = false,
            className = '',
            children,
            ...rest
        },
        ref
    ) => {
        const finalClass = `${variant}_btn${
            active ? ' active_btn' : ''
        } ${className}`
        return (
            <button ref={ref} className={finalClass} {...rest}>
                {icon && <span className="icon">{icon}</span>}
                {children}
            </button>
        )
    }
)

export default Button
