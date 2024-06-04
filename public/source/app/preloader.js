if (document.title === "Inicio"){

const nav = document.getElementById('nav')

if (nav){
    nav.classList.add('hidden')
    const camion = document.getElementById('camion')
    camion.classList.add('hidden')
}

document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(() => {
        nav.classList.remove('hidden')
        camion.classList.remove('hidden')
        const preloaderDiv = document.getElementById('preloader')
        
        preloaderDiv.classList.add('hidden')
    }, 1500);
})

}else{

    const nav = document.getElementById('nav')
    const main = document.getElementById('main')
    nav.classList.add('hidden')
    if(main !== null){
    main.classList.add('hidden')
    }
document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(() => {
        nav.classList.remove('hidden')
        if(main !== null){
            main.classList.remove('hidden')
            }
        const preloaderDiv = document.getElementById('preloader')
        preloaderDiv.classList.add('hidden')
    }, 1500);
})

}

