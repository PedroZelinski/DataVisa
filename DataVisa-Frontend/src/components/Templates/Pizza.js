import React from 'react'
import Plot from 'react-plotly.js'

const Pizza = ({ nome, valores, labels }) => {
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
            layout={
                {
                    width: 535,
                    height: 350,
                    title: nome,
                    margin: {
                        r: 30, l: 110, t: 40, b: 20
                    }
                }}
        />

    )
}

export default Pizza