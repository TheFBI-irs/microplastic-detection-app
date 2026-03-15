import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function FloatingParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    // Create particles
    const count = 40;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        r: Math.random() * 3 + 1,
        dx: (Math.random() - 0.5) * 0.4,
        dy: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2,
        hue: Math.random() > 0.5 ? 350 : 0, // pink or red (Nile Red fluorescence colors)
      });
    }

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        // Glow
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
        grad.addColorStop(0, `hsla(${p.hue}, 90%, 65%, ${p.opacity})`);
        grad.addColorStop(1, `hsla(${p.hue}, 90%, 65%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${p.opacity + 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}

function CostComparisonGraph() {
  const containerRef = useRef(null);

  // "start start" starts animation when top of the 250vh container hits the top of the viewport
  // "end end" finishes animation when the bottom hits the bottom of the viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Base data sorted from lowest cost to highest (excluding our kit)
  const baseData = [
    { method: 'FTIR / µ-FTIR Microscope', cost: 50000, color: 'bg-slate-700' },
    { method: 'µ-Raman Microscope', cost: 100000, color: 'bg-slate-700' },
    { method: 'Flow Cytometry', cost: 100000, color: 'bg-slate-700' },
    { method: 'Py-GC/MS', cost: 150000, color: 'bg-slate-700' },
    { method: 'Scanning Electron Microscopy (SEM)', cost: 200000, color: 'bg-slate-700' },
  ];

  const ourKit = { method: 'Our Kit (Fluorescence Microscopy)', cost: 50, color: 'bg-cyan-500', isHighlight: true };
  const data = [...baseData, ourKit];

  const maxCost = Math.max(...data.map(d => d.cost));

  // We want the 5 base bars to animate sequentially, taking up the first 80% of the scroll progress.
  // The last 20% of the scroll progress reveals "Our Kit".
  const baseCount = baseData.length;
  const scrollPerBar = 0.8 / baseCount;

  return (
    <section ref={containerRef} className="relative h-[500vh]">
      {/* Sticky wrapper that locks the graph in the viewport */}
      <div className="sticky top-0 h-[100svh] w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl card p-5 sm:p-8 md:p-12 relative overflow-hidden shadow-2xl shadow-cyan-900/10">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <h3 className="text-xl sm:text-3xl font-bold tracking-tight mb-2 sm:mb-4 text-center text-slate-100">
            The Financial Barrier to Microplastic Research
          </h3>
          <p className="text-slate-400 text-center mb-5 sm:mb-12 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Traditional microplastic analysis requires massive capital investment.
            Our kit reduces equipment costs by <span className="text-cyan-400 font-bold">99.9%</span>.
          </p>

          <div className="space-y-3 sm:space-y-6">
            {data.map((item, i) => {
              const widthPct = Math.max((item.cost / maxCost) * 100, 0.5); // ensure at least 0.5% width

              let scrollStart, scrollEnd;
              if (item.isHighlight) {
                // Our kit animates in the final 20% of the scroll progress
                scrollStart = 0.8;
                scrollEnd = 1.0;
              } else {
                // Sequential animation for the traditional methods
                scrollStart = i * scrollPerBar;
                scrollEnd = (i + 1) * scrollPerBar;
              }

              // Map scroll progress 0->1 to 0%->widthPct% based on the item's specific scroll window
              const barWidth = useTransform(scrollYProgress, [scrollStart, scrollEnd], ["0%", `${widthPct}%`]);

              // Fade in the text just before the bar starts growing
              const opacityStart = Math.max(0, scrollStart - 0.05);
              const opacity = useTransform(scrollYProgress, [opacityStart, scrollStart + 0.05], [0, 1]);

              return (
                <div key={item.method} className="relative">
                  <motion.div style={{ opacity }} className="flex justify-between text-xs sm:text-base font-medium mb-1 sm:mb-2">
                    <span className={item.isHighlight ? "text-cyan-400 font-bold" : "text-slate-300"}>
                      {item.method}
                    </span>
                    <span className={item.isHighlight ? "text-cyan-400 font-bold tracking-tight" : "text-slate-400 font-mono"}>
                      ${item.cost.toLocaleString()}
                    </span>
                  </motion.div>
                  <div className="w-full bg-slate-800/80 rounded-full h-3 sm:h-5 overflow-hidden border border-slate-700/50">
                    <motion.div
                      className={`${item.color} h-full rounded-full`}
                      style={{ width: barWidth }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, suffix = '' }) {
  return (
    <div className="card p-5 text-center group hover:border-cyan-500/40 transition-all duration-300 hover:-translate-y-1">
      <p className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
        {value}
        <span className="text-lg">{suffix}</span>
      </p>
      <p className="text-sm text-slate-400">{label}</p>
    </div>
  );
}

export default function IntroTab({ onNavigate }) {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-[75vh] sm:min-h-[85vh] flex items-center justify-center overflow-hidden py-12 sm:py-24">
        <FloatingParticles />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-2 sm:pt-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-medium text-cyan-300 uppercase tracking-wider">
              GSDSEF 2026 — Earth &amp; Environmental Sciences
            </span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-slate-100">Detect Microplastics</span>
            <br />
            <span className="gradient-text">With AI Precision</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto mb-16 leading-relaxed">
            A $60 fluorescence microscopy kit paired with an RF-DETR transformer model
            that detects microplastic particles with{' '}
            <span className="text-cyan-400 font-semibold">89.4% mAP@50 accuracy</span>,
            making water quality testing accessible to everyone.
          </p>

          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value="89.4" suffix="%" label="mAP@50 Accuracy" />
            <StatCard value="$50" label="Total Kit Cost" />
            <StatCard value="9,336" suffix="+" label="Labeled Particles" />
            <StatCard value="5.0" suffix="%" label="Mean Count Error" />
          </div>
        </div>
      </section>

      {/* Cost Comparison Graph */}
      <CostComparisonGraph />

      {/* Primary Action Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-4">
          Ready to See the Invisible?
        </h2>
        <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-sm sm:text-base">
          Start identifying and counting microplastic particles in your water samples right now, directly from your device.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('scan')}
            className="btn-primary text-lg px-8 py-4 group"
          >
            Start Scanning
            <svg className="inline-block w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={() => onNavigate('science')}
            className="btn-secondary text-lg px-8 py-4"
          >
            Learn the Science
          </button>
        </div>
      </section>

      {/* Problem / Solution row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Problem */}
          <div className="card p-8 relative overflow-hidden group hover:border-red-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 mb-5">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">The Problem</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                Microplastics have been found in ocean water, tap water, bottled water,
                human blood, and even rainwater. They are everywhere, and invisible.
              </p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/20">
                <span className="text-2xl font-bold text-red-400">$500–$1,000</span>
                <span className="text-sm text-slate-500">per professional lab test</span>
              </div>
            </div>
          </div>

          {/* Our Solution */}
          <div className="card p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-100 mb-3">Our Solution</h3>
              <p className="text-slate-400 leading-relaxed mb-4">
                A smartphone-based detection kit using Nile Red fluorescent staining, a 60x
                clip-on microscope, and an AI model trained on 1,000+ real images, accessible
                to anyone.
              </p>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <span className="text-2xl font-bold text-emerald-400">Under $60</span>
                <span className="text-sm text-slate-500">total kit cost</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick feature cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="4.93" y1="4.93" x2="7.05" y2="7.05" /><line x1="16.95" y1="16.95" x2="19.07" y2="19.07" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /></svg>
              ),
              title: 'Fluorescence Imaging',
              desc: '470nm blue LED excites Nile Red-stained plastics, making them glow orange — invisible particles become visible.',
            },
            {
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" /></svg>
              ),
              title: 'RF-DETR 2× Large',
              desc: 'Transformer-based object detection model trained locally on an RTX 5070 Ti with 3,000+ labeled particles.',
            },
            {
              icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" /></svg>
              ),
              title: 'Instant Analysis',
              desc: 'Upload a photo, get bounding boxes and particle counts in seconds via Roboflow hosted inference.',
            },
          ].map((item) => (
            <div key={item.title} className="card p-6 group hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:bg-cyan-500/20 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
