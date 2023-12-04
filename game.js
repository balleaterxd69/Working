document.addEventListener('DOMContentLoaded', function () {
  const { Engine, Render, World, Bodies, Mouse, MouseConstraint } = Matter;

  const engine = Engine.create();

  const render = Render.create({
    element: document.getElementById('game-container'),
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
    },
  });

  const ground = Bodies.rectangle(window.innerWidth / 2, window.innerHeight, window.innerWidth, 50, { isStatic: true });
  const head = Bodies.circle(window.innerWidth / 2, 200, 30);
  const body = Bodies.rectangle(window.innerWidth / 2, 300, 50, 80);
  const leftArm = Bodies.rectangle(window.innerWidth / 2 - 40, 300, 20, 80);
  const rightArm = Bodies.rectangle(window.innerWidth / 2 + 40, 300, 20, 80);
  const leftLeg = Bodies.rectangle(window.innerWidth / 2 - 20, 400, 20, 100);
  const rightLeg = Bodies.rectangle(window.innerWidth / 2 + 20, 400, 20, 100);

  World.add(engine.world, [ground, head, body, leftArm, rightArm, leftLeg, rightLeg]);

  const mouse = Mouse.create(render.canvas);
  const mouseConstraint = MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2,
      render: {
        visible: false,
      },
    },
  });

  World.add(engine.world, mouseConstraint);

  Engine.run(engine);

  Render.run(render);

  render.canvas.addEventListener('mousemove', function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const forceX = mouseX - head.position.x;
    const forceY = mouseY - head.position.y;

    Body.applyForce(head, { x: head.position.x, y: head.position.y }, { x: forceX * 0.01, y: forceY * 0.01 });
  });
});
