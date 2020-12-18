/*Задание 3.

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
Пример: если пользователь ввёл 5, то запрос будет вида https://picsum.photos/v2/list?limit=5.
После получения данных вывести ниже картинки на экран.*/ 


function pageLoaded() {
    const input = document.getElementById("input-3");
    const btn = document.getElementById("btn-3");
    const output = document.getElementById("output-3")   
        

btn.addEventListener("click", sendRequest);

function sendRequest(){
    
    const input = document.getElementById("input-3").value;
   
    if (validateInput(input)) {
        let xhr = new XMLHttpRequest();
        
        xhr.open("GET",`https://picsum.photos/v2/list?limit=${input}`);
        xhr.send();
        xhr.onerror = function() {
            writeOutput('При отправке запроса произошла ошибка');        
        }
        xhr.onload = function() {
            if (xhr.status != 200) return;
            let data = JSON.parse(xhr.response);
            writeOutput(formatOutput(data));
        }
    }
}
function writeOutput(message) {
    output.innerHTML = message;

}
function formatOutput(data) {
    let out =''; 
    data.forEach(element => {
        out+= `
        <img src=${element.download_url} height="200px" width="200px" />
        `
    });
    return out
}

function validateInput(value){
    let validated = true;
    if (value ==='' || isNaN(+value)){
        validated = false;
        writeOutput("Введите число от 1 до 10")
    } else { 
        if ((value <= 0) || (value > 10)){
            writeOutput("Число вне диапазона")
            validated = false;
        }
    }
    return validated;
}

}

document.addEventListener("DOMContentLoaded", pageLoaded);
