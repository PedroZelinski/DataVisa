import React from 'react'
import Pizza from '../../components/Templates/Pizza.js'
import Barras from '../../components/Templates/Barras.js'
import Linhas from '../../components/Templates/Linhas.js'
import Planilha from '../../components/Templates/Planilha.js'

const ResultadoModelo = ({ height, modelo }) => {
    

    function values() {
        const trimmedValues = modelo.reportValues[0].split(', ').map(item => item.trim())
        const parsedValues = trimmedValues.map(item => parseFloat(item.replace(',', '.')))

        return parsedValues
    }
    function labels(){
        const trimmedValues = modelo.reportValues[0].split(', ').map(item => item.trim())
        const parsedValues = trimmedValues.map(item => parseFloat(item.replace(',', '.')))
        const defaultLabels = parsedValues.map((_, index) => `Valor ${index + 1}`)

        console.log(defaultLabels)

        if(modelo.labels !== undefined) return modelo.labels
        else return defaultLabels
    }

    return (
        <div className="col-9">
            {modelo.graphType == "pie" ?
                <Pizza
                    valores={values()}
                    labels={labels()}
                    layout={
                        {
                            width: 600,
                            height: height - 230,
                            title: modelo.reportName,
                            margin: {
                            r: 30, l: 110, t: 40, b: 20
                            }
                        }
                    }
                />
                : modelo.graphType == "bar" ?
                    <Barras
                        valores={values()}
                        labels={labels()}
                        layout={
                            {
                                width: 600,
                                height: height - 230,
                                title: modelo.reportName,
                                margin: {
                                    r: 30, l: 50, t: 50, b: 30
                                }
                            }} />
                    : modelo.graphType == "scatter" ?
                        <Linhas
                            valores={values()}
                            labels={labels()}
                            layout={
                                {
                                    width: 600,
                                    height: height - 230,
                                    title: modelo.reportName,
                                    margin: {
                                        r: 10, l: 50, t: 50, b: 30
                                    }
                                }}
                        /> :
                        <Planilha
                            labels={["Id", "Data", "Responsavel", "Valor"]}
                            valores={[
                                [1, 2, 3],
                                ["10/01/2024", "12/01/2024", "23/02/2024"],
                                ["Rafael", "Jhonatan", "Pedro"],
                                ["R$ 199,99", "R$ 350,00", "R$ 264,50"]
                            ]}
                            layout={
                                {
                                    width: 600,
                                    height: height - 230,
                                    title: "Planilha de Exemplo",
                                    margin: {
                                        r: 30, l: 50, t: 50, b: 30
                                    }
                                }}
                        />
            }
        </div>
    )
}

export default ResultadoModelo