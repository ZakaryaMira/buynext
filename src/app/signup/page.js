'use client';

import React from 'react';
import FormComponentTemplate from '../FormComponentTemplate';

const page = () => {
  const handleSignup = async (formData) => {
    const user = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("User created:", data);
      alert("Compte créé avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Une erreur s'est produite lors de la création du compte.");
    }
  };

  return (
    <FormComponentTemplate
      title="Créez votre compte"
      description="Remplissez les informations ci-dessous pour vous inscrire."
      button="S'inscrire"
      onSubmit={handleSignup}
      fields={[
        {
          name: 'username',
          label: "Nom d'utilisateur",
          type: 'text',
          placeholder: "Entrez votre nom d'utilisateur",
          required: true,
        },
        {
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Entrez votre email',
          required: true,
        },
        {
          name: 'password',
          label: 'Mot de passe',
          type: 'password',
          placeholder: 'Entrez votre mot de passe',
          required: true,
        },
      ]}
    />
  );
};

export default page;
