import React from 'react'
import preloader from '../../../assets/images/preloader.gif'

let Preloader: React.FC = () => {
    return <div style={{ backgroundColor: 'white', display: 'inline-block' }}>
        <img src={preloader} />
    </div>
}

export default Preloader