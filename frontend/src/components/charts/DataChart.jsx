import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const DataChart = ({ data }) => {
  // Estado para almacenar los totales por mes
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Función para calcular los totales por mes
    const calculateMonthlyData = () => {
      const monthlyTotals = {};

      // Iterar sobre los datos para calcular los totales por mes
      data.forEach((item) => {
        const createdAt = new Date(item.created_at);
        const month = createdAt.getMonth() + 1; // +1 porque los meses comienzan desde 0 en JavaScript

        if (!monthlyTotals[month]) {
          monthlyTotals[month] = {
            cobro_cliente: 0,
            gastos: 0,
          };
        }

        // Calcular los totales por mes y convertir a moneda ARS
        monthlyTotals[month].cobro_cliente += parseFloat(item.cobro_cliente);
        monthlyTotals[month].gastos +=
          parseFloat(item.gastos_flete) +
          parseFloat(item.gastos_viaticos) +
          parseFloat(item.pago_auto);
      });

      // Convertir los totales a un formato adecuado para ApexCharts y moneda ARS
      const formattedData = Object.keys(monthlyTotals).map((month) => {
        return {
          month: parseInt(month),
          cobro_cliente: monthlyTotals[month].cobro_cliente,
          gastos: monthlyTotals[month].gastos,
        };
      });

      setMonthlyData(formattedData);

      console.log(formattedData);
    };

    calculateMonthlyData();
  }, [data]);

  // Configuración del gráfico
  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
    },
    xaxis: {
      categories: monthlyData.map((item) => `Mes ${item.month}`),
    },
    yaxis: {
      title: {
        text: "Monto (en pesos ARS)",
      },
    },
  };

  // Datos para el gráfico
  const chartSeries = [
    {
      name: "Cobro Cliente",
      data: monthlyData.map((item) => item.cobro_cliente),
    },
    {
      name: "Gastos",
      data: monthlyData.map((item) => item.gastos),
    },
  ];

  return (
    <div>
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default DataChart;
