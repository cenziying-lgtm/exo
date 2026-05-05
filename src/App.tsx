/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, animate } from 'motion/react';
import { ChevronDown, Star, Zap, Droplets, Sun, Wind, Gem, Flame, Snowflake, Mountain, Thermometer, Play, Pause, Music, Volume2, X } from 'lucide-react';

// Data Architecture
interface Member {
  name: string;
  unit: 'EXO-K' | 'EXO-M';
  power: string;
  symbol: React.ReactNode;
  image: string;
  description: string;
  isActive: boolean;
}

const members: Member[] = [
  // EXO-K
  { 
    name: 'Suho', unit: 'EXO-K', power: 'Water', 
    symbol: <Droplets className="w-8 h-8" />, 
    image: 'https://cdn.phototourl.com/member/2026-05-05-0f0454c2-caee-4f28-8333-0109d6ce93c6.png',
    description: 'Leader of EXO. Guardian of Water.',
    isActive: true
  },
  { 
    name: 'Baekhyun', unit: 'EXO-K', power: 'Light', 
    symbol: <Sun className="w-8 h-8" />, 
    image: 'https://cdn.phototourl.com/member/2026-05-05-74622eca-2b4a-46a9-9904-a8205b618fdf.png',
    description: 'Sovereign of Light.',
    isActive: false
  },
  { 
    name: 'Chanyeol', unit: 'EXO-K', power: 'Fire', 
    symbol: <Flame className="w-8 h-8" />, 
    image: 'https://cdn.phototourl.com/member/2026-05-05-b360eea6-b834-422e-bc63-23a0ae07b942.png',
    description: 'Master of the Flame.',
    isActive: true
  },
  { 
    name: 'D.O.', unit: 'EXO-K', power: 'Earth', 
    symbol: <Mountain className="w-8 h-8" />, 
    image: 'https://cdn.phototourl.com/member/2026-05-05-254d7764-f642-4567-a4f5-c66921f7605c.png',
    description: 'The Strength of Earth.',
    isActive: true
  },
  { 
    name: 'Kai', unit: 'EXO-K', power: 'Teleportation', 
    symbol: <Zap className="w-8 h-8" />, 
    image: 'https://link.jiyiho.cn/orfile/view.php/471f237d3955f91b1cef0c0a5dfc60fa.png',
    description: 'The Walker of Dimensions.',
    isActive: true
  },
  { 
    name: 'Sehun', unit: 'EXO-K', power: 'Wind', 
    symbol: <Wind className="w-8 h-8" />, 
    image: 'https://r2.image-upload.app/tyImg/ZixZ641a.png',
    description: 'Controller of the Zephyr.',
    isActive: true
  },
  // EXO-M
  { 
    name: 'Xiumin', unit: 'EXO-M', power: 'Frost', 
    symbol: <Snowflake className="w-8 h-8" />, 
    image: 'https://r2.image-upload.app/tyImg/1enL9WHEd.png',
    description: 'The Icy Breath of Winter.',
    isActive: false
  },
  { 
    name: 'Luhan', unit: 'EXO-M', power: 'Telekinesis', 
    symbol: <Star className="w-8 h-8" />, 
    image: 'https://link.jiyiho.cn/orfile/view.php/729f26e1b4bc1690cacc95525638c996.png',
    description: 'The Mind of the Stars.',
    isActive: false
  },
  { 
    name: 'Kris', unit: 'EXO-M', power: 'Flight', 
    symbol: <ChevronDown className="w-8 h-8 rotate-180" />, 
    image: 'https://cdn.phototourl.com/member/2026-05-05-b4f5ebaf-8a8f-4d4a-826d-cd420984b80f.png',
    description: 'The Dragon of the Skies.',
    isActive: false
  },
  { 
    name: 'Lay', unit: 'EXO-M', power: 'Healing', 
    symbol: <Gem className="w-8 h-8" />, 
    image: 'https://r2.image-upload.app/tyImg/zrt9Qe4i.png',
    description: 'The Spirit of Life.',
    isActive: true
  },
  { 
    name: 'Chen', unit: 'EXO-M', power: 'Lightning', 
    symbol: <Zap className="w-8 h-8 text-yellow-400" />, 
    image: 'https://cdn.phototourl.com/member/2026-05-05-83a8e768-656a-486f-8252-f8354d113309.png',
    description: 'The Voice of Thunder.',
    isActive: false
  },
  { 
    name: 'Tao', unit: 'EXO-M', power: 'Time Control', 
    symbol: <Thermometer className="w-8 h-8" />, 
    image: 'https://r2.image-upload.app/tyImg/Wq2RKUOb.png',
    description: 'The Keeper of Time.',
    isActive: false
  },
];

