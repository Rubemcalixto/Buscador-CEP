import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './searches/api';


function App() {

  const [input, setInput] = useState('')
  const [cep, setCep] = useState({});


  async function handleSearch(){

    if(input === ''){
      alert("preencha algum cep!")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }
    
    catch{
      alert("Ops erro ao buscar");
      setInput("")

    }
  }

  return (
    <div className="container">
      <h1 className="title">Bucador de CEP</h1>

      <div className="containerInput">
         <input 
         type="text"
         placeholder="Digite seu CEP..."
         Value={input}
         onchange={(e) => setInput(e.target.Value)}/>

         <button className="buttonSearch" onClick={handleSearch}>
           <FiSearch size={25} color="#fff"/>
         </button>

      </div>

      {Object.keys(cep).length > 0 && (
      <main className="main">
        <h2>CEP: {cep.cep}</h2>

        <span>{cep.logradouro}</span>
        <span>complemento: {cep.complemento}</span>
        <span>{cep.bairo}</span>
        <span>{cep.localidade} - {cep.uf}</span>

      </main>
      )}

    </div>
  );
}

export default App;