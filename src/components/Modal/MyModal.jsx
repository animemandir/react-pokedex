import React, {useEffect, useState} from 'react';
import {Modal, Progress} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {RESET_MODAL} from "../../store/store";
import axios from "axios";
import './MyModalStyle.css'

function MyModal() {
    const dispatch = useDispatch();
    const isModalVisible = useSelector(state => state.modalInfo.visibility);
    const pokemonName = useSelector(state => state.modalInfo.name);
    const [result, setResult] = useState({})

    const handleOk = () => {
        dispatch(RESET_MODAL());
        setResult({});
    };

    const handleCancel = () => {
        dispatch(RESET_MODAL());
        setResult({});
    };

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(res => setResult(res.data));
    }, [pokemonName]);

    return (
        Object.keys(result).length !== 0 ?
            <Modal title={`#${result.id} ${result.name?.toUpperCase()}`} visible={isModalVisible} onOk={handleOk}
                   onCancel={handleCancel}>
                <div className='modal-content'>
                    <img src={result.sprites?.other?.dream_world?.front_default}/>

                    <div className='pokemon-type'>
                        {
                            result.types.length > 1 ?
                                <div className='more-type'>
                                    <span className='info-type'>{result.types[0].type.name}</span>&nbsp;
                                    <span className='info-type'>{result.types[1].type.name}</span>
                                </div>
                                :
                                <span className='info-type'>
                 {result.types[0].type.name}
                     </span>
                        }
                    </div>

                    <div className='pokemon-info'>
                        <span>xp</span>
                        <Progress
                            percent={result.base_experience / 5}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            showInfo={false}
                        />
                        <span>{result.base_experience}</span>
                    </div>

                    <div className='pokemon-info'>
                        <span>attack</span>
                        <Progress
                            percent={result.game_indices[0]?.game_index / 5}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            showInfo={false}
                        />
                        <span>{result.game_indices[0]?.game_index}</span>
                    </div>

                    <div className='pokemon-info'>
                        <span>weight</span>
                        <Progress
                            percent={result.weight / 10}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            showInfo={false}
                        />
                        <span>{result.weight}</span>
                    </div>

                    <div className='pokemon-info'>
                        <span>weight</span>
                        <Progress
                            percent={result.height}
                            strokeColor={{
                                '0%': '#108ee9',
                                '100%': '#87d068',
                            }}
                            showInfo={false}
                        />
                        <span>{result.height}</span>
                    </div>


                </div>

            </Modal> : <></>
    );
};

export default MyModal;
