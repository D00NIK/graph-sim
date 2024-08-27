class GraphSim {
    #canvas;
    #ctx;
    #timeouts = [];

    #scaleX = 50;
    #scaleY = 50;

    get scaleX() {
        return this.#scaleX;
    }
    set scaleX(scaleX) {
        this.#scaleX = scaleX;
    }

    get scaleY() {
        return this.#scaleY;
    }
    set scaleY(scaleY) {
        this.#scaleY = scaleY;
    }

    constructor(canvasId) {
        this.#canvas = document.getElementById(canvasId);
        this.#ctx = this.#canvas.getContext('2d');
        this.render();
    }

    render(func) {
        if (!this.#canvas.getContext)
            return;

        // clear currents
        this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height);
        this.#timeouts.forEach(clearTimeout)
        this.#timeouts = []

        this.#drawXYAxis();
        this.#drawRes(func);
    }

    #drawXYAxis() {
        const canvas = this.#canvas;
        const ctx = this.#ctx;

        ctx.fillRect(0, canvas.height / 2, canvas.width, 1) // X Axis
        ctx.fillRect(canvas.width / 2, 0, 1, canvas.height) // Y Axis
    }

    #drawRes(func) {
        if (!func)
            return;

        const canvas = this.#canvas;
        let lastX, lastY = null;

        for (let i = 0; i <= canvas.width; i++) {
            // calculate values
            const x = i - canvas.width / 2;
            const y = this.#scaleY * math.evaluate(func, { x: x / this.#scaleX })

            if (lastX != null && lastY != null)
                this.#timeouts.push(setTimeout(this.#drawLineBetween, 4 * i, this.#ctx, { x: lastX, y: lastY }, { x: i, y: -y + canvas.height / 2 }))

            lastX = i; lastY = -y + canvas.height / 2;
        }
    }

    // it has to get ctx as timeout can't access private fields
    #drawLineBetween(ctx, p1, p2) {
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
    }
}