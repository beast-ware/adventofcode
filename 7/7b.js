var fs = require('fs');
const splitLines = require('split-lines');

fs.readFile('7/DATA', 'utf8', function (err, contents) {    

    var c = splitLines(contents);
    
    class SortedQueue {
        constructor() {
            this.nodes = [];
        }
        addNodeSorted(node) { // Node
            for (var i=0; i<this.nodes.length; i++) {
                if (node.id < this.nodes[i].id) {
                    break;
                }
            }
            this.nodes.splice(i, 0, node);
        }

    }

    class Node extends SortedQueue  {
        constructor(id) {
            super();
            this.alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
            this.id = id;
            this.parentNodes = [];
            this.processed = false;
            this.cyclesToCompute = this.getCycles(id);
            this.progress = 0;          
        }
        getCycles(id) { // always a letter - zero based 0-26
            var c = 60 + this.alphabet.indexOf(id.trim().toLowerCase())+1;
            return c;
        } 
        isDone() {
            return this.progress === this.cyclesToCompute;
        }
        isParentsProcessed() {
            return this.parentNodes.every(function(e) {
                return e.processed;
            })
        }
        addNodeSorted(node) { // Node
            node.parentNodes.push(this);
            super.addNodeSorted(node);
        }
      }

      // build a bi-directional graph from the data
    var buildGraph = function(d) {
        var graph = {  count:0 };
        graph.rootNodes = [];
        d.forEach(function(e, i) {
            var parsed = e.split(" ");
            var before = parsed[1];
            var after  = parsed[7];
            if (!graph[before]) {
                graph[before] = new Node(before);
                graph.count++;                              
            }
            if (!graph[after]) {
                graph[after]= new Node(after)
                graph.count++;
            } 
            graph[before].addNodeSorted(graph[after]);
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
        var q = new SortedQueue('queue');
        var result = "";
        
        class Processor {
            constructor(q) {
                this.q = q;
                this.done = false;
            }
            next() {
                if (!this.node && q.nodes.length > 0) {
                    this.node = q.nodes.shift();
                }                
            }
            processNode(){
                if (!this.node) {
                    return;
                } 

                this.node.progress += 1;
                
                this.node.processed = this.node.isDone();
                if (this.node.processed) {
                    if (this.node.nodes && this.node.nodes.length > 0) {
                        this.node.nodes.forEach(function(e, i) {
                            if (e.isParentsProcessed()) {
                                q.addNodeSorted(e);
                            }
                        })
                    } 
        
                    result += this.node.id; 

                    this.node = false;
                } 
                
            }
        }
        // add root nodes to queue
        graph.rootNodes.forEach(function(e) {
            q.addNodeSorted(e);
        })

        const cores = 5;
        var processors  = [];
        for (var i=0; i<cores; i++) {
            processors[i] = new Processor(q); 
        }

        var seconds = 0;
        while (result.length != graph.count) 
        {
            // retrieve next node to process, if any
            processors.forEach(function(e) {
                e.next();
            });
            // process the nodes
            processors.forEach(function(e) {
                e.processNode();
            });
            seconds++;
        }
        
        return seconds;
    }
    
    var graph = buildGraph(c);

    var executionTime = execute(graph);

    console.log(executionTime);
})
