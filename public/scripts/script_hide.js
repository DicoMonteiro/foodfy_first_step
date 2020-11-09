const buttons = document.querySelectorAll('.button')
const infos = document.querySelectorAll('.details__recipe')

for (let button of buttons) {
    button.addEventListener('click', function() {
        if (button.innerHTML == 'MOSTRAR'){
            button.innerHTML = 'ESCONDER'
        } else {
            button.innerHTML = 'MOSTRAR'
        }
    })
}

for (const button in buttons) {
    buttons[button].addEventListener('click', function(){
        if (infos[button].classList.contains('hide')){
            infos[button].classList.remove('hide')
        } else{
            infos[button].classList.add('hide')
        }
    })
}

// Funções de exibir ou esconder as informações da receita
// function showHide(id) {
//     var display = document.getElementById(id).style.display;
//     var element = ''
//     if (id == "ingredients"){
//         element = document.getElementById("ingredients-button");
//     }
//     else if (id == "preparation") {
//         element = document.getElementById("preparation-button");
//     }
//     else {
//         element = document.getElementById("information-button");
//     }
    
//     if(display == "none") {
//         document.getElementById(id).style.display = 'block';
//         element.innerHTML="ESCONDER";
//         // console.log('mostrou...')
//     } else {
//         document.getElementById(id).style.display = 'none';
//         // console.log('escondeu...')
//         element.innerHTML="MOSTRAR";
//     }

// }