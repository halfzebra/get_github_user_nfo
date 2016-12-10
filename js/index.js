$(document).ready(function () {
    $('#getNfo').on('click', function () {
        var userName = $('input').val();
        var outputNfoUser = $('#nfo');
        var outputReposUser = $('#repository');
        var xhr = new XMLHttpRequest();
        window.arrLang = [];
        xhr.open('GET', 'https://api.github.com/users/' + userName );
        xhr.send();
        xhr.onload = function () {
            var dataUser = JSON.parse(xhr.responseText);
            var out = "";
            for (var i in dataUser) {
                if ((i === 'login' || i === 'id' || i === 'name' || i === 'email') && (dataUser[i] !== null)) {
                    out = out + '<br><b>' + i + ' :' + dataUser[i] + '<b>'
                }
            }
            outputNfoUser.html(out);
        };
        var xhrRepos = new XMLHttpRequest();
        xhrRepos.open('GET', 'https://api.github.com/users/' + userName + '/repos');
        xhrRepos.send();
        xhrRepos.onload=function () {
            var dataUserRepos = JSON.parse(xhrRepos.responseText);
            var outRepos = "";
            var arrDataCharts= [];
            for (var k in dataUserRepos) {
                arrDataCharts.push(dataUserRepos[k].name);
                var userRepos = dataUserRepos[k].name;
                outRepos = outRepos + '<br><b>' + k + ' :' + userRepos + '<b>';
                outputReposUser.html();
                getUserReposLang(userRepos);
            }
            creteChart(arrDataCharts ,window.arrLang);
            console.log(Array.isArray(window.arrLang));
        };

        function getUserReposLang(userRepos) {
            var arrReposLang=[];
            var xhrReposLang = new XMLHttpRequest();
            xhrReposLang.open('GET', 'https://api.github.com/repos/' + userName + '/' + userRepos + '/languages');
            xhrReposLang.send();
            xhrReposLang.onload = function () {
                var dataUserLang = JSON.parse(xhrReposLang.responseText);

                arrReposLang.push(dataUserLang);
                for (var l in dataUserLang){
                    $('#lang').append('<br><b>' + l + ':' + dataUserLang[l]+ '</b>');
                    window.arrLang.push(dataUserLang);
                }
            };
            return arrReposLang;
        }
        function creteChart(dataParams) {
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels:dataParams,
                    datasets: [{
                        label: '',
                        data: (window.arrLang),
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255,99,132,1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            });
        }



    });

    
});
  