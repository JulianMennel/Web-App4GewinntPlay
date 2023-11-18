document.addEventListener("DOMContentLoaded", function(event) {
    const form = document.querySelector("form");

    form.addEventListener('submit', function(event) {
        const formData = new FormData(form);
        const row = formData.get("row");
        const col = formData.get("column");
        if (!(row == 5 || row < 5 && (document.getElementById((parseInt(row) + 1) + "" + col).className == "coin"
                                   || document.getElementById((parseInt(row) + 1) + "" + col).className == "coin copper"))) {
            alert("Stein kann hier nicht gesetzt werden!");
        } else {
            if (!document.getElementById(row + "" + col).className == "coin flip silver") {
                alert("Das Feld ist bereits belegt!");
            } else {
                document.getElementById("set-stone").action = "/put";
                document.getElementById("set-stone").method = "POST";
            }
        }

    });
});

function rotateCoin(coin) {
    switch (coin.className) {
        case 'golden':
            coin.className = "coin"
            break;
        case 'kupfer':
            coin.className = "coin copper"
            break;
        case 'silber':
            coin.className = "coin flip silver"
            break;
        default:
            console.log('ups, something went wrong');
    }
}
function staticCoin(coin) {
    switch (coin.className) {
        case "coin":
            coin.className = "golden"
            break;
        case "coin copper":
            coin.className = "kupfer"
            break;
        case "coin flip silver":
            coin.className = "silber"
            break;
        default:
            console.log('Ups, something went wrong');
    }
}