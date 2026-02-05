// Ecriture de la fonctio qui calcul la somme des elements d'un tableau

function reduceTab()
{
  const tab = [ 1, 2, 3, 4, 5, 5 ];
  // Calcul de la somme
  const result = tab.reduce( ( acc, val ) =>
  {
    acc += val;
    return acc;
  }, 0 );

  console.log( result );
}

reduceTab();
// const dialogue = document.querySelector( 'dialog' );
// dialogue.showModal();
// dialogue.close()