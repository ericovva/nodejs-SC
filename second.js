#!/usr/bin/env node

class Node {
	constructor(val) {
		this.val = val;
		this.next = null;
	}
}

class List {
    constructor (head_val) {
        if (head_val) {
            if (typeof(head_val) == 'string') {
                this.head = null
                for (let i = head_val.length - 1; i >= 0; i--) {
                    this.add(parseInt(head_val[i]))
                }
                return;
            }
            this.head = new Node(head_val)
            this.head.next = null 
        } else {
            this.head = null
        }
    }
    
    _find_in_pos (pos) {
        let cur = this.head;
        let prev = null;
        let cur_pos = 0;
        while(cur) {
            if (cur_pos == pos) {
                break;
            }
            cur_pos++;
            prev = cur;
            cur = cur.next;
        }
        return { 'prev' : prev, 'cur' : cur }
    }

    add (val, pos) {
        let node = new Node(val);
        let find = this._find_in_pos(pos);
        if (find.prev != null) {
            find.prev.next = node;
        } else {
            this.head = node;
        }
        node.next = find.cur;
    }

    del (pos) {
        let find = this._find_in_pos(pos);
        if (find.prev != null) {
            if (find.cur != null) {
                find.prev.next = find.cur.next;
                return find.cur.val
            } else {
                find.prev.next = null
            }
        } else {
            if (find.cur != null) {
                this.head = find.cur.next;
                return find.cur.val
            } else {
                this.head - null 
            }
        }
        return undefined;
    }

    find (val) {
        if (typeof val === "undefined") return null;
        let cur = this.head;
        while(cur) {
            if (val == cur.val) return cur;
            cur = cur.next;
        }
        return null
    }
    
       
    dump (nl) {
        let cur = this.head;
        process.stdout.write("( ");
        while(cur) {
            process.stdout.write(`${cur.val}`);
            cur = cur.next
            if (cur != null) 
                process.stdout.write(" -> ")
        }
        process.stdout.write(" )");
        if (nl) process.stdout.write(nl);
    }
}

function addition(a,b) {
    let result = new List();
    let in_mind = 0;
    while( a.head != null || b.head != null ) {
        let slag1 = a.del(0);
        let slag2 = b.del(0);
        if (typeof slag1 === 'undefined') slag1 = 0;
        if (typeof slag2 === 'undefined') slag2 = 0;
        let r = in_mind + slag1 + slag2;
        in_mind = r > 9 ? parseInt(r / 10) : 0
        result.add(r % 10)
    }
    if (in_mind) result.add(in_mind);
    return result;
}

l = new List(11);
l.add(22,0);
l.add(13);
l.add(14,1);
l.dump("\n")
l.del(0)
l.dump("\n")
console.log(l.find(14));
console.log(l.find());
st = "9999"
st2 = "777"
a = new List(st);
b = new List(st2);
a.dump(' + ')
b.dump("\nOutput: ")
r = addition(a,b)
r.dump()

