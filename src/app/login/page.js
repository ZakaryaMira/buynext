'use client';
import React, { useState } from 'react';
import FormComponentTemplate from '../FormComponentTemplate'
import { useRouter } from 'next/navigation';

const Login = () => {
  const [error, setError] = useState(null);
  const router = useRouter();

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
        localStorage.setItem('token', data.token);
        router.push('/products');
      } else {
        setError("Nom d'utilisateur ou mot de passe incorrect.");
      }
    } catch (error) {
      setError("Une erreur s'est produite lors de la connexion.");
    }
  };
  return (
    <>
    <FormComponentTemplate title="Connectez-vous à votre compte" description="Entrez vos informations pour accéder à votre compte" button="Ce connecter" onSubmit={handleLogin} 
    fields={[
      {name: "username", label: "nom d'utilisateur", id: "username",   type: "text", placeholder: "Entrez votre nom d'utilisateur", required: true,},
      {name: "password", label: "Mot de passe" , id: "password", type: "password", placeholder: "Entrez votre password", required: true,}
    ]}
    />
    {error && <p className="text-[#EF233C] heading-black text-base text-center mb-4">{error}</p>}
    </>

  )
}

export default Login