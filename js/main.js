const display = document.getElementById('display')

document.querySelectorAll('.buttons button[data-value]').forEach(button => {
    button.addEventListener('click', function () {
        display.value += this.getAttribute('data-value')
        console.log(data-value)
    });
    
});

document.getElementById('clear').addEventListener('click', function () {
    display.value= '';
});