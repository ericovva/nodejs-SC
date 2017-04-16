#!/usr/bin/env node
function to_decimal(a) {
    let res = 0;
    let p = 0;
    if (! (typeof(a) == 'string')) {
        return undefined;
    }
	for (let i = a.length - 1; i >= 0; i--) {
        if (a[i] == '1'|| a[i] == '0') {
            res+= parseInt(a[i]) * Math.pow(2,p++) 
        } else {
            return undefined;
        }
	} 
    return res
}



var tests = ["0","01", "00", "1", "0001", "101", "0101", "111", "110", "asd", "1111", {"asd":1}, {"001":"101"}, {1:1}, [1,0,1], ["1","0","11"]];
for (let i =0; i<tests.length; i++) {
    console.log(tests[i], to_decimal(tests[i]));
}

