class GraphSim {
    #canvas

    constructor(canvasId) {
        this.#canvas = document.getElementById(canvasId);
        this.render();
    }

    render(func, scaleX, scaleY) {
        if (!this.#canvas.getContext)
            return;

        const canvas = this.#canvas;
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.#drawXYAxis(canvas, ctx);
        this.#drawRes(canvas, ctx, func, scaleX, scaleY);
    }

    #drawXYAxis(canvas, ctx) {
        ctx.fillRect(0, canvas.height / 2, canvas.width, 1) // X Axis
        ctx.fillRect(canvas.width / 2, 0, 1, canvas.height) // Y Axis
    }

    #drawRes(canvas, ctx, func, scaleX = 1, scaleY = 1) { // Draw result
        if (!func)
            return;

        let lastX, lastY = null;

        var id = window.setTimeout(function () { }, 0);
        while (id--) {
            window.clearTimeout(id);
        }

        for (let i = 0; i <= canvas.width; i++) {
            const x = i - canvas.width / 2;
            const y = scaleY * math.evaluate(func, { x: x / scaleX })
            //Same as: const y = math.evaluate(func, {x: x})

            setTimeout(() => {
                this.#drawLineBetween(ctx, { x: lastX, y: lastY }, { x: i, y: -y + canvas.height / 2 });
                console.log(lastX, lastY, i, -y + canvas.height / 2);
            }, 10 * i); // Arrow function captures `this`

            lastX = i; lastY = -y + canvas.height / 2;
        }
    }

    #drawLineBetween(ctx, p1, p2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}