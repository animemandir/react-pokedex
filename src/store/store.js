import {configureStore, createSlice} from "@reduxjs/toolkit";

const store = createSlice({
    name: "store",
    initialState: {
        pokemons: [],
        paginatedData: [],
        favoriteData: [],
        alertInfo: false
    },
    reducers: {
        SET_POKEMONS(state, action) {
            state.pokemons.push(action.payload);

            if (state.pokemons.length === 10)
                state.paginatedData = state.pokemons.slice(0, 10);
        },

        SET_PAGINATED_DATA(state, action) {
            state.paginatedData = action.payload;
        },

        FILER_POKEMONS_BY_NAME(state, action) {
            state.paginatedData = state.pokemons.filter(el => el.name.toLowerCase().includes(action.payload.toLowerCase()));
        },

        SORT_POKEMONS(state, action) {
            switch (action.payload) {
                case "name":
                    state.paginatedData = state.pokemons.sort((a, b) => a[action.payload].localeCompare(b[action.payload]));
                case "types":
                    state.paginatedData = state.pokemons.sort((a, b) => a.types[0].type.name.localeCompare(b.types[0].type.name));
                case "base_experience":
                    state.paginatedData = state.pokemons.sort((a, b) => b[action.payload] - a[action.payload]);
            }
        },
        SET_FAVORITE_DATA(state, action) {
            state.favoriteData.push(action.payload)
        },

        REMOVE_FAVORITE_POKEMON(state, action) {
            state.favoriteData = state.favoriteData.filter(pokemon => pokemon.name != action.payload);
        },

        RESET_ALERT(state) {
            state.alertInfo = !state.alertInfo;
        },

        SET_ALERT_INFO(state, action) {
            state.alertInfo = {};
            const {type, message, title} = action.payload;
            state.alertInfo.type = type;
            state.alertInfo.message = message;
            if (title !== undefined)
                state.alertInfo.title = title;
            state.alertInfo.show = !state.alertInfo.show;
        }
    },
})


const state = configureStore({
    reducer: store.reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})

export const {
    SET_POKEMONS,
    SET_PAGINATED_DATA,
    FILER_POKEMONS_BY_NAME,
    SORT_POKEMONS,
    SET_FAVORITE_DATA,
    RESET_ALERT,
    SET_ALERT_INFO,
    REMOVE_FAVORITE_POKEMON
} = store.actions

export default state
