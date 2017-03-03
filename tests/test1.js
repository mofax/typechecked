var roast = require('roast.it');
var type = require('..');

roast.it(
  'is a function',
  function test() {
    return (typeof type) === 'function';
  }
)
 
roast.it(
    "checks for type string",
    function testFunction() {
        return type('str', 'string') && !(type('str', 'number'));
    }
);

roast.it(
    "checks for objects",
    function testFunction() {
        return type({}, 'object');
    }
);

roast.it(
    "checks for arrays as arrays not objects",
    function testFunction() {
        return !type([], 'object') && type([], 'array');
    }
);

roast.it(
    "checks for numbers",
    function testFunction() {
        return type(10, 'number');
    }
);

roast.it(
    "checks for NaN",
    function testFunction() {
        return type(Number('yes'), 'NaN') && !type(Number(10), 'NaN');
    }
);

