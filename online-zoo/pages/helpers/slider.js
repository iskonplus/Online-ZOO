export function initSlider(root) {
  if (!root) return;

  const track = root.querySelector(".slider__track");
  const viewport = root.querySelector(".slider__viewport");
  const arrows = root.querySelector(".wrapper-slider-arrows");
  if (!track || !viewport || !arrows) return;

  const SLIDE_MS = 350;
  const BOUNCE_OUT_MS = 150;
  const BOUNCE_BACK_MS = 220;
  const EDGE_PX = 12;

  let step = 0;
  let pos = 0;
  let maxTranslate = 0;

  let timer = null;
  let isBouncing = false;

  const px = (v) => (v && v !== "normal" ? parseFloat(v) : 0);

  function gapPx() {
    const cs = getComputedStyle(track);
    return px(cs.columnGap) || px(cs.gap) || 0;
  }

  function calcStep() {
    const first = track.children[0];
    if (!first) return 0;
    return Math.round(first.getBoundingClientRect().width + gapPx());
  }

  function setTransform(x, ms) {
    track.style.transition = ms ? `transform ${ms}ms ease` : "none";
    track.style.transform = `translateX(${-x}px)`;
  }

  function render(nextPos, ms = SLIDE_MS) {
    pos = Math.max(0, Math.min(nextPos, maxTranslate));
    setTransform(pos, ms);
  }

  function bounce(dir) {
    if (isBouncing) return;
    isBouncing = true;

    const base = pos;
    const bump = base + dir * Math.min(step * 0.25, 60);

    setTransform(bump, BOUNCE_OUT_MS);

    clearTimeout(timer);
    timer = setTimeout(() => {
      setTransform(base, BOUNCE_BACK_MS);
      pos = base;
      isBouncing = false;
      timer = null;
    }, BOUNCE_OUT_MS);
  }

  function recalc() {
    step = calcStep();
    if (!step) return;

    maxTranslate = Math.max(0, track.scrollWidth - viewport.clientWidth);

    pos = Math.min(pos, maxTranslate);
    setTransform(pos, 0);
  }

  function move(dir) {
    if (!step || isBouncing) return;

    const atStart = pos <= EDGE_PX;
    const atEnd = maxTranslate - pos <= EDGE_PX;

    if ((dir < 0 && atStart) || (dir > 0 && atEnd)) return bounce(dir);
  
    const next = pos + dir * step;

    if (next < 0) return render(0, SLIDE_MS);
    if (next > maxTranslate) return render(maxTranslate, SLIDE_MS);

    render(next, SLIDE_MS);
  }

  arrows.addEventListener("click", (e) => {
    if (e.target.closest(".left")) move(-1);
    if (e.target.closest(".right")) move(1);
  });

  window.addEventListener("resize", recalc);
  recalc();
}
