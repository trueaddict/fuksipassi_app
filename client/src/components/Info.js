import React from 'react';

const Info = ({theme}) => {
    return (
        <div class="center container">
            <p class="info-text">{theme.info_1}</p>
            <p class="info-text">{theme.info_2}</p>
            <p class="info-text info-text-last">{theme.info_3}</p>
        </div>
    )
}

export default Info;