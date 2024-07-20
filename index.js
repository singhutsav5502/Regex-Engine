// EMPTY PATTERN MATCHES ALL TEXT

// shortest unit first
// match '.' to any character
function matchOneChar(pattern, text) {
    if (!pattern) return true; // empty pattern
    if (!text) return false; //  no text
    if (pattern === '.') return true;
    return pattern === text;
}



//////////////////////////////////////
//  Circular Dependant Functions    //
//////////////////////////////////////


// use smallest unit to recursively match entire string

// special check for '?' at pattern[1]
function matchQues(pattern, text) {

    if (matchOneChar(pattern[0], text[0]) && matchString(pattern.slice(2), text.slice(1))) { // character before '?' matches
        return true;
    }
    return matchString(pattern.slice(2), text);
}

// special check for '*' at pattern[0]
function matchStar(pattern, text){
    if(matchOneChar(pattern[0], text[0]) && matchString(pattern,text.slice(1))){ // character before '*' matches
        return true;
    }
    return matchString(pattern.slice(2), text); // character before '*' doesn't match
}

function matchString(pattern, text) {
    if (pattern === "") return true;
    else if (pattern === "$" && text === "") return true; // matches end of string
    else if (pattern.length >= 2 && pattern[1] === '?') {
        return matchQues(pattern, text);
    }
    else if(pattern[1]==="*"){
        return matchStar(pattern,text);
    }
    else return (matchOneChar(pattern[0], text[0]) && matchString(pattern.slice(1), text.slice(1)));
}

// ^ asserts start of match pattern from the beginning of the text
// if ^ not present then it means pattern can match any part of the text

function startSearch(pattern, text) {
    if (pattern[0] === '^') {
        return matchString(pattern.slice(1), text);
    }
    else {
        // return text.split("").some((_, index) => {
        //     // slice string "abc" into "abc", "bc", "c" 
        //     // slice from different starting points to match value
        //     // inefficient but works
        //     return matchString(pattern, text.slice(index));
        // })
        // // some -> if a single check matches it returns true


        //  either do the above or just add ".*" ( basically gives us unlimited character matches before the actual pattern is matched)
        // which means pattern will match eventually even if it is not present at the start of the text
        // taxing on stack space.
        return matchString(".*" + pattern, text);
    }
}

function main(){
    let args= process.argv;
    args = args.slice(2);
    if(args.length!=2) throw new Error('pattern or text missing');
    if(startSearch(args[0], args[1])){
        console.log("pattern matches");
    }
    else{
        console.log('Pattern does not match');
    }
}
main();