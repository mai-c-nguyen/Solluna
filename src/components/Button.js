
import clsx from "clsx";

function Button(props) {
const {outline, children, className, ...rest} = props;

const classNames = clsx({
  btn: true,
  "btn-outline": outline,
  "btn-default": !outline
}, className);

return (
  <button className={classNames} {...rest}>{props.children}</button>
  )
}

export default Button;
