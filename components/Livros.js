
import React, { useEffect, useState } from "react";

function Livros() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/livros")
      .then((response) => response.json())
      .then((data) => setLivros(data))
      .catch((error) => console.error("Erro ao carregar livros:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Livros</h1>
      <ul>
        {livros.map((livro) => (
          <li key={livro.ID_Livro}>
            {livro.Titulo} - {livro.Autor}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Livros;
