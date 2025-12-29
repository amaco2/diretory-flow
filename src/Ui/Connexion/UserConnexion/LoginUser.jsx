import axios from 'axios';

const useAxioToLogin = async ( email, password ) =>
{
  try
  {
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
  }
};
export { useAxioToLogin };
