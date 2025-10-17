let input = document.getElementById('command-input');
let output = document.getElementById('output');

let terminalButton = document.getElementById('terminal-button');
let terminal = document.getElementById('terminal');

function showTerminal() {
    terminalButton.style.display = 'none';
    terminal.style.display = 'block';
    input.focus();

    let now = new Date();
    let loginTime = formatLoginTime(now);
    let loginElement = document.createElement('div');
    loginElement.className = 'output-line';
    loginElement.textContent = `Last login: ${loginTime}`;
    output.insertBefore(loginElement, output.firstChild);
}

function formatLoginTime(date) {
    let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                   'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    let dayName = days[date.getDay()];
    let monthName = months[date.getMonth()];
    let day = date.getDate();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${dayName} ${monthName} ${day} ${hours}:${minutes}:${seconds}`;
}

terminalButton.addEventListener('click', showTerminal)

let current_folder = 'home'

input.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const command = input.value.trim();
        
        output.innerHTML += `<div class="output-line"><span class="prompt">visitor@portfolio:~$ </span><span class="command-text">${command}</span></div>`;
        
        let response = '';
        switch(command.toLowerCase()) {
            case 'help':
                response = `Доступные команды:

    help    - показать это сообщение
    ls      - список файлов и папок
    cd      - перейти в папку
    cat     - показать содержимое файла
    home    - вернуться в начало

Пример: cat about.txt`;
                break;
            case 'home':
                response = '';
                current_folder = 'home';
                break;

            case 'ls':
                if (current_folder === 'home') {
                    response = 'cv'
                    ;}
                else if (current_folder === 'cv') {
                    response = `about.txt         education         projects.txt         contacts.txt`
                    ;}
                else if (current_folder === 'education') {
                    response = 'bachelor.txt         master.txt         other.txt'
                    ;}
                break;
            
            case 'cd education':
                response = '';
                current_folder = 'education';
                break;
            case 'cd cv':
                response = '';
                current_folder = 'cv';
                break;
            
            case 'cat about.txt':
                response = `Анастасия Целуйко
студентка программы "Машинное обучение и анализ данных"
                `;
                break;

            case 'cat projects.txt':
                response = `ФГБОУ ВО "Государственный институт русского языка имени А. С. Пушкина"
24 июля 2024 г. - 23 августа 2024 г.

• Стажировка длительностью 136 академических часов
• Поставленная задача: классификация текстов по CEFR-уровням на корпусе RuFoLa
• Полученные знания и навыки: работа с классификаторами из библиотеки scikit-learn и с библиотекой PyTorch, дообучение модели YandexGPT Pro и работа с моделью через API, дообучение модели RuBERT из библиотеки Transformers
                `;
                break;


            case 'cat contacts.txt':
                response = `github: @nastyatts
tg: @nastyatts
email: anastassiya.tseluiko@gmail.com
                `;
                break;
            
            case 'cat bachelor.txt':
                response = `Российский университет дружбы народов (РУДН) 
2017-2021 гг. 

• Факультет: Институт иностранных языков
• Специальность: Лингвистика – перевод и переводоведение
• GPA: 4.76
• Диплом совета по научно-исследовательской работе студентов I степени за лучшую выпускную работу по направлению бакалавриата ИИЯ "Лингвистика"
                `;
                break;

            case 'cat master.txt':
                response = `Национальный исследовательский университет «Высшая школа экономики» (НИУ ВШЭ) 
2025-2027 гг.

• Факультет: Школа информатики, физики и технологий
• Направление: Прикладная математика и информатика
• Программа: Машинное обучение и анализ данных
                `;
                break;

            case 'cat other.txt':
                response = `Национальный исследовательский университет «Высшая школа экономики» (НИУ ВШЭ) 
2023-2024 гг.

• Программа профессиональной переподготовки 
• Объем: 816 академических часов
• Специальность: Компьютерная лингвистика
• Изученные дисциплины: введение в математику, введение в Python, машинное обучение, компьютерная лингвистика, основы математической статистики и R
                `;
                break;


            case '':
                break;
            default:
                response = `Команда "${command}" не найдена. Введите 'help' для списка команд.`;
        }
        
        if (response) {
            output.innerHTML += `<div class="output-line">${response}</div>`;
        }
        
        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
});

terminal.addEventListener('click', function() {
    input.focus();
});