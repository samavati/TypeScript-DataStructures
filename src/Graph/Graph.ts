import { Queue } from "../Queue";

export class Graph {

    private _adjacencyList: { [key: string]: string[] } = {};

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
            const adjacentVertex = this._adjacencyList[vertex].pop() as string;
            this.removeEdge(vertex, adjacentVertex)
        }
        delete this._adjacencyList[vertex];
    }

    addEdge(vertex1: string, vertex2: string) {
        this._adjacencyList[vertex1].push(vertex2);
        this._adjacencyList[vertex2].push(vertex1);
    }

    removeEdge(vertex1: string, vertex2: string) {
        this._adjacencyList[vertex1] = this._adjacencyList[vertex1].filter(
            v => v !== vertex2
        )

        this._adjacencyList[vertex2] = this._adjacencyList[vertex2].filter(
            v => v !== vertex1
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
                if (!visited[neighbour]) {
                    return dfs(neighbour);
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
                if (!visited[neighbour]) {
                    visited[neighbour] = true;
                    queue.enqueue(neighbour);
                }
            });
        }

        return result;
    }
}