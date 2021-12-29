import React from 'react';
import axios from "axios";
import {SET_PAGINATED_DATA, SET_POKEMONS} from "../../store/store";
import {useDispatch, useSelector} from "react-redux";
import {Pagination} from "antd";

function PaginationPage() {
    const dispatch = useDispatch();
    const pokemonsData = useSelector(state => state.pokemons);

    function onShowSizeChange(current, pageSize) {
        const lastCardIndex = current * pageSize;
        const firstCardIndex = lastCardIndex - pageSize;
        const paginatedData = pokemonsData.slice(firstCardIndex, lastCardIndex);
        dispatch(SET_PAGINATED_DATA(paginatedData));
    }

    return (
        <>
            <Pagination
                responsive
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onShowSizeChange}
                defaultCurrent={1}
                total={pokemonsData.length}
                pageSizeOptions={[10, 20, 50]}
            />

        </>
    );
};

export default PaginationPage;
