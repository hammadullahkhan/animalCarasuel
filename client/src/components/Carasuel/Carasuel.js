import React, { useState, useEffect } from 'react';
import { getCategories, getAnimals } from '../../services/dataService';

import './Carasuel.css';

function Carasuel() {

  let [categories, setCategories] = useState([]);
  let [animals, setAnimals] = useState([]);
  let [animalsByCategory, setAnimalsByCategory] = useState([]);
  let [activeCategories, setActiveCategories] = useState([]);
  let [curImage, setCurImage] = useState({});
  let [curIndex, setCurIndex] = useState(0);
  let [loading, setLoading] = useState(true);

  useEffect( async () => {
    const categoriesResp = await getCategories();
    setCategories(categoriesResp.data.data);
  }, []);

  useEffect( async () => {
    const animalsResp = await getAnimals();
    setAnimals(animalsResp.data.data);
    setAnimalsByCategory(animalsResp.data.data);
    setCurImage(animalsResp.data.data[curIndex])
  }, []);

  useEffect( () => {
    if ( activeCategories.length > 0 ) {
      const filteredAnimals = animals.filter( item => activeCategories.includes(item.category_id));
      setAnimalsByCategory(filteredAnimals);
      setCurImage(filteredAnimals[0]);
      setLoading(false);
    } 
    else {
      if (animals.length > 0) {
        setAnimalsByCategory(animals);
        setCurImage(animals[0]);
        setLoading(false);
      }      
    }
  }, [activeCategories]);

  const toggleCategories = (category_id) => {
    setLoading(true);
    const idx = activeCategories.indexOf(category_id);
    if ( idx === -1) setActiveCategories(catIds => [...catIds, category_id]);
    else             setActiveCategories(activeCategories.filter(catId => catId !== category_id));
  };

  const showCategories = () => {
    return (
      <>
        <div className='action-row'>
          {
            categories.map((item) => (
                <button 
                  key={item.id}
                  className={activeCategories.includes(item.id) ? 'action-buttons active-button' : 'action-buttons'}
                  onClick={() => { toggleCategories(item.id); }}
                >
                  <span className='button-label'>{item.category}</span>
                </button>
            ))
          }
        </div>
      </>
    )
  };

  const showImage = () => {
    return (
      <>    
          <div className='loading'>
            {!loading ? null :
              'Loading Image...'
            }
          </div>
          
          <div className='image'>
              <img 
                style={!loading ? {} : {display: 'hidden'}}
                onLoad={() => setLoading(false)}
                id={curImage.id} 
                src={curImage.photo_url}
                alt={curImage.id}
              />            
          </div>  
      </>
    )
  };

  const prevImage = () => {
    return (
      <>  
          { 
            !(curIndex-1 >=0 && animalsByCategory[curIndex-1]) ? null : (
              <div className='prev-icon' onClick={() => { handlePrevImage(); }}></div>
            )            
          }
      </>
    )
  };

  const nextImage = () => {
    return (
      <>     
          { 
            !(curIndex+1 <= animalsByCategory.length && animalsByCategory[curIndex+1]) ? null : (
              <div className='next-icon' onClick={() => { handleNextImage(); }}></div>
            )            
          }
      </>
    )
  };

  const handleNextImage = () => {
    setLoading(true);
    if (curIndex+1 <= animalsByCategory.length && animalsByCategory[curIndex+1]) {
      setCurImage(animalsByCategory[curIndex+1]);
      setCurIndex(curIndex+1);
    }    
  }

  const handlePrevImage = () => {
    setLoading(true);
    if (curIndex-1 >=0 && animalsByCategory[curIndex-1]) {
      setCurImage(animalsByCategory[curIndex-1]);
      setCurIndex(curIndex-1);
    }
  }

  return (
    <>
      <div className="main-container">        
        <div className='action-row'>
          {showCategories()}
        </div>

        <div className='carasuel-row'>
          <div>{prevImage()}</div>
          <div>{showImage()}</div>          
          <div>{nextImage()}</div>
        </div>
      </div>
    </>
  );
}

export default Carasuel;
