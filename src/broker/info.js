import React, {useState, useEffect} from "react";
import {Broker} from "./broker-login";
import SellStocks from "./sell-stocks";
export default function Info(id) {
    console.log(id);

    const onClick = () => {
        setIsModal(true)
    }

    const [broker, setBroker] = useState(new Broker());
    const [isModal, setIsModal] = useState(false);


    useEffect(() => {
        console.log('MEME');
        fetch(`http://localhost:3300/get_broker/${id.id}`, {
            method: 'GET',
            headers: {"Content-Type": "application/json; charset=utf-8"},
        })
            .then(r => {
                console.log(r)
                return r.json()
            })
            .then(r => {
                    console.log(r);
                    setBroker(r)
                }
            );
    }, [])
    console.log(broker)
    return (
        <div>
            {
                isModal ?
                    <div>
                        <SellStocks stocks={
                            {stocks: broker.boughtStocks,
                            id}
                        }>
                        </SellStocks>
                    </div>
                    :
                    <div>
                        <div className="brokerCard">
                            <p> {broker.name} </p>
                            <br/>
                            <p> Остаток средств: <br/> {broker.resources} </p>
                            <p> Количество акций: {broker.amount} </p>
                            <br/>
                            <img src={broker.imageURL} alt="Брокер"/>
                        </div>
                        <footer>
                            <button className="btn" onClick={onClick}> Продать акции</button>
                        </footer>
                    </div>
            }
        </div>
    )
}
