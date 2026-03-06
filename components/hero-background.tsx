"use client";

import { useEffect, useRef } from "react";

export function HeroBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const setCanvasSize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Particle system
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            opacity: number;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update(width: number, height: number) {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.fillStyle = `rgba(15, 23, 42, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Floating orbs
        class Orb {
            x: number;
            y: number;
            radius: number;
            speedX: number;
            speedY: number;
            hue: number;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.radius = Math.random() * 100 + 50;
                this.speedX = (Math.random() - 0.5) * 0.3;
                this.speedY = (Math.random() - 0.5) * 0.3;
                this.hue = Math.random() * 60 + 30; // Gold-ish hues
            }

            update(width: number, height: number) {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width + this.radius) this.x = -this.radius;
                if (this.x < -this.radius) this.x = width + this.radius;
                if (this.y > height + this.radius) this.y = -this.radius;
                if (this.y < -this.radius) this.y = height + this.radius;
            }

            draw(ctx: CanvasRenderingContext2D) {
                const gradient = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    0,
                    this.x,
                    this.y,
                    this.radius
                );
                gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, 0.15)`);
                gradient.addColorStop(0.5, `hsla(${this.hue}, 70%, 50%, 0.05)`);
                gradient.addColorStop(1, `hsla(${this.hue}, 70%, 40%, 0)`);

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Initialize particles and orbs
        const particles: Particle[] = [];
        const orbs: Orb[] = [];
        const particleCount = 80;
        const orbCount = 3;

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        for (let i = 0; i < orbCount; i++) {
            orbs.push(new Orb(canvas.width, canvas.height));
        }

        // Animation loop
        let animationFrameId: number;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw and update orbs
            orbs.forEach((orb) => {
                orb.update(canvas.width, canvas.height);
                orb.draw(ctx);
            });

            // Draw and update particles
            particles.forEach((particle) => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx);
            });

            // Draw connections between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.strokeStyle = `rgba(15, 23, 42, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: -1,
                opacity: 0.6,
            }}
        />
    );
}
