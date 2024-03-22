import './styles.scss';
const Button = ({icon, iconCustomClass, text, textCustomClass, buttonCustomClass, variant, type="submit", onClick}) => {
  return (
    <button type={type} className={`genericButton ${variant} ${buttonCustomClass}`} onClick={onClick}>
      {icon && <span className={`iconButton ${iconCustomClass}`}>{icon}</span>}
      {text && <span className={`textButton ${textCustomClass}`}>{text}</span>}
    </button>
  )
}
export default Button 