const albums = [
  { 
    title: "XOXO", 
    year: "2013", 
    image: "https://cdn.phototourl.com/free/2026-05-05-32c087ff-c708-4df5-84ab-908094bd433d.png",
    tracks: [
      { name: "Wolf", url: "https://videotourl.com/audio/1778020147806-a310a394-4e0b-4fd5-9abb-e2051420725e.mp3" },
      { name: "Growl", url: "https://videotourl.com/audio/1778020818049-f33e2bb8-ed52-4cf3-a792-b28ac774ddb3.mp3" },
      { name: "Baby Don't Cry", url: "https://videotourl.com/audio/1778021007204-8dc0153d-fae3-430a-89f0-4617abde16c3.mp3" }
    ], 
    color: "from-gray-700 to-black" 
  },
  { 
    title: "Overdose", 
    year: "2014", 
    image: "https://cdn.phototourl.com/member/2026-05-05-4fa9d442-d8c2-47e3-bdff-fdf7cb3f1b84.png",
    tracks: [
      { name: "Overdose", url: "https://videotourl.com/audio/1778021207703-b8237a90-1476-4352-b28f-d830009330ca.mp3" },
      { name: "Moonlight", url: "https://videotourl.com/audio/1778021328671-ec1a15a8-e1e6-44eb-9bc9-190a8417cafe.mp3" },
      { name: "Thunder", url: "https://videotourl.com/audio/1778021400737-0d401cb6-ba6c-4f39-a771-822856a55dee.mp3" }
    ], 
    color: "from-blue-900/20 to-black" 
  },
  { 
    title: "EXODUS", 
    year: "2015", 
    image: "https://cdn.phototourl.com/member/2026-05-05-b5a16f4f-a134-4584-af80-aaa2a8410b2e.png",
    tracks: [
      { name: "Call Me Baby", url: "https://videotourl.com/audio/1778021559099-3539e303-afc8-4eb4-94b5-f51359c9ab2d.mp3" },
      { name: "Exodus", url: "https://videotourl.com/audio/1778021705451-058304b7-afe4-4c8c-8d2b-2f0d4708926a.mp3" },
      { name: "El Dorado", url: "https://videotourl.com/audio/1778021747932-8ebbf408-1fae-4ad9-bd82-6615955ae071.mp3" }
    ], 
    color: "from-yellow-900/40 to-black" 
  },
  { 
    title: "THE WAR", 
    year: "2017", 
    image: "https://cdn.phototourl.com/member/2026-05-05-4bcd8d93-2710-4cc2-85ef-8d6ec6f61a0e.png",
    tracks: [
      { name: "Ko Ko Bop", url: "https://videotourl.com/audio/1778021797375-ef8bbe00-9f86-417e-a24b-bbcbaa08641a.mp3" },
      { name: "The Eve", url: "https://videotourl.com/audio/1778021825521-1138a4ca-e772-4667-b346-12a4a984918e.mp3" },
      { name: "What U do?", url: "https://videotourl.com/audio/1778021847329-eea0ff9a-0f23-4fe9-bee0-33f430d1a697.mp3" }
    ], 
    color: "from-green-900/40 to-black" 
  },
];

