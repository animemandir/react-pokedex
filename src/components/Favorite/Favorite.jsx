import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Card} from "antd";
import {REMOVE_FAVORITE_POKEMON, RESET_MODAL, SET_ALERT_INFO, SET_MODAL_INFO} from "../../store/store";

function Favorite() {
    const dispatch = useDispatch();
    const favoriteData = useSelector(state => state.favoriteData);

    const filterFavoriteData = (name) => {
        dispatch(REMOVE_FAVORITE_POKEMON(name));

        const obj = {
            type: 'success',
            message: 'You successfully delete:',
            title: name,
        }
        dispatch(SET_ALERT_INFO(obj))
    }

    useEffect(() => {
        localStorage.setItem('favoritePokemons', JSON.stringify(favoriteData));
    }, [favoriteData])

    return (
        <div className='container'>
            {
                favoriteData.length > 0 ?
                    <>
                        <h1 style={{marginBottom: "-10px"}}>Your favorite pokemons.</h1>
                        <div className='container'>
                            {favoriteData?.map((pokemon, index) => {
                                return (
                                    <div className="site-card-border-less-wrapper" key={index}
                                         onClick={() => {
                                             dispatch(RESET_MODAL());
                                             dispatch(SET_MODAL_INFO(pokemon.name))
                                         }}>
                                        <Card style={{width: 200}}>
                                            <div className='card-name'>
                                                {pokemon.name}
                                                <button className='btn btn-sm'
                                                        style={{border: "none"}}
                                                        onClick={() => filterFavoriteData(pokemon.name)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                         fill="currentColor" className="bi bi-trash"
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                                        <path
                                                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className='card-infoWeight'>
                                                <div className='info-pokemon'>
                                                    <span>XP {pokemon.base_experience}</span>
                                                </div>

                                                <div className='info-vl'></div>
                                                <div className='info-pokemon'>
                                                    {
                                                        pokemon.types.length > 1 ?
                                                            <div className='more-type'>
                                                                <span
                                                                    className='info-type'>{pokemon.types[0].type.name}</span>/
                                                                <span
                                                                    className='info-type'>{pokemon.types[1].type.name}</span>
                                                            </div>
                                                            :
                                                            <span className='info-type'>
                                                {pokemon.types[0].type.name}
                                            </span>
                                                    }
                                                    <span className='info-desc'>Type</span>
                                                </div>
                                            </div>
                                            <img src={pokemon.sprites?.other?.dream_world?.front_default}/>
                                            <div className='card-infoWeight'>
                                                <div className='info-pokemon'>
                                                    <span>{pokemon.weight}kg</span>
                                                    <span className='info-desc'>Weight</span>
                                                </div>
                                                <div className='info-vl'></div>
                                                <div className='info-pokemon'>
                                                    <span>{pokemon.height}m</span>
                                                    <span className='info-desc'>Height</span>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                )
                            })}

                        </div>
                    </>

                    :
                    <h1 style={{paddingBottom: 10}}>No favorite pokemons.</h1>
            }

        </div>

    )

}


export default Favorite;
