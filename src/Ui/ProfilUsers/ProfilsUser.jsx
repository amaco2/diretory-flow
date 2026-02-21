import { Fragment, useContext } from 'react';
import { TContext } from '../../ThemeContext';
import { Link } from 'react-router-dom';
import { DivImgPpUser, DivUser, SettingUser } from './ComponentsProfil';
import './style/ProfilUser.css';
import
{
  getInitials,
  stringToColor,
} from '../../Component/ProjectUsers/style/styleComponent';

function ProfilUser()
{
  const { isShowProfil, setIsShowProfil } = useContext( TContext );
  const { iconeUser, setIconeUser } = useContext( TContext );
  const intialUser = getInitials( iconeUser );
  const { username } = useContext( TContext )
  const bgColor = stringToColor( iconeUser );




  return (
    <Fragment>
      <SettingUser
        hidden={ isShowProfil ? true : false }
        aria-autocomplete='false'
        aria-hidden={ isShowProfil ? true : false }
      >
        <ul className='listItemsUser'>
          <li>
            <div className='pp-user'>
              <DivUser
                className='pp-user-img'
                style={ { backgroundColor: `${ bgColor }` } }

                onClick={ ( e ) =>
                {
                  e.stopPropagation();
                  setIsShowProfil( s => !s )
                } }
              >
                { intialUser }
                <DivImgPpUser />
              </DivUser>
              <p className='pp-user--text'>{ username }</p>
            </div>
          </li>
          <br />
          <hr />
          <Link
            to={ '/projects' }
            onClick={ () =>
            {
              setIsShowProfil( true );
            } }
          >
            Nouveau projet
          </Link>

        </ul>
      </SettingUser>
      <DivUser
        className='pp-user-img'
        onClick={ ( event ) =>
        {
          event.stopPropagation();
          setIsShowProfil( o => !o );
        } }
        style={ { backgroundColor: `${ bgColor }`, paddingTop: "2px", paddingLeft: "10.8px" } }
      >
        { intialUser }
      </DivUser>
    </Fragment>
  );
}

// Exportation

export default ProfilUser;
