import React from 'react'
import Plot from 'react-plotly.js'

const Barras = ({ nome, valores }) => {

    return (
        <Plot
            data={
                [
                    {
                        x: ["Janeiro", "Fevereiro", "Março"],
                        y: valores,
                        z: ["1", "2", "3"],
                        name: 'vendas', // legenda
                        type: 'bar',
                    }
                ]
            }
            layout={
                {
                    width: 500,
                    height: 300,
                    title: nome,
                    margin: {
                        r: 30, l: 60, t: 40, b: 20
                    }
                }}
        />
    )
}

export default Barras