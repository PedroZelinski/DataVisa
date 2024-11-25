import React from 'react'
import Pizza from '../../components/Templates/Pizza.js'
import Barras from '../../components/Templates/Barras.js'
import Linhas from '../../components/Templates/Linhas.js'
import Planilha from '../../components/Templates/Planilha.js'

const ResultadoModelo = ({ height, tipo, valores, labels }) => {
    return (
        <div className="col-9">
            {tipo == "Gráfico de Pizza" ?
                <Pizza
                    valores={["25", "30", "67", "6"]}
                    labels={["Text 1", "Text 2", "Text 3", "Text 4"]}
                    layout={
                        {
                            width: 600,
                            height: height - 230,
                            title: "Grafico de Teste",
                            margin: {
                                r: 30, l: 110, t: 40, b: 20
                            }
                        }
                    }
                />
                : tipo == "Gráfico de Barras" ?
                    <Barras
                        valores={[31, 23, 57]}
                        labels={["Valor 1", "Valor 2", "Valor 3"]}
                        layout={
                            {
                                width: 600,
                                height: height - 230,
                                title: "Grafico de Exemplo",
                                margin: {
                                    r: 30, l: 50, t: 50, b: 30
                                }
                            }} />
                    : tipo == "Gráfico de Linhas" ?
                        <Linhas
                            valores={[15, 5, 12, 43]}
                            labels={["Valor 1", "Valor 2", "Valor 3", "valor 4"]}
                            layout={
                                {
                                    width: 600,
                                    height: height - 230,
                                    title: "Grafico de Exemplo",
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