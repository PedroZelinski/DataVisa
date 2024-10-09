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
                        name: 'vendas', // legenda
                        type: 'bar',
                    }
                ]
            }
            layout={{ width: 600, height: 350, title: nome }}
        />
    )
}

export default Barras