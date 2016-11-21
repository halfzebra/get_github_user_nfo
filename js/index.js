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
                if ((i === 'login' || i === 'id' || i === 'name' || i === 'email') && (dataUser[i] !== null)) {
                    out = out + '<br><b>' + i + ' :' + dataUser[i] + '<b>'
                }
            }
            outputNfoUser.html(out);
        };
        var xhrRepos = new XMLHttpRequest();
        xhrRepos.open('GET', 'https://api.github.com/users/' + userName + '/repos', true);
        xhrRepos.send();
        xhrRepos.onload = function () {
            var dataUserRepos = JSON.parse(xhrRepos.responseText);
            var outRepos = "";
            var outReposLang;
            for (var k in dataUserRepos) {
                var userRepos = dataUserRepos[k].name;
                console.log(userRepos);
                outRepos = outRepos + '<br><b>' + k + ' :' + userRepos + '<b>';
                outputReposUser.html(outRepos);
                if (userRepos ==='get_github_user_nfo'){
                    outReposLang = $('#1');
                    f(userRepos ,outReposLang);
                }
                if (userRepos ==='bootstrap'){
                    outReposLang = $('#2');
                    f(userRepos ,outReposLang);
                }
                if (userRepos ==='post_req'){
                    outReposLang = $('#3');
                    f(userRepos ,outReposLang);
                }
            }
        };


        function f(userRepos,outReposLang) {
            var xhrReposLang = new XMLHttpRequest();
            xhrReposLang.open('GET', 'https://api.github.com/repos/' + userName + '/' + userRepos + '/languages', true);
            xhrReposLang.send();
            xhrReposLang.onload = function () {
                var dataUserLang = JSON.parse(xhrReposLang.responseText);
                console.log(dataUserLang);
                var outLang = "";
                for (var l in dataUserLang) {
                    outLang = outLang + '<br><b>' + l + ':' + dataUserLang[l]+ '</b>';
                }
                outReposLang.html(outLang);
            }

        }

    })
});
  