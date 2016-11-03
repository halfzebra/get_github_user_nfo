
$(document).ready(function () {
    $('#getNfo').on('click',function (){
        var userName = $('input').val();
        var xhr = new XMLHttpRequest();
        xhr.open('GET','https://api.github.com/users/'+userName , true);
        xhr.send();

        xhr.onload = function() {
            var data= JSON.parse(xhr.responseText);


            var output="";
            for (var k in data) {
                output+='<br><b>'+data[k]+'</b>';
            }
            $('#nfo').html(output);

        }
    })});
  