(function () {
  if (window.innerWidth < 1024 || !window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);
  var st = { start: "top 88%", once: true };

  /* D8 frame sequence: the Z mark behind the CTA assembles from its three bars */
  document.querySelectorAll(".seq-zmark").forEach(function (z) {
    var tl = gsap.timeline({ scrollTrigger: { trigger: z, start: "top 92%", once: true } });
    tl.from(z.querySelector(".zp-top"), { y: -34, opacity: 0, duration: .55, ease: "power3.out" })
      .from(z.querySelector(".zp-diag"), { x: 34, opacity: 0, duration: .55, ease: "power3.out" }, "-=0.25")
      .from(z.querySelector(".zp-bot"), { y: 34, opacity: 0, duration: .55, ease: "power3.out" }, "-=0.25");
  });

  /* Hatched Z marks draw in on detail heroes */
  document.querySelectorAll(".hatch-z path").forEach(function (p) {
    try {
      var len = p.getTotalLength();
      gsap.fromTo(p, { strokeDasharray: len, strokeDashoffset: len },
        { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" });
    } catch (e) {}
  });

  /* Bands sweep in */
  gsap.utils.toArray(".band").forEach(function (b) {
    gsap.from(b, { x: -70, opacity: 0, duration: .8, ease: "power3.out",
      scrollTrigger: { trigger: b, start: "top 96%", once: true } });
  });

  /* Statement blocks rise in */
  gsap.utils.toArray("[data-rise]").forEach(function (el) {
    gsap.from(el, { y: 30, opacity: 0, duration: .7, ease: "power3.out",
      scrollTrigger: { trigger: el, start: st.start, once: true } });
  });

  /* Chain groups: children light in sequence */
  document.querySelectorAll("[data-joins]").forEach(function (g) {
    gsap.from(g.children, { opacity: 0, y: 14, duration: .45, stagger: .12, ease: "power2.out",
      scrollTrigger: { trigger: g, start: st.start, once: true } });
  });

  /* Node groups pop in, then a travelling pulse runs along them */
  document.querySelectorAll("[data-nodes]").forEach(function (g) {
    var nodes = g.querySelectorAll(".pnode");
    if (!nodes.length) return;
    gsap.from(nodes, { scale: 0, transformOrigin: "center", duration: .4, stagger: .1, ease: "back.out(2)",
      scrollTrigger: { trigger: g, start: st.start, once: true } });
    gsap.to(nodes, { opacity: .35, duration: .5, stagger: .22, repeat: -1, yoyo: true, repeatDelay: .8, delay: 1.2 });
  });
})();
