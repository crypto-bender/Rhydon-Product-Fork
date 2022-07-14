import React, {useEffect, useState} from 'react';
import QuantitySelector from './QuantitySelector.jsx';

let SizeSelector = ({selectedStyle, setPurchase}) => {
  let {name, original_price, sale_price, photos} = selectedStyle;

  const [sku, setSku] = useState();

  let changeSku = (selectedSku) => {
    setSku(selectedSku);
  }

  useEffect(() => {
    changeSku();
    setPurchase({
      complete: false,
      name: name,
      price: sale_price || original_price,
      photo: photos[0].url
    })
  }, [selectedStyle])

  return (<div>
    {Object.keys(selectedStyle.skus).map((key, i) => {
      let skuNumber = selectedStyle.skus[key]
      let buttonSize = skuNumber.size
      let quantity = skuNumber.quantity
      if (key == 'null' || !key || !quantity) {
        return <button key={i} disabled>{{buttonSize} || 'Out Of Stock'}</button>
      }
      return (<button key={key} onClick={changeSku.bind(this, skuNumber)}>{buttonSize}</button>)
    })}
      {sku ? <QuantitySelector {...sku} setPurchase={setPurchase}/> : null}
  </div>)
}

export default SizeSelector;