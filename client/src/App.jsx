import React, {Component, useEffect, useState, useRef} from 'react';
import Related from './Related/Related.jsx';
import Overview from './Related/Overview.jsx';
import Outfit from './Related/Outfit.jsx';
import axios from 'axios';
import _ from 'lodash';
function App() {
  const [product, setProduct] = useState({});
  const [productStyle, setProductStyle] = useState({});
  const [outfits, setOutfit] = useState({});
  const [carouselPos, setCarouselPos] = useState({});
  useEffect(() => {
    updateCurrentProduct(null, '40345');
  }, []);

<<<<<<< HEAD
  function updateCurrentProduct(e, id) {
    const params = {params: {id: id}};
    axios.get('/details', params).then((data) => {
      setProduct({data});
    }).catch((err) => {
      console.log(err);
    });

    axios.get('/styles', params).then((data) => {
      setProductStyle({data});
    }).catch((err) => {
      console.log(err);
    });
  }
  function addToOutfit(e, id) {
    e.preventDefault();
    if (!(id in outfits)) {
      const newOutfit = {...outfits};
      newOutfit[id] = productStyle.data.data[id];
      setOutfit(newOutfit);

      const positions = {
        p1: 'p2',
        p2: 'p3',
        p3: 'p4',
        p4: 'pright',
        pright: 'pright',
      };
      const carouselPoscopy = {...carouselPos};
      for (const id in carouselPos) {
        carouselPoscopy[id] = positions[carouselPos[id]];
      }
      carouselPoscopy[id] = 'p1';
      setCarouselPos(carouselPoscopy);
    }
=======
class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Rhydon Store </h1>
        {/* <div style={{border: "1px solid black", height: "33em"}}> */}
          {/* Product Overview Component */}
          {/* <h2>Product Overview Component</h2> */}
        {/* </div> */}
        {/* <div style={{border: "1px solid black", height: "33em"}}> */}
          {/* <Related /> */}
        {/* </div> */}
        <div>
          <RatingsWidget />
        </div>
      </div>
    );
>>>>>>> main
  }

  function removeOutfit(e, id, position) {
    e.preventDefault();
    if (id in outfits) {
      const newOutfit = {...outfits};
      delete newOutfit[id];
      setOutfit(newOutfit);

      const swaps = {
        p1: ['p2', 'p3', 'p4', 'pright'],
        p2: ['p3', 'p4', 'pright'],
        p3: ['p4', 'pright'],
        p4: ['pright'],
      };
      const positions = {
        p2: 'p1',
        p3: 'p2',
        p4: 'p3',
        pright: 'p4',
      };
      const carouselPoscopy = {...carouselPos};
      delete carouselPoscopy[id];

      const positionsToSearch = swaps[position];
      for (let i = 0; i < positionsToSearch.length; i++) {
        const curPosSearch = positionsToSearch[i];
        for (const id in carouselPoscopy) {
          if (carouselPoscopy[id] === curPosSearch) {
            carouselPoscopy[id] = positions[carouselPos[id]];
          }
        }
      }
      setCarouselPos(carouselPoscopy);
    }
  }


  return (
    <div className="app">
      {Object.keys(product).length !== 0 ? [
        <Related product={product.data} updateCurrentProduct={updateCurrentProduct}/>,
        <Outfit productStyle={productStyle.data} outfits={outfits} removeOutfit={removeOutfit} addToOutfit={addToOutfit} carouselPos={carouselPos}/>,
      ] : null}
    </div>
  );
}

export default App;
