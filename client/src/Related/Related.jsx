import React, {
  Component, useState, useEffect, useRef,
} from 'react';
import axios from 'axios';
import RelatedCard from './RelatedCard.jsx';
import RelatedModal from './RelatedModal.jsx';
import RelatedPreview from './RelatedPreview.jsx';

function Related({product, updateCurrentProduct}) {
  // similar to componentDidMount
  const [cards, setCards] = useState({});
  // const [currentProduct, setProduct] = useState(product.data);
  const [modalContent, setModalContent] = useState({});
  const carouselPos = useRef({});
  const [imagePreview, setPreview] = useState({});
  function showPreview(e, id) {
    setPreview(cards[id].img);
  }

  useEffect(() => {
    const params = {
      params: {
        id: product.data.id,
      },
    };
    axios.get('/related', params).then(({data}) => {
      const positions = ['p1', 'p2', 'p3', 'p4'];
      const keys = Object.keys(data);
      const keyLen = keys.length;
      // there could be less than 4 related items
      const minPos = Math.min(4, keyLen);
      // set carousel position
      for (let i = 0; i < minPos; i++) {
        carouselPos.current[keys[i]] = positions[i];
      }
      if (keyLen > 4) {
        for (let i = 4; i < keyLen; i++) {
          carouselPos.current[keys[i]] = 'pright';
        }
      }
      setCards(data);
    }).catch((err) => {
      console.log(err);
    });
  }, [product]);

  useEffect(() => {
    if (Object.keys(imagePreview).length !== 0) {
      const modal = document.getElementsByClassName('preview')[0];
      modal.classList.remove('hidden');
    }
  }, [imagePreview]);

  useEffect(() => {
    if (Object.keys(modalContent).length !== 0) {
      const modal = document.getElementsByClassName('modal')[0];
      modal.classList.remove('hidden');
    }
  }, [modalContent]);

  function showModal(e, id) {
    const resArr = [];
    resArr.push(cards[id]);
    resArr.push(product.data);
    setModalContent(resArr);
  }

  // function updateCurrentProduct(e, id) {
  //   const params = {params: {id: id}};
  //   axios.get('/details', params).then(({data}) => {
  //     console.log(data);
  //     setProduct(data);
  //   }).catch((err) => {
  //     console.log(err);
  //   });
  // }

  function moveRelatedLeft(e) {
    e.preventDefault();
    if (document.getElementsByClassName('slide pleft related').length > 0) {
      const positions = {
        pleft: 'p1',
        p1: 'p2',
        p2: 'p3',
        p3: 'p4',
        p4: 'pright',
      };
      for (const pos in positions) {
        const curPosition = 'slide '+ pos + ' related';
        const elements = document.getElementsByClassName(curPosition);
        const element = elements[elements.length - 1];
        updatePosition(element, pos, positions[pos]);
      }
    }
  }

  function moveRelatedRight(e) {
    e.preventDefault();
    if (document.getElementsByClassName('slide pright related').length > 0) {
      const positions = {
        p1: 'pleft',
        p2: 'p1',
        p3: 'p2',
        p4: 'p3',
        pright: 'p4',
      };
      for (let pos in positions) {
        const curPosition = 'slide '+ pos + ' related';
        const element = document.getElementsByClassName(curPosition)[0];
        updatePosition(element, pos, positions[pos]);
      }
    }
  }

  function updatePosition(element, curPosition, newPosition) {
    element.classList.remove(curPosition);
    element.classList.add(newPosition);
  }

  return (
    <div className="related">
      <h5 className="title">RELATED PRODUCTS</h5>
      <div className="carousel">
        <button onClick={(e) => moveRelatedLeft(e)} className="carousel-prev">{'<'}</button>
        <div className="carousel-inner">
          {Object.keys(cards).map((id, index) => <RelatedCard
            key={id} id={id} showModal={showModal} card={cards[id]}
            updateCurrentProduct={updateCurrentProduct}
            showPreview={showPreview}
            position={carouselPos.current[id]} />)}
        </div>
        <button onClick={(e) => moveRelatedRight(e)} className="carousel-next">{'>'}</button>
      </div>
      {Object.keys(modalContent).length !== 0 ? <RelatedModal modalContent={modalContent} /> : null}
      {Object.keys(imagePreview).length !== 0 ? <RelatedPreview url={imagePreview}/> : null}
    </div>
  );
}

export default Related;


{/* <div className="container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button style={{ position: 'absolute', left: 0 }}>Left</button>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          {testArr.map((num) => (<div style={{
            width: '100px',
            height: '150px',
            border: '1px solid gray',
          }}>{num}</div>))}
        </div>
        <div className="container__right" style={{
          position: 'absolute',
          right: 0,
          background: 'green',
          width: 100,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          }}>
          <button>Right</button>
        </div> */}
{/* </div> */}
