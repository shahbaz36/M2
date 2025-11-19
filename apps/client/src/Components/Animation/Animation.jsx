import React, { useEffect, useRef } from 'react';
import styles from './Animation.module.css';

const Animation = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let time = 0;

        const initParticles = () => {
            particles = [];
            const spacing = 35;
            const rows = Math.ceil(canvas.height / spacing);
            const cols = Math.ceil(canvas.width / spacing);

            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const offsetX = (Math.random() - 0.5) * 10;
                    const offsetY = (Math.random() - 0.5) * 10;
                    particles.push(new Particle(i * spacing + offsetX, j * spacing + offsetY));
                }
            }
        };

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor(x, y) {
                this.originX = x;
                this.originY = y;
                this.x = x;
                this.y = y;
                this.baseSize = 1.2;
                this.size = this.baseSize;
                this.color = '#1a1a1a';
                this.angle = 0;

                this.jitterPhase = Math.random() * Math.PI * 2;
                this.jitterSpeed = 0.02 + Math.random() * 0.02;
                this.jitterRadius = 2 + Math.random() * 2;
            }

            update(mouse, globalTime) {
                const jitterX = Math.cos(globalTime * this.jitterSpeed + this.jitterPhase) * this.jitterRadius;
                const jitterY = Math.sin(globalTime * this.jitterSpeed + this.jitterPhase) * this.jitterRadius;

                const currentOriginX = this.originX + jitterX;
                const currentOriginY = this.originY + jitterY;

                const dx = mouse.x - currentOriginX;
                const dy = mouse.y - currentOriginY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const radius = 300;

                if (dist > radius + 50) {
                    this.alpha = 0;
                    return;
                }

                this.alpha = 1 - Math.pow(dist / (radius + 50), 3);
                if (this.alpha < 0) this.alpha = 0;

                let targetX = currentOriginX;
                let targetY = currentOriginY;
                let targetSize = this.baseSize;
                let targetAngle = 0;

                if (dist < radius) {
                    const force = (radius - dist) / radius;
                    const displacement = force * 80;
                    const angleToMouse = Math.atan2(dy, dx);

                    targetX = currentOriginX - (Math.cos(angleToMouse) * displacement);
                    targetY = currentOriginY - (Math.sin(angleToMouse) * displacement);

                    targetSize = this.baseSize * (2.0 - (1.5 * force));

                    targetAngle = (angleToMouse + Math.PI / 2) * force;
                }

                this.x += (targetX - this.x) * 0.15;
                this.y += (targetY - this.y) * 0.15;
                this.size += (targetSize - this.size) * 0.15;
                this.angle += (targetAngle - this.angle) * 0.15;
            }

            draw() {
                if (this.alpha <= 0.01) return;

                ctx.globalAlpha = this.alpha;
                ctx.fillStyle = this.color;

                const width = this.size * 5;
                const height = this.size * 1.2;

                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.angle);

                ctx.beginPath();
                ctx.rect(-width / 2, -height / 2, width, height);
                ctx.fill();

                ctx.restore();
                ctx.globalAlpha = 1.0;
            }
        }

        const mouse = { x: -1000, y: -1000 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const animate = () => {
            time += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update(mouse, time);
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        resizeCanvas();
        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={styles.canvas}
        />
    );
};

export default Animation;
