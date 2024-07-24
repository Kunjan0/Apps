import React from 'react';
import ReactImageMagnify from 'react-image-magnify';
import image from './greek-alphabet.png'; 

const App = () => {
    return (
        <div style={{ width: '30%', margin: '0 auto' }}>
            <ReactImageMagnify {...{
                smallImage: {
                    alt: 'Magnified Image',
                    isFluidWidth: true,
                    src: image
                },
                largeImage: {
                    src: image,
                    width: 1750, 
                    height: 1000  
                }
            }} />
        </div>
    );
}

export default App;