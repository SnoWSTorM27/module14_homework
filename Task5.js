/* Задание 5.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.

Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).*/

function pageLoaded() {
    const inputPage = document.querySelector("#input-51");
    const inputLimit = document.querySelector("#input-52");
    const btn = document.querySelector("#btn-5");
    const output = document.querySelector("#output-5")   
    if (window.localStorage.getItem('prevResponse')) {
        const data = JSON.parse(window.localStorage.getItem('prevResponse'))
        writeOutput(formatOutput(data));
    }    
    

btn.addEventListener("click", sendRequest);

function sendRequest(){
     
    
    if (validateTotal(inputPage.value,inputLimit.value)) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET",`https://picsum.photos/v2/list?page=${inputPage.value}&limit=${inputLimit.value}`);
        xhr.send();
        xhr.onerror = function() {
            writeOutput('При отправке запроса произошла ошибка');        
        }
        xhr.onload = function() {
            if (xhr.status != 200) return;
            let data = JSON.parse(xhr.response);
             
            writeOutput(formatOutput(data));
            window.localStorage.setItem('prevResponse', xhr.response);
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

function validatePage(params){
    let validated = true;
    if (params ==='' || isNaN(+params) || (params < 1) || (params > 10)){
            writeOutput("Номер страницы вне диапазона от 1 до 10")
            validated = false;
        
    }
    return validated;
}
function validateLimit(params){
    let validated = true;
    if (params ==='' || isNaN(+params) || (params < 1) || (params > 10)){
            writeOutput("Лимит вне диапазона от 1 до 10")
            validated = false;
        
    }
    return validated;
}
function validateTotal(pageValue, limitValue){
    firstval = validatePage(pageValue)
    secondval = validateLimit(limitValue)
   
    if ((!firstval) && (!secondval)){
            writeOutput("Номер страницы и лимит вне диапазона от 1 до 10")
            
        
    }
    return firstval && secondval;
}


}

document.addEventListener("DOMContentLoaded", pageLoaded);