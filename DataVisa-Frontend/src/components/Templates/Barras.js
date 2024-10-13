import React from 'react'
import Plot from 'react-plotly.js'

const Barras = ({nome, valores}) => {

    return (
        <Plot
            data={
                [
                    {
                        x: ["Janeiro", "Fevereiro", "Março"],
                        y: valores,
                        z: ["1","2","3"],
                        name: 'vendas', // legenda
                        type: 'bar',
                    }
                ]
            }
            layout={{ width: 475, height: 400, title: nome }}
        />
    )
}

export default Barras