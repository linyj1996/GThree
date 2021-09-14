import * as d3 from "d3-force";
let n = 0
let i = 0
onmessage = function (event) {
  const { type, nodes, STRENGTH, DISTANCE, COL, edges } = event.data;
  let links = []
  const simulation = d3
    .forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(STRENGTH))
    .force(
      "link",
      d3
        .forceLink(edges)
        .id((d) => d.id)
        .distance(DISTANCE)
        .strength(1)
    )
    .force("center", d3.forceCenter(0, 0))
    .force("collision", d3.forceCollide().radius(COL))
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
