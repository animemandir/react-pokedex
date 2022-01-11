import React from 'react';
import {Alert} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {RESET_ALERT} from "../../store/store";

function MyAlert() {
    const dispatch = useDispatch();
    const alertInfo = useSelector(state => state.alertInfo);

    return (
        <Alert variant={alertInfo.type} style={{
            position: "fixed",
            top: 0, zIndex: '10000',
            width: "auto",
            left: 20,
            right: 20,
            marginTop: 10
        }}>
            <Alert.Heading>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <div>
                        <span>{alertInfo.message}</span>
                        {alertInfo.title && <i style={{fontWeight: "normal"}}><br/>{alertInfo.title}</i>}
                    </div>

                    <button type="button"
                            className="btn-close"
                            onClick={() => dispatch(RESET_ALERT())}
                            aria-label="Close"></button>
                </div>

            </Alert.Heading>
        </Alert>
    );
};

export default MyAlert;
