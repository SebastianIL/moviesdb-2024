import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
const Show = () => {
    const {id} = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [isfavorite, setIsFavorite] = useState<boolean>();
    
    const [favorites, setFavorites] = useState<string>('');

    const goBack = ()=> {
        navigate(-1);
    };

    const addFavorite = () => {
        // Ocupamos un ternario en vez de un if 
          const favs = favorites.length > 0 ? JSON.parse(favorites) : []; //["1233", "1233"] si tenemos un id agregamos el de esta pelicula, si no se agrega a 0
          const newFavorites = [...favs, id];
          setFavorites(JSON.stringify(newFavorites));
          setIsFavorite(true);
          localStorage.setItem('favorites', JSON.stringify(newFavorites) ) //El primero es la llave
    };
  
    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [] ;
        let newFavorites = [...favs];
        newFavorites =  newFavorites.filter((e) => e != id);
        setFavorites(JSON.stringify(newFavorites));
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavorites) )
    };



    useEffect(()=>{
        // aqui llamar el endpoint 
        const favs = localStorage.getItem('favorites') ||'';
        setFavorites(favs);
        if(favs.includes(String(id))){
            setIsFavorite(true);
        }
    })
  return (
    <div>
        <div>Show: {id}</div>
    <div>Titulo desde el state: {location.state.movie}</div>
    <button onClick={goBack}>Ir atras</button>
    {isfavorite?(
        <div className='p3 bg-red-800'>
            <button onClick={removeFavorite}>Remove from favorites</button>
        </div>
    ):(
        <div className='p3 bg-blue-800'>
            <button onClick={addFavorite}>Add Favorites</button>
        </div>
    )}

    </div>
      )
}

export default Show