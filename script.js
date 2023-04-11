
var quantidade = document.getElementById('quantidade')
quantidade.addEventListener('keyup',()=>{
    pegaPokemons(quantidade.value)
})
pegaPokemons(10)
function pegaPokemons(quantidade){
    fetch("https://pokeapi.co/api/v2/pokemon?limit="+quantidade)//Requisição da API
    .then(response => response.json())
    .then(allpokemon => {

        var pokemons = [];
        allpokemon.results.map((val)=>{

            fetch(val.url)
            .then(response => response.json())
            .then(pokemonSingle => {
                
                pokemons.push({nome:val.name,imagem:pokemonSingle.sprites.front_default})//Coletando os nomes e fotos dos pokemons na API
            
                if(pokemons.length == quantidade){//delimitando a quantidade de pokemons escolhida pelo usuário
                    console.log(pokemons);
                    var pokemonBoxes = document.querySelector('.pokemon-boxes')
                    pokemonBoxes.innerHTML = "";//Limpando
                    pokemons.map(function(val){//Manipulando HTML dinamicamente
                        console.log(val)
                        pokemonBoxes.innerHTML+= `
                        <div class="pokemon-box">
                        <img src="`+val.imagem+`"/>
                        <p>`+val.nome+`</p>
                        </div>`
                    })
                    // Iteração do array pokemons dentro da Promise
                }
            });
        });
    });
}