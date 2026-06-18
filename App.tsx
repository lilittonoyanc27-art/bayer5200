import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Gamepad2,
  Sparkles,
  Trophy,
  RefreshCw,
  Volume2,
  VolumeX,
  Bookmark,
  Search,
  ArrowRight,
  CheckCircle2,
  XCircle,
  RotateCcw,
  HelpCircle,
  Award,
  Zap,
  TrendingUp,
  Flame,
  Check,
  ChevronRight,
  Heart
} from 'lucide-react';
import { theorySections } from './theoryData';
import {
  game1Questions,
  game2Questions,
  game3Questions,
  game4Questions,
  game5Questions,
  game6Questions
} from './gamesData';

export default function App() {
  // Navigation
  const [activeTab, setActiveTab] = useState<'theory' | 'games'>('theory');
  
  // App settings & metrics
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('subj_sound');
    return saved !== null ? saved === 'true' : true;
  });
  
  const [totalScore, setTotalScore] = useState<number>(() => {
    return Number(localStorage.getItem('subj_score') || '0');
  });

  const [streak, setStreak] = useState<number>(() => {
    return Number(localStorage.getItem('subj_streak') || '0');
  });

  const [highestStreak, setHighestStreak] = useState<number>(() => {
    return Number(localStorage.getItem('subj_high_streak') || '0');
  });
  
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('subj_achieve') || '[]');
  });

  const [bookmarks, setBookmarks] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('subj_bookmarks') || '[]');
  });

  const [completedSections, setCompletedSections] = useState<number[]>(() => {
    return JSON.parse(localStorage.getItem('subj_completed_sections') || '[]');
  });

  // Theory controls
  const [selectedSectionId, setSelectedSectionId] = useState<number>(1);
  const [theorySearch, setTheorySearch] = useState<string>('');
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);
  
  // Game states
  const [activeGameId, setActiveGameId] = useState<number>(1);
  
  // Game 1 State (Conjugator)
  const [g1Idx, setG1Idx] = useState<number>(0);
  const [g1Selected, setG1Selected] = useState<string | null>(null);
  const [g1Status, setG1Status] = useState<'idle' | 'correct' | 'wrong'>('idle');
  
  // Game 2 State (Indicativo vs Subjuntivo)
  const [g2Idx, setG2Idx] = useState<number>(0);
  const [g2Selected, setG2Selected] = useState<string | null>(null);
  const [g2Status, setG2Status] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Game 3 State (Wish Builder)
  const [g3Idx, setG3Idx] = useState<number>(0);
  const [g3SelectedWords, setG3SelectedWords] = useState<string[]>([]);
  const [g3Status, setG3Status] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Game 4 State (Cuando Time Traveler)
  const [g4Idx, setG4Idx] = useState<number>(0);
  const [g4Selected, setG4Selected] = useState<string | null>(null);
  const [g4Status, setG4Status] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Game 5 State (Trigger Category Jeopardy)
  const [g5Idx, setG5Idx] = useState<number>(0);
  const [g5Selected, setG5Selected] = useState<string | null>(null);
  const [g5Status, setG5Status] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Game 6 State (Translation Duel)
  const [g6Idx, setG6Idx] = useState<number>(0);
  const [g6Selected, setG6Selected] = useState<string | null>(null);
  const [g6Status, setG6Status] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Feedback messages
  const [showToast, setShowToast] = useState<string | null>(null);

  // Initialize word-builder scrambled state for Game 3
  const [g3Scrambled, setG3Scrambled] = useState<string[]>([]);

  // Sound effects
  const playSound = (type: 'success' | 'error' | 'win' | 'click') => {
    if (!soundEnabled) return;
    try {
      const gX = window.AudioContext || (window as any).webkitAudioContext;
      if (!gX) return;
      const ctx = new gX();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'success') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.16); // G5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(147, ctx.currentTime + 0.1); // D3
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start();
        osc.stop(ctx.currentTime + 0.08);
      } else if (type === 'win') {
        osc.type = 'sine';
        const now = ctx.currentTime;
        osc.frequency.setValueAtTime(261.63, now);
        osc.frequency.setValueAtTime(329.63, now + 0.08);
        osc.frequency.setValueAtTime(392.00, now + 0.16);
        osc.frequency.setValueAtTime(523.25, now + 0.24);
        osc.frequency.setValueAtTime(659.25, now + 0.32);
        osc.frequency.setValueAtTime(1046.50, now + 0.4);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.005, now + 0.6);
        osc.start();
        osc.stop(now + 0.65);
      }
    } catch (e) {
      console.warn("AudioContext init bypassed: interact with the page first", e);
    }
  };

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('subj_sound', String(soundEnabled));
  }, [soundEnabled]);

  useEffect(() => {
    localStorage.setItem('subj_score', String(totalScore));
    localStorage.setItem('subj_streak', String(streak));
    if (streak > highestStreak) {
      setHighestStreak(streak);
      localStorage.setItem('subj_high_streak', String(streak));
    }
    
    // Evaluate achievements
    const ach = [...unlockedAchievements];
    if (totalScore >= 100 && !ach.includes('լավ_սկիզբ')) {
      ach.push('լավ_սկիզբ');
      triggerAchievement('«Լավ Սկիզբ» 🌟 (100+ միավոր)');
    }
    if (totalScore >= 500 && !ach.includes('սուբխունկտիվ_գուրու')) {
      ach.push('սուբխունկտիվ_գուրու');
      triggerAchievement('«Սուբխունկտիվ Գուրու» 👑 (500+ միավոր)');
    }
    if (totalScore >= 1000 && !ach.includes('իսպաներենի_արքա')) {
      ach.push('իսպաներենի_արքա');
      triggerAchievement('«Իսպաներենի Արքա» 🏆 (1000+ միավոր)');
    }
    if (streak >= 5 && !ach.includes('անմահ_սերիա')) {
      ach.push('անմահ_սերիա');
      triggerAchievement('«Անկասելի Սերիա» 🔥 (5+ անընդմեջ ճիշտ պատասխան)');
    }
    if (completedSections.length >= 10 && !ach.includes('եռանդուն_ուսանող')) {
      ach.push('եռանդուն_ուսանող');
      triggerAchievement('«Ժրաջան Ուսանող» 📚 (10+ կարդացած բաժին)');
    }
    if (completedSections.length === theorySections.length && !ach.includes('կատարյալ_տեսաբան')) {
      ach.push('կատարյալ_տեսաբան');
      triggerAchievement('«Կատարյալ Տեսաբան» 🎓 (Բոլոր 22 դասերը կարդացված են)');
    }
    if (ach.length !== unlockedAchievements.length) {
      setUnlockedAchievements(ach);
      localStorage.setItem('subj_achieve', JSON.stringify(ach));
    }
  }, [totalScore, streak]);

  // Hook for shuffling game 3 words
  useEffect(() => {
    if (activeGameId === 3 && game3Questions[g3Idx]) {
      // shuffle the scrambled array
      const arr = [...game3Questions[g3Idx].scrambledWords];
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      setG3Scrambled(arr);
      setG3SelectedWords([]);
      setG3Status('idle');
    }
  }, [g3Idx, activeGameId]);

  const triggerAchievement = (title: string) => {
    setShowToast(`🏆 ՆՈՐ ՆՎԱՃՈՒՄ: ${title}`);
    playSound('win');
    setTimeout(() => {
      setShowToast(null);
    }, 5000);
  };

  const handleBookmarkToggle = (id: number) => {
    playSound('click');
    let updated;
    if (bookmarks.includes(id)) {
      updated = bookmarks.filter(b => b !== id);
    } else {
      updated = [...bookmarks, id];
    }
    setBookmarks(updated);
    localStorage.setItem('subj_bookmarks', JSON.stringify(updated));
  };

  const handleLessonCompletedToggle = (id: number) => {
    playSound('success');
    let updated;
    if (completedSections.includes(id)) {
      updated = completedSections.filter(c => c !== id);
    } else {
      updated = [...completedSections, id];
      setTotalScore(prev => prev + 15); // reward for studying the lesson
    }
    setCompletedSections(updated);
    localStorage.setItem('subj_completed_sections', JSON.stringify(updated));
  };

  const resetAllProgress = () => {
    if (confirm("Ցանկանու՞մ եք զրոյացնել ողջ առաջադիմությունը:")) {
      localStorage.removeItem('subj_score');
      localStorage.removeItem('subj_streak');
      localStorage.removeItem('subj_high_streak');
      localStorage.removeItem('subj_achieve');
      localStorage.removeItem('subj_bookmarks');
      localStorage.removeItem('subj_completed_sections');
      setTotalScore(0);
      setStreak(0);
      setHighestStreak(0);
      setUnlockedAchievements([]);
      setBookmarks([]);
      setCompletedSections([]);
      setSelectedSectionId(1);
      gResetAllGames();
      playSound('error');
    }
  };

  const gResetAllGames = () => {
    setG1Idx(0); setG1Selected(null); setG1Status('idle');
    setG2Idx(0); setG2Selected(null); setG2Status('idle');
    setG3Idx(0); setG3SelectedWords([]); setG3Status('idle');
    setG4Idx(0); setG4Selected(null); setG4Status('idle');
    setG5Idx(0); setG5Selected(null); setG5Status('idle');
    setG6Idx(0); setG6Selected(null); setG6Status('idle');
  };

  // Filter theory sections based on search query/bookmarks
  const filteredSections = theorySections.filter(sec => {
    const sMatch = sec.title.toLowerCase().includes(theorySearch.toLowerCase()) ||
                   sec.content.toLowerCase().includes(theorySearch.toLowerCase()) ||
                   (sec.subtitle && sec.subtitle.toLowerCase().includes(theorySearch.toLowerCase()));
    if (onlyBookmarks) {
      return sMatch && bookmarks.includes(sec.id);
    }
    return sMatch;
  });

  const getKnowledgeTitle = (score: number) => {
    if (score < 100) return 'Սկսնակ 🇪🇸';
    if (score < 300) return 'Արկածախնդիր 🗺️';
    if (score < 600) return 'Առաջադեմ 🚀';
    if (score < 1000) return 'Սուբխունկտիվի Գրոսմայստեր 🧠';
    return 'Իսպաներենի Անվիճելի Արքա 👑';
  };

  // --- GAME 1 ACTION (Conjugation) ---
  const handleG1Submit = (option: string) => {
    if (g1Status !== 'idle') return;
    const correct = game1Questions[g1Idx].correctAnswer;
    setG1Selected(option);
    if (option === correct) {
      setG1Status('correct');
      setTotalScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      playSound('success');
    } else {
      setG1Status('wrong');
      setStreak(0);
      playSound('error');
    }
  };

  const handleG1Next = () => {
    setG1Selected(null);
    setG1Status('idle');
    setG1Idx(prev => (prev + 1) % game1Questions.length);
    playSound('click');
  };

  // --- GAME 2 ACTION (Indicativo vs Subjuntivo) ---
  const handleG2Submit = (optionText: string, isCorrect: boolean) => {
    if (g2Status !== 'idle') return;
    setG2Selected(optionText);
    if (isCorrect) {
      setG2Status('correct');
      setTotalScore(prev => prev + 15);
      setStreak(prev => prev + 1);
      playSound('success');
    } else {
      setG2Status('wrong');
      setStreak(0);
      playSound('error');
    }
  };

  const handleG2Next = () => {
    setG2Selected(null);
    setG2Status('idle');
    setG2Idx(prev => (prev + 1) % game2Questions.length);
    playSound('click');
  };

  // --- GAME 3 ACTION (Wish Word Builder) ---
  const handleG3WordClick = (word: string, fromSelected: boolean) => {
    if (g3Status !== 'idle') return;
    playSound('click');
    if (fromSelected) {
      setG3SelectedWords(prev => prev.filter(w => w !== word));
      setG3Scrambled(prev => [...prev, word]);
    } else {
      setG3SelectedWords(prev => [...prev, word]);
      setG3Scrambled(prev => prev.filter(w => w !== word));
    }
  };

  const handleG3Check = () => {
    if (g3Status !== 'idle') return;
    const currentQ = game3Questions[g3Idx];
    const userSentence = g3SelectedWords.join(' ');
    const correctSentence = currentQ.correctWords.join(' ');
    
    if (userSentence === correctSentence) {
      setG3Status('correct');
      setTotalScore(prev => prev + 25); // Harder puzzle, more reward!
      setStreak(prev => prev + 1);
      playSound('success');
    } else {
      setG3Status('wrong');
      setStreak(0);
      playSound('error');
    }
  };

  const handleG3Reset = () => {
    const currentQ = game3Questions[g3Idx];
    setG3SelectedWords([]);
    setG3Scrambled([...currentQ.scrambledWords]);
    setG3Status('idle');
    playSound('click');
  };

  const handleG3Next = () => {
    setG3Idx(prev => (prev + 1) % game3Questions.length);
  };

  // --- GAME 4 ACTION (Cuando Time Traveler) ---
  const handleG4Submit = (optionText: string, isCorrect: boolean) => {
    if (g4Status !== 'idle') return;
    setG4Selected(optionText);
    if (isCorrect) {
      setG4Status('correct');
      setTotalScore(prev => prev + 20);
      setStreak(prev => prev + 1);
      playSound('success');
    } else {
      setG4Status('wrong');
      setStreak(0);
      playSound('error');
    }
  };

  const handleG4Next = () => {
    setG4Selected(null);
    setG4Status('idle');
    setG4Idx(prev => (prev + 1) % game4Questions.length);
    playSound('click');
  };

  // --- GAME 5 ACTION (Trigger Categories) ---
  const handleG5Submit = (category: string) => {
    if (g5Status !== 'idle') return;
    const correctCat = game5Questions[g5Idx].correctCategory;
    setG5Selected(category);
    if (category === correctCat) {
      setG5Status('correct');
      setTotalScore(prev => prev + 15);
      setStreak(prev => prev + 1);
      playSound('success');
    } else {
      setG5Status('wrong');
      setStreak(0);
      playSound('error');
    }
  };

  const handleG5Next = () => {
    setG5Selected(null);
    setG5Status('idle');
    setG5Idx(prev => (prev + 1) % game5Questions.length);
    playSound('click');
  };

  // --- GAME 6 ACTION (Translation Challenge) ---
  const handleG6Submit = (option: string) => {
    if (g6Status !== 'idle') return;
    const correct = game6Questions[g6Idx].correctSpanish;
    setG6Selected(option);
    if (option === correct) {
      setG6Status('correct');
      setTotalScore(prev => prev + 20);
      setStreak(prev => prev + 1);
      playSound('success');
    } else {
      setG6Status('wrong');
      setStreak(0);
      playSound('error');
    }
  };

  const handleG6Next = () => {
    setG6Selected(null);
    setG6Status('idle');
    setG6Idx(prev => (prev + 1) % game6Questions.length);
    playSound('click');
  };

  const currentSection = theorySections.find(s => s.id === selectedSectionId) || theorySections[0];

  return (
    <div id="app-root" className="min-h-screen bg-[#FDFCF8] text-[#1A1A1A] font-sans selection:bg-[#F27D26]/20 antialiased flex flex-col overflow-x-hidden">
      
      {/* Toast Notification for Achievements */}
      {showToast && (
        <div id="achievement-toast" className="fixed top-6 right-6 z-50 bg-[#1A1A1A] text-white py-3.5 px-6 rounded-2xl shadow-xl border border-[#E5E2D9] max-w-sm flex items-center space-x-3 animate-bounce">
          <Award className="h-6 w-6 text-[#F27D26] animate-pulse flex-shrink-0" id="toast-award-icon" />
          <span className="font-medium text-sm text-[#FDFCF8]" id="toast-text-content">{showToast}</span>
        </div>
      )}

      {/* Bento Header Bar matching Design HTML exactly */}
      <nav className="border-b border-[#E5E2D9] bg-white sticky top-0 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-[#F27D26] text-white py-2 px-3.5 rounded-xl font-extrabold text-lg shadow-sm">SUB</div>
            <div>
              <h1 className="text-xl font-bold leading-none uppercase tracking-tight text-[#1A1A1A]">Subjuntivo — իսպաներեն</h1>
              <p className="text-[10px] text-gray-400 font-mono tracking-widest mt-1">CONJUGACIÓN Y GRAMÁTICA</p>
            </div>
          </div>
          
          {/* Tabs as beautiful Pill Buttons */}
          <div className="flex gap-2 text-sm font-medium bg-[#F8F7F3] p-1.5 rounded-full border border-[#E5E2D9]">
            <button
              onClick={() => { playSound('click'); setActiveTab('theory'); }}
              className={`px-4 py-2 text-xs md:text-sm rounded-full transition-all tracking-wide font-bold ${
                activeTab === 'theory' 
                  ? 'bg-[#1A1A1A] text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-[#E5E2D9]/40'
              }`}
            >
              Հիմնական ({completedSections.length}/22)
            </button>
            <button
              onClick={() => { playSound('click'); setActiveTab('games'); }}
              className={`px-4 py-2 text-xs md:text-sm rounded-full transition-all tracking-wide font-bold flex items-center gap-1.5 ${
                activeTab === 'games' 
                  ? 'bg-[#F27D26] text-white shadow-xs' 
                  : 'text-slate-600 hover:bg-[#E5E2D9]/40'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              Խաղեր (6)
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Sound Toggle */}
            <button
              onClick={() => { playSound('click'); setSoundEnabled(!soundEnabled); }}
              className="p-2.5 border border-[#E5E2D9] rounded-xl hover:bg-slate-50 transition-all text-slate-500"
              title={soundEnabled ? "Անջատել ձայնը" : "Միացնել ձայնը"}
            >
              {soundEnabled ? (
                <Volume2 className="h-5 w-5 text-[#F27D26]" />
              ) : (
                <VolumeX className="h-5 w-5 text-slate-400" />
              )}
            </button>
            
            {/* Reset */}
            <button
              onClick={resetAllProgress}
              className="p-2.5 border border-[#E5E2D9] rounded-xl hover:bg-slate-50 transition-all text-slate-[#1A1A1A]"
              title="Զրոյացնել հաշիվը"
            >
              <RotateCcw className="h-5 w-5 hover:rotate-180 transition-all duration-500" />
            </button>
          </div>
        </div>
      </nav>

      {/* Beautiful Bento Statistics Grid at the top */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Welcome Info Box */}
          <div className="md:col-span-2 bg-[#1A1A1A] text-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[140px] shadow-sm border border-[#E5E2D9]/10">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#F27D26] rounded-full opacity-25 blur-3xl"></div>
            <div>
              <p className="text-[#F27D26] text-[10px] font-mono uppercase tracking-widest font-semibold">ԴԱՍԸՆԹԱՑԻ ԿԱՐԳԱՎԻՃԱԿ</p>
              <h2 className="text-xl md:text-2xl font-light mt-1.5 text-white leading-tight">
                Տիրապետիր <span className="font-bold text-[#F27D26]">Subjuntivo-ին</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 mt-4 z-10">
              <Award className="h-4 w-4 text-[#F27D26]" />
              <span className="text-xs text-slate-300 font-medium">Աստիճան՝ <strong className="text-[#F27D26] font-bold">{getKnowledgeTitle(totalScore)}</strong></span>
            </div>
          </div>

          {/* Points Box */}
          <div className="bg-white border border-[#E5E2D9] rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest font-semibold">ՄԻԱՎՈՐՆԵՐ</p>
              <p className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1">{totalScore}</p>
            </div>
            <div className="flex items-center gap-1 text-xs text-[#F27D26] mt-4 font-semibold">
              <Zap className="h-4 w-4 fill-current" />
              <span>+15 յուրաքանչյուր դասի համար</span>
            </div>
          </div>

          {/* Steaks / Streak Box */}
          <div className="bg-white border border-[#E5E2D9] rounded-3xl p-6 flex flex-col justify-between shadow-sm">
            <div>
              <p className="text-gray-400 text-[10px] font-mono uppercase tracking-widest font-semibold">ԱՆԸՆԴՄԵՋ ՃԻՇՏ / STREAK</p>
              <p className="text-4xl font-extrabold text-[#1A1A1A] tracking-tight mt-1 flex items-baseline gap-1">
                {streak} <span className="text-xs text-slate-400 font-normal">հարց</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-rose-500 mt-4 font-semibold">
              <Flame className="h-4 w-4 fill-current animate-pulse" />
              <span>Լավագույնը՝ {highestStreak} հարց</span>
            </div>
          </div>

        </div>
      </div>


      {/* Content Area */}
      <main id="main-content-area" className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ========================================= THEORY CENTER ========================================= */}
        {activeTab === 'theory' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="theory-layout">
            
            {/* Left Column: Navigation Sidebar */}
            <div className="lg:col-span-4 space-y-4" id="theory-sidebar-column">
              <div className="bg-white rounded-3xl border border-[#E5E2D9] shadow-sm p-6 sticky top-24">
                <h3 className="font-sans font-extrabold text-[#1A1A1A] text-lg mb-3 flex items-center justify-between" id="theory-list-heading">
                  <span>Դասերի Ցանկ</span>
                  <BookOpen className="h-5 w-5 text-slate-400" />
                </h3>
                
                {/* Search box */}
                <div className="relative mb-3" id="search-container">
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Որոնել թեմա..."
                    value={theorySearch}
                    onChange={(e) => setTheorySearch(e.target.value)}
                    className="w-full bg-[#F8F7F3] border border-[#E5E2D9] rounded-xl py-2 px-3 pl-9 text-sm text-[#1A1A1A] focus:outline-none focus:ring-2 focus:ring-[#F27D26]/20 focus:border-[#F27D26]"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                  {theorySearch && (
                    <button id="search-clear-btn" onClick={() => setTheorySearch('')} className="absolute right-3 top-2.5 text-xs text-slate-400 hover:text-slate-600 font-bold font-mono">X</button>
                  )}
                </div>

                {/* Filter and bookmarks toggle */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E5E2D9]" id="filter-controls">
                  <button
                    id="btn-toggle-bookmarks"
                    onClick={() => { playSound('click'); setOnlyBookmarks(!onlyBookmarks); }}
                    className={`flex items-center space-x-1.5 text-xs font-semibold py-1.5 px-3 rounded-lg transition-all ${
                      onlyBookmarks 
                        ? 'bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20' 
                        : 'text-slate-500 hover:bg-[#F8F7F3] border border-transparent'
                    }`}
                  >
                    <Bookmark className={`h-3 w-3 ${onlyBookmarks ? 'fill-[#F27D26]' : ''}`} />
                    <span>Ցուցադրել միայն նշվածները ({bookmarks.length})</span>
                  </button>
                </div>

                {/* Vertical Scroll list of chapters */}
                <div className="max-h-[500px] overflow-y-auto space-y-2 pr-2 custom-scrollbar" id="theory-scrollable-list">
                  {filteredSections.map((sec) => {
                    const isSelected = selectedSectionId === sec.id;
                    const isBookmarked = bookmarks.includes(sec.id);
                    const isCompleted = completedSections.includes(sec.id);
                    return (
                      <button
                        id={`theory-sec-btn-${sec.id}`}
                        key={sec.id}
                        onClick={() => { playSound('click'); setSelectedSectionId(sec.id); }}
                        className={`w-full text-left p-3.5 rounded-xl transition-all text-xs md:text-sm flex items-start justify-between space-x-2 border ${
                          isSelected
                            ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-sm'
                            : 'bg-[#F8F7F3] text-[#1A1A1A] border-[#E5E2D9] hover:bg-white hover:border-[#F27D26]/40'
                        }`}
                      >
                        <div className="space-y-0.5 max-w-[85%]">
                          <div className="flex items-center space-x-2">
                            {isCompleted && (
                              <CheckCircle2 className={`h-3.5 w-3.5 flex-shrink-0 ${isSelected ? 'text-white' : 'text-emerald-500'}`} />
                            )}
                            <span className="font-semibold block truncate">{sec.title}</span>
                          </div>
                          {sec.subtitle && (
                            <span className={`text-2xs block truncate ${isSelected ? 'text-white/85' : 'text-slate-400'}`}>
                              {sec.subtitle}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          {isBookmarked && (
                            <Bookmark className={`h-3 w-3 ${isSelected ? 'text-white fill-white' : 'text-[#F27D26] fill-[#F27D26]'}`} />
                          )}
                          <ChevronRight className={`h-4 w-4 ${isSelected ? 'text-white' : 'text-slate-300'}`} />
                        </div>
                      </button>
                    );
                  })}
                  {filteredSections.length === 0 && (
                    <div className="text-center py-8 text-slate-400" id="no-search-results">
                      Ոչինչ չգտնվեց: {onlyBookmarks ? 'Դուք դեռ չունեք պահպանված դասեր:' : ''}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Reader Panel */}
            <div className="lg:col-span-8" id="theory-detail-column">
              <div className="bg-white rounded-3xl border border-[#E5E2D9] shadow-sm p-6 md:p-10 space-y-8" id="theory-card-container">
                
                {/* Topic Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2D9]" id="theory-card-header">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1A] tracking-tight" id="section-detail-title">
                      {currentSection.title}
                    </h2>
                    {currentSection.subtitle && (
                      <p className="text-slate-500 text-sm mt-1.5 font-medium" id="section-detail-subtitle">
                        {currentSection.subtitle}
                      </p>
                    )}
                  </div>
                  
                  {/* Lesson utilities */}
                  <div className="flex items-center space-x-2 self-start sm:self-center" id="section-detail-utils">
                    <button
                      id="btn-bookmark-current"
                      onClick={() => handleBookmarkToggle(currentSection.id)}
                      className={`p-2.5 rounded-xl border transition-all ${
                        bookmarks.includes(currentSection.id)
                          ? 'bg-[#F27D26]/10 border-[#F27D26]/35 text-[#F27D26] fill-[#F27D26]'
                          : 'bg-white border-[#E5E2D9] text-gray-400 hover:text-slate-600'
                      }`}
                      title={bookmarks.includes(currentSection.id) ? "Հեռացնել պահպանվածներից" : "Պահպանել այս դասը"}
                    >
                      <Bookmark className="h-5 w-5" />
                    </button>
 
                    <button
                      id="btn-complete-current"
                      onClick={() => handleLessonCompletedToggle(currentSection.id)}
                      className={`flex items-center space-x-2 py-2.5 px-4 rounded-xl text-xs font-bold border transition-all ${
                        completedSections.includes(currentSection.id)
                          ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                          : 'bg-[#1A1A1A] border-transparent text-white hover:bg-[#F27D26]'
                      }`}
                    >
                      <CheckCircle2 className={`h-4 w-4 ${completedSections.includes(currentSection.id) ? 'text-emerald-600 fill-emerald-100' : 'text-current'}`} />
                      <span>{completedSections.includes(currentSection.id) ? "Կարդացված է" : "Նշել որպես կարդացված"}</span>
                    </button>
                  </div>
                </div>

                {/* Subjuntivo Explanation markup (Cleanly Styled Armenian Text Blocks) */}
                <div className="text-slate-700 leading-relaxed text-sm md:text-base space-y-4" id="section-detail-text">
                  {currentSection.content.split('\n').map((para, i) => {
                    if (!para.trim()) return null;
                    if (para.startsWith('-')) {
                      return (
                        <ul key={i} className="list-disc pl-6 space-y-1.5 text-slate-600 my-2">
                          <li>{para.substring(1).trim()}</li>
                        </ul>
                      );
                    }
                    return (
                      <p key={i}>
                        {para}
                      </p>
                    );
                  })}
                </div>

                {/* Grammatical Conjugation Tables (Sections 3, 14, 15) */}
                {currentSection.tables && currentSection.tables.map((table, tIdx) => (
                  <div key={tIdx} className="overflow-x-auto rounded-2xl border border-[#E5E2D9] my-6 shadow-2xs font-sans" id={`section-table-box-${tIdx}`}>
                    <table className="min-w-full divide-y divide-[#E5E2D9] text-sm" id={`table-${tIdx}`}>
                      <thead className="bg-[#F8F7F3]" id={`thead-${tIdx}`}>
                        <tr>
                          {table.headers.map((h, hIdx) => (
                            <th key={hIdx} className="px-4 py-3.5 text-left font-bold text-[#1A1A1A] uppercase tracking-wider text-xs md:text-sm" id={`th-${tIdx}-${hIdx}`}>
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-[#E5E2D9] font-mono text-xs md:text-sm" id={`tbody-${tIdx}`}>
                        {table.rows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#F27D26]/5 transition-colors" id={`tr-${tIdx}-${rIdx}`}>
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className={`px-4 py-3.5 ${cIdx === 0 ? 'bg-[#F8F7F3] font-sans text-slate-500 font-extrabold' : 'text-[#1A1A1A] font-medium'}`} id={`td-${tIdx}-${rIdx}-${cIdx}`}>
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {table.caption && (
                      <p className="px-4 py-2.5 text-2xs text-[#F27D26] bg-[#F8F7F3] italic font-semibold border-t border-[#E5E2D9]" id={`table-cap-${tIdx}`}>
                        {table.caption}
                      </p>
                    )}
                  </div>
                ))}

                {/* Contextualized Examples Cards with Spanish/Armenian Translations */}
                {currentSection.examples && currentSection.examples.length > 0 && (
                  <div className="space-y-3.5 my-6" id="section-examples-section">
                    <h4 className="font-sans font-extrabold text-[#1A1A1A] border-l-4 border-[#F27D26] pl-3 uppercase tracking-wider text-xs flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-[#F27D26]" />
                      <span>Օրինակներ և Կիրառություն / Ejemplos</span>
                    </h4>
                    
                    <div className="grid grid-cols-1 gap-3" id="examples-grid">
                      {currentSection.examples.map((ex, exIdx) => (
                        <div key={exIdx} className="bg-[#F8F7F3] rounded-2xl p-5 border border-[#E5E2D9] hover:border-[#F27D26]/20 transition-all flex flex-col space-y-2 shadow-2xs" id={`ex-card-${exIdx}`}>
                          <div className="flex items-start justify-between space-x-2">
                            <span className="font-mono text-base md:text-lg font-bold text-[#F27D26]" id={`ex-es-${exIdx}`}>
                              {ex.spanish}
                            </span>
                            <span className="text-2xs font-mono font-bold uppercase bg-white text-[#F27D26] py-0.5 px-2 rounded-full border border-[#E5E2D9] flex-shrink-0" id={`lbl-es-${exIdx}`}>ES</span>
                          </div>
                          
                          <div className="text-sm text-slate-700 leading-relaxed pt-2 border-t border-dashed border-[#E5E2D9] mt-1 font-medium" id={`ex-hy-${exIdx}`}>
                            {ex.armenian}
                          </div>

                          {ex.comment && (
                            <span className="text-2xs text-[#1A1A1A] bg-[#E5E2D9]/30 p-2.5 rounded-lg border border-[#E5E2D9]/45 font-medium italic" id={`ex-comment-${exIdx}`}>
                              💡 {ex.comment}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Educational Banner - Call to apply the knowledge */}
                <div className="bg-[#F8F7F3] rounded-3xl p-6 border border-[#E5E2D9] flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 shadow-2xs" id="cta-games-banner">
                  <div className="space-y-1 text-center sm:text-left">
                    <p className="font-sans font-extrabold text-[#1A1A1A] text-sm md:text-base">Սիրով յուրացրեցի՞ք այս դասը</p>
                    <p className="text-slate-500 text-xs md:text-sm font-medium">Մարզեք Ձեր ստացած գիտելիքները համապատասխան խաղերով։</p>
                  </div>
                  <button
                    id="btn-cta-go-games"
                    onClick={() => { playSound('click'); setActiveTab('games'); }}
                    className="flex items-center space-x-2 py-3 px-6 bg-[#F27D26] hover:bg-[#1A1A1A] text-white font-extrabold text-xs md:text-sm rounded-xl transition-all shadow-xs active:scale-95 flex-shrink-0"
                  >
                    <span>Անցնել Խաղերին</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* ========================================= GAMES ZONE ========================================= */}
        {activeTab === 'games' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="games-layout">
            
            {/* Left Column: Quick Navigation Between 6 Games */}
            <div className="lg:col-span-4 space-y-4" id="games-sidebar-column">
              <div className="bg-white rounded-3xl border border-[#E5E2D9] shadow-sm p-6 sticky top-4">
                <h3 className="font-sans font-extrabold text-[#1A1A1A] text-lg mb-4 flex items-center justify-between" id="games-sidebar-heading">
                  <span>Ընտրել Խաղը</span>
                  <Gamepad2 className="h-5 w-5 text-[#F27D26]" />
                </h3>
                
                <div className="space-y-2" id="games-list">
                  
                  {/* Game 1 info */}
                  <button
                    id="game-nav-btn-1"
                    onClick={() => { playSound('click'); setActiveGameId(1); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      activeGameId === 1
                        ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-xs'
                        : 'bg-[#F8F7F3] text-[#1A1A1A] border-[#E5E2D9] hover:bg-white hover:border-[#F27D26]/40'
                    }`}
                  >
                    <span className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${
                      activeGameId === 1 ? 'bg-white/20 text-white' : 'bg-[#E5E2D9] text-[#1A1A1A]'
                    }`}>1</span>
                    <div className="space-y-0.5">
                      <span className="text-sm block">Խոնարհման Վարպետ</span>
                      <span className={`text-2xs block font-normal ${
                        activeGameId === 1 ? 'text-white/85' : 'text-slate-400'
                      }`}>Presente de Subjuntivo-ի վերջավորություններ</span>
                    </div>
                  </button>

                  {/* Game 2 info */}
                  <button
                    id="game-nav-btn-2"
                    onClick={() => { playSound('click'); setActiveGameId(2); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      activeGameId === 2
                        ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-xs'
                        : 'bg-[#F8F7F3] text-[#1A1A1A] border-[#E5E2D9] hover:bg-white hover:border-[#F27D26]/40'
                    }`}
                  >
                    <span className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${
                      activeGameId === 2 ? 'bg-white/20 text-white' : 'bg-[#E5E2D9] text-[#1A1A1A]'
                    }`}>2</span>
                    <div className="space-y-0.5">
                      <span className="text-sm block">Indicativo vs Subjuntivo</span>
                      <span className={`text-2xs block font-normal ${
                        activeGameId === 2 ? 'text-white/85' : 'text-slate-400'
                      }`}>Իրականություն թե՞ ոչ-իրականություն</span>
                    </div>
                  </button>

                  {/* Game 3 info */}
                  <button
                    id="game-nav-btn-3"
                    onClick={() => { playSound('click'); setActiveGameId(3); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      activeGameId === 3
                        ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-xs'
                        : 'bg-[#F8F7F3] text-[#1A1A1A] border-[#E5E2D9] hover:bg-white hover:border-[#F27D26]/40'
                    }`}
                  >
                    <span className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${
                      activeGameId === 3 ? 'bg-white/20 text-white' : 'bg-[#E5E2D9] text-[#1A1A1A]'
                    }`}>3</span>
                    <div className="space-y-0.5">
                      <span className="text-sm block">Օժալա և Ցանկություններ</span>
                      <span className={`text-2xs block font-normal ${
                        activeGameId === 3 ? 'text-white/85' : 'text-slate-400'
                      }`}>Տարրերով նախադասության կառուցում</span>
                    </div>
                  </button>

                  {/* Game 4 info */}
                  <button
                    id="game-nav-btn-4"
                    onClick={() => { playSound('click'); setActiveGameId(4); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      activeGameId === 4
                        ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-xs'
                        : 'bg-[#F8F7F3] text-[#1A1A1A] border-[#E5E2D9] hover:bg-white hover:border-[#F27D26]/40'
                    }`}
                  >
                    <span className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${
                      activeGameId === 4 ? 'bg-white/20 text-white' : 'bg-[#E5E2D9] text-[#1A1A1A]'
                    }`}>4</span>
                    <div className="space-y-0.5">
                      <span className="text-sm block">Когда - Ժամանակի Ճամփորդ</span>
                      <span className={`text-2xs block font-normal ${
                        activeGameId === 4 ? 'text-white/85' : 'text-slate-400'
                      }`}>Cuando + Ապագա թե՞ Սովորություն</span>
                    </div>
                  </button>

                  {/* Game 5 info */}
                  <button
                    id="game-nav-btn-5"
                    onClick={() => { playSound('click'); setActiveGameId(5); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      activeGameId === 5
                        ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-xs'
                        : 'bg-[#F8F7F3] text-[#1A1A1A] border-[#E5E2D9] hover:bg-white hover:border-[#F27D26]/40'
                    }`}
                  >
                    <span className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${
                      activeGameId === 5 ? 'bg-white/20 text-white' : 'bg-[#E5E2D9] text-[#1A1A1A]'
                    }`}>5</span>
                    <div className="space-y-0.5">
                      <span className="text-sm block">Տրիգերներ և Կատեգորիաներ</span>
                      <span className={`text-2xs block font-normal ${
                        activeGameId === 5 ? 'text-white/85' : 'text-slate-400'
                      }`}>Ճանաչիր նախադասության շարժիչը</span>
                    </div>
                  </button>

                  {/* Game 6 info */}
                  <button
                    id="game-nav-btn-6"
                    onClick={() => { playSound('click'); setActiveGameId(6); }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start space-x-3 ${
                      activeGameId === 6
                        ? 'bg-[#F27D26] text-white border-[#F27D26] font-bold shadow-xs'
                        : 'bg-[#F8F7F3] text-[#1A1A1A] border-[#E5E2D9] hover:bg-white hover:border-[#F27D26]/40'
                    }`}
                  >
                    <span className={`font-mono text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-0.5 ${
                      activeGameId === 6 ? 'bg-white/20 text-white' : 'bg-[#E5E2D9] text-[#1A1A1A]'
                    }`}>6</span>
                    <div className="space-y-0.5">
                      <span className="text-sm block">Թարգմանչական Մարտահրավեր</span>
                      <span className={`text-2xs block font-normal ${
                        activeGameId === 6 ? 'text-white/85' : 'text-slate-400'
                      }`}>Ամենաօգտակար արտահայտությունները</span>
                    </div>
                  </button>

                </div>

                {/* Score guidelines / Reset scoreboard */}
                <div id="games-guidelines-box" className="mt-6 pt-4 border-t border-[#E5E2D9] text-2xs text-slate-400 leading-relaxed text-center italic">
                  💡 Յուրաքանչյուր ճիշտ պատասխանի համար ստանում եք միավորներ և բարձրացնում Ձեր ռեյտինգը:
                </div>
              </div>
            </div>

            {/* Right Column: Active Interactive Play Space */}
            <div className="lg:col-span-8" id="games-main-space">
              <div className="bg-white rounded-3xl border border-[#E5E2D9] shadow-sm p-6 md:p-10 space-y-8" id="games-card-body">
                
                {/* ----------------- GAME 1: CONJUGATION MASTER ----------------- */}
                {activeGameId === 1 && (
                  <div className="space-y-6" id="game-container-1">
                    <div className="flex justify-between items-center" id="game-g1-header">
                      <span className="bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 font-bold text-xs uppercase px-3 py-1 rounded-full">Խոնարհման Վարպետ / Conjugación</span>
                      <span className="text-xs text-slate-400 font-bold font-mono">Հարց {g1Idx + 1} / {game1Questions.length}</span>
                    </div>
                    
                    <div className="bg-[#F8F7F3] rounded-2xl p-6 text-center border border-[#E5E2D9] space-y-4" id="g1-question-panel">
                      <p className="text-2xs text-slate-400 uppercase font-bold tracking-wider font-mono">Խոնարհեք տրված բայը Subjuntivo-ում</p>
                      <h4 className="text-xl md:text-2xl font-extrabold text-[#1A1A1A] leading-none">
                        Բայ՝ <span className="text-[#F27D26] font-mono">{game1Questions[g1Idx].verb}</span>
                      </h4>
                      <p className="text-xs text-slate-500 font-medium italic mt-0.5">({game1Questions[g1Idx].meaning})</p>
                      <div className="inline-block bg-[#F27D26] text-white py-1.5 px-4 rounded-xl font-mono text-sm font-bold mt-2">
                        Դեմքը՝ <span className="underline">{game1Questions[g1Idx].pronoun}</span>
                      </div>
                    </div>

                    {/* Options Selection Box */}
                    <div className="grid grid-cols-2 gap-3" id="g1-options-grid">
                      {game1Questions[g1Idx].options.map((option, idx) => {
                        const isSelected = g1Selected === option;
                        const isCorrect = option === game1Questions[g1Idx].correctAnswer;
                        let btnStyle = 'border-[#E5E2D9] bg-[#F8F7F3] hover:border-[#F27D26]/40 text-[#1A1A1A] hover:bg-white';
                        if (g1Status !== 'idle') {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm';
                          } else if (isSelected) {
                            btnStyle = 'bg-rose-600 text-white border-rose-700';
                          } else {
                            btnStyle = 'opacity-60 border-slate-100 text-slate-400';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-[#F27D26]/10 border-[#F27D26] text-[#F27D26]';
                        }
                        
                        return (
                          <button
                            id={`g1-opt-btn-${idx}`}
                            key={idx}
                            disabled={g1Status !== 'idle'}
                            onClick={() => handleG1Submit(option)}
                            className={`p-4 rounded-xl border text-center font-mono text-sm md:text-base font-bold transition-all disabled:cursor-default ${btnStyle}`}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanatory Output Message */}
                    {g1Status !== 'idle' && (
                      <div className={`p-6 rounded-2xl border ${g1Status === 'correct' ? 'bg-emerald-50/30 border-emerald-300 text-emerald-900 shadow-2xs' : 'bg-rose-50/30 border-rose-200 text-rose-900 shadow-2xs'}`} id="g1-explanation-msg">
                        <div className="flex items-center space-x-2 mb-1.5">
                          {g1Status === 'correct' ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="font-sans font-extrabold text-emerald-800">Ճիշտ է: +10 Միավոր</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-rose-600" />
                              <span className="font-sans font-extrabold text-rose-800">Սխալ է 😔</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs md:text-sm font-medium leading-relaxed">{game1Questions[g1Idx].explanation}</p>
                        
                        <div className="pt-4 flex justify-end" id="g1-next-box-wrapper">
                          <button
                            id="btn-g1-next"
                            onClick={handleG1Next}
                            className="bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-extrabold text-xs py-3 px-6 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <span>Հաջորդ հարցը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ----------------- GAME 2: INDICATIVO vs SUBJUNTIVO DUEL ----------------- */}
                {activeGameId === 2 && (
                  <div className="space-y-6" id="game-container-2">
                    <div className="flex justify-between items-center" id="game-g2-header">
                      <span className="bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 font-bold text-xs uppercase px-3 py-1 rounded-full">Indicativo թե՞ Subjuntivo</span>
                      <span className="text-xs text-slate-400 font-bold font-mono">Հարց {g2Idx + 1} / {game2Questions.length}</span>
                    </div>

                    <div className="bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E2D9] space-y-4 text-center" id="g2-question-panel">
                      <p className="text-2xs text-slate-400 uppercase font-bold tracking-wider font-mono">Ընտրեք ճիշտ քերականական եղանակը</p>
                      <h4 className="text-lg md:text-xl font-mono font-bold text-[#1A1A1A] tracking-wide">
                        {game2Questions[g2Idx].sentenceWithBlank}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium italic mt-1 font-sans">
                        Թարգմանությունը՝ «{game2Questions[g2Idx].translation}»
                      </p>
                    </div>

                    {/* Sentence indicator helper badge */}
                    <div className="flex justify-center" id="g2-indicator-badge">
                      <div className="bg-[#F27D26]/10 border border-[#F27D26]/30 text-[#F27D26] text-xs px-3 py-1.5 rounded-xl font-medium">
                        Գլխավոր նախադասության ցուցիչը՝ <strong className="font-mono font-bold">{game2Questions[g2Idx].triggerWord}</strong>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="g2-options-container">
                      {game2Questions[g2Idx].options.map((opt, idx) => {
                        const isSelected = g2Selected === opt.text;
                        let btnStyle = 'border-[#E5E2D9] bg-[#F8F7F3] hover:border-[#F27D26]/40 text-[#1A1A1A] hover:bg-white';
                        
                        if (g2Status !== 'idle') {
                          if (opt.isCorrect) {
                            btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm';
                          } else if (isSelected) {
                            btnStyle = 'bg-rose-600 text-white border-rose-700';
                          } else {
                            btnStyle = 'opacity-60 border-slate-100 text-slate-400';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-[#F27D26]/10 border-[#F27D26] text-[#F27D26]';
                        }

                        return (
                          <button
                            id={`g2-opt-btn-${idx}`}
                            key={idx}
                            disabled={g2Status !== 'idle'}
                            onClick={() => handleG2Submit(opt.text, opt.isCorrect)}
                            className={`p-4 rounded-xl border text-center font-mono text-sm md:text-base font-bold transition-all disabled:cursor-default flex flex-col items-center justify-center space-y-1 ${btnStyle}`}
                          >
                            <span>{opt.text}</span>
                            <span className="text-2xs font-normal opacity-75">({opt.mood})</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {g2Status !== 'idle' && (
                      <div className={`p-6 rounded-2xl border ${g2Status === 'correct' ? 'bg-emerald-50/30 border-emerald-300 text-emerald-900 shadow-2xs' : 'bg-rose-50/30 border-rose-200 text-rose-900 shadow-2xs'}`} id="g2-explanation-msg">
                        <div className="flex items-center space-x-2 mb-1.5">
                          {g2Status === 'correct' ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="font-sans font-extrabold text-emerald-800">Ճիշտ է: +15 Միավոր</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-rose-600" />
                              <span className="font-sans font-extrabold text-rose-800">Սխալ է 😔</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs md:text-sm font-medium leading-relaxed">{game2Questions[g2Idx].explanation}</p>
                        
                        <div className="pt-4 flex justify-end" id="g2-next-box-wrapper">
                          <button
                            id="btn-g2-next"
                            onClick={handleG2Next}
                            className="bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-extrabold text-xs py-3 px-6 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <span>Հաջորդ հարցը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ----------------- GAME 3: WISH WORD BUILDER ----------------- */}
                {activeGameId === 3 && (
                  <div className="space-y-6" id="game-container-3">
                    <div className="flex justify-between items-center" id="game-g3-header">
                      <span className="bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 font-bold text-xs uppercase px-3 py-1 rounded-full">Օժալա և Ցանկություններ / Oración</span>
                      <span className="text-xs text-slate-400 font-bold font-mono">Հարց {g3Idx + 1} / {game3Questions.length}</span>
                    </div>

                    <div className="bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E2D9] space-y-4" id="g3-instructional-desc">
                      <p className="text-2xs text-slate-400 uppercase font-bold text-center tracking-wider font-mono">Կառուցեք նախադասությունը իսպաներեն</p>
                      <h4 className="text-base md:text-lg font-bold text-[#1A1A1A] text-center leading-relaxed font-sans">
                        « {game3Questions[g3Idx].sentenceArmenian} »
                      </h4>
                    </div>

                    {/* Sentence Work Area (Selected words list) */}
                    <div className="min-h-[70px] p-4 bg-[#F8F7F3]/40 rounded-2xl border border-dashed border-[#E5E2D9] flex flex-wrap gap-2 items-center" id="g3-selected-words-canvas">
                      {g3SelectedWords.length === 0 ? (
                        <span className="text-xs text-slate-400 font-medium italic">Կտկտացրեք տառերին/բառերին ստորև՝ նախադասությունը հավաքելու համար...</span>
                      ) : (
                        g3SelectedWords.map((word, wIdx) => (
                          <button
                            id={`g3-selected-word-${wIdx}`}
                            key={wIdx}
                            onClick={() => handleG3WordClick(word, true)}
                            className="bg-[#F27D26] hover:bg-[#1A1A1A] text-white px-3 py-1.5 rounded-xl text-sm font-mono font-bold transition-all shadow-xs flex items-center space-x-1 active:scale-95 cursor-pointer"
                            disabled={g3Status !== 'idle'}
                          >
                            <span>{word}</span>
                          </button>
                        ))
                      )}
                    </div>

                    {/* Scrambled Word Pool */}
                    <div className="space-y-2" id="g3-scrambled-words-pool">
                      <p className="text-2xs text-slate-400 font-bold font-mono uppercase">Բառերի պահեստ</p>
                      <div className="flex flex-wrap gap-2.5 p-4 bg-[#F8F7F3] border border-[#E5E2D9] rounded-2xl shadow-inner-sm" id="g3-pool">
                        {g3Scrambled.map((word, wIdx) => (
                          <button
                            id={`g3-scrambled-word-${wIdx}`}
                            key={wIdx}
                            disabled={g3Status !== 'idle'}
                            onClick={() => handleG3WordClick(word, false)}
                            className="bg-white hover:bg-[#F27D26] hover:text-white hover:border-[#F27D26] text-[#1A1A1A] px-3.5 py-2 rounded-xl text-sm font-mono font-bold transition-all border border-[#E5E2D9] active:scale-95 shadow-2xs cursor-pointer"
                          >
                            {word}
                          </button>
                        ))}
                        {g3Scrambled.length === 0 && g3SelectedWords.length > 0 && (
                          <span className="text-xs text-slate-400 font-medium italic">Բոլոր բառերը տեղադրված են։ Ստուգեք պատասխանը։</span>
                        )}
                      </div>
                    </div>

                    {/* Check Actions row */}
                    <div className="flex justify-between items-center pt-2" id="g3-actions-row">
                      <button
                        id="btn-g3-reset"
                        onClick={handleG3Reset}
                        className="text-xs font-extrabold text-slate-500 hover:text-[#1A1A1A] flex items-center space-x-1.5 py-2 px-4 border border-[#E5E2D9] rounded-xl bg-white hover:bg-[#F8F7F3] transition-all cursor-pointer"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>Զրոյացնել</span>
                      </button>

                      {g3Status === 'idle' && (
                        <button
                          id="btn-g3-check"
                          disabled={g3SelectedWords.length === 0}
                          onClick={handleG3Check}
                          className="bg-[#F27D26] hover:bg-[#1A1A1A] text-white font-extrabold text-xs py-3 px-6 rounded-xl transition-all shadow-xs active:scale-95 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                        >
                          Ստուգել Պատասխանը
                        </button>
                      )}
                    </div>

                    {/* Explanation details */}
                    {g3Status !== 'idle' && (
                      <div className={`p-6 rounded-2xl border ${g3Status === 'correct' ? 'bg-emerald-50/30 border-emerald-300 text-emerald-900 shadow-2xs' : 'bg-rose-50/30 border-rose-200 text-rose-900 shadow-2xs'}`} id="g3-explanation-msg">
                        <div className="flex items-center space-x-2 mb-1.5">
                          {g3Status === 'correct' ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="font-sans font-extrabold text-emerald-800">Փայլուն է: +25 Միավոր</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-rose-600" />
                              <span className="font-sans font-extrabold text-rose-800">Սխալ կառուցվածք</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs md:text-sm leading-relaxed mb-2 font-medium">
                          Ճիշտ նախադասությունը՝ <strong className="font-mono text-slate-900 bg-white/50 px-2 py-0.5 rounded-sm border border-slate-200/50">{game3Questions[g3Idx].correctWords.join(' ')}</strong>
                        </p>
                        <p className="text-2xs md:text-xs text-slate-600 leading-relaxed font-sans">{game3Questions[g3Idx].explanation}</p>
                        
                        <div className="pt-4 flex justify-end" id="g3-next-box-wrapper">
                          <button
                            id="btn-g3-next"
                            onClick={() => {
                              handleG3Next();
                            }}
                            className="bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-extrabold text-xs py-3 px-6 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <span>Հաջորդ հարցը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ----------------- GAME 4: CUANDO TIME TRAVELER ----------------- */}
                {activeGameId === 4 && (
                  <div className="space-y-6" id="game-container-4">
                    <div className="flex justify-between items-center" id="game-g4-header">
                      <span className="bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 font-bold text-xs uppercase px-3 py-1 rounded-full">Cuando Ժամանակացույց</span>
                      <span className="text-xs text-slate-400 font-bold font-mono">Հարց {g4Idx + 1} / {game4Questions.length}</span>
                    </div>

                    <div className="bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E2D9] space-y-3 text-center animate-pulse" id="g4-scenario-box">
                      <div className="text-2xs font-extrabold font-sans tracking-wide text-[#F27D26]">ԺԱՄԱՆԱԿԱՅԻՆ ՍՑԵՆԱՐ՝ {game4Questions[g4Idx].context === 'habit' ? 'ՍՈՎՈՐՈՒՅԹ / HABIT (INDICATIVO)' : 'ԱՊԱԳԱ / FUTURE UNCERTAINTY (SUBJUNTIVO)'}</div>
                      <h4 className="text-lg md:text-xl font-mono font-bold text-[#1A1A1A] tracking-wide">
                        {game4Questions[g4Idx].sentenceWithBlank}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium italic mt-1 font-sans">
                        « {game4Questions[g4Idx].translation} »
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3" id="g4-options-list">
                      {game4Questions[g4Idx].options.map((opt, idx) => {
                        const isSelected = g4Selected === opt.text;
                        let btnStyle = 'border-[#E5E2D9] bg-[#F8F7F3] hover:border-[#F27D26]/40 text-[#1A1A1A] hover:bg-white';
                        
                        if (g4Status !== 'idle') {
                          if (opt.isCorrect) {
                            btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm';
                          } else if (isSelected) {
                            btnStyle = 'bg-rose-600 text-white border-rose-700';
                          } else {
                            btnStyle = 'opacity-60 border-slate-100 text-slate-400';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-[#F27D26]/10 border-[#F27D26] text-[#F27D26]';
                        }

                        return (
                          <button
                            id={`g4-opt-btn-${idx}`}
                            key={idx}
                            disabled={g4Status !== 'idle'}
                            onClick={() => handleG4Submit(opt.text, opt.isCorrect)}
                            className={`p-4 rounded-xl border text-center font-mono text-sm md:text-base font-bold transition-all disabled:cursor-default flex flex-col justify-center items-center ${btnStyle}`}
                          >
                            <span>{opt.text}</span>
                            <span className="text-3xs md:text-2xs opacity-75 font-normal">({opt.mood})</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation panel */}
                    {g4Status !== 'idle' && (
                      <div className={`p-6 rounded-2xl border ${g4Status === 'correct' ? 'bg-emerald-50/30 border-emerald-300 text-emerald-900 shadow-2xs' : 'bg-rose-50/30 border-rose-200 text-rose-900 shadow-2xs'}`} id="g4-explanation-msg">
                        <div className="flex items-center space-x-2 mb-1.5">
                          {g4Status === 'correct' ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="font-sans font-extrabold text-emerald-800">Ճիշտ է: +20 Միավոր</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-rose-600" />
                              <span className="font-sans font-extrabold text-rose-800">Սխալ է 😔</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs md:text-sm font-medium leading-relaxed">{game4Questions[g4Idx].explanation}</p>
                        
                        <div className="pt-4 flex justify-end" id="g4-next-box-wrapper">
                          <button
                            id="btn-g4-next"
                            onClick={handleG4Next}
                            className="bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-extrabold text-xs py-3 px-6 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <span>Հաջորդ հարցը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ----------------- GAME 5: TRIGGER CATEGORY JEOPARDY ----------------- */}
                {activeGameId === 5 && (
                  <div className="space-y-6" id="game-container-5">
                    <div className="flex justify-between items-center" id="game-g5-header">
                      <span className="bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 font-bold text-xs uppercase px-3 py-1 rounded-full">Տրիգերներ և Կատեգորիաներ</span>
                      <span className="text-xs text-slate-400 font-bold font-mono">Հարց {g5Idx + 1} / {game5Questions.length}</span>
                    </div>

                    <div className="bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E2D9] space-y-3 text-center" id="g5-target-card">
                      <p className="text-2xs text-slate-400 uppercase font-bold tracking-wider font-mono">Ո՞ր զգացողությանը կամ կանոնին է վերաբերում Subjuntivo-ն</p>
                      <h4 className="text-base md:text-lg font-mono font-bold text-[#F27D26] leading-relaxed">
                        « {game5Questions[g5Idx].sentence} »
                      </h4>
                      <p className="text-xs text-slate-500 font-medium italic mt-0.5">
                        Թարգմանությունը՝ « {game5Questions[g5Idx].translation} »
                      </p>
                    </div>

                    {/* Categories grid selectors */}
                    <div className="space-y-2" id="g5-label">
                      <p className="text-2xs text-slate-400 font-bold font-mono uppercase">Ընտրեք ճիշտ տրիգերը / Trigger</p>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3" id="g5-options-grid-cat">
                        {['Deseo', 'Emoción', 'Duda', 'Necesidad', 'Petición', 'Para que'].map((cat, idx) => {
                          const isSelected = g5Selected === cat;
                          const isCorrect = cat === game5Questions[g5Idx].correctCategory;
                          
                          let btnStyle = 'border-[#E5E2D9] bg-[#F8F7F3] hover:border-[#F27D26]/40 text-[#1A1A1A] hover:bg-white';
                          
                          if (g5Status !== 'idle') {
                            if (isCorrect) {
                              btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm font-semibold';
                            } else if (isSelected) {
                              btnStyle = 'bg-rose-600 text-white border-rose-700';
                            } else {
                              btnStyle = 'opacity-60 border-slate-100 text-slate-400';
                            }
                          } else if (isSelected) {
                            btnStyle = 'bg-[#F27D26]/10 border-[#F27D26] text-[#F27D26]';
                          }

                          // translate categories to Armenian helper labels
                          const mapCatName = (c: string) => {
                            switch(c) {
                              case 'Deseo': return 'Ցանկություն';
                              case 'Emoción': return 'Զգացմունք';
                              case 'Duda': return 'Կասկած';
                              case 'Necesidad': return 'Անհրաժեշտություն';
                              case 'Petición': return 'Խնդրանք / Պահանջ';
                              case 'Para que': return 'Նպատակ (Para que)';
                              default: return c;
                            }
                          };

                          return (
                            <button
                              id={`g5-cat-btn-${idx}`}
                              key={idx}
                              disabled={g5Status !== 'idle'}
                              onClick={() => handleG5Submit(cat)}
                              className={`p-3.5 rounded-xl border text-center text-xs md:text-sm font-bold flex flex-col justify-center items-center space-y-1 transition-all active:scale-95 disabled:cursor-default ${btnStyle}`}
                            >
                              <span>{mapCatName(cat)}</span>
                              <span className="text-3xs font-mono font-normal opacity-75">{cat}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Explanation */}
                    {g5Status !== 'idle' && (
                      <div className={`p-6 rounded-2xl border ${g5Status === 'correct' ? 'bg-emerald-50/30 border-emerald-300 text-emerald-900 shadow-2xs' : 'bg-rose-50/30 border-rose-200 text-rose-900 shadow-2xs'}`} id="g5-explanation-msg">
                        <div className="flex items-center space-x-2 mb-1.5">
                          {g5Status === 'correct' ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="font-sans font-extrabold text-emerald-800">Գերազանց է! +15 Միավոր</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-rose-600" />
                              <span className="font-sans font-extrabold text-rose-800">Սխալ տրիգեր 😔</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs md:text-sm font-medium leading-relaxed">{game5Questions[g5Idx].explanation}</p>
                        
                        <div className="pt-4 flex justify-end" id="g5-next-box-wrapper">
                          <button
                            id="btn-g5-next"
                            onClick={handleG5Next}
                            className="bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-extrabold text-xs py-3 px-6 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <span>Հաջորդ հարցը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ----------------- GAME 6: TRANSLATION CHALLENGE ----------------- */}
                {activeGameId === 6 && (
                  <div className="space-y-6" id="game-container-6">
                    <div className="flex justify-between items-center" id="game-g6-header">
                      <span className="bg-[#F27D26]/10 text-[#F27D26] border border-[#F27D26]/20 font-bold text-xs uppercase px-3 py-1 rounded-full">Թարգմանչական Խաղ / Traducción</span>
                      <span className="text-xs text-slate-400 font-bold font-mono">Հարց {g6Idx + 1} / {game6Questions.length}</span>
                    </div>

                    <div className="bg-[#F8F7F3] rounded-2xl p-6 border border-[#E5E2D9] space-y-2 text-center" id="g6-question-desc">
                      <p className="text-2xs text-slate-400 uppercase font-bold tracking-wider font-mono">Ո՞րն է նշված նախադասության ճիշտ իսպաներեն թարգմանությունը</p>
                      <h4 className="text-lg md:text-xl font-sans font-bold text-[#1A1A1A] leading-relaxed">
                        « {game6Questions[g6Idx].armenian} »
                      </h4>
                    </div>

                    <div className="space-y-2.5" id="g6-options-box">
                      {game6Questions[g6Idx].options.map((opt, idx) => {
                        const isSelected = g6Selected === opt;
                        const isCorrect = opt === game6Questions[g6Idx].correctSpanish;
                        
                        let btnStyle = 'border-[#E5E2D9] bg-[#F8F7F3] hover:border-[#F27D26]/40 text-[#1A1A1A] hover:bg-white';
                        
                        if (g6Status !== 'idle') {
                          if (isCorrect) {
                            btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-sm font-semibold';
                          } else if (isSelected) {
                            btnStyle = 'bg-rose-600 text-white border-rose-700';
                          } else {
                            btnStyle = 'opacity-60 border-slate-100 text-slate-400';
                          }
                        } else if (isSelected) {
                          btnStyle = 'bg-[#F27D26]/10 border-[#F27D26] text-[#F27D26]';
                        }

                        return (
                          <button
                            id={`g6-opt-btn-${idx}`}
                            key={idx}
                            disabled={g6Status !== 'idle'}
                            onClick={() => handleG6Submit(opt)}
                            className={`w-full p-4 rounded-xl border text-left font-mono text-xs md:text-sm font-bold transition-all flex items-center justify-between disabled:cursor-default ${btnStyle}`}
                          >
                            <span>{opt}</span>
                            {g6Status !== 'idle' && isCorrect && <Check className="h-4 w-4 text-white" />}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation */}
                    {g6Status !== 'idle' && (
                      <div className={`p-6 rounded-2xl border ${g6Status === 'correct' ? 'bg-emerald-50/30 border-emerald-300 text-emerald-950 shadow-2xs' : 'bg-rose-50/30 border-rose-250 text-rose-950 shadow-2xs'}`} id="g6-explanation-msg">
                        <div className="flex items-center space-x-2 mb-1.5">
                          {g6Status === 'correct' ? (
                            <>
                              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              <span className="font-sans font-extrabold text-emerald-800">Հիանալի է! +20 Միավոր</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-5 w-5 text-rose-600" />
                              <span className="font-sans font-extrabold text-rose-800">Սխալ թարգմանություն 😔</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs md:text-sm font-medium leading-relaxed">{game6Questions[g6Idx].explanation}</p>
                        
                        <div className="pt-4 flex justify-end" id="g6-next-box-wrapper">
                          <button
                            id="btn-g6-next"
                            onClick={handleG6Next}
                            className="bg-[#1A1A1A] hover:bg-[#F27D26] text-white font-extrabold text-xs py-3 px-6 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 cursor-pointer"
                          >
                            <span>Հաջորդ հարցը</span>
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

          </div>
        )}

      </main>

      {/* Footer Area with literal descriptive labels */}
      <footer id="main-footer" className="bg-[#1A1A1A] text-slate-400 py-10 border-t border-t-black mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center space-x-2 text-white font-sans font-bold text-lg" id="footer-logo">
            <span className="bg-[#F27D26] text-white px-2 py-0.5 rounded-lg text-sm mr-1">🧠</span>
            <span>Իսպաներենի Subjuntivo Ուսուցիչ</span>
          </div>
          <p className="text-xs max-w-md mx-auto text-slate-400 leading-relaxed" id="footer-about">
            Կառուցված է հատուկ հայախոսների համար՝ իսպաներենի Subjuntivo (Ըղձական/Ստորադասական) եղանակի լիարժեք տիրապետման, խոնարհումների ստուգման և արագ վարժվելու համար։
          </p>
          <div className="flex justify-center space-x-8 text-xs text-slate-400 font-mono" id="footer-stats-summary">
            <span>Կարդացված՝ <strong className="text-white">{completedSections.length}/22</strong> բաժին</span>
            <span>Հավաքած հաշիվ՝ <strong className="text-[#F27D26]">{totalScore}</strong> միավոր</span>
            <span>Լավագույն սերիա՝ <strong className="text-emerald-400">{highestStreak}</strong> անընդմեջ</span>
          </div>
          <div className="pt-4 border-t border-slate-700/40 text-3xs text-slate-500" id="copyright-block">
            © 2026 Spanish Subjuntivo Master. All rights reserved. Crafted with care for bilingual education.
          </div>
        </div>
      </footer>
    </div>
  );
}
