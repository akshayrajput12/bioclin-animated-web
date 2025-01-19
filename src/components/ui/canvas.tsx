interface Position {
  x: number;
  y: number;
}

interface NodeType {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface CanvasContext extends CanvasRenderingContext2D {
  running?: boolean;
  frame?: number;
}

function n(e: { spring: number }) {
  this.init(e || {});
}

n.prototype = {
  init: function (e: { spring: number }) {
    this.spring = e.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];
    for (var t: NodeType, n = 0; n < E.size; n++) {
      t = new Node();
      t.x = (pos as Position).x;
      t.y = (pos as Position).y;
      this.nodes.push(t);
    }
  },
  update: function () {
    for (var t = 0; t < this.nodes.length; t++) {
      var n = this.nodes[t];
      n.vx += (Math.random() - 0.5) * this.spring;
      n.vy += (Math.random() - 0.5) * this.spring;
      n.x += n.vx;
      n.y += n.vy;
      n.vx *= this.friction;
      n.vy *= this.friction;
    }
  },
  draw: function (ctx: CanvasContext) {
    ctx.beginPath();
    for (var t = 0; t < this.nodes.length; t++) {
      var n = this.nodes[t];
      ctx.lineTo(n.x, n.y);
    }
    ctx.stroke();
  },
};

function onMousemove(e: MouseEvent) {
  pos.x = e.clientX;
  pos.y = e.clientY;
}

function render() {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (var t = 0; t < lines.length; t++) {
    lines[t].update();
    lines[t].draw(ctx);
  }
  requestAnimationFrame(render);
}

function resizeCanvas() {
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;
}

var ctx: CanvasContext,
  f: any,
  e = 0,
  pos: Position = { x: 0, y: 0 },
  lines: any[] = [],
  E = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };

function Node() {
  this.x = 0;
  this.y = 0;
  this.vy = 0;
  this.vx = 0;
}

export const renderCanvas = function () {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  ctx = canvas.getContext("2d") as CanvasContext;
  window.addEventListener("mousemove", onMousemove);
  window.addEventListener("resize", resizeCanvas);
  for (var t = 0; t < E.trails; t++) {
    lines.push(new n({ spring: Math.random() }));
  }
  resizeCanvas();
  render();
};

