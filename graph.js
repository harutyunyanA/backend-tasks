class PriorityQueue {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }
  isEmpty() {
    return this.heap.length === 0;
  }

  swap(i, j) {
    let tmp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = tmp;
  }
  insert(item, priority) {
    this.heap.push([item, priority]);
    this.heapifyUp();
  }

  heapifyUp() {
    let index = this.size() - 1;

    while (index > 0) {
      let parent = Math.floor((index - 1) / 2);

      if (this.heap[index][1] >= this.heap[parent][1]) break;

      this.swap(index, parent);
      index = parent;
    }
  }

  shift() {
    if (this.isEmpty()) return null;
    this.swap(0, this.size() - 1);
    const min = this.heap.pop();
    this.heapifyDown();
    return min;
  }
  heapifyDown() {
    let index = 0;
    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let smallest = index;

      if (left < this.size() && this.heap[left][1] < this.heap[smallest][1])
        smallest = left;
      if (right < this.size() && this.heap[right][1] < this.heap[smallest][1])
        smallest = right;
      if (smallest !== index) {
        this.swap(smallest, index);
        index = smallest;
      } else {
        break;
      }
    }
  }
}

class Graph {
  constructor() {
    this.graph = {};
  }

  addVertex(v) {
    if (!this.graph[v]) {
      this.graph[v] = [];
    }
  }

  addEdge(u, v, w) {
    this.addVertex(u);
    this.addVertex(v);

    const neighbors = this.graph[u];

    for (let n of neighbors) {
      if (n[0] === v) {
        n[1] = w;
        return;
      }
    }
    this.graph[u].push([v, w]);
  }

  size() {
    let n = 0;
    for (let v in this.graph) {
      n++;
    }
    return n;
  }
  hasCycle() {
    const n = this.size();
    const inDegree = new Array(n).fill(0);
    const queue = [];
    let count = 0;
    for (let u in this.graph) {
      const neighbors = this.graph[u];
      for (let v of neighbors) {
        inDegree[v[0]]++;
      }
    }

    for (let i = 0; i < n; ++i) {
      if (inDegree[i] === 0) queue.push(i);
    }

    while (queue.length) {
      const u = queue.shift();
      count++;
      const neighbors = this.graph[u];

      for (let v of neighbors) {
        inDegree[v[0]]--;
        if (inDegree[v[0]] === 0) queue.push(v[0]);
      }
    }
    return n !== count;
  }

  shortestPath(start, dest) {
    const costs = {};
    const queue = new PriorityQueue();
    const visited = new Set();

    for (let i in this.graph) {
      costs[i] = Infinity;
    }
    costs[start] = 0;

    queue.insert(start, 0);

    while (!queue.isEmpty()) {
      const [vertex, cost] = queue.shift();
      if (visited.has(vertex)) continue;
      visited.add(vertex);

      if (vertex == dest) {
        return cost;
      }

      for (const [v, w] of this.graph[vertex] || []) {
        if (cost + w < costs[v]) {
          costs[v] = cost + w;
          queue.insert(v, costs[v]);
        }
      }
    }
    return Infinity;
  }
}

export default Graph;
