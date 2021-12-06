import React, {useEffect, useState} from "react";
import {sendMessage} from "./broker-socket";
import StockCard from "./stock-card";

export default function Stocks(stocks) {
    return (
        <div className="stockContainer">
            <div>
                {
                    stocks.stocks.map(el => {
                        return (
                            <div>
                                <StockCard el={el}>
                                </StockCard>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
