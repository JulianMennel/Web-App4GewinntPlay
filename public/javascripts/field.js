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

function loadFieldFromJson(fieldJson) {
    const obj = JSON.parse(fieldJson);
    for (var i=0; i<obj.field.cells.length; i++) {
        switch (obj.field.cells[i].value) {
            case 'X':
                document.getElementById(parseInt(obj.field.cells[i].row)+""+parseInt(obj.field.cells[i].col)).className = "golden";
                console.log("gold");
                break;
            case 'O':
                document.getElementById(parseInt(obj.field.cells[i].row)+""+parseInt(obj.field.cells[i].col)).className = "kupfer";
                console.log("kupfer");
                break;
            case ' ':
                document.getElementById(parseInt(obj.field.cells[i].row)+""+parseInt(obj.field.cells[i].col)).className = "silber";
                console.log("silber");
                break;
        }
    }
}

const connectWebsocket = () => {
    const socket = new WebSocket("ws://localhost:9000/websocket");
    socket.onopen = function (event) {
        console.log("Socket is now open", event);
    }
    socket.onmessage = function (message) {
        console.log("message=",message.data)
        loadFieldFromJson(message.data)
    }
    socket.onerror = function (error) {
        console.log("error=",error)
    }
    socket.onclose = function () {
        console.log("socket close")
    }
}

$(document).ready(function () {
    const spielfeld = $('#grid');
    const form = $('#set-stone');
    const formRow = $('#row');
    const formCol = $('#column');
    const API_BASE_URL = "http://localhost:9000";

    connectWebsocket();

    spielfeld.click(function (event) {
        const row2 = event.target.id[0];
        const col = event.target.id[1];
        if (!(row2 == 5 || row2 < 5 && (document.getElementById((parseInt(row2) + 1) + "" + col).className == "golden"
                                   || document.getElementById((parseInt(row2) + 1) + "" + col).className == "kupfer"))) {
            alert("Stein kann hier nicht gesetzt werden!");
        } else {
            if (!document.getElementById(row2 + "" + col).className == "coin flip silver") {
                alert("Das Feld ist bereits belegt!");
            } else {
                $.ajax({
                    url: API_BASE_URL + "/putJson",
                    method: "POST",
                    contentType: "application/json",
                    data: JSON.stringify({row: row2, column: col}),
                    success: function (data, textStatus, jqXHR) {
                        //location.replace("/put");
                        spielfeld.html(data);
                    }
                })
            }
        }
    })

    form.submit(function (event) {
        event.preventDefault();
        const row2 = parseInt(formRow.val());
        const col = parseInt(formCol.val());
        if (row2 <= 5 && row2 >= 0 && col <= 6 && col >= 0) {
            if (!(row2 == 5 || row2 < 5 && (document.getElementById((row2 + 1) + "" + col).className == "coin"
                                               || document.getElementById((row2 + 1) + "" + col).className == "coin copper"
                                               || document.getElementById((row2 + 1) + "" + col).className == "kupfer"
                                               || document.getElementById((row2 + 1) + "" + col).className == "golden"))) {
                alert("Stein kann hier nicht gesetzt werden!");
            } else {
                if (!(document.getElementById(row2 + "" + col).className == "coin flip silver" || document.getElementById(row2 + "" + col).className == "silber")) {
                    alert("Das Feld ist bereits belegt!");
                } else {
                    $.ajax({
                        url: API_BASE_URL + "/putJson",
                        method: "POST",
                        contentType: "application/json",
                        data: JSON.stringify({row: formRow.val(), column: formCol.val()}),
                        success: function (data, textStatus, jqXHR) {
                            location.replace("/put");
                        }
                    })
                }
            }
        } else if (formRow.val() && formCol.val()) {
            alert("Bitte gültige Werte eingeben!")
        }
    })

});