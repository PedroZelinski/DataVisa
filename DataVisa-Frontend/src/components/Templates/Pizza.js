import React from 'react'
import Plot from 'react-plotly.js'

const Pizza = ({nome, valores, labels}) => {
    return (
        <Plot
            data={
                [
                    {
                        values: valores,
                        labels: labels,
                        type: 'pie'
                    }]
            }
            layout={{width: 475, height: 400, title: nome}}
        />

    )
}

export default Pizza