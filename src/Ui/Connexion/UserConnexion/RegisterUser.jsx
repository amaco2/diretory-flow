import axios from 'axios'; // Imporation de la bibliotheque axio pour gerer les CRUD

const registerUser = async ( username, email, password, setIsLoading, setErrorMessage, setSuccessMessage, navigate ) =>
{
  // On fait un post avec awiai et axiox et en cas d'erreur on l'affiche a la console

  if ( !username || !email || !password )
  {
    setErrorMessage( 'Tous les champs sont obligatoires' );
    return;
  }

  try
  {
    setIsLoading( true );
    const response = await axios.post(
      'http://localhost:5000/api/auth/register',
      {
        username,
        email,
        password,
      },
    );

    setSuccessMessage( 'Inscription réussie! Redirection vers la connexion...' );
    console.log( 'Utilisateur enregistré :', response.data );

    // Redirection après 2 secondes
    setTimeout( () =>
    {
      navigate( '/connexion' );
    }, 2000 );

    return response.data;
  } catch ( error )
  {
    setErrorMessage( error.response?.data?.message || 'Erreur lors de l\'inscription. Veuillez réessayer.' );
    console.error( 'Erreur :', error.response?.data || error.message );
    throw error;
  } finally
  {
    setIsLoading( false );
  }
};

export { registerUser };
