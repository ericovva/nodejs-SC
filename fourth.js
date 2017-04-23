#!/usr/bin/env node

class Node {
	constructor(val, nbs){
		this.nbs = nbs || null
		this.val = val
	}
	add_nbs(nbs) {
		if (nbs)
			if (this.nbs)
				this.nbs = this.nbs.concat(nbs[0])
			else
				this.nbs = nbs
	}
}


class Graph {
	constructor(edges) {
		if (edges && edges.length > 0) {
			this.head = new Node(edges[0][0])
            let weight = edges[0][2] || 0;
			let node = new Node(edges[0][1], [ {'nb' : this.head, 'w': weight} ]);
			this.head.add_nbs([ { 'nb' : node, 'w': weight } ]);
			for (let i = 1; i < edges.length; i++) {
				let node1 = this.find_node(edges[i][0])
				let node2 = this.find_node(edges[i][1])
                weight = edges[i][2] || 0;
				if (!node1) 
					node1 = new Node(edges[i][0])
				if (!node2) 
					node2 = new Node(edges[i][1], [ {'nb': node1, 'w': weight} ])
				else 
					node2.add_nbs([ {'nb' : node1, 'w': weight} ])
				node1.add_nbs([ {'nb': node2, 'w': weight} ])
			}
			return
		}
		this.head = null
	}

	find_node(val, node, set) {
		node = node || this.head;
		set = set || {}
		if (set[node.val] ) return null
		if (node.val == val) return node
		set[node.val] = 1;
		for (let i = 0; i < node.nbs.length; i++) {
			let found = this.find_node(val, node.nbs[i]['nb'], set)
			if (found) return found
		}
		return null
	}
	
	DFS(node,set) {
		node = node || this.head
		set = set || {}
		if (set[node.val] ) return
		set[node.val] = 1
		console.log(node.val)
		for (let i = 0; i < node.nbs.length; i++)
			this.DFS(node.nbs[i]['nb'], set)
	}

	BFS(node, lifo, set) {
		node = node || this.head
		set = set || {}
		lifo = lifo || []
		if (set[node.val] ) return;
        set[node.val] = 1
        for (let i = 0; i < node.nbs.length; i++) {
            if (!set[node.nbs[i]['nb'].val]) lifo.push(node.nbs[i]['nb']) 
        }
        console.log(node.val)
        if (lifo.length == 0) return
		this.BFS(lifo.shift(),lifo,set)
	}

	dump(node,set) {
		node = node || this.head
		set = set || {}
		if (set[node.val]) return
		set[node.val] = 1; 
		process.stdout.write(`${node.val}:`);
		for (let i = 0; i < node.nbs.length; i++)
			process.stdout.write(`Childs: ${node.nbs[i]['nb'].val}(${node.nbs[i]['w']}) `);
		console.log();
		for (let i = 0; i < node.nbs.length; i++)
			this.dump(node.nbs[i]['nb'], set)
	}
    
    Dijkstra(nodeStart, nodeEnd) {
        let set = {};
        let marked = {}
        let queue = [ nodeStart ];
        set[nodeStart.val] = 0;
        while(queue.length) {
            queue.sort( function(a,b) { return set[a.val] > set[b.val]} )
            let cur_node = queue.shift();
            if (cur_node.val == nodeEnd.val) return set[cur_node.val];
            let v_w = {};
            cur_node.nbs.sort( function(a,b) { return a['w'] > b['w'] });
            for (let i = 0; i < cur_node.nbs.length; i++) {
                if (marked[cur_node.nbs[i]['nb'].val]) continue;
                queue.push(cur_node.nbs[i]['nb'])
                if (set[cur_node.nbs[i]['nb'].val] && (set[cur_node.nbs[i]['nb'].val] < cur_node.nbs[i]['w'] + set[cur_node.val]))
                    continue;
                set[cur_node.nbs[i]['nb'].val] = cur_node.nbs[i]['w'] + set[cur_node.val] 
            }
            marked[cur_node.val] = 1;
        }
        console.log(set)
    }
}

var a = new Graph ([[0, 3, 3], [1, 3, 4], [2, 3, 5], [4, 3, 6], [5, 4, 1], [5, 6, 1 ] , [7, 3, 1], [7, 8, 1], [8, 6, 1], [1,9,5],[9,6,1]]);
a.dump()
console.log("DFS")
a.DFS()
console.log("BFS")
a.BFS()
console.log("From A to B")
let n0 = a.find_node(4)
let n = a.find_node(9);
console.log(a.Dijkstra(n0, n))
var b = new Graph ([[0, 3, 5], [1, 3, 11], [2, 3, 56], [4, 3, 77], [5, 4, 89]]);
let n2 = b.find_node(5);
console.log(b.Dijkstra(b.head, n2))

