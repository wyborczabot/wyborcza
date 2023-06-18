const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const adres = urlParams.get('url');
console.log(adres);

if (adres == null) {
    const linkIn = prompt("witaj w aplikacji do niebieskiego motywu dla strony wyborcza.pl\nwprowadz link:");
    if (!(linkIn == "" || linkIn == null)) {
        window.open(HOME_URL + "?url=" + linkIn, "_self");
    }
}
var linkIn = adres;


var id = "";
var przec = 0;
var znak = '';
for (var i = 0; i < linkIn.length; i++) {
    znak = linkIn[i];
    if (przec == 2 && !['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(znak)) ++przec;
    if (przec == 2 && ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(znak)) id += znak;

    if (znak == ",") przec++;
}

console.log(id);
