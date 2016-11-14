$(document).ready(function () {
    $('#getNfo').on('click', function () {
        var userName = $('input').val();
        var outputNfoUser = $('#nfo');
        var outputReposUser = $('#repository');
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.github.com/users/' + userName, true);
        xhr.send();

        xhr.onload = function () {
            var dataUser = JSON.parse(xhr.responseText);
            var out = "";
            for (var i in dataUser) {
                out = out + '<br><b>' + dataUser[i] + '<b>'
            }
            outputNfoUser.html(out);
        };

        var xhrRepos = new XMLHttpRequest();
        xhrRepos.open('GET', 'https://api.github.com/users/' + userName + '/repos', true);
        xhrRepos.send();

        xhrRepos.onload = function () {
            var dataUserRepos = JSON.parse(xhrRepos.responseText);
            var out = "";
            for (var k in dataUserRepos) {
                out = out + '<br><b>' + dataUserRepos[k].name + '<b>';
                console.log(dataUserRepos);
                var xhrReposLang = new XMLHttpRequest();
                xhrReposLang.open('GET', 'https://api.github.com/repos/' + userName + '/' + dataUserRepos[k].name + '/languages', true);
                xhrReposLang.send();
                xhrReposLang.onload = function () {
                    var dataUserLang = JSON.parse(xhrReposLang.responseText);
                    var outLang = "";
                    for (var l in dataUserLang) {
                        outLang = outLang + '<br><b>' + 'JavaScript:' + dataUserLang[l] + '<b>'

                    }
                    $("#javaScrtipt").html(outLang);


            };
            outputReposUser.html(out);



            }
        };
    })
});
  