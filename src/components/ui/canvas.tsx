interface Position {
  x: number;
  y: number;
}

interface CanvasContext extends CanvasRenderingContext2D {
  running: boolean;
  frame: number;
}

interface NodeInterface {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

class Node implements NodeInterface {
  x: number = 0;
  y: number = 0;
  vx: number = 0;
  vy: number = 0;
}

interface WaveOptions {
  phase?: number;
  offset?: number;
  frequency?: number;
  amplitude?: number;
}

class Wave {
  private phase: number;
  private offset: number;
  private frequency: number;
  private amplitude: number;

  constructor(options: WaveOptions = {}) {
    this.phase = options.phase || 0;
    this.offset = options.offset || 0;
    this.frequency = options.frequency || 0.001;
    this.amplitude = options.amplitude || 1;
  }

  update(): number {
    this.phase += this.frequency;
    return this.offset + Math.sin(this.phase) * this.amplitude;
  }
}

interface LineOptions {
  spring: number;
}

class Line {
  private spring: number;
  private friction: number;
  private nodes: Node[];

  constructor(options: LineOptions) {
    this.spring = options.spring + 0.1 * Math.random() - 0.05;
    this.friction = E.friction + 0.01 * Math.random() - 0.005;
    this.nodes = [];

    for (let i = 0; i < E.size; i++) {
      const node = new Node();
      node.x = pos.x;
      node.y = pos.y;
      this.nodes.push(node);
    }
  }

  update(): void {
    let spring = this.spring;
    const first = this.nodes[0];

    first.vx += (pos.x - first.x) * spring;
    first.vy += (pos.y - first.y) * spring;

    for (let i = 0; i < this.nodes.length; i++) {
      const node = this.nodes[i];

      if (i > 0) {
        const prev = this.nodes[i - 1];
        node.vx += (prev.x - node.x) * spring;
        node.vy += (prev.y - node.y) * spring;
        node.vx += prev.vx * E.dampening;
        node.vy += prev.vy * E.dampening;
      }

      node.vx *= this.friction;
      node.vy *= this.friction;
      node.x += node.vx;
      node.y += node.vy;
      spring *= E.tension;
    }
  }

  draw(ctx: CanvasContext): void {
    let x = this.nodes[0].x;
    let y = this.nodes[0].y;

    ctx.beginPath();
    ctx.moveTo(x, y);

    for (let i = 1; i < this.nodes.length - 2; i++) {
      const curr = this.nodes[i];
      const next = this.nodes[i + 1];
      x = (curr.x + next.x) * 0.5;
      y = (curr.y + next.y) * 0.5;
      ctx.quadraticCurveTo(curr.x, curr.y, x, y);
    }

    const secondLast = this.nodes[this.nodes.length - 2];
    const last = this.nodes[this.nodes.length - 1];
    ctx.quadraticCurveTo(secondLast.x, secondLast.y, last.x, last.y);
    ctx.stroke();
    ctx.closePath();
  }
}

const E = {
    debug: true,
    friction: 0.5,
    trails: 80,
    size: 50,
    dampening: 0.025,
    tension: 0.99,
  };

let ctx: CanvasContext | null = null;
let wave: Wave;
const pos: Position = { x: 0, y: 0 };
let lines: Line[] = [];

function initLines(): void {
  lines = [];
  for (let i = 0; i < E.trails; i++) {
    lines.push(new Line({ spring: 0.45 + (i / E.trails) * 0.025 }));
  }
}

function handleMouseMove(e: MouseEvent | TouchEvent): void {
  if ('touches' in e) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  } else {
    pos.x = (e as MouseEvent).clientX;
    pos.y = (e as MouseEvent).clientY;
  }
  e.preventDefault();
}

function handleTouchStart(e: TouchEvent): void {
  if (e.touches.length === 1) {
    pos.x = e.touches[0].pageX;
    pos.y = e.touches[0].pageY;
  }
}

function onMouseMove(e: MouseEvent | TouchEvent): void {
  document.removeEventListener('mousemove', onMouseMove);
  document.removeEventListener('touchstart', onMouseMove as EventListener);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('touchmove', handleMouseMove);
  document.addEventListener('touchstart', handleTouchStart);
  handleMouseMove(e);
  initLines();
  render();
}

function render(): void {
  if (ctx?.running) {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.strokeStyle = `hsla(${Math.round(wave.update())},100%,50%,0.025)`;
    ctx.lineWidth = 10;

    for (const line of lines) {
      line.update();
      line.draw(ctx);
    }

    ctx.frame++;
    requestAnimationFrame(render);
  }
}

function resizeCanvas(): void {
  if (ctx?.canvas) {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
  }
}

export function renderCanvas(canvas: HTMLCanvasElement): void {
  const context = canvas.getContext('2d');
  if (!context) return;

  ctx = context as CanvasContext;
  ctx.running = true;
  ctx.frame = 1;

  wave = new Wave({
    phase: Math.random() * 2 * Math.PI,
    amplitude: 85,
    frequency: 0.0015,
    offset: 285,
  });

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('touchstart', onMouseMove as EventListener);
  document.body.addEventListener('orientationchange', resizeCanvas);
  window.addEventListener('resize', resizeCanvas);

  window.addEventListener('focus', () => {
    if (ctx && !ctx.running) {
      ctx.running = true;
      render();
    }
  });

  window.addEventListener('blur', () => {
    if (ctx) {
    ctx.running = true;
    }
  });

  resizeCanvas();
}