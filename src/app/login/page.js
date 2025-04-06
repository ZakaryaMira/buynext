'use client';

import React from 'react'
import FormComponentTemplate from '../FormComponentTemplate'

const page = () => {
  const handleLogin = async (formData) => {
    const credentials = {
      username: formData.username,
      password: formData.password,
    };
  
    try {
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
  
      const data = await response.json();
  
      if (data.token) {
        console.log("Token:", data.token);
        alert("Connexion réussie !");
        // Optionally save the token
        localStorage.setItem('token', data.token);
        // Redirect or change UI state here if needed
      } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      alert("Une erreur s'est produite lors de la connexion.");
    }
  };
  return (
    <FormComponentTemplate title="Connectez-vous à votre compte" description="Entrez vos informations pour accéder à votre compte" button="Ce connecter" onSubmit={handleLogin} 
    fields={[
      {name: "username", label: "nom d'utilisateur",  type: "text", placeholder: "Entrez votre nom d'utilisateur", required: true,},
      {name: "password", label: "Mot de passe" , type: "password", placeholder: "Entrez votre password", required: true,}
    ]}
    />
  )
}

export default page