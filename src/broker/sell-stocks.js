import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {sendMessage} from "./broker-socket";

export default function SellStocks(props) {
    let stocks = props.stocks;
    let id = props.id;

    let elems = Object.entries(stocks)[0][1];

    let stonks = [];
    for (const [id] of Object.entries(elems)) {
        stonks.push(id)

    }
    let isStonks = stonks.length;
    console.log(elems);
    const {register, handleSubmit} = useForm();
    const [result, setResult] = useState("");

    const onSubmit = (data) => {
        setResult(JSON.stringify(data));
        const amount = prompt('Введите количество: ', 1)
        sendMessage('sold', {
            broker_id: id, stock_id: data, amount
        }
        )
        window.location.reload();
    };

    return (
        <div>
            {
                isStonks ?
                    <div className="modal">
                        <div className="modal-content">
                            <div>
                                <label>Выберите акцию: </label>
                                <form onSubmit={handleSubmit(onSubmit)} id="selectBroker" className="selectBroker">
                                    <select className="selectField" {...register("stock")}>
                                        {stonks.map(el => {
                                                return (<option value={el}>
                                                    {el}
                                                </option>)
                                            }
                                        )
                                        }
                                    </select>
                                    <input type="submit" className="btn" value="Выбрать" form="selectBroker"/>
                                </form>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="modal">
                        <div className="modal-content">
                            <div>
                                <label>Выберите акцию: </label>
                                    <p>У вас нет купленных акций</p>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}
