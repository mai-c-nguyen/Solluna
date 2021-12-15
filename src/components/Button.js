import React from 'react';
import clsx from "clsx";

export default function Button(props) {
    console.log(props);
    const {outline, children, className, ...rest} = props;
    const classes = clsx({
        btn: true,
        "btn-outline": outline,
        "btn-default": !outline
        }, className
        );
        console.log(classes);
    return (
      <button className={classes} {...rest}>
      {children}
      </button>
    );
}
