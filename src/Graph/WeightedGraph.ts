import { PriorityQueue } from "../PriorityQueue";
import { Queue } from "../Queue";

type WeightedEdge = { node: string, weight: number };
export class WeightedGraph {

    private _adjacencyList: { [key: string]: WeightedEdge[] } = {};

    get list() {
        return this._adjacencyList;
    }

    addVertex(vertex: string) {
        if (!this._adjacencyList[vertex]) {
            this._adjacencyList[vertex] = [];
        }
    }

    removeVertex(vertex: string) {
        while (this._adjacencyList[vertex].length) {
            const adjacentVertex = this._adjacencyList[vertex].pop() as WeightedEdge;
            this.removeEdge(vertex, adjacentVertex.node)
        }
        delete this._adjacencyList[vertex];
    }

    addEdge(vertex1: string, vertex2: string, weight: number) {
        this._adjacencyList[vertex1].push({ node: vertex2, weight });
        this._adjacencyList[vertex2].push({ node: vertex1, weight });
    }

    removeEdge(vertex1: string, vertex2: string) {
        this._adjacencyList[vertex1] = this._adjacencyList[vertex1].filter(
            v => v.node !== vertex2
        )

        this._adjacencyList[vertex2] = this._adjacencyList[vertex2].filter(
            v => v.node !== vertex1
        )
    }

    /**
     * depth first recursive
     */
    DFSr(start: string) {
        const result: string[] = [];
        const visited: { [key: string]: boolean } = {};

        const dfs = (vertex: string) => {
            if (!vertex) { return null }
            visited[vertex] = true;
            result.push(vertex);
            this._adjacencyList[vertex].forEach(neighbour => {
                if (!visited[neighbour.node]) {
                    return dfs(neighbour.node);
                }
            })
        }
        dfs(start);

        return result;
    }

    BFS(start: string) {
        const queue = new Queue();
        const result: any[] = [];
        const visited: { [key: string]: boolean } = {};
        let currentVertex;

        queue.enqueue(start);
        visited[start] = true;
        while (queue.size) {
            currentVertex = queue.dequeue();
            result.push(currentVertex);
            this._adjacencyList[currentVertex].forEach(neighbour => {
                if (!visited[neighbour.node]) {
                    visited[neighbour.node] = true;
                    queue.enqueue(neighbour);
                }
            });
        }

        return result;
    }

    Dijkstra(start: string, finish: string) {
        const nodes = new PriorityQueue('MIN');
        const distances: { [key: string]: number } = {};
        const previous: { [key: string]: null | string } = {};
        let smallest: string;

        // INITIAL STATE
        for (const vertex in this._adjacencyList) {
            if (Object.prototype.hasOwnProperty.call(this._adjacencyList, vertex)) {
                if (vertex === start) {
                    distances[vertex] = 0;
                    nodes.enqueue(vertex, 0);
                } else {
                    distances[vertex] = Infinity;
                    nodes.enqueue(vertex, Infinity);
                }

                previous[vertex] = null;
            }
        }

        // as long as there is somthing to visit
        while (nodes.size > 0) {
            smallest = nodes.dequeue().value;
            if (smallest === finish) {
                // WE ARE DONE
                // WE NEED TO BUILD PATH
                console.log(distances, previous)
            }

            // FIND NEIGHTBOUR IN NODE
            if (distances[smallest] !== Infinity) {
                this._adjacencyList[smallest].forEach(neightbour => {
                    let candidate = distances[smallest] + neightbour.weight;
                    if (candidate < distances[neightbour.node]) {
                        //updating new smallest distance to neighbor
                        distances[neightbour.node] = candidate;
                        //updating previous - How we got to neighbor
                        previous[neightbour.node] = smallest;
                        //enqueue in priority queue with new priority
                        nodes.enqueue(neightbour.node, candidate);
                    }
                });
            }
        }

    }
}