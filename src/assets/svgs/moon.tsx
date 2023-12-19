import * as React from "react";

const Moon = ({color}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
    >
        <path
            fill={color}
            d="M7.8 2.744a.833.833 0 0 1 .156.964 6.208 6.208 0 0 0 8.336 8.336.833.833 0 0 1 1.119 1.12A7.874 7.874 0 1 1 6.837 2.59c.32-.163.71-.1.964.154ZM5.686 5.558a6.208 6.208 0 0 0 8.757 8.757 7.874 7.874 0 0 1-8.757-8.757Z"
        />
    </svg>
)
export {Moon};
