import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery.jsx';
import StyleSelector from './StyleSelector.jsx';


let Styles = ({get}) => {
  const [productStyles, setProductStyles] = useState()
  const [selectedStyle, setSelectedStyle] = useState();

  useEffect(() => {
    get('/styles')
      .then(({data}) => {
        setSelectedStyle(data[0])
        setProductStyles(data)
      })
  }, [])



    const commonProps = {
      productStyles,
      selectedStyle,
      setSelectedStyle
    }

  return(
    <div>
      <ImageGallery {...commonProps}/>
      <StyleSelector
        {...commonProps}
        // productStyles={productStyles}
        // selectedStyle={selectedStyle}
        // setSelectedStyle={setSelectedStyle}
        />
    </div>
  )
}

export default Styles