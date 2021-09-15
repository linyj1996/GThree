import * as d3 from "d3-force";
let n = 0
let i = 0
onmessage = function (event) {
  const { type, nodes, STRENGTH, DISTANCE, COL, edges } = event.data;
  let links = edges
  console.log(edges)
  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-1))
    .force(
      "link",
      d3
        .forceLink(links)
        .id((d) => d.id)
        .distance(1)
        .strength(100)
    )
    .force("center", d3.forceCenter(0, 0))
    .force("x", d3.forceX())
    .force("y", d3.forceY())
    // .force("collision", d3.forceCollide().radius(COL))
    .stop();

  let maxN = Math.ceil(
    Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay())
  );

  if (nodes.length > 5000) {
    n = 50;
  } else {
    n = maxN;
  }

  for (i = 1; i <= n; ++i) {
    let bufferNode = [];
    nodes.forEach((e) => {
      bufferNode.push(e.x, e.y);
    });
    let message = {
      type: "tick",
      progress: i / n,
      currentTick: i,
      nodes: new Float32Array(bufferNode).buffer,
    };
    postMessage(message, [message.nodes]);
    simulation.tick();
    if (i === n) {
      let message = {
        type: "end",
        nodes: new Float32Array(bufferNode).buffer,
      };
      postMessage(message, [message.nodes]);
    }
  }
};
