import React from 'react';
import { Line } from 'react-chartjs-2';

import { Chart, BarElement } from 'chart.js';

const dates: number[] = [];
const numbers: number[] = [];
const volume: number[] = [];

const data = {
  labels: dates,
  // labels: ['2023-02-28', '2023-03-01', '2023-03-02', '2023-03-03', '2023-03-04', '2023-03-05', '2023-03-06'],
  datasets: [{
    label: '取引週',
    data: numbers,
    fill: {
      target: {
        value: numbers[0]
      },
      below: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea, data, scales } = chart;
        if (!chartArea) {
          return null;
        }
        return belowGradient(ctx, chartArea, data, scales);
      },
      above: (context: any) => {
        const chart = context.chart;
        const { ctx, chartArea, data, scales } = chart;
        if (!chartArea) {
          return null;
        }
        return aboveGradient(ctx, chartArea, data, scales);
      },
    },
    borderColor: (context: any) => {
      const chart = context.chart;
      const { ctx, chartArea, data, scales } = chart;
      if (!chartArea) {
        return null;
      }
      return getGradient(ctx, chartArea, data, scales);
    },
    tension: 0,
    pointRadius: 0,
    pointHitRadius: 0,
    pointHoverRadius: 0,
    borderWidth: 2,
  }, {
    label: 'Stock Volume',
    type: 'bar',
    data: volume,
    pointHitRadius: 0,
    pointHoverRadius: 0,
    yAxisID: 'volume',
  }]
};

const setData = () => {
  for (let i = 0; i < 200; i++) {
    const date = new Date(); 
    date.setDate(date.getDate() + i);
    dates.push(date.setHours(0, 0, 0, 0));
    numbers.push(Math.random() * 10);
    volume.push(Math.random() * 100);
  }
}

// dottedLine plugin block
const dottedLine = {
  id: 'dottedLine',
  beforeDatasetsDraw(context.chart, args, pluginOptions) {
    const { ctx, data, chartArea: { left, right, width }, scales: { x, y } } = chart;
    const startingPoint = data.datasets[0].data[data.labels.indexOf(x.min)];

    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.setLineDash([1, 5]);
    ctx.strokeStyle = 'rgba(102,102,102,1)';
    ctx.moveTo(left, y.getPixelForValue(startingPoint));
    ctx.lineTo(right, y.getPixelForValue(startingPoint));
    ctx.stroke();
    ctx.closePath();
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.fillStyle = 'rgba(102,102,102,1)';
    ctx.fillRect(0, y.getPixelForValue(startingPoint) - 10, left, 20);
    ctx.closePath();

    ctx.font = '12px sans-serif';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillText(startingPoint.toFixed(2), left / 2, y.getPixelForValue(startingPoint));
}};

