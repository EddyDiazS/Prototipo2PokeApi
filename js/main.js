    $(document).ready(function () {
        $("#buscar").on("click", function (){
            var pokemonName = $("#txt_buscador").val().toLowerCase();
            $.ajax({
                url: "https://pokeapi.co/api/v2/pokemon/" + pokemonName,
                contentType: "application/json",
                success: function (data) {

                    mostrarInformacionPokemon(data);
                },
                error: function (xhr, status, error) {

                    mostrarError("ERROR 404 POKEMON NO ENCONTRADO");
                }
            });
        });

        $("#limpiar").on("click", function() {

            $(".pokemon-info").hide();
            $(".imagen").empty();
            $(".stats-container").empty();
            $(".info-container").empty(); 
            $(".error-container").hide();
            $(".error-message").hide();
        });
        const tipoColorMap = {
            bug: "bug",
            dark: "dark",
            dragon: "dragon",
            electric: "electric",
            fairy: "fairy",
            fighting: "fighting",
            fire: "fire",
            flying: "flying",
            ghost: "ghost",
            grass: "grass",
            ground: "ground",
            ice: "ice",
            normal: "normal",
            poison: "poison",
            psychic: "psychic",
            rock: "rock",
            steel: "steel",
            water: "water"
        };
        function mostrarInformacionPokemon(data) {
            $(".error-message").hide(); 
            var tipoPokemon = obtenerTipoPokemon(data);
            if (tipoPokemon !== null) {
                $(".pokemon-info").show();
                asignarClaseColor(tipoPokemon);
                $(".imagen").html(`<img src="${data.sprites.other["official-artwork"].front_default}" alt="${data.name}" class="pokemon-img">`);
                mostrarNombre(data.name);
                mostrarClase(tipoPokemon);
                mostrarTipoSymbol(tipoPokemon); 
                mostrarEstadisticas(data.stats);
            } else {
                mostrarError("Error 404: Pokémon no encontrado."); 
            }
        }
        
        function obtenerTipoPokemon(data) {
           
            if (data.types && data.types.length > 0) {
                // Obtener el primer tipo de Pokémon de los datos recibidos
                return data.types[0].type.name;
            }
            return null; 
        }
        
        function mostrarTipoSymbol(tipoPokemon) {
            var tipoSymbol = $('<div class="type-symbol"></div>'); 
            tipoSymbol.addClass(tipoColorMap[tipoPokemon]); // Agregar la clase correspondiente al tipo de Pokémon
            $(".imagen").append(tipoSymbol); 
        }
        
        function asignarClaseColor(tipoPokemon) {
            console.log("Tipo de Pokémon:", tipoPokemon);
        
           
            $(".pokemon-info").removeClass("bug dark dragon electric fairy fighting fire flying ghost grass ground ice normal poison psychic rock steel water");
            
            
            switch (tipoPokemon) {
                case "bug":
                    console.log("Agregando clase: bug");
                    $(".pokemon-info").addClass("bug");
                    break;
                case "dark":
                    console.log("Agregando clase: dark");
                    $(".pokemon-info").addClass("dark");
                    break;
                case "dragon":
                    console.log("Agregando clase: dragon");
                    $(".pokemon-info").addClass("dragon");
                    break;
                case "electric":
                    console.log("Agregando clase: electric");
                    $(".pokemon-info").addClass("electric");
                    break;
                case "fairy":
                    console.log("Agregando clase: fairy");
                    $(".pokemon-info").addClass("fairy");
                    break;
                case "fighting":
                    console.log("Agregando clase: fighting");
                    $(".pokemon-info").addClass("fighting");
                    break;
                case "fire":
                    console.log("Agregando clase: fire");
                    $(".pokemon-info").addClass("fire");
                    break;
                case "flying":
                    console.log("Agregando clase: flying");
                    $(".pokemon-info").addClass("flying");
                    break;
                case "ghost":
                    console.log("Agregando clase: ghost");
                    $(".pokemon-info").addClass("ghost");
                    break;
                case "grass":
                    console.log("Agregando clase: grass");
                    $(".pokemon-info").addClass("grass");
                    break;
                case "ground":
                    console.log("Agregando clase: ground");
                    $(".pokemon-info").addClass("ground");
                    break;
                case "ice":
                    console.log("Agregando clase: ice");
                    $(".pokemon-info").addClass("ice");
                    break;
                case "normal":
                    console.log("Agregando clase: normal");
                    $(".pokemon-info").addClass("normal");
                    break;
                case "poison":
                    console.log("Agregando clase: poison");
                    $(".pokemon-info").addClass("poison");
                    break;
                case "psychic":
                    console.log("Agregando clase: psychic");
                    $(".pokemon-info").addClass("psychic");
                    break;
                case "rock":
                    console.log("Agregando clase: rock");
                    $(".pokemon-info").addClass("rock");
                    break;
                case "steel":
                    console.log("Agregando clase: steel");
                    $(".pokemon-info").addClass("steel");
                    break;
                case "water":
                    console.log("Agregando clase: water");
                    $(".pokemon-info").addClass("water");
                    break;
                default:
                    
                    console.log("Tipo de Pokémon no válido:", tipoPokemon);
                    break;
            }
        
            
            console.log("Clases finales:", $(".pokemon-info").attr("class"));
        }
        
        
           
        function mostrarNombre(nombre) {
            $(".info-container").html(`<h2>Nombre:</h2><p>${nombre}</p>`);
        }

        function mostrarClase(clase) {
            $(".info-container").append(`<h2>Clase:</h2><p>${clase}</p>`);
        }

        function mostrarEstadisticas(stats) {
            var statsContainer = $(".stats-container");
            statsContainer.empty().append("<h2>Estadísticas:</h2>");
            
            stats.forEach(function(stat) {
                var statName;
                switch (stat.stat.name) {
                    case "hp":
                        statName = "Vida";
                        break;
                    case "attack":
                        statName = "Ataque";
                        break;
                    case "defense":
                        statName = "Defensa";
                        break;
                    case "special-attack":
                        statName = "Ataque Especial";
                        break;
                    case "special-defense":
                        statName = "Defensa Especial";
                        break;
                    case "speed":
                        statName = "Velocidad";
                        break;
                    default:
                        statName = stat.stat.name; // Utilizar el nombre original si no hay una traducción definida
                }
                
                var statBar = $('<div class="stat-bar"></div>');
                var statFill = $('<div class="stat-fill"></div>').css('width', (stat.base_stat / 2) + '%');
                var statLabel = $('<span class="stat-label">' + statName + '</span>'); 
                var statValue = $('<span class="stat-value">' + stat.base_stat + '</span>').css('font-size', '18px'); 
                
                statBar.addClass("stat-" + stat.stat.name); 
                statBar.append(statLabel);
                statBar.append(statFill);
                statBar.append(statValue);
                statsContainer.append(statBar);
            });
        }
        
        
        function mostrarError(mensaje) {
            $(".error-message").text(mensaje).show(); // Mostrar el mensaje de error personalizado
        }

    });

    document.addEventListener('DOMContentLoaded', function() {
        const boton = document.getElementById("btnStart");
        const contenido = document.querySelector('.contenido');

        // Verificar qué objeto de reconocimiento de voz está disponible
        const reconocervoz = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!reconocervoz) {
            console.error("El navegador no es compatible con la API de reconocimiento de voz.");
        } else {
            const reconocimiento = new reconocervoz();
            reconocimiento.onstart = function () {
                console.log("El micrófono está activado");
            }

            reconocimiento.onresult = function (event) {
                const current = event.resultIndex; 

                const transcribir = event.results[current][0].transcript;

                document.getElementById("txt_buscador").value = transcribir;
                
            }

            reconocimiento.onend = function () {
                buscarPokemon();
            };

            
            function buscarPokemon() {
            
            const transcripcion = document.getElementById("txt_buscador").value;
        
            
                if (transcripcion) {
            $("#buscar").click();
                }
            }
            

            boton.addEventListener('click', () => {
                reconocimiento.start();
            });
        }
    
});













