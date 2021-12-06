import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {disconnectSocket, initiateSocket, sendMessage} from "./broker-socket";
import Stocks from "./stocks";
import Info from './info'


export class Broker {
    constructor(id, name, resources, imageURL, amount, boughtStocks) {
        this.id = id;
        this.name = name;
        this.resources = resources;
        this.imageURL = imageURL;
        this.amount = amount;
        this.boughtStocks = boughtStocks;
    }
}

export class Stock {
    constructor(id, name, amount, distributionLaw, maxToChange, startPrice) {
        this.id = id;
        this.name = name;
        this.amount = amount;
        this.distributionLaw = distributionLaw;
        this.maxToChange = maxToChange;
        this.startPrice = startPrice;
    }
}


export default function BrokerLogin() {
    const [brokers, setBrokers] = useState([]);
    const [stocks, setStocks] = useState([]);
    const {register, handleSubmit} = useForm();
    const [result, setResult] = useState("");
    const [isShown, setIsShown] = useState(true);

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

    useEffect(() => {
            fetch('http://localhost:3300/get_stocks', {
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
                            initData.push(new Stock(id, el.name, el.amount, el.distributionLaw, el.maxToChange, el.startPrice));
                        }
                        setStocks(initData);
                    }
                );
        }, []
    )

    useEffect(() => {
        initiateSocket();
        return () => {
            disconnectSocket()
        };
    }, [result])

    const onSubmit = data => {
        setResult(JSON.stringify(data));
        console.log(data)
        sendMessage('broker', {
            id: data.broker
        })
        setIsShown(false)
    }

    const [item, setItem] = useState(brokers.find(item => item.id === result.id));

    return (
        <div>
            {
                isShown ? <div className="selectContainer">
                        <header>
                            <h1>Выберите брокера:</h1>
                        </header>
                        <form onSubmit={handleSubmit(onSubmit)} id="selectBroker" className="selectBroker">
                            <select className="selectField" {...register("broker")}>
                                {brokers.map(el => {
                                        return (<option value={el.id}>
                                            {el.name}
                                        </option>)
                                    }
                                )
                                }
                            </select>
                            <p>{result}</p>
                            <input type="submit" className="btn" value="Выбрать" form="selectBroker"/>
                        </form>
                    </div>
                    :
                    <div className="info">
                        <Info id={JSON.parse(result).broker}>
                        </Info>
                        <Stocks stocks={stocks}>
                        </Stocks>
                    </div>
            }

        </div>
    )
}
