import React, {useState, useEffect} from "react";
import {sendMessage} from "./broker-socket";

export default function StockCard (el) {
    const stock = Object.entries(el)[0][1]
    const onClick = () => {
        const amount = prompt('Введите количество: ', 1);
        console.log('buy!')
        sendMessage('buy', { id: stock.id, amount })
    }

    return (
        <div className="item">
            <p>Название: {stock.name}</p>
            <p>Закон рапределения: {stock.distributionLaw}</p>
            <p>Количество акций: {stock.amount}</p>
            <p>Максимальное изменение: {stock.maxToChange}</p>
            <p>Начальная цена: {stock.startPrice}</p>
            <div>
                <button className="btn" onClick={
                    onClick
                }>
                    Купить <br/> акцию </button>
            </div>
        </div>
    )
}
