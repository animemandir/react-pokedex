import React, {useEffect, useState} from 'react';
import './MenuStyle.css'

import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {FILER_POKEMONS_BY_NAME, SORT_POKEMONS} from "../../../store/store";

function MenuSearch() {
    const dispatch = useDispatch();
    const [searchPokemon, setSearchPokemon] =useState("");
    const [sortedValue, setSortedValue] =useState("");

    useEffect(() => {
        dispatch(FILER_POKEMONS_BY_NAME(searchPokemon));
    }, [searchPokemon]);


    useEffect(()=>{
        dispatch(SORT_POKEMONS(sortedValue));
    },[sortedValue])

    return (
        <div className='menu__content'>
            <span className='app-desc'>POKEDEX</span>
            <div className='content-search'>
                <div className="searchItem">
                    <input placeholder="Search pokemon"
                           value={searchPokemon}
                           onChange={event => setSearchPokemon(event.target.value)}
                           maxLength="100"
                           type="text"

                    />
                    <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"/>
                </div>
            </div>

            <div className='select-item'>
                <select
                    name="select"
                    value={sortedValue}
                    onChange={event => setSortedValue(event.target.value)}
                >
                    <option defaultValue disabled>Sort by...</option>
                    <option value='types'>Sort by type</option>
                    <option value='name'>Sort by name</option>
                    <option value='base_experience'>Sort by experience</option>
                </select>
            </div>

        </div>
    );
};

export default MenuSearch;
