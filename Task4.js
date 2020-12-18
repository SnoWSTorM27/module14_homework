/* Задание 4.

Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
После получения данных вывести ниже картинку на экран.

Подсказка: получение данных из input.

const value = document.querySelector('input').value;*/

function pageLoaded() {
    const input = document.querySelector("#input-4");
    const btn = document.querySelector("#btn-4");
    const output = document.querySelector("#output-4")   
        

btn.addEventListener("click", sendRequest);

function sendRequest(){
     
     
    const width  = input.value.split(" ")[0]; 
    const height = input.value.split(" ")[1];
    

    if (validateInput(width) && validateInput(height)) {
        fetch(`https://picsum.photos/${width}/${height}`)
        .then(response =>{
            writeOutput(formatOutput(response.url));
        })
    }
}
function writeOutput(message) {
    output.innerHTML = message;

}
function formatOutput(data) {
    
    return `<img src=${data} />`
}

function validateInput(dimensions){
    let validated = true;
    if (dimensions ==='' || isNaN(+dimensions) || (dimensions < 100) || (dimensions > 300)){
            writeOutput("одно из чисел вне диапазона от 100 до 300")
            validated = false;
        
    }
    return validated;
}

}

document.addEventListener("DOMContentLoaded", pageLoaded);