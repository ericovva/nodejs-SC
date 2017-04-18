#!/usr/bin/env node

function op(o,a1,a2) {
    switch(o){
        case '+': return a1 + a2;
        case '-': return a1 - a2;
        case '*': return a1 * a2;
        case '/': return a1 / a2;
    }
}

function evalute(rpn) {
	let stack = [];
    rpn = rpn.replace(/[ ]+/g,' ').split(' ')
	for (let i = 0; i < rpn.length; i++) { 
        let c = rpn[i];
        if (/^\d+$/.test(c)) 
            stack.push(parseInt(c));
        else 
            if (stack.length > 1 && /^[\-+*\/]+$/.test(c))
                stack[stack.length - 2] = op(c, stack[stack.length - 2], stack.pop())
            else 
                return `ERROR ${c}`
	}
    if (stack.length > 0)
        return stack[0]
}



console.log(evalute("234 345 456 + + 5 /"), "wiil be 207")
console.log(evalute("4 5 + 10 * 20 2 / 15 + -"), "will be 65")
console.log(evalute("1 2 + 4 * 3 +"), "will be 15")
console.log(evalute("8    2 5 * + 1 3 2 * + 4 - /"), "will be 6")
console.log(evalute("15 3 / 11 + 3 5 * - 3.2 / 5.6 10 — *"), "will be ERROR")
console.log(evalute("4 5 + * 20 2 / 15 + -"), "will be ERROR")
