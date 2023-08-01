import { useState, useEffect, useRef} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeart }  from '@fortawesome/free-regular-svg-icons'

import './Converter.css'


function Converter() {
    const [result, setResult] = useState(0);
    const [unit, setUnit] = useState('Km');
    const [newUnit, setNewUnit] = useState('Miles')
    const [savedResult, setSavedResult] = useState([])
    
    const numberToConvert = useRef(null) 
    
    const InvertUnit = () => {
        if (unit === "Km") {
        setUnit("Miles");
        setNewUnit("Km")
        } else if (unit === "Miles") {
        setUnit("Km");
        setNewUnit("Miles")
        } else if (unit === "Feets") {
        setUnit("Meters");
        setNewUnit("Feets")
        } else if (unit === "Meters") {
        setUnit("Feets");
        setNewUnit("Meters")
        } else if (unit === "Inches") {
        setUnit("Centimeters");
        setNewUnit("Inches")
        } else if (unit === "Centimeters") {
        setUnit("Inches");
        setNewUnit("Centimeters")
        }
        
    }

    // Siempre que haya un cambio en el unit principal hace el calculo de transformación
    useEffect(() => {
        GetResult();
      }, [unit]);


    // Dependiendo de cual sea el unit principal, aplica la formula correspondiente 
    const GetResult = ()=>{
        
        if (unit === "Km") {
            setResult((numberToConvert.current.value / 1.609).toFixed(2));
        } else if (unit === "Miles") {
            setResult((numberToConvert.current.value * 1.609).toFixed(2));
        } else if (unit === "Feets") {
            setResult((numberToConvert.current.value * 0.3048).toFixed(2));
        } else if (unit === "Meters") {
            setResult((numberToConvert.current.value * 3.28084).toFixed(2));
        } else if (unit === "Inches") {
            setResult((numberToConvert.current.value * 2.54).toFixed(2));
        } else if (unit === "Centimeters") {
            setResult((numberToConvert.current.value / 2.54).toFixed(2));
        }

    }


    // Nos controla el cambio de Select, para asi mostrar las unit correspondiente en la interfez, unit => Unidad que el usuario, NewUnit => Unidad destino
    const handleUnitChange = (e) => {
        const selectedUnit = e.target.value;
        setUnit(selectedUnit);
        
        if (selectedUnit === "Km") {
          setNewUnit("Miles");
        } else if (selectedUnit === "Miles") {
          setNewUnit("Km");
        } else if (selectedUnit === "Feets") {
          setNewUnit("Meters");
        } else if (selectedUnit === "Meters") {
          setNewUnit("Feets");
        } else if (selectedUnit === "Inches") {
          setNewUnit("Centimeters");
        } else if (selectedUnit === "Centimeters") {
          setNewUnit("Inches");
        }
    };

    // Guardamos la operación en un array, si ya existen datos en el array, lo agregamos al final y borramos el Input
    const SaveResultAndClear = () => {
        const newDataToSave = numberToConvert.current.value + " " + unit + " -> " + result + " " + newUnit;
        setSavedResult(prevSavedResults => [...prevSavedResults, newDataToSave]);
        numberToConvert.current.value = ""
    };
      
    // Cuando queremos borrar una operacion, se toma como referencia el index para asi saber cual borrar del array
    const DeleteResult = (index) => {
        setSavedResult((prevSavedResults) => {
          const newSavedResults = [...prevSavedResults];
          newSavedResults.splice(index, 1);
          return newSavedResults;
        });
    };

    

    return (
        <div className='main'>
            
            <div className="c-converter">
                <h2 className='c-converter_title'>convert</h2>
                
                <select  className="c-converter_inputs c-converter_units" name="units" id="units" value={unit} onChange={handleUnitChange}>
                    <option value="Km">km -&gt; miles</option>
                    <option value="Miles">miles -&gt; km</option>
                    <option value="Feets">feets -&gt; meters</option>
                    <option value="Meters">meters -&gt; feets</option>
                    <option value="Inches">inches -&gt; centimeters</option>
                    <option value="Centimeters">centimeters -&gt; inches</option>
                </select>
                
                <FontAwesomeIcon icon={faArrowRightArrowLeft} size='lg' className='c-converter_inverter' onClick={InvertUnit} />
                
                <input type="text" className='c-converter_inputs c-converter_text_input' ref={numberToConvert} onChange={GetResult}/>
                <span className='c-converter_unit'>{unit}</span>
                

                <FontAwesomeIcon className='c-converter_heart' icon={faHeart} onClick={SaveResultAndClear}/>
                <span className='c-converter_result'>{result}</span>
                <span className='c-converter_result_unit'>{newUnit}</span>
                
            </div>
            

            <h3>saved</h3>
            <div className="c-converter_saved_results">
                
                {savedResult.map((savedData, index) => (
                <div className="c-converter_saved_results_bubble" key={index}>
                    <span>{savedData} </span> 
                    <button onClick={()=> DeleteResult(index)}> X </button>
                </div>
                ))}
                
            </div>
        </div>
    )
}

export default Converter;
