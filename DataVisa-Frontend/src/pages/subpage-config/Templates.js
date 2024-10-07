import React from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom';

const Templates = () => {
  const [session, alteraModo, exibeMensagem] = useOutletContext();
  const navigate = useNavigate();

  return (
    <div>
      Templates
      <br /><br />
      <button onClick={() => navigate("/config/cadastro/template")}>Criar</button>
    </div>
  )
}

export default Templates