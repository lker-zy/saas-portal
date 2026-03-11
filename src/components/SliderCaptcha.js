import React, { useState, useRef, useEffect, useCallback } from 'react';
import './SliderCaptcha.css';

/* ─────────────── Image Puzzle CAPTCHA Component ─────────────── */
const CAPTCHA_W = 280;
const CAPTCHA_H = 155;
const PIECE_S = 42;
const BUMP_R = 7;
const CAPTCHA_TOL = 6;

function SliderCaptcha({ onVerified }) {
  const canvasRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const [pos, setPos] = useState(0);
  const [verified, setVerified] = useState(false);
  const [failed, setFailed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const dataRef = useRef({ targetX: 0, targetY: 0, bgData: null, pieceCanvas: null });
  const startXRef = useRef(0);
  const sliderWRef = useRef(0);
  const posRef = useRef(0);
  const wrapperRef = useRef(null);
  const draggingRef = useRef(false);
  const onVerifiedRef = useRef(onVerified);
  onVerifiedRef.current = onVerified;

  /* Draw jigsaw piece clip-path: bumps on top + right */
  const piecePath = useCallback((ctx, x, y, s, r) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + s / 2 - r, y);
    ctx.arc(x + s / 2, y, r, Math.PI, 0, false);
    ctx.lineTo(x + s, y);
    ctx.lineTo(x + s, y + s / 2 - r);
    ctx.arc(x + s, y + s / 2, r, -Math.PI / 2, Math.PI / 2, false);
    ctx.lineTo(x + s, y + s);
    ctx.lineTo(x, y + s);
    ctx.closePath();
  }, []);

  /* Random colourful background */
  const paintBg = useCallback((ctx, w, h) => {
    const pals = [
      ['#0d47a1','#1976d2','#42a5f5','#90caf9'],
      ['#bf360c','#e65100','#ff9800','#ffcc02'],
      ['#1b5e20','#388e3c','#66bb6a','#a5d6a7'],
      ['#4a148c','#7b1fa2','#ab47bc','#ce93d8'],
      ['#880e4f','#c2185b','#f06292','#f8bbd0'],
      ['#006064','#00838f','#00bcd4','#80deea'],
      ['#37474f','#546e7a','#78909c','#b0bec5'],
    ];
    const p = pals[Math.floor(Math.random() * pals.length)];
    const g = ctx.createLinearGradient(0, 0, w, h);
    g.addColorStop(0, p[0]); g.addColorStop(0.35, p[1]);
    g.addColorStop(0.65, p[2]); g.addColorStop(1, p[3]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // bokeh circles
    for (let i = 0; i < 18; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * w, Math.random() * h, Math.random() * 30 + 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.12 + 0.03})`;
      ctx.fill();
    }
    // curves
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * w, Math.random() * h);
      ctx.bezierCurveTo(Math.random()*w,Math.random()*h, Math.random()*w,Math.random()*h, Math.random()*w,Math.random()*h);
      ctx.strokeStyle = `rgba(255,255,255,${Math.random() * 0.1 + 0.04})`;
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.stroke();
    }
    // small diamonds
    for (let i = 0; i < 10; i++) {
      const dx = Math.random() * w, dy = Math.random() * h, ds = Math.random() * 12 + 4;
      ctx.beginPath();
      ctx.moveTo(dx, dy - ds); ctx.lineTo(dx + ds, dy); ctx.lineTo(dx, dy + ds); ctx.lineTo(dx - ds, dy);
      ctx.closePath();
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.08 + 0.02})`;
      ctx.fill();
    }
  }, []);

  /* Repaint canvas with puzzle piece at a given slider % */
  const redraw = useCallback((xPct) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const { bgData, pieceCanvas, targetY } = dataRef.current;
    if (!bgData || !pieceCanvas) return;
    ctx.putImageData(bgData, 0, 0);
    const maxX = CAPTCHA_W - pieceCanvas.width;
    const px = (xPct / 100) * maxX;
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.35)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.drawImage(pieceCanvas, px, targetY - BUMP_R);
    ctx.restore();
  }, []);

  /* Generate a fresh puzzle */
  const generate = useCallback(() => {
    setVerified(false); setFailed(false); setPos(0); posRef.current = 0;
    onVerifiedRef.current?.(false);
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    paintBg(ctx, CAPTCHA_W, CAPTCHA_H);

    const PAD = BUMP_R + 3;
    const minTx = Math.floor(CAPTCHA_W * 0.4);
    const maxTx = CAPTCHA_W - PIECE_S - BUMP_R - PAD;
    const tx = Math.floor(Math.random() * (maxTx - minTx) + minTx);
    const ty = Math.floor(Math.random() * (CAPTCHA_H - PIECE_S - PAD * 2) + PAD);
    dataRef.current.targetX = tx;
    dataRef.current.targetY = ty;

    const full = ctx.getImageData(0, 0, CAPTCHA_W, CAPTCHA_H);

    /* extract puzzle piece */
    const pw = PIECE_S + BUMP_R + 4, ph = PIECE_S + BUMP_R + 4;
    const pc = document.createElement('canvas');
    pc.width = pw; pc.height = ph;
    const p = pc.getContext('2d');
    p.save();
    piecePath(p, 0, BUMP_R, PIECE_S, BUMP_R);
    p.clip();
    p.drawImage(c, tx, ty - BUMP_R, pw, ph, 0, 0, pw, ph);
    p.restore();
    // white border
    p.save();
    piecePath(p, 0, BUMP_R, PIECE_S, BUMP_R);
    p.strokeStyle = 'rgba(255,255,255,0.85)';
    p.lineWidth = 2;
    p.stroke();
    p.restore();
    dataRef.current.pieceCanvas = pc;

    /* draw hole on background */
    ctx.putImageData(full, 0, 0);
    ctx.save();
    piecePath(ctx, tx, ty, PIECE_S, BUMP_R);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    dataRef.current.bgData = ctx.getImageData(0, 0, CAPTCHA_W, CAPTCHA_H);
    redraw(0);
  }, [piecePath, paintBg, redraw]);

  useEffect(() => {
    if (showImage && !verified) generate();
  }, [showImage, generate, verified]);

  /* slider interaction */
  const handleActivate = useCallback(() => {
    if (verified || showImage) return;
    setShowImage(true);
  }, [verified, showImage]);

  const handleStart = useCallback((clientX) => {
    if (verified || !showImage) return;
    setFailed(false);
    startXRef.current = clientX;
    sliderWRef.current = sliderTrackRef.current?.offsetWidth || CAPTCHA_W;
    setDragging(true);
  }, [verified, showImage]);

  const handleMove = useCallback((clientX) => {
    if (!dragging || verified) return;
    const pct = Math.min(Math.max(((clientX - startXRef.current) / (sliderWRef.current - 40)) * 100, 0), 100);
    posRef.current = pct;
    setPos(pct);
    redraw(pct);
  }, [dragging, verified, redraw]);

  const handleEnd = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    const cp = posRef.current;
    const maxX = CAPTCHA_W - (PIECE_S + BUMP_R + 4);
    const cx = (cp / 100) * maxX;
    if (Math.abs(cx - dataRef.current.targetX) <= CAPTCHA_TOL) {
      setVerified(true);
      onVerifiedRef.current?.(true);
      setTimeout(() => setShowImage(false), 1200);
    } else {
      setFailed(true);
      setTimeout(() => { setPos(0); posRef.current = 0; setFailed(false); redraw(0); }, 600);
    }
  }, [dragging, redraw]);

  useEffect(() => { draggingRef.current = dragging; }, [dragging]);

  useEffect(() => {
    if (!dragging) return;
    const mm = (e) => handleMove(e.clientX);
    const tm = (e) => handleMove(e.touches[0].clientX);
    const up = () => handleEnd();
    window.addEventListener('mousemove', mm);
    window.addEventListener('mouseup', up);
    window.addEventListener('touchmove', tm, { passive: true });
    window.addEventListener('touchend', up);
    return () => {
      window.removeEventListener('mousemove', mm);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('touchmove', tm);
      window.removeEventListener('touchend', up);
    };
  }, [dragging, handleMove, handleEnd]);

  /* Click outside popup to close */
  useEffect(() => {
    if (!showImage) return;
    const handleClickOutside = (e) => {
      if (draggingRef.current) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowImage(false);
        setPos(0); posRef.current = 0;
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showImage]);

  const handleClose = useCallback(() => {
    if (dragging) return;
    setShowImage(false);
    setPos(0); posRef.current = 0;
  }, [dragging]);

  return (
    <div className="puzzle-captcha-wrapper" ref={wrapperRef}>
      {/* Checkbox-style trigger bar */}
      <div
        className={`puzzle-captcha-bar ${verified ? 'verified' : ''} ${showImage ? 'active' : ''}`}
        onClick={handleActivate}
      >
        <div className={`puzzle-captcha-checkbox ${verified ? 'verified' : ''}`}>
          {verified ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          )}
        </div>
        <span className="puzzle-captcha-bar-text">
          {verified ? '验证通过' : '点击进行人机验证'}
        </span>
        {verified && (
          <svg className="puzzle-captcha-bar-check" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
        )}
      </div>

      {/* Floating popup with puzzle + slider */}
      {showImage && (
        <div className="puzzle-captcha-popup">
          <div className="puzzle-captcha-popup-header">
            <span>请完成安全验证</span>
            <button type="button" className="puzzle-captcha-close" onClick={handleClose} title="关闭">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <div className="puzzle-captcha-img-wrap">
            <canvas
              ref={canvasRef}
              width={CAPTCHA_W}
              height={CAPTCHA_H}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <button type="button" className="puzzle-captcha-refresh" onClick={generate} title="换一张">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
            </button>
            {verified && (
              <div className="puzzle-captcha-overlay success">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
            )}
            {failed && (
              <div className="puzzle-captcha-overlay fail">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </div>
            )}
          </div>
          {/* Slider inside popup */}
          <div
            ref={sliderTrackRef}
            className={`puzzle-slider-track ${dragging ? 'dragging' : ''} ${verified ? 'verified' : ''} ${failed ? 'failed' : ''}`}
          >
            <div className="puzzle-slider-fill" style={{ width: `${pos}%` }} />
            <span className="puzzle-slider-text">
              {verified ? '✓ 验证通过' : failed ? '✕ 请重试' : '拖动滑块完成拼图'}
            </span>
            <div
              className={`puzzle-slider-handle ${verified ? 'verified' : ''} ${failed ? 'failed' : ''}`}
              style={{ left: `calc(${pos}% - ${pos * 0.4}px)` }}
              onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX); }}
              onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            >
              {verified ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>
              ) : failed ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A73E8" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              )}
            </div>
          </div>
          <div className="puzzle-captcha-popup-footer">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            <span>安全验证由系统提供</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default SliderCaptcha;

