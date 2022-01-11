import React, {useEffect} from 'react';
import {Card} from "antd";
import './PokemonStyle.css'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {
    REMOVE_FAVORITE_POKEMON, RESET_MODAL,
    SET_ALERT_INFO,
    SET_FAVORITE_DATA, SET_MODAL_INFO,
    SET_PAGINATED_DATA,
    SET_POKEMONS
} from "../store/store";
import PaginationPage from "./Pagination/PaginationPage";

function Pokemons() {
    const dispatch = useDispatch();
    const paginatedData = useSelector(state => state.paginatedData);
    const pokemonsData = useSelector(state => state.pokemons);
    const favoriteData = useSelector(state => state.favoriteData);


    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon?limit=100`)
            .then(res => {
                res.data.results.map(pokemon => {
                    axios.get(pokemon.url)
                        .then(res => {
                            dispatch(SET_POKEMONS(res.data));
                        });
                });
            });

        dispatch(SET_PAGINATED_DATA(paginatedData));
    }, [])

    function addPokemonToFavorite(pokemon) {
        dispatch(SET_FAVORITE_DATA(pokemon));
        const obj = {
            type: 'success',
            message: `You add "${pokemon.name}" to favorite.`
        }

        dispatch(SET_ALERT_INFO(obj));
    }


    return (
        <div className='container'>
            {paginatedData?.map((pokemon, index) => {
                return (
                    <div className="site-card-border-less-wrapper" key={index}
                         onClick={() => {
                             dispatch(RESET_MODAL());
                             dispatch(SET_MODAL_INFO(pokemon.name))
                         }}>
                        <Card style={{width: 200}}>
                            <div className='card-name'>
                                {pokemon.name}
                                {
                                    !favoriteData?.find(item => item.name === pokemon.name) ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             onClick={() => addPokemonToFavorite(pokemon)}
                                             fill="currentColor"
                                             className="bi bi-heart" viewBox="0 0 16 16">
                                            <path
                                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                             onClick={() => dispatch(REMOVE_FAVORITE_POKEMON(pokemon.name))}
                                             fill="red"
                                             className="bi bi-heart" viewBox="0 0 16 16">
                                            <path
                                                d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                        </svg>
                                }
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
                                                <span className='info-type'>{pokemon.types[0].type.name}</span>/
                                                <span className='info-type'>{pokemon.types[1].type.name}</span>
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
            <PaginationPage/>

        </div>

    );
};

export default Pokemons;
