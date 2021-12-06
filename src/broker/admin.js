import React, {useEffect, useState} from 'react';
import {Broker} from "./broker-login";

function Admin(props) {
    const [brokers, setBrokers] = useState([]);
    useEffect(() => {
            fetch('http://localhost:3300/get_brokers', {
                method: 'GET',
                headers: {"Content-Type": "application/json; charset=utf-8"},
            })
                .then(r => {
                    return r.json()
                })
                .then(r => {
                        let initData = [];
                        console.log(r);
                        for (let [id, el] of Object.entries(r)) {
                            console.log(id, el)
                            initData.push(new Broker(id, el.name, el.resources, el.imageURL, el.amount, el.boughtStocks))
                        }
                        setBrokers(initData)
                    }
                );
        }, []
    )

    return (
        <div className="page">
            <div className="stockContainer">
                {
                    brokers.map(i => (
                        <div >
                            <div className="item">
                                <p>Имя: {i.name}</p>
                                <p>Баланс: {i.resources}</p>
                                <p>Количество акций: {i.amount}</p>
                                <p>Количество проданных акций: {10}</p>
                                <button className='btn'> Редактирование</button>
                            </div>

                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Admin;
