var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('7/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);
    
    class Node {
        constructor(id) {
            this.id = id;
            this.parentNodes = [];
            this.nodes = [];
            this.processed = false;
            this.isQueue = false;
        
        }
        isParentsProcessed() {
            return this.parentNodes.every(function(e) {
                return e.processed;
            })
        }
        addGraphNodeSorted(node) { // Node
            for (var i=0; i<this.nodes.length; i++) {
                if (node.id < this.nodes[i].id) {
                    break;
                }
            }
            if (!this.isQueue) {
                node.parentNodes.push(this);
            }
            this.nodes.splice(i, 0, node);
        }
      }

      // build a bi-directional graph from the data
    var buildGraph = function(d) {
        var graph = {  };
        graph.rootNodes = [];
        d.forEach(function(e, i) {
            var parsed = e.split(" ");
            var before = parsed[1];
            var after  = parsed[7];
            if (!graph[before]) {
                graph[before] = new Node(before);                              
            }
            if (!graph[after]) {
                graph[after]= new Node(after)
            } 
            graph[before].addGraphNodeSorted(graph[after]);
        });
            for (const key in graph) {
                if (graph.hasOwnProperty(key)) {
                    var element = graph[key];
                    if (element.parentNodes && element.parentNodes.length < 1) {
                        graph.rootNodes.push(element);
                     }
            }
        }
        return graph;
    }

    var execute = function(graph) {
        var q = new Node('queue');
        q.isQueue = true;
        var processNode = function(node){
            node.processed = true;
            if (node.nodes && node.nodes.length > 0) {
                node.nodes.forEach(function(e, i) {
                    if (e.isParentsProcessed()) {
                        q.addGraphNodeSorted(e);
                    }
                })
            }
            
            var next = q.nodes.shift();
            if (!next) {
                return node.id;
            } 

            return node.id + processNode(next); 
        }
        
        // add root nodes to queue
        graph.rootNodes.forEach(function(e) {
            q.addGraphNodeSorted(e);
        })
        var result = processNode(q.nodes.shift());
        return result;
    }
    
    var graph = buildGraph(c);

    var executionOrder = execute(graph);

    console.log(executionOrder);
})
