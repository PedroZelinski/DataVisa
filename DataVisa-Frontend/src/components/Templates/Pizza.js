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
            layout={{width: 600, height: 400, title: nome}}
        />

    )
}

export default Pizza