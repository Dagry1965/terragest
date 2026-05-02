export const AIChatService = {

  async ask(
    question: string
  ) {

    const normalized =
      question.toLowerCase();

    if (
      normalized.includes(
        "stock faible"
      )
    ) {

      return `
Produits en stock faible :

- Engrais NPK
- Semences maïs
- Aliment bétail
`;
    }

    if (
      normalized.includes(
        "terrain"
      )
    ) {

      return `
Terrains surveillés :

- Zone Nord
- Exploitation Est
- Parcelle B12
`;
    }

    if (
      normalized.includes(
        "intervention"
      )
    ) {

      return `
Interventions récentes :

- Maintenance tracteur
- Contrôle irrigation
- Réparation pompe
`;
    }

    return `
Je suis l'assistant IA Terragest.

Je peux aider sur :
- stocks
- terrains
- interventions
- exploitations
- analytics
`;
  },
};
