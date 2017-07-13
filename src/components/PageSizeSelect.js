import React from 'react'

export const PageSizeSelect = (props) => {
    return(
        <div>
            <select className="select" onChange={props.pageSizesChange}>
                {props.pageSizes.map((size, i) => <option key={i}>{size}</option>)}
            </select>
        </div>
    );
}

export default PageSizeSelect;