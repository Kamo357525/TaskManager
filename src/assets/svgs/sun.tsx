import * as React from "react";

const Sun = ({color}) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
    >
        <path
            fill={color}
            d="M10 1.667c.46 0 .833.373.833.833v.833a.833.833 0 1 1-1.666 0V2.5c0-.46.373-.833.833-.833Zm5.893 2.44a.833.833 0 0 1 0 1.179l-.59.59a.833.833 0 1 1-1.178-1.18l.59-.588a.833.833 0 0 1 1.178 0Zm-11.786 0a.833.833 0 0 1 1.179 0l.59.59a.833.833 0 0 1-1.18 1.178l-.589-.589a.833.833 0 0 1 0-1.178ZM10 6.668a3.333 3.333 0 1 0 0 6.666 3.333 3.333 0 0 0 0-6.666ZM5 10a5 5 0 1 1 10 0 5 5 0 0 1-10 0Zm-3.333 0c0-.46.373-.833.833-.833h.833a.833.833 0 1 1 0 1.666H2.5A.833.833 0 0 1 1.667 10Zm14.166 0c0-.46.373-.833.834-.833h.833a.833.833 0 0 1 0 1.666h-.833a.833.833 0 0 1-.834-.833ZM4.697 14.125a.833.833 0 1 1 1.178 1.178l-.59.59a.833.833 0 1 1-1.178-1.179l.59-.59Zm9.428 1.178a.833.833 0 0 1 1.178-1.178l.59.59a.833.833 0 0 1-1.179 1.178l-.59-.59Zm-4.125.53c.46 0 .833.373.833.834v.833a.833.833 0 0 1-1.666 0v-.833c0-.46.373-.834.833-.834Z"
        />
    </svg>
)
export {Sun};
