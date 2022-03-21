const pokePhoto = document.getElementById("pokeImg");
const NombrePokemon = document.querySelector('[poke-nombre]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeMoves = document.querySelector('[data-poke-moves]');
const pokeMovesNum = document.querySelector('[numeromovs]');

const typeColors = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    default: '#2A1A1F',
};


const fetchPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeName = pokeNameInput.value;
    pokeName = pokeName.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokePhoto.src = "not-found.png";
            NombrePokemon.textContent="[¬º-°]¬";
            pokeStats.textContent="";
            pokeTypes.textContent="";
            pokeMoves.textContent="";
            pokeMovesNum.textContent="";
            div = document.getElementById('mostrar');
            div.style.display = 'none';
            div = document.getElementById('Mostrar_mas');
            div.style.display = 'none';
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            SetVariables(data);
            console.log(pokeImg);
        }
    });
}


const SetVariables = (data) => {
    NombrePokemon.textContent = `ID: ${data.id} ---- Nombre: ${data.name.toUpperCase()}`;
    pokePhoto.src = data.sprites.front_default;
    pokeMovesNum.textContent =`Movimiento(s): ${data.moves.length}` ;
    const { stats, types , moves} = data;
    renderPokemonStats(stats);
    renderPokemonTypes(types);
    renderPokemonMoves(moves); 
    //Mostramos el Div oculto
    div = document.getElementById('mostrar');
    div.style.display = '';
    div = document.getElementById('Mostrar_mas');
    div.style.display = '';
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderPokemonTypes = Tipos => {
    pokeTypes.innerHTML = '';
    Tipos.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.backgroundColor = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonMoves = Movimientos => {
    pokeMoves.innerHTML = '';
    Movimientos.forEach(move => {
        const typeTextElement = document.createElement("div");
        typeTextElement.textContent = move.move.name;
        pokeMoves.appendChild(typeTextElement);
    });
}
