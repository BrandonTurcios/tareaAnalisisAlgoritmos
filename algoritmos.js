
const algoritmos = [
    { nombre: "InsertionSort", funcion: insertionSort },
    { nombre: "SelectionSort", funcion: selectionSort },
    { nombre: "QuickSort", funcion: quickSort },
    { nombre: "BubbleSort", funcion: bubbleSort },
    { nombre: "MergeSort", funcion: mergeSort },
    { nombre: "HeapSort", funcion: heapSort },
];

//Medidor de tiempo de ejecucion
function medirTiempo(algoritmo, datosArreglo) {
    const inicio = performance.now();
    algoritmo([...datosArreglo]); 
    const fin = performance.now();
    return fin - inicio;
}

//Creador de generador de numero random con semilla
function crearGenerador(seed) {
    let m = 0x80000000; 
    let a = 1103515245;
    let c = 12345;

    let estado = seed;
    return function () {
        estado = (a * estado + c) % m;
        return estado / (m - 1);
    };
}

//Generador de arreglo con semilla
function generarArreglo(tamaño, seed) {
    const random = crearGenerador(seed);
    const arreglo = [];
    for (let i = 0; i < tamaño; i++) {
        arreglo.push(Math.floor(random() * 150000)); 
    }
    return arreglo;
}

const seed = 13; 
const datosPequenos = generarArreglo(20, seed);
const datosGrandes = generarArreglo(2000, seed);
const datosMuyGrandes = generarArreglo(200000, seed);

//Correr algoritmos
algoritmos.forEach(algoritmo => {
    console.log(`Resultados para ${algoritmo.nombre}:`);
    console.log(`Pequeños: ${medirTiempo(algoritmo.funcion, datosPequenos)} ms`);
    console.log(`Grandes: ${medirTiempo(algoritmo.funcion, datosGrandes)} ms`);
    console.log(`Muy grandes: ${medirTiempo(algoritmo.funcion, datosMuyGrandes)} ms`);
    console.log('\n\n');
});

//Insertion Sort
function insertionSort(array) {
    for (let i = 0; i < array.length; i++) 
        {
        if (i > 0) 
        {
            let valorActual = array[i];
            let j = i - 1;
            while (j >= 0) {
                if (array[j] > valorActual) 
                {
                    array[j + 1] = array[j];
                } else 
                {
                    break;
                }
                j--;
            }
            array[j + 1] = valorActual;
        }
    }
}

//Selection Sort
function selectionSort(array) {
    for (let i = 0; i < array.length; i++) 
    {
        let minimo = i;
        for (let j = i + 1; j < array.length; j++) 
        {
            if (array[j] < array[minimo]) 
            {
                minimo = j;
            }
        }
        if (minimo !== i) {
            let temporal = array[i];
            array[i] = array[minimo];
            array[minimo] = temporal;
        }
    }
}

//Bubble Sort
function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) 
    {
        for (let j = 0; j < array.length - 1 - i; j++) 
        {
            if (array[j] > array[j + 1]) 
            {
                let temporal = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temporal;
            }
        }
    }
}

// Quick Sort
function quickSort(array) {
    if (array.length <= 1) 
    {
        return array; 
    }
    let pivote = array[0];
    let menores = [];
    let mayores = [];
    let iguales = [pivote]; 

    for (let i = 1; i < array.length; i++) 
        { 
        if (array[i] < pivote) 
        {
            menores.push(array[i]); 
        } else if (array[i] > pivote) 
        {
            mayores.push(array[i]); 
        } else 
        {
            iguales.push(array[i]); 
        }
    }
    let ordenadosMenores = quickSort(menores);
    let ordenadosMayores = quickSort(mayores);

    return ordenadosMenores.concat(iguales, ordenadosMayores);
}

//Merge Sort
function mergeSort(array) { 
{
    if (array.length <= 1) 
    {
        return array;
    }
    let mitad = Math.floor(array.length / 2);
    let izquierda = mergeSort(array.slice(0, mitad)); 
    let derecha = mergeSort(array.slice(mitad));
    let resultado = [];
    let i = 0, j = 0;
    
    while (i < izquierda.length && j < derecha.length) 
    {
        if (izquierda[i] <= derecha[j]) 
        {
            resultado.push(izquierda[i]);
            i++;
        } else 
        {
            resultado.push(derecha[j]);
            j++;
        }
    }
    while (i < izquierda.length) 
    {
        resultado.push(izquierda[i]);
        i++;
    }

    while (j < derecha.length) 
    {
        resultado.push(derecha[j]);
        j++;
    }
    return resultado; 
    }
}

//Heap Sort
function heapSort(array) {
    let monticulo = array.length;
    for (let i = Math.floor(monticulo / 2) - 1; i >= 0; i--) 
    {  
        let mayor = i;
        let izquierda = 2 * i + 1; 
        let derecha = 2 * i + 2; 

        if (izquierda < monticulo && array[izquierda] > array[mayor]) {
            mayor = izquierda;
        }

        if (derecha < monticulo && array[derecha] > array[mayor]) {
            mayor = derecha;
        }

        if (mayor !== i) {
            let temporal = array[i];
            array[i] = array[mayor];
            array[mayor] = temporal;

            let nuevoIzquierda = 2 * mayor + 1;
            let nuevoDerecha = 2 * mayor + 2;
            if (nuevoIzquierda < monticulo && array[nuevoIzquierda] > array[mayor]) {
                i = mayor; 
            }
        }
    }

    for (let i = monticulo - 1; i > 0; i--) 
    {
        let temporal = array[0];
        array[0] = array[i];
        array[i] = temporal;
        let mayor = 0;
        let izquierda = 2 * mayor + 1;
        let derecha = 2 * mayor + 2;

        while (izquierda < i) {
            let mayorTemp = mayor;
            if (izquierda < i && array[izquierda] > array[mayorTemp]) 
            {
                mayorTemp = izquierda;
            }
            if (derecha < i && array[derecha] > array[mayorTemp]) 
            {
                mayorTemp = derecha;
            }
            if (mayorTemp === mayor) 
            {
                break;
            }

            let temp = array[mayor];
            array[mayor] = array[mayorTemp];
            array[mayorTemp] = temp;
            mayor = mayorTemp;
            izquierda = 2 * mayor + 1;
            derecha = 2 * mayor + 2;
        }
    }
    return array;
}

