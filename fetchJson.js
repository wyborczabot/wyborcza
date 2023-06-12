//https://gwwin8.gazeta.pl/gwipad2/v2/portalAPIArticle.json?xxArt=29859132

var intervalId=0;
var fetched=false;

function fetchjson(){
    $.ajax({
        url: 'http://www.whateverorigin.org/get?url=' + encodeURIComponent('https://gwwin8.gazeta.pl/gwipad2/v2/portalAPIArticle.json?xxArt='+id) + '&callback=?',
        type: "GET",
        dataType: "json",
        success: function (data) {
            if(!fetched){
                try{
                    console.log(JSON.parse(data.contents));
                    render(JSON.parse(data.contents))
                    fetched=true;
                    console.log("pomyślnie pobrano dane z www.whateverorigin.org/");
                    clearInterval(intervalId);
                } catch{
                    console.log("zebrano błędne dane ze strony whateverorigin.org/")
                }
            } 
            else {
                console.log("pomyślnie pobrano dane z www.whateverorigin.org/, ale przedtem pobrano z innej strony")
            }
        },
        error: function (data) {
            console.log("nie udało się pobrać danych z www.whateverorigin.org/");
        }
        });

    $.ajax({
        url: 'https://corsproxy.io/?' + encodeURIComponent('https://gwwin8.gazeta.pl/gwipad2/v2/portalAPIArticle.json?xxArt='+id),
        type: "GET",
        dataType: "json",
        success: function (data) {
            if(!fetched){
                console.log(data);
                render(data);
                fetched=true;
                console.log("pomyślnie pobrano dane z corsproxy.io/");
                clearInterval(intervalId);
            } 
            else{
                console.log("pomyślnie pobrano dane z corsproxy.io/, ale przedtem pobrano z innej strony");
            }
        },
        error: function (data) {
            console.log("nie udało się pobrać danych z corsproxy.io/");
        }
        });
    
    $.ajax({
        url: 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://gwwin8.gazeta.pl/gwipad2/v2/portalAPIArticle.json?xxArt='+id),
        type: "GET",
        dataType: "json",
        success: function (data) {
            if(!fetched) {
                console.log(data);
                render(data)
                fetched=true;
                console.log("pomyślnie pobrano dane z allorigins.win");
                clearInterval(intervalId);
            }
            else{
                console.log("pomyślnie pobrano dane z allorigins.win, ale przedtem pobrano z innej strony");
            }
        },
        error: function (data) {
            console.log("nie udało się pobrać danych z allorigins.win");
        }
        });
        
}


intervalId=setInterval(fetchjson,2000);