export default function App() {
  const [activeAlbumIdx, setActiveAlbumIdx] = useState(0);
  const [isSwitching, setIsSwitching] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ name: string; url: string; albumTitle: string } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [decodingProgress, setDecodingProgress] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [showRipple, setShowRipple] = useState(false);
  const cdRotation = useMotionValue(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let controls: any;
    if (isPlaying && !isSwitching) {
      controls = animate(cdRotation, cdRotation.get() + 360, {
        duration: 3,
        repeat: Infinity,
        ease: "linear"
      });
    } else {
      // Simulation of mechanical stop with slight inertia
      const current = cdRotation.get();
      animate(cdRotation, current + 8, {
        type: "spring",
        stiffness: 30,
        damping: 12
      });
    }
    return () => controls?.stop();
  }, [isPlaying, isSwitching, cdRotation]);
  const drawSoundRef = useRef<HTMLAudioElement | null>(null);
  const flipSoundRef = useRef<HTMLAudioElement | null>(null);
  const putbackSoundRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Decoding bar progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setDecodingProgress(prev => (prev >= 100 ? 0 : prev + 1));
    }, 150);
    return () => clearInterval(interval);
  }, []);

  // Global Mouse / Radar / Tilt
  const mousePos = useMotionValue({ x: 0, y: 0 });
  const radarX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const radarY = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });

  // 3D Tilt Logic for Logo
  const logoRotateX = useSpring(useTransform(radarY, [0, 1000], [5, -5]), { stiffness: 60, damping: 25 });
  const logoRotateY = useSpring(useTransform(radarX, [0, 1920], [-5, 5]), { stiffness: 60, damping: 25 });

  const handleGlobalMouseMove = (e: React.MouseEvent) => {
    radarX.set(e.clientX);
    radarY.set(e.clientY);
  };

  // Parallax
  const { scrollY } = useScroll();
  const bgParallax = useTransform(scrollY, [0, 500], [0, -100]);
  const textParallax = useTransform(scrollY, [0, 500], [0, 50]);

  // Sound triggers
  const playSound = (ref: React.RefObject<HTMLAudioElement | null>) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play().catch(() => {}); // Catch browser auto-play blocks
    }
  };

  const carouselRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const springMouseX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  
  // Calculate total shift based on mouse position
  const xTranslate = useTransform(springMouseX, [0, 1], [800, -800]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!carouselRef.current) return;
    const rect = carouselRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(x);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
  };

  useEffect(() => {
    // Initialize sound objects (Placeholders)
    drawSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3'); // Swoosh
    flipSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // Flip/Snap
    putbackSoundRef.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2571-preview.mp3'); // Soft slide
    
    // Set volumes
    if (drawSoundRef.current) drawSoundRef.current.volume = 0.2;
    if (flipSoundRef.current) flipSoundRef.current.volume = 0.3;
    if (putbackSoundRef.current) putbackSoundRef.current.volume = 0.15;
  }, []);

  // Robust Audio Control Engine
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Initialize with first track if none selected
    if (!currentTrack && albums[0]?.tracks[0]) {
      const first = albums[0].tracks[0];
      setCurrentTrack({ name: first.name, url: first.url, album: albums[0].title });
    }

    if (!currentTrack) return;

    if (isPlaying) {
      // Ensure the source is up to date
      if (audio.src !== currentTrack.url) {
        audio.src = currentTrack.url;
        audio.load();
      }
      audio.play().catch(e => {
        console.warn("Playback initialization deferred until user interaction:", e);
        setIsPlaying(false);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentTrack]);

  // Track playback progress
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100 || 0;
      setTrackProgress(progress);
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const handleAlbumClick = (index: number) => {
    if (index === activeAlbumIdx || isSwitching) return;
    
    setIsSwitching(true);
    setIsPlaying(false); // Stop current play while switching
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    playSound(drawSoundRef);
    
    setTimeout(() => {
      setActiveAlbumIdx(index);
      // Auto-select first track of the new album
      const firstTrack = albums[index].tracks[0];
      if (firstTrack) {
        setCurrentTrack({ 
          name: firstTrack.name, 
          url: firstTrack.url, 
          album: albums[index].title 
        });
      }
      
      playSound(flipSoundRef);
      setTimeout(() => {
        setIsSwitching(false);
        // CD is now locked in, start playback
        setIsPlaying(true);
      }, 600);
    }, 600);
  };
  const handleTrackClick = (trackName: string, trackUrl: string, albumTitle: string) => {
    if (currentTrack?.url === trackUrl) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack({ name: trackName, url: trackUrl, albumTitle });
      setIsPlaying(true);
    }
  };

  const handleLogoClick = () => {
    if (isAnimating || showContent) return;
    setIsAnimating(true);
    
    setTimeout(() => {
      setShowContent(true);
      setIsAnimating(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    }, 800);
  };

  return (
    <div 
      ref={containerRef} 
      onMouseMove={handleGlobalMouseMove}
      className="relative min-h-screen bg-black overflow-x-hidden selection:bg-white selection:text-black"
    >
      {/* Hidden Global Audio Engine */}
      <audio 
        ref={audioRef} 
        onEnded={() => setIsPlaying(false)}
      />

      {/* Archive Overlays */}
      <div className="fixed inset-0 pointer-events-none z-[60]">
        {/* Pixel Grid */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]" />
        
        {/* Mouse Radar Scan */}
        <motion.div 
          style={{ x: radarX, y: radarY }}
          className="absolute w-[600px] h-[600px] -ml-[300px] -mt-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_70%)] blur-3xl opacity-50"
        />

        {/* Floating Coordinates */}
        <div className="absolute top-8 left-8 text-[8px] font-mono tracking-widest text-white/20 uppercase">
          Sector: Orion-B // Alpha: 12.04
        </div>
        <div className="absolute top-8 right-8 text-[8px] font-mono tracking-widest text-white/20 uppercase">
          Omega: 20.12 // Archive Active
        </div>
        <div className="absolute bottom-8 left-8 text-[8px] font-mono tracking-widest text-white/20 uppercase">
          Exoplanet Protocol 0.8
        </div>
        <div className="absolute bottom-8 right-8 text-[8px] font-mono tracking-widest text-white/20 uppercase">
          Origin: Synchronized
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!showContent ? (
          <motion.section 
            key="splash"
            initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ 
              opacity: 0,
              y: -100,
              filter: "blur(10px)",
              scale: 1.05,
              transition: { duration: 0.8, ease: [0.645, 0.045, 0.355, 1.000] } 
            }}
            className="fixed inset-0 h-screen w-full flex items-center justify-center overflow-hidden z-50 bg-black"
          >
            <motion.div 
              initial={{ scale: 1 }}
              animate={isAnimating ? { 
                scale: 1.05,
                opacity: 0.7,
              } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 z-0 bg-black"
            >
              <img 
                src="https://cdn.phototourl.com/free/2026-05-05-688be197-a29b-4f10-8646-f7063df052f5.jpg"
                alt="Background"
                className="w-full h-full object-cover opacity-20"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="relative z-20 text-center px-4 flex flex-col items-center justify-center"
            >
              <div 
                className={`cursor-pointer transition-all duration-700 ease-out perspective-1000 h-full flex items-center justify-center ${isAnimating ? 'pointer-events-none' : ''}`}
                onClick={handleLogoClick}
              >
                <motion.div
                  style={{ 
                    rotateX: logoRotateX, 
                    rotateY: logoRotateY,
                    transformStyle: "preserve-3d"
                  }}
                  animate={isAnimating ? {
                    scaleY: [1, 1.5, 2.5],
                    scaleX: [1, 1.1, 0.8],
                    y: [0, 80, 400],
                    opacity: [1, 0.9, 0],
                    filter: ["blur(0px) contrast(1)", "blur(12px) contrast(20)", "blur(40px) contrast(30)"],
                  } : {
                    y: [-12, 12, -12]
                  }}
                  transition={isAnimating ? { 
                    duration: 0.8, 
                    ease: "circIn" 
                  } : {
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }}
                  className="relative z-10 flex flex-col items-center max-w-[80vw] md:max-w-[28vw]"
                >
                  <motion.img 
                    src="https://cdn.phototourl.com/free/2026-05-05-f045a21d-f812-4f54-9b4f-cb47a4249347.png"
                    alt="EXO Logo"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto drop-shadow-[0_0_40px_rgba(255,255,255,0.25)] select-none pointer-events-none"
                    initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />

                  {/* Melting Gooey Mask (Visualized during animation) */}
                  <div className="absolute inset-x-0 bottom-0 top-0 overflow-visible pointer-events-none">
                    {isAnimating && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0], scaleY: [0, 2, 4], y: [0, 100, 300] }}
                        transition={{ duration: 1, ease: "easeIn" }}
                        className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-white/40 h-1/2 blur-2xl"
                        style={{ filter: "url(#melt-goo)" }}
                      />
                    )}
                  </div>

                  {/* Reflection Glow */}
                  <motion.div 
                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.1)_0%,transparent_60%)] pointer-events-none"
                  />
                </motion.div>
              </div>
              
              <motion.div
                animate={isAnimating ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-white/60 text-lg md:text-2xl font-light tracking-[0.5em] uppercase mb-12">
                  We Are One
                </p>
                <div className="flex flex-col items-center gap-4">
                  <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] animate-pulse">
                    {isAnimating ? "Transitioning..." : "Click Logo to Enter"}
                  </span>
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ChevronDown className="w-6 h-6 text-white/20" />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.section>
        ) : (
            <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background Parallax Layer */}
            <motion.div 
              style={{ y: bgParallax }}
              className="fixed inset-0 z-0 pointer-events-none"
            >
              {/* Main Eclipse Image with Blend Mode */}
              <motion.div 
                animate={{ 
                  opacity: [0.6, 1.0, 0.6],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 z-0 bg-cover bg-center mix-blend-screen"
                style={{ 
                  backgroundImage: `url('https://cdn.phototourl.com/free/2026-05-05-5a684754-3471-491f-b338-891e45343a9d.jpg')`,
                }}
              />
              
              {/* Central Pulse Glow */}
              <motion.div 
                animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.2, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-[120px]"
              />

              {/* Twinkling Stars Overlay */}
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      opacity: [0.1, 0.8, 0.1],
                      scale: [1, 1.5, 1]
                    }}
                    transition={{ 
                      duration: 2 + Math.random() * 3, 
                      repeat: Infinity, 
                      delay: Math.random() * 5 
                    }}
                    className="absolute w-0.5 h-0.5 bg-white rounded-full blur-[0.5px]"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              {/* Seamless Fade To Black Mask */}
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black" style={{ backgroundSize: '100% 100%', backgroundPosition: '0 60%' }} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_90%)]" />
            </motion.div>

            {/* Main Content Sections */}
            <main className="relative z-20 container mx-auto px-6 pt-20">
              {/* Hero Section Split Layout */}
              <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                {/* Left Side: Narrative */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{ y: textParallax }}
                  className="space-y-12 mix-blend-difference pr-0 lg:pr-12"
                >
                  <div className="space-y-4">
                    <motion.h1 
                      className="text-7xl md:text-[8rem] xl:text-[10rem] font-bold uppercase leading-none tracking-tighter"
                      style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)', color: 'transparent' }}
                    >
                      From<br />
                      <span className="text-white ml-8 md:ml-20">Exoplanet</span>
                    </motion.h1>
                    <p className="text-white/40 text-sm font-mono tracking-[0.3em] uppercase ml-1">Deep Space Archive // Established 2012</p>
                  </div>

                  <div className="max-w-md space-y-6">
                    <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light italic border-l border-white/20 pl-6">
                      They arrived from a planet beyond our star system, twelve guardians chosen to preserve the equilibrium of the universe. Each command an element, each hold a secret to the stars.
                    </p>
                    
                    {/* Decoding Progress Bar */}
                    <div className="space-y-2 pt-8">
                      <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">
                        <span>Decoding Origin Protocol...</span>
                        <span>{decodingProgress}%</span>
                      </div>
                      <div className="h-0.5 w-full bg-white/5 overflow-hidden">
                        <motion.div 
                          className="h-full bg-white/40"
                          animate={{ width: `${decodingProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Right Side Empty to keep alignment */}
                <div className="hidden lg:block h-1" />
              </section>

              {/* Member Carousel Section */}
        <div id="members" className="mb-40 overflow-visible w-full">
          <div className="flex items-center justify-between mb-12 border-b border-white/10 pb-4">
            <div className="flex flex-col">
              <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight">The Guardians</h2>
              <p className="text-white/20 text-[10px] font-mono tracking-[0.4em] uppercase mt-1">Interdimensional Archive</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-4 text-xs font-mono tracking-widest text-white/40">
                <span className="text-white">12 ELEMENTS</span>
                <span>2 UNITS</span>
              </div>
              <div className="text-[10px] text-white/20 uppercase tracking-widest">
                Move mouse to explore panorama
              </div>
            </div>
          </div>

          <div 
            ref={carouselRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                if (selectedId !== null) playSound(putbackSoundRef);
                setSelectedId(null);
              }
            }}
            className="relative h-[600px] w-full flex items-center justify-center overflow-visible select-none cursor-crosshair perspective-2000"
          >
            <motion.div 
              style={{ x: xTranslate }}
              className="flex items-center px-[30vw]"
            >
              {members.map((member, index) => {
                const isSelected = selectedId === index;
                
                return (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ 
                      opacity: [0, 0.4, 0.2, 0.8, 1],
                      scale: 1,
                    }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.1,
                      times: [0, 0.2, 0.4, 0.6, 1],
                      ease: "easeInOut"
                    }}
                    className="relative w-[280px] md:w-[320px] aspect-[2/3] mx-[-30px] md:mx-[-50px] first:ml-0 last:mr-0"
                    style={{ 
                      perspective: "1200px",
                      zIndex: isSelected ? 100 : 10 + index,
                    }}
                  >
                    {/* Wrapper for Hover & State Locking */}
                    <motion.div
                      className="w-full h-full preserve-3d cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isSelected) {
                          playSound(putbackSoundRef);
                          setSelectedId(null);
                        } else {
                          playSound(flipSoundRef);
                          setSelectedId(index);
                        }
                      }}
                      onMouseEnter={() => {
                        if (!isSelected) playSound(drawSoundRef);
                      }}
                      animate={{
                        y: isSelected ? -50 : 0,
                        rotateX: isSelected ? 12 : 0,
                        rotateZ: isSelected ? (index % 2 === 0 ? 2 : -2) : 0,
                        transition: { type: "spring", stiffness: 200, damping: 25 }
                      }}
                      whileHover={!isSelected ? { 
                        y: -40,
                        rotateX: 8,
                        rotateZ: (index % 2 === 0 ? 1 : -1),
                        transition: { type: "spring", stiffness: 200, damping: 25 }
                      } : {}}
                    >
                      {/* Inner Container: The physical flipper */}
                      <motion.div
                        className="relative w-full h-full"
                        style={{ transformStyle: "preserve-3d" }}
                        initial={false}
                        animate={{ rotateY: isSelected ? 180 : 0 }}
                        transition={{ type: "spring", stiffness: 200, damping: 25 }}
                      >
                        {/* Front Face (Layer A) */}
                        <div 
                          className={`absolute inset-0 silver-border rounded-[20px] overflow-hidden bg-black flex flex-col transition-all duration-500 ${!member.isActive ? 'grayscale brightness-75' : 'opacity-100'}`}
                          style={{ 
                            backfaceVisibility: "hidden", 
                            WebkitBackfaceVisibility: "hidden",
                            boxShadow: isSelected 
                              ? "0 50px 100px -20px rgba(0,0,0,0.8), 0 30px 60px -30px rgba(255,255,255,0.1)" 
                              : "0 10px 30px rgba(0,0,0,0.8)"
                          }}
                        >
                          {/* Photocard Image Area */}
                          <div className="relative h-[75%] overflow-hidden">
                            <img 
                              src={member.image} 
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                            />
                            
                            {!member.isActive && (
                              <div className="absolute top-4 left-4 z-20">
                                <span className="px-3 py-1 text-[8px] font-bold font-mono tracking-widest text-white/60 border border-white/20 backdrop-blur-md bg-black/40 rounded-full">
                                  FORMER
                                </span>
                              </div>
                            )}

                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-500">
                              <div className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] scale-125">
                                {member.symbol}
                              </div>
                            </div>
                          </div>

                          {/* Content Section */}
                          <div className="h-[25%] p-5 bg-linear-to-b from-white/5 to-transparent backdrop-blur-xl flex flex-col justify-between border-t border-white/10">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <h3 className={`text-xl font-bold uppercase tracking-tighter ${member.isActive ? 'text-white' : 'text-zinc-500'}`}>
                                  {member.name}
                                </h3>
                                <span className={`px-2 py-0.5 text-[8px] font-bold font-mono tracking-widest border rounded-full ${
                                   member.isActive ? 'text-white/80 border-white/20' : 'text-zinc-500 border-zinc-500/20'
                                }`}>
                                  {member.unit}
                                </span>
                              </div>
                              <p className="text-[10px] text-white/30 font-mono uppercase tracking-[0.2em]">
                                Power: <span className="text-white/60">{member.power}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Back Face (Layer B) - Fixed Structure */}
                        <div 
                          className={`absolute inset-0 silver-border rounded-[20px] bg-zinc-900/95 backdrop-blur-xl flex flex-col p-8 overflow-hidden ${!member.isActive ? 'grayscale opacity-90' : ''}`}
                          style={{ 
                            backfaceVisibility: "hidden", 
                            WebkitBackfaceVisibility: "hidden",
                            transform: "rotateY(180deg)" 
                          }}
                        >
                          {/* Artistic Background Logo */}
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 scale-[4] text-white pointer-events-none">
                            {member.symbol}
                          </div>

                          <div className="relative z-10 flex flex-col h-full items-center text-center justify-between">
                            <div className="w-full border-b border-white/10 pb-4">
                              <p className="text-[10px] text-white/30 font-mono tracking-[0.4em] uppercase mb-1">Guardian Registry</p>
                              <h4 className={`text-2xl font-bold uppercase tracking-widest ${member.isActive ? 'metallic-text' : 'text-zinc-400'}`}>{member.name}</h4>
                            </div>

                            <div className="flex flex-col items-center gap-4">
                              <div className={`p-4 rounded-full border border-white/10 bg-white/5 transition-colors ${member.isActive ? 'text-white/80' : 'text-zinc-600'}`}>
                                {member.symbol}
                              </div>
                            </div>

                            <div className="w-full space-y-6">
                               <div className="text-left space-y-3">
                                  <p className="text-[9px] text-white/30 uppercase tracking-[0.3em]">Guardian's Message</p>
                                  <div className="relative">
                                    <p className={`text-sm leading-relaxed font-serif italic tracking-tight opacity-90 select-none ${!member.isActive ? 'text-zinc-400' : 'text-white/80'}`}>
                                      "Across dimensions, our light remains connected. To the stars who watch us, thank you for being our universe."
                                    </p>
                                    <div className={`h-[1px] w-full mt-4 bg-linear-to-r from-transparent ${member.isActive ? 'via-white/20' : 'via-zinc-600/20'} to-transparent`} />
                                    
                                    <p className={`mt-4 text-3xl font-serif italic tracking-tighter opacity-70 select-none ${!member.isActive ? 'text-zinc-500 drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]' : 'text-white/90'}`}>
                                      {member.name}
                                    </p>
                                  </div>
                               </div>
                               <div className="flex justify-between items-end border-t border-white/10 pt-4">
                                  <div className="text-left">
                                    <p className="text-[8px] text-white/20 uppercase">Unit Partition</p>
                                    <p className="text-sm font-bold text-white/60 font-mono">{member.unit}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[8px] text-white/20 uppercase">Status</p>
                                    <p className={`text-sm font-bold font-mono ${member.isActive ? 'text-green-500/60' : 'text-zinc-500'}`}>{member.isActive ? 'ACTIVE' : 'FORMER'}</p>
                                  </div>
                               </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Discography Section */}
        <div id="albums" className="mb-40 relative px-4 md:px-0">
           {/* Section Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-white/[0.02] blur-[120px] rounded-full pointer-events-none" />
           
           <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-16 border-b border-white/10 pb-6 relative z-10 gap-4">
              <div className="flex items-center gap-6">
                <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Recording Room</h2>
                <div className="hidden md:flex gap-1.5 items-end h-8">
                  {[...Array(8)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: isPlaying ? [6, 32, 10, 26, 14] : 4 }}
                      transition={{ 
                        duration: 1.2, 
                        repeat: Infinity, 
                        delay: i * 0.15,
                        ease: "easeInOut"
                      }}
                      className="w-1.5 bg-white/30 rounded-full"
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono tracking-[0.5em] text-white/40 uppercase">Audio Transmission // Active</span>
                <span className="text-[10px] font-mono tracking-[0.5em] text-white/20 uppercase">Core Data // Sector 2012-2026</span>
              </div>
           </div>

            <div className="flex flex-col lg:flex-row gap-16 relative z-10 max-w-7xl mx-auto items-center lg:items-start pt-10">
              {/* Left Side: Professional Jewel Case Player (Red Box Alignment) */}
              <div className="w-full lg:w-[600px] flex flex-col items-start">
                
                {/* CD Case Display - Unified Coordinate System (Red Box Alignment) */}
                <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* Bottom Layer: Case Material - Using absolute inset for full coverage */}
                  <img 
                    src="https://cdn.phototourl.com/free/2026-05-05-b3c516f6-2b78-4fc0-a625-37b48594bbe7.png"
                    className="absolute inset-0 w-full h-full object-contain mix-blend-screen opacity-95 z-20 pointer-events-none"
                    style={{ filter: "brightness(1.4) contrast(1.1)" }}
                    alt="Jewel Case"
                  />
                  
                  {/* Middle Layer: The Spinning CD - Precisely Centered via Pivot Logic */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeAlbumIdx}
                      initial={{ scale: 0.8, rotate: -45, opacity: 0 }}
                      animate={isSwitching ? { scale: 0.5, rotate: 90, opacity: 0 } : { scale: 1, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.5, rotate: 90, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 100, damping: 20 }}
                      onClick={() => {
                        if (!currentTrack && albums[activeAlbumIdx].tracks[0]) {
                          const first = albums[activeAlbumIdx].tracks[0];
                          setCurrentTrack({ name: first.name, url: first.url, albumTitle: albums[activeAlbumIdx].title });
                          setIsPlaying(true);
                        } else {
                          setIsPlaying(!isPlaying);
                        }
                        setShowRipple(true);
                        setTimeout(() => setShowRipple(false), 600);
                      }}
                      className="absolute top-[50%] left-[52.5%] -translate-x-1/2 -translate-y-1/2 w-[66.5%] h-[66.5%] rounded-full overflow-hidden shadow-2xl z-10 cursor-pointer group/cd"
                      whileHover={{ 
                        rotateX: 5,
                        rotateY: 5,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      style={{ 
                        transformStyle: 'preserve-3d'
                      }}
                    >
                      {/* Rotation Wrapper - Centralized Origin */}
                      <motion.div 
                        style={{ 
                          rotate: cdRotation,
                          transformOrigin: 'center center'
                        }}
                        className="absolute inset-0"
                      >
                        <div className="absolute inset-0 cd-disc">
                          <img 
                            src={albums[activeAlbumIdx].image} 
                            alt="Album Art" 
                            className="w-full h-full object-cover opacity-60 mix-blend-overlay scale-110"
                          />
                        </div>
                        <motion.div 
                          className="cd-iridescent opacity-25 group-hover/cd:opacity-45 transition-opacity" 
                          style={{
                            background: "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.2) 100%)"
                          }}
                        />
                        
                        {/* Interaction Indicator */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/cd:opacity-100 transition-opacity z-20">
                          <div className="bg-black/40 backdrop-blur-md rounded-full p-4 border border-white/10 shadow-2xl">
                            {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white ml-1" />}
                          </div>
                        </div>
                      </motion.div>

                      {/* Ripple Effect */}
                      <AnimatePresence>
                        {showRipple && (
                          <motion.div 
                            initial={{ scale: 0, opacity: 0.5 }}
                            animate={{ scale: 2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-white/20 rounded-full z-30 pointer-events-none"
                          />
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </AnimatePresence>



                  {/* Top Layer: Progress Ring & Reflections */}
                  <div className="jewel-case-reflection z-40 opacity-15 pointer-events-none" />
                </div>

                {/* Album Info - Positioned underneath with matching alignment */}
                <div className="w-full space-y-6 mt-12 px-4 md:px-0">
                  <div className="space-y-1">
                    <motion.p 
                      key={activeAlbumIdx + '-year'}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      className="text-4xl font-bold tracking-[0.2em] italic font-mono"
                    >
                      [{albums[activeAlbumIdx].year}]
                    </motion.p>
                    <motion.h3 
                      key={activeAlbumIdx + '-title'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-5xl md:text-8xl font-bold uppercase tracking-tighter metallic-text leading-[0.85]"
                    >
                      {albums[activeAlbumIdx].title}
                    </motion.h3>
                  </div>

                  {/* Tracklist Area */}
                  <div className="h-40 overflow-y-auto scrollbar-hide border-t border-white/5 pt-6 w-full">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                      {albums[activeAlbumIdx].tracks.map((track, tIdx) => (
                        <motion.div 
                          key={track.name}
                          onClick={() => handleTrackClick(track.name, track.url, albums[activeAlbumIdx].title)}
                          className={`group/track flex items-center justify-between cursor-pointer p-2 rounded-md transition-all ${
                            currentTrack?.url === track.url ? 'bg-white/10 text-white' : 'text-white/30 hover:bg-white/5 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[9px] font-mono opacity-30">0{tIdx + 1}</span>
                            <span className="text-[12px] truncate font-medium uppercase tracking-wider">{track.name}</span>
                          </div>
                          {currentTrack?.url === track.url && isPlaying ? <Music className="w-3 h-3 animate-pulse" /> : <Play className="w-3 h-3 opacity-0 group-hover/track:opacity-40" />}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Circular CD Library */}
              <div className="flex-1 flex flex-col gap-10 lg:pt-14">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h4 className="text-xs font-mono uppercase tracking-[0.4em] text-white/40">Select Medium</h4>
                  <Zap className="w-3 h-3 text-white/20 animate-pulse" />
                </div>

                <div className="grid grid-cols-2 gap-x-12 gap-y-20 h-auto px-6 pt-2 pb-10 scrollbar-hide items-start -translate-y-4">
                  {albums.map((album, idx) => (
                    <div key={album.title} className="flex flex-col items-center gap-8 group">
                      <motion.div
                        whileHover={{ 
                          scale: 1.08,
                          rotateX: 10,
                          rotateY: -10,
                          transition: { type: "spring", stiffness: 400, damping: 20 }
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAlbumClick(idx)}
                        className={`relative cursor-pointer aspect-square w-full rounded-full overflow-visible transition-all duration-700 perspective-1000`}
                      >
                        {/* Interactive PNG Container */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-2">
                          <img 
                            src={album.image} 
                            alt={album.title}
                            className={`w-full h-full object-contain transition-all duration-1000 ${
                              activeAlbumIdx === idx 
                                ? 'brightness-110 drop-shadow-[0_0_20px_rgba(180,240,255,0.4)]' 
                                : 'brightness-75 group-hover:brightness-100 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]'
                            }`}
                          />
                        </div>

                        {/* Custom Active Stroke - Only visible on selection */}
                        {activeAlbumIdx === idx && (
                          <motion.div 
                            layoutId="activeLibraryRing"
                            className="absolute -inset-2 border-2 border-[#b4f0ff]/40 rounded-full z-10 pointer-events-none"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}

                        {/* Laser Highlight Reflection */}
                        <div className="absolute inset-0 pointer-events-none rounded-full overflow-hidden">
                          <motion.div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity bg-linear-to-tr from-transparent via-white/40 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full duration-1000"
                          />
                        </div>
                      </motion.div>
                      
                      <div className="text-center group-hover:translate-y-[-4px] transition-transform duration-500">
                        <p className="text-[10px] font-mono text-white/20 mb-1 tracking-[0.3em] uppercase">{album.year}</p>
                        <h5 className={`text-[12px] font-bold uppercase tracking-[0.25em] transition-colors leading-tight ${
                          activeAlbumIdx === idx ? 'text-white' : 'text-white/40 group-hover:text-white/70'
                        }`}>{album.title}</h5>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Deco */}
                <div className="p-6 rounded-2xl bg-transparent border border-white/10 space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white/60" />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Format</p>
                      <p className="text-xs font-bold uppercase">Hi-Res Lossless 24-bit</p>
                    </div>
                  </div>
                  <p className="text-[10px] leading-relaxed text-white/20 font-mono italic">
                    Binary reconstruction of star-energy soundwaves. Do not interrupt during sync.
                  </p>
                </div>
              </div>
           </div>
        </div>
      </main>

            {/* Return Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-14 flex justify-center"
            >
              <motion.button
                onClick={() => {
                  setShowContent(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit px-10 py-3 border border-white/10 rounded-full bg-white/5 backdrop-blur-[4px] hover:border-white/40 hover:bg-white/10 transition-all group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="text-[10px] font-mono tracking-[0.5em] text-white/30 uppercase group-hover:text-white transition-colors relative z-10 flex items-center justify-center gap-4">
                  <ChevronDown className="w-3 h-3 rotate-180 opacity-50 group-hover:opacity-100" />
                  Return to Exoplanet // 起源
                </span>
              </motion.button>
            </motion.div>

            {/* Footer */}
            <footer className="relative z-20 py-32 border-t border-white/5 text-center bg-black">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: false }}
           className="mb-12"
        >
          <h2 className="text-6xl font-bold metallic-text uppercase tracking-tighter mb-2">EXO</h2>
          <p className="text-white/40 text-sm font-light tracking-[0.6em] uppercase">We Are One</p>
        </motion.div>
        
        <div className="mb-8 flex justify-center gap-6">
          <InstagramIcon className="w-5 h-5 text-white/40 hover:text-white transition-colors" />
          <TwitterIcon className="w-5 h-5 text-white/40 hover:text-white transition-colors" />
          <YoutubeIcon className="w-5 h-5 text-white/40 hover:text-white transition-colors" />
        </div>
        <p className="text-white/20 text-[10px] tracking-[0.4em] uppercase">
          &copy; 2012-2024 SM Entertainment | SM TOWN | Produced by AI Studio
        </p>
      </footer>
      
      {/* Floating Return Button */}
      <AnimatePresence>
        {showContent && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            onClick={() => {
              setShowContent(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="fixed bottom-8 right-8 z-[70] p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-full hover:bg-white/10 transition-all group scale-90 md:scale-100"
          >
            <ChevronDown className="w-6 h-6 text-white/40 group-hover:text-white rotate-180" />
            <span className="sr-only">Return to Origin</span>
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  )}
</AnimatePresence>
      {/* SVG Filters for Effects */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0">
        <defs>
          <filter id="melt-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 25 -10" result="goo" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

// Minimal Icons
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
  );
}

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
  );
}
