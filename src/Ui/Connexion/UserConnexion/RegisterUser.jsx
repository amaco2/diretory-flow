import axios from 'axios'; // Imporation de la bibliotheque axio pour gerer les CRUD

const registerUser = async (username, email, password, setIsLoading) => {
  // On fait un post avec awiai et axiox et en cas d'erreur on l'affiche a la console
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      {
        username,
        email,
        password,
      },
    );
    setIsLoading(true);
    console.log('Utilisateur enregistre :', response.data);
  } catch (error) {
    console.error('Erreur :', error.response?.data || error.message);
  } finally {
    setIsLoading(false);
  }
};

export { registerUser };
