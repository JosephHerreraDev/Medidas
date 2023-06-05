import { MedidasCentrales } from "./MedidasCentral.js";
const numeros = document.getElementById("numeros")
const sorted = document.getElementById("sorted")
const longitud = document.getElementById("longitud")
const clases = document.getElementById("clases")
const rango = document.getElementById("rango")
const ancho = document.getElementById("ancho")
const media = document.getElementById("media")
const mediana = document.getElementById("mediana")
const moda = document.getElementById("moda")
const varianza = document.getElementById("varianza")
const desviacion_estandar = document.getElementById("desviacion_estandar")
const datosGabla = document.getElementById("datos")

function ponerDatos(resul){
    sorted.value = resul.numberListSorted
    longitud.value = resul.numbersLength
    clases.value = resul.clases
    rango.value = resul.rango
    ancho.value = resul.ancho
    media.value = resul.media()
    mediana.value = resul.mediana()
    moda.value = resul.moda()[0]
    varianza.value = resul.varianza()
    desviacion_estandar.value = resul.desviacion_estandar()
    datosGabla.innerHTML = putContenidoTebla(resul.histograma())
    // console.log(resul.histograma());
}

const calcular = document.getElementById("calcular")
calcular.addEventListener("click",function(){
    try {
        let resul = new MedidasCentrales(
            convertirArrayStringAFloat( numeros.value.split(",") )
        )

        ponerDatos(resul)

    } catch (error) {
        console.log(error);
    }
})

function convertirArrayStringAFloat(arrayString) {
        const arrayFloat = arrayString.map((elemento) => parseFloat(elemento));
        return arrayFloat;
    }
function putContenidoTebla(datos){
    let contenido = ``

    for (let fila of datos){
        contenido+= `<tr>
                    <td>${fila.clase}</td>
                    <td>${fila.rango_minimo}</td>
                    <td>${fila.rango_maximo}</td>
                    <td>${fila.frecuencia}</td>
                    <td>${fila.frecuencia_relativa}</td>
                    <td>${fila.porcentaje}</td>
                </tr>`
        
    }return contenido
}
  
//[1.65,1.65,1.68,1.68,1.7,1.7,1.7,1.72,1.73,1.74,1.74,1.75,1.78,1.8,1.8,1.8,1.85,1.9,1.93]

