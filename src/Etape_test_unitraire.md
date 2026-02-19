soit :
export function getFrmattedWord(str){

    if(!str) return "";
    return str.chartAt(0).toUpperCase() + str.slice(1);
}

# puis on export la getFrmattedWord function dans getFrmattedWord.test.js
# puis on installe jest {npm i jest}

# on test si un mot minuscule hello est correctement formate en Hello

# test("capitalizes the first letter of a word", ()=>{
  #  expect(getFrmattedWord('hello')).toBe('Hello');
# })