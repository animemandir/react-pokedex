import Nav from "./components/Navbar/Nav";
import './style.css';
import Pokemons from "./components/Pokemons";
import 'antd/dist/antd.css';
import {useState} from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Favorite from "./components/Favorite/Favorite";
import {Redirect} from "react-router";
import MyModal from "./components/Modal/MyModal";

function App() {
    const [paginatedData, setPaginatedData] = useState([]);
    return (
        <BrowserRouter>
            <Nav/>
            <MyModal/>
            <Switch>
                <Redirect exact={true} from="/" to="/home"/>
                <Route path='/home'
                       exact={true}
                       component={() => <Pokemons paginatedData={paginatedData} setPaginatedData={setPaginatedData}/>}/>
                <Route
                    path='/favorite'
                    exact={true}
                    component={() => <Favorite/>}/>
            </Switch>
        </BrowserRouter>


    );
}

export default App;
