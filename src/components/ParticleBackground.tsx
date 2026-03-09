import { useEffect, useRef } from "react";

interface Config {
  count?: number; speed?: number; connectDistance?: number; repulseRadius?: number; colors?: string[];
}
interface Props { config?: Config; className?: string; }

export function ParticleBackground({ config = {}, className = "" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cfg = { count:70, speed:0.5, connectDistance:130, repulseRadius:90, colors:["#00C2FF","#0066FF","#00FFB2"], ...config };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    type P = { x:number;y:number;vx:number;vy:number;r:number;color:string;alpha:number };
    let particles: P[] = [];

    function init() {
      if (!canvas) return;
      particles = Array.from({ length: cfg.count }, () => {
        const a = Math.random()*Math.PI*2, s = cfg.speed*(0.4+Math.random()*0.8);
        return { x:Math.random()*canvas.width, y:Math.random()*canvas.height, vx:Math.cos(a)*s, vy:Math.sin(a)*s,
          r:1+Math.random()*1.5, color:cfg.colors[Math.floor(Math.random()*cfg.colors.length)], alpha:0.3+Math.random()*0.45 };
      });
    }

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; init();
    }

    resize();
    window.addEventListener("resize", resize);

    let mx=-9999, my=-9999;
    const onMove = (e: MouseEvent) => { const r=canvas.getBoundingClientRect(); mx=e.clientX-r.left; my=e.clientY-r.top; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", () => { mx=-9999; my=-9999; });

    let raf: number;
    function animate() {
      raf = requestAnimationFrame(animate);
      if (!canvas || !ctx) return;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p => {
        const dx=p.x-mx, dy=p.y-my, dist=Math.sqrt(dx*dx+dy*dy);
        if (dist<cfg.repulseRadius&&dist>0) {
          const f=(cfg.repulseRadius-dist)/cfg.repulseRadius;
          p.vx+=(dx/dist)*f*0.6; p.vy+=(dy/dist)*f*0.6;
          const spd=Math.sqrt(p.vx*p.vx+p.vy*p.vy);
          if(spd>3){p.vx=(p.vx/spd)*3;p.vy=(p.vy/spd)*3;}
        }
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>canvas.width) p.vx*=-1;
        if(p.y<0||p.y>canvas.height) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.color; ctx.globalAlpha=p.alpha; ctx.fill(); ctx.globalAlpha=1;
      });
      for(let i=0;i<particles.length;i++){
        for(let j=i+1;j<particles.length;j++){
          const a=particles[i],b=particles[j];
          const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy);
          if(d<cfg.connectDistance){
            ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
            ctx.strokeStyle="#00C2FF";ctx.globalAlpha=(1-d/cfg.connectDistance)*0.12;ctx.lineWidth=0.8;ctx.stroke();ctx.globalAlpha=1;
          }
        }
      }
    }
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); canvas.removeEventListener("mousemove",onMove); };
  }, []);

  return <canvas ref={canvasRef} className={`particle-canvas ${className}`} />;
}
