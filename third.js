#!/usr/bin/env node

console.log("========Task 1")
function _1_(st) {
	let tmp = '';
	let k = 0;
	let found = '';
	for (let i = 0; i < st.length; i++) {
		tmp+=st[i];
		if (tmp == found){ 
			k++; 
			tmp = ''
			continue;
		}
		if (tmp == found.substr(0,tmp.length)) continue;
		if (tmp.length >= found.length || tmp != found.substr(0,tmp.length)) {
			found = ''
			k = 0;
			tmp = st.substr(0,i + 1)
		}
		if (tmp.length % 2 == 0) {
			let mid = tmp.length / 2;
			if (tmp.substr(0,mid) == tmp.substr(-mid, tmp.length)){
				found = tmp.substr(0,mid); 
				k = 2;
				tmp = '';
			}
				
		}
	}
	return tmp ? 1 : k;
}

console.log(`Should be 4  is ${_1_("abcabcabcabc")}`);
console.log(`Should be 4  is ${_1_("abccabccabccabcc")}`);
console.log(`Should be 2  is ${_1_("ststsststs")}`);
console.log(`Should be 1  is ${_1_("stststststx")}`);
console.log(`Should be 2  is ${_1_("stststststxstststststx")}`);
console.log(`Should be 1  is ${_1_("xstststststxstststststx")}`);
console.log(`Should be 4  is ${_1_("aaaa")}`);
console.log(`Should be 1  is ${_1_("abaa")}`);
console.log(`Should be 2  is ${_1_("abab")}`);
console.log(`Should be 2  is ${_1_("aaaabaaaab")}`);
console.log(`Should be 1  is ${_1_("ababbabab")}`);
console.log(`Should be 1  is ${_1_("abababa")}`);
//////
console.log("========Task 2")

function _2_(st) {
	let words = st.split(' ');
	let hash = {};
	for (let i = 0; i < words.length; i++) {
		hash[words[i]] = hash[words[i]] ? hash[words[i]] + 1 : 1;
	}
	let max = 0;
	let word = ''
	let count = 0;
	for (let k in hash){
		if (hash[k] > max) {
			word = k
			max = hash[k]
			count = 0;
		} else if (hash[k] == max) {
			count++;
		}
	}
	return word && count ? '---' : word ? word : 'Not found'
}

console.log(`Should be tincidunt  is ${_2_("Sed tempus ipsum quis eros tempus lacinia Cras finibus lorem ut lacinia egestas nunc nibh iaculis est convallis tincidunt mi mi sed nisl Sed porttitor aliquam elit ullamcorper tincidunt arcu euismod quis Mauris congue elit suscipit leo varius facilisis Cras et arcu sodales laoreet est vitae pharetra orci Integer eget nulla dictum aliquet justo semper molestie neque Maecenas bibendum lacus tincidunt auctor varius purus felis ullamcorper dui et laoreet ligula ex et risus Donec eget fringilla nibh Cras congue tincidunt accumsan Maecenas euismod eleifend elit ut rhoncus tortor sodales a Cras egestas finibus lorem non tempor tincidunt aera")}`)

////
console.log("========Task 3")
function _revert(c) {
	if (c == '}') return '{';
	if (c == ')') return '(';
	if (c == ']') return '[';
	return c;
}

function _3_(st) {
	let stack = [];
	for (let i = 0; i < st.length; i++) {
		if (st[i] == '{' || st[i] == '[' || st[i] == '(') {
			stack.push(st[i])
		} 
		else if (st[i] == '}' || st[i] == ']' || st[i] == ')') {
			let last = stack.pop();
			if (last != _revert(st[i]))
				return false
		} else {
			return false
		}
	}
	if (stack.length > 0) return false
	return true;
}

console.log(_3_("{{{(([])}[]}}"))
