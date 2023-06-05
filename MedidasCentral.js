export class MedidasCentrales{
    constructor(numberList){
        this.numberListSorted = numberList.sort((a, b) => a - b)
        this.numbersLength = this.numberListSorted.length
        this.No_min = this.numberListSorted[0]
        this.No_max = this.numberListSorted[this.numbersLength-1]
        this.clases = Math.ceil(  Math.sqrt(this.numbersLength) ) + 2
        this.rango = this.numberListSorted[this.numbersLength-1] - this.numberListSorted[0]
        this.ancho = this.rango / this.clases
        // console.log(1+3.322*Math.log(33));
        this.anchoLength = this.ancho.toString().length -2
        this.anchoLength = this.anchoLength < 0 ? 0 : this.anchoLength
        this.anchoLength = this.anchoLength > 4 ? 4 : this.anchoLength
    }
    media(){
        let total=0;
        for (let num of this.numberListSorted){
            total+=num
        }
        return total/this.numbersLength
    }
    mediana(){
        let es_par = this.esPar(this.numbersLength)
        if (!es_par.espar){
            return this.numberListSorted[es_par.posision[0]]
        }else{
            return (this.numberListSorted[es_par.posision[0]] + this.numberListSorted[es_par.posision[1]]) /2
        }
    }

    moda(){
        let cantidadN={}
        for (let num of this.numberListSorted){
            if (cantidadN[num]){
                cantidadN[num] += 1
            }else{
                cantidadN[num] = 1
            }
        }
    
        let nMayor=0;
        for (let num in cantidadN){
            if (cantidadN[num] > nMayor){
                nMayor = cantidadN[num]
            }
        }
    
        let masRepeticiones=[];
    
        for (let num in cantidadN){
            if (cantidadN[num] === nMayor && nMayor !== 1){
    
                masRepeticiones.push(num)
            }
        }
        
        return [masRepeticiones , nMayor]
    }


    esPar(num){
        if (num%2 === 0){
            let posisionNum1 = num/2
            return {
                espar: true,
                posision: [posisionNum1-1, posisionNum1]
            }
        }else{
            return {
                espar: false,
                posision: [ Math.floor(num/2)]
            }
        }
    }

    __rango(){
        return this.numberListSorted[this.numbersLength-1] - this.numberListSorted[0]
    }
    varianza(){
        let promedio = this.media(this.numberListSorted)
    
        let sumatoria=0;
        for (let num of this.numberListSorted){
            sumatoria+= (num - promedio)**2
        }
        return sumatoria / this.numbersLength
    }
    desviacion_estandar(){
        return Math.sqrt(this.varianza(this.numberListSorted))
    }
    histograma(){
        let tabla_histograma = []
        for (let i=0; i <= this.clases; i++){
            // let rango_min=(this.No_min-0.3) + (this.ancho*i)
            let rango_min= parseFloat(  (  (this.No_min) + (this.ancho*i)  ).toFixed(this.anchoLength)  )
            let rango_max= parseFloat(  (  (this.No_min) + (this.ancho*(i+1))  ).toFixed(this.anchoLength)  )
            let frec = this.frecuencia( [rango_min, rango_max])
            
            let frec_rela = frec ? parseFloat(  (frec/this.numbersLength).toFixed(6) ) : 0;
            let porcent = frec ? parseFloat( (frec_rela*100).toFixed(4).toString() ) + " %" : "0 %"
            tabla_histograma.push({
                clase: i+1,
                rango_minimo: rango_min,
                rango_maximo: rango_max,
                frecuencia: frec,
                frecuencia_relativa: frec_rela,
                porcentaje: porcent
            })
        }
        return tabla_histograma;
    }
    frecuencia(intervalos){
        let n_repet = 0;
        for (let i=0; i<this.numbersLength;i++){
            if (this.numberListSorted[i] >= intervalos[0] && this.numberListSorted[i] < intervalos[1]){
                n_repet+=1
            }else if(this.numberListSorted[i] >= intervalos[1]){
                break
            }
        }
        return n_repet
    }
}