export const LineChart = () => {
    return (
      <>
      <div className="chartMenu">
      <p>キツネコムのチャートパル</p>
    </div>
    <div className="chartCard">
      <div className="chartBox">
        <canvas id="myChart"></canvas>
        <canvas id="myChart2"></canvas>
      </div>
    </div>
    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/chart.js/dist/chart.umd.min.js"></script>
    <script
      src="https://cdn.jsdelivr.net/npm/chartjs-adapter-date-fns/dist/chartjs-adapter-date-fns.bundle.min.js"></script>
  
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
      integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
      crossOrigin="anonymous" referrerPolicy="no-referrer" />
  

      Chart.defaults.font.family = "'FontAwesome','Helvetica', 'Helvetica Neue', 'Arial', sans-serif";
   
      setData();
    
      // imageLogo plugin block
      const logo = new Image();
      logo.src = '../img/Logo_name.png';
  
      const imageLogo = {
        id: 'imageLogo',
        beforeDatasetsDraw(chart, args, pluginOptions) {
          const { ctx, chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
          ctx.save();
          const imgWidth = 80;
          const imgHeight = 30;
          if (logo.complete) {
            ctx.drawImage(logo, right - imgWidth - 10, y.getPixelForValue(2), imgWidth, imgHeight)
          } else {
            logo.onload = () => chart.draw();
          }
          ctx.restore();
        }
      };
  
      // customToolTip plugin block
      const customTooltip = {
        id: 'customToolTip',
        afterDraw(chart, args, pluginOptions) {
          const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
          ctx.save();
  
          chart.canvas.addEventListener('mousemove', (e) => {
            tooltipPosition(e)
          });
  
          function tooltipPosition(mousemove) {
            let xTooltip;
            let yTooltip;
            const rightSide = right - mousemove.offsetX;
            if (rightSide <= 170) {
              xTooltip = mousemove.offsetX - 170;
            } else {
              xTooltip = mousemove.offsetX + 20;
            }
  
            if (mousemove.offsetY <= 100) {
              yTooltip - mousemove.offsetY + 30;
            } else {
              yTooltip = mousemove.offsetY - 80;
            }
            
            let xLeft;
            let xRight;
            if (x.min = dates[0]) {
              xLeft = x.getPixelForValue(dates[0]);
            } else {
              xLeft = left;
            }
  
            if (x.max = dates[dates.length - 1]) {
              xRight = x.getPixelForValue(dates[dates.length - 1]);
            } else {
              xRight = right;
            }
  
            if (mousemove.offsetX >= xLeft && mousemove.offsetX <= xRight && mousemove.offsetY >= top && mousemove.offsetY <= bottom) {
              ctx.beginPath();
              ctx.fillStyle = 'rgba(102,102,102, 1)';
              ctx.strokeStyle = 'rgba(102,102,102, 1)';
              ctx.lineJoin = 'round';
              ctx.lineWidth = 5;
              ctx.fillRect(xTooltip, yTooltip, 150, 60);
              ctx.strokeRect(xTooltip, yTooltip, 150, 60);
              ctx.closePath();
              ctx.restore();
  
              const dateCursor = new Date(x.getValueForPixel(mousemove.offsetX));
              const dateIndex = dates.indexOf(dateCursor.setHours(0, 0, 0, 0));
  
              // text date
              ctx.textAlign = 'left';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = 'white';
              ctx.font = 'bolder 12px sans-serif';
              ctx.fillText(dateCursor.toLocaleDateString(), xTooltip + 5, yTooltip + 10);
              ctx.restore();
  
              // text time
              ctx.textAlign = 'right';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = 'lightgrey';
              ctx.font = 'bolder 10px sans-serif';
              ctx.fillText(new Date(x.getValueForPixel(mousemove.offsetX)).toLocaleTimeString(), xTooltip + 150 - 5, yTooltip + 10);
              ctx.restore();
  
              // line 2 color dot
              let dotColor;
              if(numbers[dateIndex] > numbers[0]) {
                dotColor = 'rgba(75, 192, 192, 1)';
              } else {
                dotColor = 'rgba(255, 26, 104, 1)';
              };
  
              const dotSpace = 15;
              ctx.textAlign = 'left';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = dotColor;
              ctx.font = 'bolder 12px FontAwesome';
              ctx.fillText('\uf111', xTooltip + 5, yTooltip + 30);
              ctx.restore();
  
              // line 2 text price
              const priceText = 'Price: ';
              const priceTextWidth = ctx.measureText(priceText).width;
              ctx.textAlign = 'left';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = 'lightgrey';
              ctx.font = 'bolder 12px sans-serif'; 
              ctx.fillText(priceText, xTooltip + 5 + dotSpace, yTooltip + 30);
              ctx.restore();
  
              // line 2 price value
              ctx.textAlign = 'left';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = 'white';
              ctx.font = '12px sans-serif';
              ctx.fillText(' $ ' + numbers[dateIndex].toFixed(2), xTooltip + 5 + dotSpace + priceTextWidth, yTooltip + 30);
              ctx.restore();
  
              // line 3 icon
              const iconSpace = 15;
              ctx.textAlign = 'left';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = 'white';
              ctx.font = 'bolder 12px FontAwesome';
              ctx.fillText('\uf080', xTooltip + 5, yTooltip + 50);
              ctx.restore();
  
              // line 3 text value
              const valueText = 'Value: ';
              const valueTextWidth = ctx.measureText(valueText).width;
              ctx.textAlign = 'left';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = 'lightgrey';
              ctx.font = '12px sans-serif';
              ctx.fillText(valueText, xTooltip + 5 + iconSpace, yTooltip + 50);
              ctx.restore();
  
              // line 3 price value
              ctx.textAlign = 'left';
              ctx.textBaseLine = 'middle';
              ctx.fillStyle = 'white';
              ctx.font = 'bolder 12px sans-serif';
              ctx.fillText(volume[dateIndex].toFixed(0), xTooltip + 5 + iconSpace + valueTextWidth, yTooltip + 50);
              ctx.restore();
  
  
            };
          };
        }
      };
  
      // config 
      const config = {
        type: 'line',
        data,
        options: {
          layout: {
            padding: {
              left: 10,
              right: 5,
            }
          },
          scales: {
            x: {
              type: 'time', // use 'timeseries' to skip weekends
              time: {
                unit: 'day'
              },
              min: dates[0],
              max: dates[dates.length - 1],
              grid: {
                // display: false
                drawOnChartArea: false,
                drawTicks: true,
                drawBorder: false,
                offset: false,
              },
              ticks: {
                callback: ((value, index, values) => {
                  const totalTicks = values.length - 2;
                  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const currentTick = new Date(values[index].value);
  
                  if (currentTick.getDate() === 1) {
                    return monthArray[currentTick.getMonth()];
                  }
                  if (currentTick.getDate() === 10
                    || currentTick.getDate() === 20) {
                    return currentTick.getDate();
                  }
                  if (totalTicks < 40) {
                    return currentTick.getDate();
                  }
                }),
                font: {
                  weight: (values) => {
                    if (values.tick.label.length === 3) {
                      return 'bold';
                    }
                  }
                }
              },
            },
            y: {
              beginAtZero: true
            },
            volume: {
              type: 'linear',
              position: 'right',
              min: 0,
              max: 1000,
              grid: {
                display: false
              },
              ticks: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false
            },
          }
        },
        plugins: [dottedLine, imageLogo, customTooltip]
      };
  
      // render init block
      const myChart = new Chart(
        document.getElementById('myChart'),
        config
      );
  
      function getGradient(ctx, chartArea, data, scales) {
        const { left, right, top, bottom, width, height } = chartArea;
        const { x, y } = scales;
        const gradientBorder = ctx.createLinearGradient(0, 0, 0, bottom);
        let shift = y.getPixelForValue(data.datasets[0].data[data.labels.indexOf(x.min)]) / bottom; // pixel percentage shift
  
        if (shift > 1) {
          shift = 1;
        }
  
        if (shift < 0) {
          shift = 0;
        }
  
  
        gradientBorder.addColorStop(0, 'rgba(75, 192, 192, 1)');
        gradientBorder.addColorStop(shift, 'rgba(75, 192, 192, 1)');
        gradientBorder.addColorStop(shift, 'rgba(255, 26, 104, 1)');
        gradientBorder.addColorStop(1, 'rgba(255, 26, 104, 1)');
        return gradientBorder;
      };
  
      function belowGradient(ctx, chartArea, data, scales) {
        const { left, right, top, bottom, width, height } = chartArea;
        const { x, y } = scales;
        const gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, bottom);
        gradientBackground.addColorStop(0, 'rgba(255, 26, 104, 0)');
        gradientBackground.addColorStop(1, 'rgba(255, 26, 104, 0.5)');
        return gradientBackground;
      };
  
      function aboveGradient(ctx, chartArea, data, scales) {
        const { left, right, top, bottom, width, height } = chartArea;
        const { x, y } = scales;
        const gradientBackground = ctx.createLinearGradient(0, y.getPixelForValue(data.datasets[0].data[0]), 0, top);
        gradientBackground.addColorStop(0, 'rgba(75, 192, 192, 0)');
        gradientBackground.addColorStop(1, 'rgba(75, 192, 192, 0.5)');
        return gradientBackground;
      };
  
      myChart.canvas.addEventListener('mousemove', (e) => {
        crosshairLine(myChart, e)
      });
  
      function crosshairLine(chart, mousemove) {
        const { canvas, ctx, chartArea: { left, right, top, bottom } } = chart;
  
        const coorX = mousemove.offsetX;
        const coorY = mousemove.offsetY;
  
        chart.update('none');
        ctx.restore();
  
        if (coorX >= left && coorX <= right && coorY >= top && coorY <= bottom) {
          canvas.style.cursor = 'crosshair';
        } else {
          canvas.style.cursor = 'default';
        }
  
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#666';
        ctx.setLineDash([3, 3]);
  
        if (coorX >= left && coorX <= right && coorY >= top && coorY <= bottom) {
          // Horizontal Line
          ctx.beginPath();
          ctx.moveTo(left, coorY);
          ctx.lineTo(right, coorY);
          ctx.stroke();
          ctx.closePath();
  
          // Vertical Line
          ctx.beginPath();
          ctx.moveTo(coorX, top);
          ctx.lineTo(coorX, bottom);
          ctx.stroke();
          ctx.closePath();
  
          crosshairLabel(chart, mousemove);
          crosshairPoint(chart, mousemove);
        }
        ctx.setLineDash([]);
      };
  
      function crosshairLabel(chart, mousemove) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
  
        const coorX = mousemove.offsetX;
        const coorY = mousemove.offsetY;
        const textWidth = ctx.measureText(new Date(x.getValueForPixel(coorX)).toLocaleString()).width + 10;
  
        ctx.font = '12px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';
  
        // yLabel
        ctx.beginPath();
        ctx.fillStyle = 'rgba(132, 132, 132, 1)';
        ctx.fillRect(0, coorY - 10, left, 20);
        ctx.closePath();
  
        ctx.fillStyle = 'white';
        ctx.fillText(y.getValueForPixel(coorY).toFixed(2), left / 2, coorY);
  
        // xLabel
        ctx.beginPath();
        ctx.fillStyle = 'rgba(132, 132, 132, 1)';
        ctx.fillRect(coorX - (textWidth / 2), bottom, textWidth, 20);
        ctx.closePath();
  
        ctx.fillStyle = 'white';
        ctx.fillText(new Date(x.getValueForPixel(coorX)).toLocaleString(), coorX, bottom + 10);
  
      };
  
      function crosshairPoint(chart, mousemove) {
        const { ctx, data, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
  
        const coorX = mousemove.offsetX;
        const coorY = mousemove.offsetY;
  
        ctx.beginPath();
        // ctx.fillStyle = 'rgba(255, 26, 104, 1)';
        ctx.strokeStyle = '#FFF';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
  
        const angle = Math.PI / 180;
  
        const leftOffset = x.getPixelForValue(x.min) - left;
        const rightOffset = right - x.getPixelForValue(x.max);
        const width2 = width - (leftOffset + rightOffset);
  
  
        const segments = width2 / (dates.indexOf(x.max) - dates.indexOf(x.min));
        const yOpening = y.getPixelForValue(data.datasets[0].data[0]); // solid
        let index = Math.floor((coorX - (left + leftOffset)) / segments) + dates.indexOf(x.min);
  
        let yStart = y.getPixelForValue(data.datasets[0].data[index]);
        let yEnd = y.getPixelForValue(data.datasets[0].data[index + 1]);
        let yInterpolation = yStart + ((yEnd - yStart) / segments * (coorX - x.getPixelForValue(data.labels[index])));
  
        if (yOpening >= yInterpolation) {
          ctx.fillStyle = 'rgba(75, 192, 192, 1)';
        } else {
          ctx.fillStyle = 'rgba(255, 26, 104, 1)';
        }
  
        // draw the circle
        ctx.arc(
          coorX,
          yInterpolation,
          5,
          angle * 0,
          angle * 360,
          false
        );
        ctx.fill();
        ctx.stroke();
      }
  
      function zoom(chart, mousewheel) {
        const min = chart.config.options.scales.x.min;
        const max = chart.config.options.scales.x.max;
  
        const timestamp = chart.scales.x.getValueForPixel(mousewheel.offsetX);
        const dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);
        const scrollPoint = dates.indexOf(dayTimestamp);
  
        if (mousewheel.wheelDeltaY >= 0) {
          chart.config.options.scales.x.min = dates[dates.indexOf(min) + 1]
          chart.config.options.scales.x.max = dates[dates.indexOf(max) - 1]
  
          if (dates[dates.indexOf(min)] <= 0) {
            chart.config.options.scales.x.min = dates[0];
          }
  
          if (dates.indexOf(min) >= scrollPoint - 4 && dates.indexOf(min) <= scrollPoint) {
            chart.config.options.scales.x.min = min;
          }
  
          if (dates.indexOf(max) <= scrollPoint + 4 && dates.indexOf(max) >= scrollPoint) {
            chart.config.options.scales.x.max = max;
          }
        }
  
        if (mousewheel.wheelDeltaY < 0) {
          chart.config.options.scales.x.min = dates[dates.indexOf(min) - 1]
          chart.config.options.scales.x.max = dates[dates.indexOf(max) + 1]
  
          if (dates[dates.indexOf(max)] >= dates[dates.length - 1]) {
            chart.config.options.scales.x.max = dates[dates.length - 1];
          }
  
          const weekms = 86400000 * 14;
          const range = max - min;
          if (range >= weekms) {
            if (dates.indexOf(min) >= scrollPoint - 4 && dates.indexOf(min) <= scrollPoint) {
              chart.config.options.scales.x.min = min;
            }
  
            if (dates.indexOf(max) <= scrollPoint + 4 && dates.indexOf(max) >= scrollPoint) {
              chart.config.options.scales.x.max = max;
            }
          }
        };
  
        // if(dates[dates.indexOf(min)] <= 0) {
        //   chart.config.options.scales.x.min = dates[0];
        // }
  
        // if(dates[dates.indexOf(max)] >= dates[dates.length - 1]) {
        //   chart.config.options.scales.x.max = dates[dates.length - 1];
        // }
        zoomedArea(min, max);
        chart.update('none');
      }
      myChart.canvas.addEventListener('wheel', (e) => {
        zoom(myChart, e);
      })
  
      // setup 
      const data2 = {
        labels: dates,
        datasets: [{
          label: '取引週',
          data: numbers,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          fill: true,
          pointRadius: 0,
          pointHoverRadius: 0,
          pointHitRadius: 0,
          borderWidth: 1,
        }]
      };
  
      // config 
      const config2 = {
        type: 'line',
        data: data2,
        options: {
          animation: false,
          layout: {
            padding: {
              left: myChart.chartArea.left - myChart.config.options.layout.padding.left,
              right: myChart.width - myChart.chartArea.right,
            },
          },
          aspectRatio: 10,
          scales: {
            x: {
              type: 'time', // use 'timeseries' to skip weekends
              time: {
                unit: 'day'
              },
              min: dates[0],
              max: dates[dates.length - 1],
              grid: {
                drawborder: false,
                drawTicks: false,
              },
              ticks: {
                mirror: true,
                callback: ((value, index, values) => {
                  const totalTicks = values.length - 2;
                  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                  const currentTick = new Date(values[index].value);
  
                  if (currentTick.getDate() === 1) {
                    return monthArray[currentTick.getMonth()];
                  }
                  if (currentTick.getDate() === 10
                    || currentTick.getDate() === 20) {
                    return currentTick.getDate();
                  }
                  if (totalTicks < 40) {
                    return currentTick.getDate();
                  }
                }),
                font: {
                  weight: (values) => {
                    if (values.tick.label.length === 3) {
                      return 'bold';
                    }
                  }
                }
              }
            },
            y: {
              beginAtZero: true,
              ticks: {
                display: false,
              },
              grid: {
                display: false,
                drawborder: false,
              },
            }
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
            },
          }
        }
      };
  
      // render init block
      const myChart2 = new Chart(
        document.getElementById('myChart2'),
        config2
      );
  
      window.onload = function () {
        zoomedArea(dates[0], dates[dates.length - 1]);
      };
  
      function zoomedArea(min, max) {
        // area
        myChart2.update('none');
        const { ctx, canvas, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = myChart2;
  
        if (min === undefined) min = dates[0];
  
        zoomedAreaItem(min, max);
        function zoomedAreaItem(min, max) {
  
          if (min === undefined || min === -1) {
            min = dates[0];
          }
  
          ctx.save();
          ctx.beginPath();
          ctx.fillStyle = 'rgba(54, 162, 235, 0.2)';
          ctx.fillRect(x.getPixelForValue(min), top, x.getPixelForValue(max) - x.getPixelForValue(min), height);
          ctx.closePath();
          ctx.restore();
  
          // slider
          const angle = Math.PI / 180;
  
          slider(x.getPixelForValue(min));
          slider(x.getPixelForValue(max));
          function slider(position) {
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(54, 162, 235, 1)';
            ctx.lineWidth = 2;
            ctx.fillStyle = '#FFF';
            ctx.arc(position, height / 2, 10, angle * 0, angle * 360, false);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
  
            ctx.strokeStyle = 'rgba(54, 162, 235, 1)';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(position - 3, height / 2 - 5);
            ctx.lineTo(position - 3, height / 2 + 5);
            ctx.stroke();
  
            ctx.beginPath();
            ctx.moveTo(position + 3, height / 2 - 5);
            ctx.lineTo(position + 3, height / 2 + 5);
            ctx.stroke();
            ctx.restore();
          };
        };
  
  
        canvas.addEventListener('mousemove', (e) => {
          mouseCursor(e)
        });
  
        function mouseCursor(mousemove) {
          let minChart1 = myChart.config.options.scales.x.min;
  
          if (minChart1 === undefined || minChart1 === -1) {
            minChart1 = dates[0];
          };
  
          if (
            mousemove.offsetX >= x.getPixelForValue(minChart1) - 10
            && mousemove.offsetX <= x.getPixelForValue(minChart1) + 10
            || mousemove.offsetX > x.getPixelForValue(myChart.config.options.scales.x.max) - 10
            && mousemove.offsetX < x.getPixelForValue(myChart.config.options.scales.x.max) + 10) {
            canvas.style.cursor = 'ew-resize'; // east-west resize
          } else if (
            mousemove.offsetX > x.getPixelForValue(minChart1) + 10
            && mousemove.offsetX < x.getPixelForValue(myChart.config.options.scales.x.max) - 10) {
            canvas.style.cursor = 'move';
          } else {
            canvas.style.cursor = 'default';
          }
        };
  
        canvas.addEventListener('mousedown', (e) => {
          dragStart(e);
        });
  
        window.addEventListener('mouseup', (e) => {
          canvas.onmousemove = null;
        })
  
        function dragStart(drag) {
          let minChart1 = myChart.config.options.scales.x.min;
          let maxChart1 = myChart.config.options.scales.x.max;
          if (minChart1 === undefined || minChart1 === -1) {
            minChart1 = dates[0];
          };
  
          if (drag.offsetX >= x.getPixelForValue(minChart1) - 10
            && drag.offsetX <= x.getPixelForValue(minChart1) + 10) {
            canvas.onmousemove = (e) => {
              dragMove(myChart, e);
            };
  
            function dragMove(myChart, dragDelta) {
              const timestamp = x.getValueForPixel(dragDelta.offsetX);
              const dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);
              let scrollPoint = dates.indexOf(dayTimestamp);
  
              if (dragDelta.offsetX < left && scrollPoint === -1) {
                scrollPoint = 0;
              }
  
              if (dragDelta.offsetX > right && scrollPoint === -1) {
                scrollPoint = dates.indexOf(myChart.config.options.scales.x.max) - 4;
              }
  
              if (scrollPoint > dates.indexOf(myChart.config.options.scales.x.max) - 4) {
                scrollPoint = dates.indexOf(myChart.config.options.scales.x.max) - 4;
              }
  
              myChart.config.options.scales.x.min = dates[scrollPoint];
              myChart.update('none');
              myChart2.update('none');
              zoomedAreaItem(dates[scrollPoint], myChart.config.options.scales.x.max);
            }
          };
  
          if (drag.offsetX >= x.getPixelForValue(myChart.config.options.scales.x.max) - 10
            && drag.offsetX <= x.getPixelForValue(myChart.config.options.scales.x.max) + 10) {
            canvas.onmousemove = (e) => {
              dragMove(myChart, e);
            };
  
            function dragMove(myChart, dragDelta) {
              const timestamp = x.getValueForPixel(dragDelta.offsetX);
              const dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);
              let scrollPoint = dates.indexOf(dayTimestamp);
  
              if (dragDelta.offsetX > right && scrollPoint === -1) {
                scrollPoint = dates.length - 1;
              }
  
              if (dragDelta.offsetX < left && scrollPoint === -1) {
                scrollPoint = dates.indexOf(myChart.config.options.scales.x.min) + 4;
              }
  
              if (scrollPoint < dates.indexOf(myChart.config.options.scales.x.min) + 4) {
                scrollPoint = dates.indexOf(myChart.config.options.scales.x.min) + 4;
              }
  
              myChart.config.options.scales.x.max = dates[scrollPoint];
              myChart.update('none');
              myChart2.update('none');
              zoomedAreaItem(myChart.config.options.scales.x.min, dates[scrollPoint]);
            };
          };
  
          if (drag.offsetX > x.getPixelForValue(myChart.config.options.scales.x.min) + 11
            && drag.offsetX < x.getPixelForValue(myChart.config.options.scales.x.max) - 11) {
            canvas.onmousemove = (e) => {
              dragMoveCenter(myChart, e, minChart1, maxChart1);
            };
  
            function dragMoveCenter(myChart, dragDelta, staticScaleMin, staticScaleMax) {
              // starting point
              const dragStartingPoint = x.getValueForPixel(drag.offsetX);
              const dayDragStartingPoint = new Date(dragStartingPoint).setHours(0, 0, 0, 0);
              let dragStart = dates.indexOf(dayDragStartingPoint);
  
              // difference
              const timestamp = x.getValueForPixel(dragDelta.offsetX);
              const dayTimestamp = new Date(timestamp).setHours(0, 0, 0, 0);
              let scrollPoint = dates.indexOf(dayTimestamp);
  
              const difference = scrollPoint - dragStart;
  
              if (scrollPoint === -1 && dragDelta.offsetX >= right) {
                scrollPoint = dates.length - 1;
              };
  
              const range = dates.indexOf(staticScaleMax) - dates.indexOf(staticScaleMin);
              const minVal = dates.indexOf(staticScaleMax) + difference - range; // 0
              const maxVal = dates.indexOf(staticScaleMax) + difference; // 199
  
              let minChart1;
              let maxChart1;
  
              if (minVal <= 0 && dragDelta.offsetX < right) {
                minChart1 = dates[0];
                maxChart1 = dates[range];
              } else if (maxVal >= dates.length - 1
                || difference < 0
                && dragDelta.offsetX >= right) {
                minChart1 = dates[dates.length - 1 - range];
                maxChart1 = dates[dates.length - 1];
              } else {
                minChart1 = dates[dates.indexOf(staticScaleMin) + difference];
                maxChart1 = dates[dates.indexOf(staticScaleMax) + difference];
              }
  
              // let difference2 = 0;
  
              // if (dragDelta.movementX > 0) {
              //   difference2 = 1;
              // }
  
              // if (dragDelta.movementX < 0) {
              //   difference2 = -1;
              // }
  
              // let minChart1 = dates[dates.indexOf(myChart.config.options.scales.x.min) + difference];
              // let maxChart1 = dates[dates.indexOf(myChart.config.options.scales.x.max) + difference];
  
              if (minChart1 === undefined) {
                minChart1 = dates[0];
              };
  
              if (maxChart1 === undefined) {
                maxChart1 = dates[dates.length - 1];
              };
  
              if (minChart1 === dates[0]) {
                myChart.config.options.scales.x.min = dates[0];
                myChart.config.options.scales.x.max = myChart.config.options.scales.x.max;
              } else if (maxChart1 === dates[dates.length - 1]) {
                myChart.config.options.scales.x.min = myChart.config.options.scales.x.min;
                myChart.config.options.scales.x.max = dates[dates.length - 1];
              } else if (myChart.config.options.scales.x.min >= dates[0]
                && myChart.config.options.scales.x.max <= dates[dates.length - 1]) {
                myChart.config.options.scales.x.min = minChart1;
                myChart.config.options.scales.x.max = maxChart1;
              }
  
              myChart.update('none');
              myChart2.update('none');
              zoomedAreaItem(minChart1, maxChart1);
            };
          };
        };
      };
  
      window.addEventListener('resize', (e) => {
        myChart2.resize();
        zoomedArea(myChart.config.options.scales.x.min, myChart.config.options.scales.x.max);
      });

    </>
    );
  }