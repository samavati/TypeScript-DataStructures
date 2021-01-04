export class Graph {

    private _adjacencyList: { [key: string]: string[] } = {};
    constrstringctor() { }

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
}