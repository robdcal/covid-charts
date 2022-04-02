var finalData, ctx, myChart;
var chartLabels = [];
var rawChartDataA = [];
var rawChartDataB = [];
var chartDataA = [];
var chartDataB = [];
var countryIDa = 273;
var countryIDb = -1;

$(document).ready(function () {
  $.ajax({
    type: "GET",
    url: "data/time_series_covid19_confirmed_global.csv",
    // url: "time_series_covid19_deaths_global.csv",
    dataType: "text",
    success: function (data) {
      finalData = $.csv.toObjects(data);
      setChartData();
    },
  });

  function setChartData() {
    chartLabels.length = 0;
    rawChartDataA.length = 0;
    rawChartDataB.length = 0;
    chartDataA.length = 0;
    chartDataB.length = 0;

    var countryA = finalData[countryIDa];

    for (const date in countryA) {
      chartLabels.push(date);
      rawChartDataA.push(countryA[date]);
    }

    for (var i = 4; i > 0; i--) {
      chartLabels.shift();
      rawChartDataA.shift();
    }

    for (var i = 0; i < rawChartDataA.length; i++) {
      if (i !== 0) {
        chartDataA.push(rawChartDataA[i] - rawChartDataA[i - 1]);
      } else {
        chartDataA.push(parseInt(rawChartDataA[i]));
      }
    }

    var countryB = finalData[countryIDb];

    for (const date in countryB) {
      // chartLabels.push(date);
      rawChartDataB.push(countryB[date]);
    }

    for (var i = 4; i > 0; i--) {
      // chartLabels.shift();
      rawChartDataB.shift();
    }

    for (var i = 0; i < rawChartDataB.length; i++) {
      if (i !== 0) {
        chartDataB.push(rawChartDataB[i] - rawChartDataB[i - 1]);
      } else {
        chartDataB.push(parseInt(rawChartDataB[i]));
      }
    }

    myChart.update();
  }

  $(".btn").click(function () {
    countryIDa = $(this).data("country");
    setChartData();
  });

  ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: chartLabels,
      datasets: [{
          label: "# of Cases",
          data: chartDataA,
          borderWidth: 1,
        },
        // {
        //   label: "# of Cases",
        //   data: chartDataB,
        //   borderWidth: 1,
        // }
      ],
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }, ],
      },
    },
  });
});