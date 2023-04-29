const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const btn = document.querySelector("button");
const ul = document.querySelector("ul");
let json = {};
let x = 0;
let result = [];
let duzcvblar = [];
let obj = {
    dogru: [],
    yanlis: [],
    bos: [],
}
init()
function basla() {
    let kod = ''
    h1.innerHTML = `Sual: ${x + 1}`;
    h2.innerHTML = json.test[x].s;
    json.test[x].c.forEach((cavab, i) => {
        kod += `<li><input onclick="cavab(this.value)" name="cvb" type="radio" value="${i}" /> ${cavab}</li>`;
        });
    ul.innerHTML = kod;
    btn.innerHTML = "Növbəti";
    result[x] = '';
    x++;
    if (x >= json.test.length) {
        btn.innerHTML = 'Nəticə';
        btn.setAttribute("onclick", "netice(json)");
    }
}

function cavab(c) {
    result[x - 1] = c;
}

function netice(json) {
    h1.innerHTML = `TEST: ${json.ad}`;
    h2.innerHTML = 'Nəticələr:';
    btn.remove();

    duzcvblar = json.test.map(item => item.d);

    for (let i = 0; i < duzcvblar.length; i++) {
        if (result[i].length == 0) {
            obj.bos.push(i);
        }
        else if (duzcvblar[i] == result[i]) {
            obj.dogru.push(i);
        } else {
            obj.yanlis.push(i);
        }
    }

    ul.innerHTML = `
            <li>Doğru: ${obj.dogru.length}</li>
            <li>Səhv: ${obj.yanlis.length}</li>
            <li>Boş: ${obj.bos.length}</li>
            <br/>
            <button onclick="window.location.reload();">Yeniden</button>
        ` ;
}

function init() {
    const ajax = new XMLHttpRequest();
    ajax.open('GET', '../data/quiz.json');
    ajax.send();
    ajax.onload = function () {
        json = JSON.parse(ajax.responseText);
        h2.innerHTML = json.ad;
    }
}