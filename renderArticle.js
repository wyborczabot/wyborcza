var p = document.createElement("p");

function writeStrong(input, rozm) {
    var x = document.createElement("STRONG");
    var t = document.createTextNode(input);
    x.setAttribute("style", "font-size:" + rozm);
    x.appendChild(t);
    document.body.appendChild(x);
}

function createHTMLNode(htmlCode, tooltip) {
    var htmlNode = document.createElement('span');
    htmlNode.innerHTML = htmlCode
    htmlNode.className = 'treehtml';
    htmlNode.setAttribute('title', tooltip);
    return htmlNode;
}

function genUrl(text, redirect) {
    var a = document.createElement('a');
    var link = createHTMLNode(text);
    a.appendChild(link);
    a.title = text;
    a.href = redirect;
    return a.outerHTML;
}

function write(input) {
    p.innerHTML += input;
}
function endWrite() {
    document.body.appendChild(p);
    p = document.createElement("p");
}

function image(src, Text) {
    var img = document.createElement("img");
    img.src = src;
    img.alt = Text;
    document.body.appendChild(img);
}

function err() {
    alert("natrafiono na nieobsługiwany fragment artykulu, zglos blad deweloperowi")
}


function render(data) {

    console.log(data);

    endWrite();
    writeStrong(data.sectionName, "large");
    endWrite();

    write("Autor: ");
    write(data.signature);
    endWrite();

    write("Tagi: ");
    write((data.tags).map(e => '#'+e).join(' '));
    endWrite();

    write("Data Publikacji: ");
    var publicationDate = new Date(data.dateFromTs).toLocaleDateString();
    write(publicationDate);
    endWrite()

    writeStrong(data.title, "xxx-large");
    document.title = data.title;
    endWrite();

    var n = data.contentJson.blocks[0].elements.length, i;
    for (i = 0; i < n; ++i) {
        var obj = data.contentJson.blocks[0].elements[i];
        var type = obj.type;

        if (type == 'subTitle') {
            var Text = obj.items[0].text;
            var m = obj.items.length;
            if (m > 1) err();
            writeStrong(Text, "xx-large");
        }

        else if (type == 'paragraph') {
            var m = obj.items.length;
            var art = obj.items;
            for (var j = 0; j < m; ++j) {
                var subType = art[j].type;
                var Text = art[j].text;
                if (subType == "text") write(Text);
                else if (subType == "uomImage") continue;
                else if (subType == "externalLink") {
                    var redirect = art[j].url;
                    write(genUrl(Text, "?url=" + redirect));
                }
                else err();
            }
            endWrite();
        }
        else if (type == "interviewQuestion") {
            var m = obj.items.length;
            var art = obj.items;
            for (var j = 0; j < m; ++j) {
                var subType = art[j].type;
                var Text = art[j].text;
                if (subType == "text") writeStrong(Text, "x-large");
                else {
                    err();
                }
            }
            endWrite();
        }
        else if (type == 'unorderedList') {
            var art = obj.positions[0].items;
            var m = art.length;
            var out = "";
            for (var j = 0; j < m; ++j) {
                var subType = art[j].type;
                var Text = art[j].text;
                if (subType == "text") out += Text;
                else if (subType == "externalLink") {
                    var redirect = art[j].url;
                    out += Text;
                }
                else err();
            }
            write(genUrl(out, "?url=" + redirect));
            endWrite();
        }
        else if (type == 'embed') {
            var subType = obj.items[0].type;
            if (subType == 'uomArticle') {
                var Text = obj.items[0].text;
                var redirect = obj.items[0].url;
                endWrite();
                write(genUrl("Powiazany artykul: " + Text, "?url=" + redirect));
                endWrite();
            }
            else if (subType = "outerGifImage") {
                var src = obj.items[0].id;
                var Text = obj.items[0].text;
                endWrite();
                image(src, Text);
                endWrite();
            }
        }
        else if (type == "blockquote") {
            var Text = '"' + obj.items[0].text + '"';
            writeStrong(Text, "x-large");
            endWrite();
        }
        else if (type == 'orderedList') continue;
        else err();
    }
    endWrite();
    write("powiązane artykuły:");
    endWrite();

    data.related.forEach(function(element){
        if(element.type=="PHOTO"){
            image(element.url, element.signature);
            endWrite();
        }
        else if(element.type=="ARTICLE"){
            write(genUrl(element.title,element.url))
            endWrite();
        }
    });

    document.body.appendChild(p);
}
