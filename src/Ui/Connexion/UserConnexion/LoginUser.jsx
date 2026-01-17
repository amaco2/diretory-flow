import axios from 'axios';

const useAxioToLogin = async ( email, password ) =>
{
  try
  {
    if ( !email || !password )
    {
      throw new Error( 'Email et mot de passe sont requis' );
    }

    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      { email, password },
      { withCredentials: true },
    );

    console.log( 'Connexion OK :', response.data );
    return response.data;
  } catch ( error )
  {
    console.error( 'Erreur axios :', error.response?.data || error.message );
    throw error;
  }
};

export { useAxioToLogin };
