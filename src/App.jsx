import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Dumbbell,
  Heart,
  Activity,
  Users,
  Calendar,
  Clock,
  Award,
  ChevronRight,
  ChevronLeft,
  Flame,
  Scale,
  Apple,
  Plus,
  Trash2,
  Star,
  MapPin,
  Mail,
  Phone,
  Menu,
  X,
  Check,
  Info,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';

function App() {
  // Theme Accent State
  const [accentColor, setAccentColor] = useState('orange');
  const [pickerOpen, setPickerOpen] = useState(false);

  // Mobile Nav Menu State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Interactive Programs/Classes State
  const [selectedClassTab, setSelectedClassTab] = useState('all');

  // BMI Calculator State
  const [height, setHeight] = useState('175');
  const [weight, setWeight] = useState('70');
  const [bmiScore, setBmiScore] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('');
  const [bmiMessage, setBmiMessage] = useState('');

  // Daily Routine Builder State
  const [routine, setRoutine] = useState([
    { id: 1, name: 'Barbell Back Squats', type: 'strength', sets: 4 },
    { id: 2, name: 'Dumbbell Bench Press', type: 'strength', sets: 3 }
  ]);

  // Macro Estimator State
  const [macroWeight, setMacroWeight] = useState('75');
  const [macroHeight, setMacroHeight] = useState('180');
  const [macroAge, setMacroAge] = useState('25');
  const [macroGender, setMacroGender] = useState('male');
  const [macroActivity, setMacroActivity] = useState('1.55'); // Moderate
  const [macroGoal, setMacroGoal] = useState('lose'); // lose, maintain, gain
  const [macroResults, setMacroResults] = useState(null);

  // Booking Modal State
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingClass, setBookingClass] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('morning');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Pricing Toggle State
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly, yearly

  // Testimonials State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // FAQ State
  const [activeFaq, setActiveFaq] = useState(null);

  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  // Handle Scroll to highlight navigation items and header transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section
      const sections = ['home', 'programs', 'calculator', 'toolkit', 'trainers', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculate BMI on load and on trigger
  useEffect(() => {
    calculateBmi();
    calculateMacros();
  }, []);

  const calculateBmi = (e) => {
    if (e) e.preventDefault();
    const hMeters = parseFloat(height) / 100;
    const wKg = parseFloat(weight);

    if (hMeters > 0 && wKg > 0) {
      const score = (wKg / (hMeters * hMeters)).toFixed(1);
      setBmiScore(score);

      let cat = '';
      let msg = '';

      if (score < 18.5) {
        cat = 'Underweight';
        msg = 'Your BMI is in the underweight range. Focus on nutrient-rich calorie surpluses and strength training.';
      } else if (score >= 18.5 && score < 25) {
        cat = 'Normal Weight';
        msg = 'Great job! Your BMI is in the healthy weight range. Keep maintaining your active lifestyle.';
      } else if (score >= 25 && score < 30) {
        cat = 'Overweight';
        msg = 'Your BMI is in the overweight range. Consider a slight caloric deficit and incorporating more HIIT training.';
      } else {
        cat = 'Obese';
        msg = 'Your BMI is in the obese range. We suggest consulting with our fitness trainers for a safe cardio & strength program.';
      }

      setBmiCategory(cat);
      setBmiMessage(msg);
    }
  };

  const calculateMacros = (e) => {
    if (e) e.preventDefault();
    const w = parseFloat(macroWeight);
    const h = parseFloat(macroHeight);
    const a = parseFloat(macroAge);
    const act = parseFloat(macroActivity);

    // Harris-Benedict Equation for BMR
    let bmr = 0;
    if (macroGender === 'male') {
      bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
    } else {
      bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
    }

    // TDEE (Total Daily Energy Expenditure)
    const tdee = Math.round(bmr * act);
    let targetCalories = tdee;

    if (macroGoal === 'lose') {
      targetCalories = tdee - 500; // Caloric deficit
    } else if (macroGoal === 'gain') {
      targetCalories = tdee + 400; // Caloric surplus
    }

    // Macros distribution: 30% Protein, 40% Carbs, 30% Fat
    const proteinGrams = Math.round((targetCalories * 0.3) / 4);
    const carbsGrams = Math.round((targetCalories * 0.4) / 4);
    const fatGrams = Math.round((targetCalories * 0.3) / 9);

    setMacroResults({
      tdee,
      targetCalories,
      protein: proteinGrams,
      carbs: carbsGrams,
      fat: fatGrams
    });
  };

  // Workout Routine Planner Helpers
  const exerciseDatabase = [
    { id: 1, name: 'Barbell Back Squats', type: 'strength', defaultSets: 4 },
    { id: 2, name: 'Dumbbell Bench Press', type: 'strength', defaultSets: 3 },
    { id: 3, name: 'Deadlifts', type: 'strength', defaultSets: 4 },
    { id: 4, name: 'Overhead Shoulder Press', type: 'strength', defaultSets: 3 },
    { id: 5, name: 'Weighted Pull-ups', type: 'strength', defaultSets: 3 },
    { id: 6, name: 'High Intensity Burpees', type: 'cardio', defaultSets: 4 },
    { id: 7, name: 'Treadmill Incline Intervals', type: 'cardio', defaultSets: 5 },
    { id: 8, name: 'Vinyasa Flow Yoga Sequence', type: 'yoga', defaultSets: 1 },
    { id: 9, name: 'Kettlebell Swings', type: 'strength', defaultSets: 3 },
    { id: 10, name: 'Plank Hold Intervals', type: 'yoga', defaultSets: 3 },
    { id: 11, name: 'Rowing Machine Sprint', type: 'cardio', defaultSets: 3 }
  ];

  const addToRoutine = (ex) => {
    if (routine.some(item => item.name === ex.name)) return;
    setRoutine([...routine, { id: Date.now(), name: ex.name, type: ex.type, sets: ex.defaultSets }]);
  };

  const removeFromRoutine = (id) => {
    setRoutine(routine.filter(item => item.id !== id));
  };

  const updateSets = (id, change) => {
    setRoutine(routine.map(item => {
      if (item.id === id) {
        const newSets = Math.max(1, Math.min(10, item.sets + change));
        return { ...item, sets: newSets };
      }
      return item;
    }));
  };

  // Classes & Programs Details
  const classesData = [
    {
      id: 'strength-elite',
      title: 'Power & Strength',
      category: 'strength',
      instructor: 'Alex Rivers',
      duration: '60 mins',
      intensity: 'High',
      desc: 'Build core power, improve mechanics, and hit personal records using free weights, lifting racks, and scientific progressive overload.',
      time: 'Mon, Wed, Fri - 8:00 AM'
    },
    {
      id: 'hiit-shred',
      title: 'HIIT & Conditioning',
      category: 'cardio',
      instructor: 'Sarah Chen',
      duration: '45 mins',
      intensity: 'Extreme',
      desc: 'High-intensity interval training designed to push your cardiovascular capacity and maximize calorie burn during and after the workout.',
      time: 'Tue, Thu - 7:00 PM'
    },
    {
      id: 'yoga-flex',
      title: 'Vinyasa Flow Yoga',
      category: 'yoga',
      instructor: 'Marcus Vance',
      duration: '75 mins',
      intensity: 'Medium',
      desc: 'Synchronize breath with movement. Build functional core strength, enhance stability, and promote active muscular recovery.',
      time: 'Sat, Sun - 9:00 AM'
    },
    {
      id: 'box-fit',
      title: 'Championship Boxing',
      category: 'boxing',
      instructor: 'Elena Rostova',
      duration: '60 mins',
      intensity: 'High',
      desc: 'Learn professional boxing form, work on heavy bags, develop fast footwork, and condition like a martial artist.',
      time: 'Mon, Thu - 6:00 PM'
    },
    {
      id: 'strength-cross',
      title: 'CrossFit Core',
      category: 'strength',
      instructor: 'Alex Rivers',
      duration: '50 mins',
      intensity: 'High',
      desc: 'Functional physical movements executed at high intensity. Includes elements of gymnastics, powerlifting, and athletic conditioning.',
      time: 'Tue, Fri - 6:00 AM'
    },
    {
      id: 'cardio-spin',
      title: 'Apex Spin Cycle',
      category: 'cardio',
      instructor: 'Sarah Chen',
      duration: '45 mins',
      intensity: 'High',
      desc: 'Immersive light-and-beat cycle training that takes you through virtual landscapes, sprints, climbs, and rhythm rides.',
      time: 'Wed, Sat - 10:00 AM'
    }
  ];

  const filteredClasses = selectedClassTab === 'all'
    ? classesData
    : classesData.filter(c => c.category === selectedClassTab);

  // Booking submit
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingName && bookingEmail && bookingDate) {
      setBookingSuccess(true);
      setTimeout(() => {
        // Reset states
        setBookingSuccess(false);
        setBookingOpen(false);
        setBookingName('');
        setBookingEmail('');
        setBookingDate('');
      }, 3000);
    }
  };

  const openBookingModal = (className) => {
    setBookingClass(className);
    setBookingOpen(true);
  };

  // Pricing packages calculation
  const getPrice = (basePrice) => {
    if (billingCycle === 'yearly') {
      // 20% discount
      return Math.round((basePrice * 12 * 0.8) / 12);
    }
    return basePrice;
  };

  // Testimonials Navigation
  const testimonials = [
    {
      text: "APEX FIT completely changed my lifestyle. The trainers are world-class, and the dynamic schedule lets me fit workout sessions into my busy tech calendar seamlessly!",
      name: "David Miller",
      role: "Software Engineer",
      result: "Lost 22 lbs & built muscle",
      initials: "DM"
    },
    {
      text: "The facilities are immaculate, and the community is incredibly motivating. I love using the workout planner and calorie tracker to check off my fitness goals.",
      name: "Jessica Martinez",
      role: "Marketing Director",
      result: "Gained lean muscle",
      initials: "JM"
    },
    {
      text: "Transitioning to powerlifting was intimidating, but the trainers here made it safe and incredibly rewarding. Truly elite equipment and atmosphere.",
      name: "Marcus Brodin",
      role: "Athletic Trainer",
      result: "Increased squat by 120 lbs",
      initials: "MB"
    }
  ];

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // FAQ data
  const faqs = [
    {
      q: "Can I try a guest session before committing?",
      a: "Yes! We offer a free 1-day pass for local residents. You can book it by filling out our contact form or selecting a class on the schedule."
    },
    {
      q: "What is your cancellation policy for memberships?",
      a: "For monthly memberships, you can cancel anytime with a 15-day notice before your next billing cycle. Yearly memberships are locked in for the discount period but can be paused for up to 60 days."
    },
    {
      q: "Are personal training sessions included in standard plans?",
      a: "Our Pro plan includes 1 personal session per month, and our Elite plan includes 4 sessions per month. You can also purchase additional individual sessions or packages at any time."
    },
    {
      q: "Is parking available at the facility?",
      a: "Yes, we provide free multi-level secured underground parking for all active members. Simply validate your parking key-fob at the front desk."
    }
  ];

  // Contact submit handler
  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setContactSuccess(true);
      setTimeout(() => {
        setContactSuccess(false);
        setContactName('');
        setContactEmail('');
        setContactPhone('');
        setContactMessage('');
      }, 4000);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className={`theme-accent-${accentColor}`}>
      
      {/* Floating Accent Picker Widget */}
      <div className="accent-picker">
        <div className={`picker-menu ${pickerOpen ? 'active' : ''}`}>
          <button 
            className={`accent-btn active-orange ${accentColor === 'orange' ? 'active' : ''}`}
            style={{ backgroundColor: '#ff5722', color: '#ff5722' }}
            onClick={() => setAccentColor('orange')}
            title="Apex Flame (Orange)"
          />
          <button 
            className={`accent-btn active-green ${accentColor === 'green' ? 'active' : ''}`}
            style={{ backgroundColor: '#39ff14', color: '#39ff14' }}
            onClick={() => setAccentColor('green')}
            title="Volt Green"
          />
          <button 
            className={`accent-btn active-blue ${accentColor === 'blue' ? 'active' : ''}`}
            style={{ backgroundColor: '#00e5ff', color: '#00e5ff' }}
            onClick={() => setAccentColor('blue')}
            title="Electric Cyan"
          />
          <button 
            className={`accent-btn active-pink ${accentColor === 'pink' ? 'active' : ''}`}
            style={{ backgroundColor: '#ff007f', color: '#ff007f' }}
            onClick={() => setAccentColor('pink')}
            title="Laser Pink"
          />
          <button 
            className={`accent-btn active-yellow ${accentColor === 'yellow' ? 'active' : ''}`}
            style={{ backgroundColor: '#ffea00', color: '#ffea00' }}
            onClick={() => setAccentColor('yellow')}
            title="Cyber Yellow"
          />
        </div>
        <button 
          className="picker-toggle" 
          onClick={() => setPickerOpen(!pickerOpen)}
          aria-label="Toggle Theme Accent Color Selector"
        >
          {pickerOpen ? <X size={20} /> : <Sparkles size={20} />}
        </button>
      </div>

      {/* Header & Navigation */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <a href="#home" className="logo-link">
            <Dumbbell size={28} className="text-accent" />
            <span>APEX<span className="logo-accent">FIT</span></span>
          </a>

          <nav>
            <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
              <li>
                <a 
                  href="#home" 
                  className={`nav-link ${activeSection === 'home' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className={`nav-link ${activeSection === 'programs' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Programs
                </a>
              </li>
              <li>
                <a 
                  href="#calculator" 
                  className={`nav-link ${activeSection === 'calculator' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  BMI Calculator
                </a>
              </li>
              <li>
                <a 
                  href="#toolkit" 
                  className={`nav-link ${activeSection === 'toolkit' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Fitness Toolkit
                </a>
              </li>
              <li>
                <a 
                  href="#trainers" 
                  className={`nav-link ${activeSection === 'trainers' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Trainers
                </a>
              </li>
              <li>
                <a 
                  href="#pricing" 
                  className={`nav-link ${activeSection === 'pricing' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
              <li>
                <a 
                  href="#programs" 
                  className="btn btn-primary"
                  style={{ padding: '0.5rem 1.5rem', fontSize: '0.85rem' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Book Session
                </a>
              </li>
            </ul>
          </nav>

          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero-section">
        <div className="container hero-grid">
          <div className="hero-content">
            <div className="hero-badge animate-fade-in-up">
              <Award size={16} />
              <span>Elite performance club</span>
            </div>
            <h1 className="hero-title text-gradient animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              Unleash Your <span>Ultimate self</span>
            </h1>
            <p className="hero-desc animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Where premium design meets professional athletic guidance. Track your metrics, select customized schedules, plan workouts, and train inside a state-of-the-art facility.
            </p>
            <div className="hero-ctas animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a href="#programs" className="btn btn-primary">
                View Classes <ChevronRight size={18} />
              </a>
              <a href="#toolkit" className="btn btn-secondary">
                Fitness Toolkit
              </a>
            </div>
            <div className="hero-stats animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="stat-item">
                <h3>15k+</h3>
                <p>Members</p>
              </div>
              <div className="stat-item">
                <h3>40+</h3>
                <p>Workouts</p>
              </div>
              <div className="stat-item">
                <h3>12+</h3>
                <p>Elite Coaches</p>
              </div>
            </div>
          </div>

          <div className="hero-image-container">
            <div className="hero-glow-bg"></div>
            <div className="hero-frame">
              <img src="/gym_hero.png" alt="Apex Fit Facility" className="hero-gym-img" />
              <div className="hero-image-overlay">
                <div className="overlay-icon-box pulse-border">
                  <Play size={20} fill="currentColor" />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: '800' }}>Virtual Tour</h4>
                  <p style={{ fontSize: '0.8rem' }}>Check our premium gym floors</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs / Classes Section */}
      <section id="programs" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Elite Training Programs</span>
            <h2 className="text-gradient">Choose Your Focus Area</h2>
            <p className="section-desc">Filter our premium group classes led by award-winning certified trainers and build a routine suited to your fitness goals.</p>
          </div>

          <div className="tabs-container">
            <button 
              className={`tab-btn ${selectedClassTab === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedClassTab('all')}
            >
              All Classes
            </button>
            <button 
              className={`tab-btn ${selectedClassTab === 'strength' ? 'active' : ''}`}
              onClick={() => setSelectedClassTab('strength')}
            >
              Strength
            </button>
            <button 
              className={`tab-btn ${selectedClassTab === 'cardio' ? 'active' : ''}`}
              onClick={() => setSelectedClassTab('cardio')}
            >
              Cardio
            </button>
            <button 
              className={`tab-btn ${selectedClassTab === 'yoga' ? 'active' : ''}`}
              onClick={() => setSelectedClassTab('yoga')}
            >
              Yoga & Mobility
            </button>
            <button 
              className={`tab-btn ${selectedClassTab === 'boxing' ? 'active' : ''}`}
              onClick={() => setSelectedClassTab('boxing')}
            >
              Boxing
            </button>
          </div>

          <div className="programs-grid">
            {filteredClasses.map((item) => (
              <div className="glass-card program-card" key={item.id}>
                <div>
                  <div className="program-icon-box">
                    {item.category === 'strength' && <Dumbbell />}
                    {item.category === 'cardio' && <Flame />}
                    {item.category === 'yoga' && <Heart />}
                    {item.category === 'boxing' && <Activity />}
                  </div>
                  <h3>{item.title}</h3>
                  <div className="program-meta">
                    <div className="meta-item">
                      <Clock size={14} />
                      <span>{item.duration}</span>
                    </div>
                    <div className="meta-item">
                      <Flame size={14} />
                      <span>{item.intensity} Intensity</span>
                    </div>
                  </div>
                  <p style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <strong>Schedule:</strong> {item.time} <br />
                    <strong>Instructor:</strong> {item.instructor}
                  </p>
                  <button 
                    onClick={() => openBookingModal(item.title)}
                    className="btn btn-outline" 
                    style={{ width: '100%', padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}
                  >
                    Reserve Slot
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BMI Calculator Section */}
      <section id="calculator" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Body Metrics Analyzer</span>
            <h2 className="text-gradient">BMI Assessment & Scale</h2>
            <p className="section-desc">Calculate your Body Mass Index instantly to understand your current physical baseline and get custom recommendations.</p>
          </div>

          <div className="bmi-grid">
            <div className="glass-card bmi-calc-card">
              <h3 style={{ marginBottom: '1.5rem' }}>Enter Your Details</h3>
              <form onSubmit={calculateBmi}>
                <div className="bmi-form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="bmi-height">Height (cm)</label>
                    <input 
                      id="bmi-height"
                      type="number" 
                      className="form-input" 
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="e.g. 175"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="bmi-weight">Weight (kg)</label>
                    <input 
                      id="bmi-weight"
                      type="number" 
                      className="form-input" 
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="e.g. 70"
                      required
                    />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Calculate Body Mass Index
                </button>
              </form>

              <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Info size={24} className="text-accent" style={{ flexShrink: 0 }} />
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'left' }}>
                  <strong>Note:</strong> Body Mass Index (BMI) is a useful measure of body fat based on height and weight. It is an initial guide and does not account for muscle mass or distribution.
                </p>
              </div>
            </div>

            <div className="glass-card bmi-result-card">
              {bmiScore ? (
                <>
                  <div className="bmi-gauge-container">
                    <svg className="bmi-gauge-svg">
                      <circle className="bmi-gauge-bg" cx="100" cy="100" r="85"></circle>
                      <circle 
                        className="bmi-gauge-fill" 
                        cx="100" 
                        cy="100" 
                        r="85"
                        strokeDasharray="534"
                        // Max BMI 40, map bmiScore to progress
                        strokeDashoffset={534 - (Math.min(bmiScore, 40) / 40) * 534}
                      ></circle>
                    </svg>
                    <div className="bmi-gauge-text">
                      <span className="bmi-score">{bmiScore}</span>
                      <span className="bmi-score-lbl">BMI Score</span>
                    </div>
                  </div>

                  <h3 className="bmi-category text-accent">{bmiCategory}</h3>
                  <p className="bmi-desc">{bmiMessage}</p>

                  <div className="bmi-scale-bar">
                    <div className="scale-segment under"></div>
                    <div className="scale-segment normal"></div>
                    <div className="scale-segment over"></div>
                    <div className="scale-segment obese"></div>
                  </div>
                  <div className="bmi-scale-labels">
                    <span>18.5</span>
                    <span>25.0</span>
                    <span>30.0</span>
                  </div>
                </>
              ) : (
                <div style={{ padding: '2rem 0' }}>
                  <Scale size={48} className="text-muted" style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <p>Calculate your BMI score to display detailed metric analysis, scale bar, and recommendations.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Fitness Toolkit Section (Planner + Macros) */}
      <section id="toolkit" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Interactive Fitness Portal</span>
            <h2 className="text-gradient">Daily Workout & Macro Hub</h2>
            <p className="section-desc">Use our interactive widgets to schedule your daily workouts and estimate target calorie & macronutrient intake for your health goals.</p>
          </div>

          <div className="toolkit-grid">
            {/* Workout Routine Builder */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Dumbbell className="text-accent" />
                Routine Planner
              </h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '2rem' }}>Construct your daily set checklist. Select exercises from the library database to append.</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Available Exercises
                  </h4>
                  <div className="planner-exercises">
                    {exerciseDatabase.map((ex) => (
                      <div className="exercise-item" key={ex.id}>
                        <div className="exercise-info">
                          <span className={`exercise-tag ${ex.type}`}>
                            {ex.type}
                          </span>
                          <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{ex.name}</span>
                        </div>
                        <button 
                          className="remove-btn" 
                          onClick={() => addToRoutine(ex)}
                          disabled={routine.some(item => item.name === ex.name)}
                          style={{ cursor: routine.some(item => item.name === ex.name) ? 'not-allowed' : 'pointer' }}
                        >
                          <Plus size={18} className={routine.some(item => item.name === ex.name) ? 'text-muted' : 'text-accent'} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                    Your Schedule
                  </h4>
                  <div className="planner-routine">
                    {routine.length > 0 ? (
                      <>
                        {routine.map((item) => (
                          <div className="routine-item" key={item.id}>
                            <div style={{ textAlign: 'left' }}>
                              <p style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--text-primary)' }}>{item.name}</p>
                              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>{item.type}</span>
                            </div>
                            <div className="routine-actions">
                              <div className="sets-controls">
                                <button className="sets-btn" onClick={() => updateSets(item.id, -1)}>-</button>
                                <span>{item.sets}s</span>
                                <button className="sets-btn" onClick={() => updateSets(item.id, 1)}>+</button>
                              </div>
                              <button className="remove-btn" onClick={() => removeFromRoutine(item.id)}>
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                        ))}
                        <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', textAlign: 'left' }}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                            <strong>Exercises:</strong> {routine.length} <br />
                            <strong>Est. Duration:</strong> {routine.reduce((acc, curr) => acc + (curr.sets * 8), 0)} mins
                          </p>
                          <button 
                            className="btn btn-outline" 
                            style={{ width: '100%', marginTop: '1rem', padding: '0.45rem 1rem', fontSize: '0.8rem' }}
                            onClick={() => setRoutine([])}
                          >
                            Clear Routine
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="empty-routine">
                        <Dumbbell />
                        <p style={{ fontSize: '0.85rem' }}>Your workout schedule is empty. Click + next to an exercise to add it.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Macro & Diet Estimator */}
            <div className="glass-card">
              <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Apple className="text-accent" />
                Macro & Calorie Estimator
              </h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Calculate your target calories and macronutrients based on physiological metrics.</p>

              <form onSubmit={calculateMacros} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left' }}>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" htmlFor="macro-weight">Weight (kg)</label>
                  <input 
                    id="macro-weight"
                    type="number" 
                    className="form-input" 
                    style={{ padding: '0.65rem 1rem' }}
                    value={macroWeight} 
                    onChange={(e) => setMacroWeight(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" htmlFor="macro-height">Height (cm)</label>
                  <input 
                    id="macro-height"
                    type="number" 
                    className="form-input" 
                    style={{ padding: '0.65rem 1rem' }}
                    value={macroHeight} 
                    onChange={(e) => setMacroHeight(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" htmlFor="macro-age">Age (years)</label>
                  <input 
                    id="macro-age"
                    type="number" 
                    className="form-input" 
                    style={{ padding: '0.65rem 1rem' }}
                    value={macroAge} 
                    onChange={(e) => setMacroAge(e.target.value)} 
                    required 
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                  <label className="form-label" htmlFor="macro-gender">Gender</label>
                  <select 
                    id="macro-gender"
                    className="form-select" 
                    style={{ padding: '0.65rem 1rem' }}
                    value={macroGender}
                    onChange={(e) => setMacroGender(e.target.value)}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: '0.75rem' }}>
                  <label className="form-label" htmlFor="macro-activity">Weekly Activity Level</label>
                  <select 
                    id="macro-activity"
                    className="form-select" 
                    style={{ padding: '0.65rem 1rem' }}
                    value={macroActivity}
                    onChange={(e) => setMacroActivity(e.target.value)}
                  >
                    <option value="1.2">Sedentary (Little/No exercise)</option>
                    <option value="1.375">Lightly Active (1-3 days/wk)</option>
                    <option value="1.55">Moderately Active (3-5 days/wk)</option>
                    <option value="1.725">Very Active (6-7 days/wk)</option>
                    <option value="1.9">Super Active (Athlete / Physical Job)</option>
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: 'span 2', marginBottom: '1.25rem' }}>
                  <label className="form-label" htmlFor="macro-goal">Primary Fitness Goal</label>
                  <select 
                    id="macro-goal"
                    className="form-select" 
                    style={{ padding: '0.65rem 1rem' }}
                    value={macroGoal}
                    onChange={(e) => setMacroGoal(e.target.value)}
                  >
                    <option value="lose">Fat Loss (Deficit)</option>
                    <option value="maintain">Maintenance (TDEE)</option>
                    <option value="gain">Muscle Gain (Surplus)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ gridColumn: 'span 2', padding: '0.65rem' }}>
                  Estimate Nutrition
                </button>
              </form>

              {macroResults && (
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '1rem' }}>Target Intakes:</h4>
                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent-primary)' }}>
                      {macroResults.targetCalories} <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>kcal/day</span>
                    </span>
                  </div>
                  <div className="macro-box">
                    <div className="macro-card">
                      <span className="macro-val text-accent">{macroResults.protein}g</span>
                      <span className="macro-lbl">Protein</span>
                    </div>
                    <div className="macro-card">
                      <span className="macro-val" style={{ color: '#00e5ff' }}>{macroResults.carbs}g</span>
                      <span className="macro-lbl">Carbs</span>
                    </div>
                    <div className="macro-card">
                      <span className="macro-val" style={{ color: '#39ff14' }}>{macroResults.fat}g</span>
                      <span className="macro-lbl">Fats</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Trainers Section */}
      <section id="trainers" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Elite Roster</span>
            <h2 className="text-gradient">Meet Our Professional Coaches</h2>
            <p className="section-desc">Train with certified, award-winning specialists who guide you with customized exercise physiology, metabolic optimization, and powerlifting coaching.</p>
          </div>

          <div className="trainers-grid">
            <div className="glass-card trainer-card">
              <div className="trainer-img-box">
                <img src="/coach_strength.png" alt="Alex Rivers Strength Coach" className="trainer-img" />
                <div className="trainer-socials-overlay">
                  <a href="#" className="trainer-social-icon" aria-label="Alex Rivers Facebook"><FacebookIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Alex Rivers Twitter"><TwitterIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Alex Rivers Instagram"><InstagramIcon /></a>
                </div>
              </div>
              <div className="trainer-info">
                <h3>Alex Rivers</h3>
                <span className="trainer-specialty">Head Strength Coach</span>
                <p style={{ fontSize: '0.9rem' }}>Former Powerlifting Champion with 12+ years coaching athletes in compound movements and muscle hypertrophy.</p>
              </div>
            </div>

            <div className="glass-card trainer-card">
              <div className="trainer-img-box">
                <img src="/coach_cardio.png" alt="Sarah Chen Cardio Coach" className="trainer-img" />
                <div className="trainer-socials-overlay">
                  <a href="#" className="trainer-social-icon" aria-label="Sarah Chen Facebook"><FacebookIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Sarah Chen Twitter"><TwitterIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Sarah Chen Instagram"><InstagramIcon /></a>
                </div>
              </div>
              <div className="trainer-info">
                <h3>Sarah Chen</h3>
                <span className="trainer-specialty">Cardio & HIIT Expert</span>
                <p style={{ fontSize: '0.9rem' }}>Olympic level sprinter who focuses on aerobic capacity, high intensity threshold splits, and calorie combustion cycles.</p>
              </div>
            </div>

            <div className="glass-card trainer-card">
              <div className="trainer-img-box">
                <img src="/coach_yoga.png" alt="Marcus Vance Yoga Coach" className="trainer-img" />
                <div className="trainer-socials-overlay">
                  <a href="#" className="trainer-social-icon" aria-label="Marcus Vance Facebook"><FacebookIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Marcus Vance Twitter"><TwitterIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Marcus Vance Instagram"><InstagramIcon /></a>
                </div>
              </div>
              <div className="trainer-info">
                <h3>Marcus Vance</h3>
                <span className="trainer-specialty">Yoga & Mobility Lead</span>
                <p style={{ fontSize: '0.9rem' }}>Experienced kinesiologist offering flexibility templates, joint decompression routines, and therapeutic muscular rehabilitation.</p>
              </div>
            </div>

            <div className="glass-card trainer-card">
              <div className="trainer-img-box">
                <img src="/coach_boxing.png" alt="Elena Rostova Boxing Coach" className="trainer-img" />
                <div className="trainer-socials-overlay">
                  <a href="#" className="trainer-social-icon" aria-label="Elena Rostova Facebook"><FacebookIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Elena Rostova Twitter"><TwitterIcon /></a>
                  <a href="#" className="trainer-social-icon" aria-label="Elena Rostova Instagram"><InstagramIcon /></a>
                </div>
              </div>
              <div className="trainer-info">
                <h3>Elena Rostova</h3>
                <span className="trainer-specialty">Boxing & MMA Lead</span>
                <p style={{ fontSize: '0.9rem' }}>Professional featherweight boxing trainer specializing in functional core strength, glove drills, and tactical self-defense.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Success Stories</span>
            <h2 className="text-gradient">Apex Fit Transformations</h2>
            <p className="section-desc">Read honest testimonials from real members who transformed their athletic capabilities and physiological stats inside our club.</p>
          </div>

          <div className="testimonial-carousel-container">
            <button 
              className="carousel-nav-btn prev" 
              onClick={prevTestimonial}
              aria-label="Previous Testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="testimonial-card-wrapper">
              <div className="glass-card testimonial-card">
                <span className="testimonial-quote-icon">
                  <Star size={40} fill="currentColor" />
                </span>
                <p className="testimonial-text">
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="testimonial-author">
                  <div className="author-avatar">
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div>
                    <h4 className="author-name">{testimonials[activeTestimonial].name}</h4>
                    <span className="author-role">{testimonials[activeTestimonial].role}</span>
                    <p style={{ fontSize: '0.8rem', color: '#39ff14', fontWeight: 'bold', marginTop: '0.25rem' }}>
                      Result: {testimonials[activeTestimonial].result}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              className="carousel-nav-btn next" 
              onClick={nextTestimonial}
              aria-label="Next Testimonial"
            >
              <ChevronRight size={20} />
            </button>

            <div className="carousel-dots">
              {testimonials.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`carousel-dot ${activeTestimonial === idx ? 'active' : ''}`}
                  onClick={() => setActiveTestimonial(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing / Memberships Section */}
      <section id="pricing" className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Pricing Plans</span>
            <h2 className="text-gradient">Choose Your Membership</h2>
            <p className="section-desc">Flexible packages tailored to your schedule. Save 20% by enrolling in our yearly plan option below.</p>
          </div>

          <div className="pricing-toggle-box">
            <span className={`pricing-toggle-lbl ${billingCycle === 'monthly' ? 'active' : ''}`}>Monthly</span>
            <button 
              className={`toggle-switch ${billingCycle === 'yearly' ? 'yearly' : ''}`}
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              aria-label="Toggle billing cycle between monthly and yearly"
            />
            <span className={`pricing-toggle-lbl ${billingCycle === 'yearly' ? 'active' : ''}`}>Yearly</span>
            <span className="toggle-discount-badge">Save 20%</span>
          </div>

          <div className="pricing-grid">
            {/* Plan 1 */}
            <div className="glass-card pricing-card">
              <div>
                <div className="price-header">
                  <h3>Basic Club</h3>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Perfect for gym floor training</p>
                  <div className="price-box">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{getPrice(29)}</span>
                    <span className="price-period">/mo</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li className="feature-item included"><Check size={16} /> <span>3 days/week gym floor access</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>Modern strength machines</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>Locker rooms & hot showers</span></li>
                  <li className="feature-item excluded"><X size={16} /> <span>All group fitness classes</span></li>
                  <li className="feature-item excluded"><X size={16} /> <span>Personal trainer onboarding</span></li>
                  <li className="feature-item excluded"><X size={16} /> <span>Custom diets & macro coaching</span></li>
                </ul>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => openBookingModal('Basic Plan')}>
                Join Basic Club
              </button>
            </div>

            {/* Plan 2 */}
            <div className="glass-card pricing-card popular">
              <span className="popular-badge">Most Popular</span>
              <div>
                <div className="price-header">
                  <h3>Pro Athlete</h3>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>Ideal for comprehensive training</p>
                  <div className="price-box">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{getPrice(59)}</span>
                    <span className="price-period">/mo</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li className="feature-item included"><Check size={16} /> <span>Unlimited 24/7 gym access</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>All group fitness classes included</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>Modern strength & cardio zones</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>1 Personal trainer session / mo</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>Basic dietary & macro templates</span></li>
                  <li className="feature-item excluded"><X size={16} /> <span>Bespoke 1-on-1 coaching portal</span></li>
                </ul>
              </div>
              <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => openBookingModal('Pro Athlete Plan')}>
                Access Pro Features
              </button>
            </div>

            {/* Plan 3 */}
            <div className="glass-card pricing-card">
              <div>
                <div className="price-header">
                  <h3>Elite Performance</h3>
                  <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>For dedicated athletes seeking maximum results</p>
                  <div className="price-box">
                    <span className="price-currency">$</span>
                    <span className="price-amount">{getPrice(99)}</span>
                    <span className="price-period">/mo</span>
                  </div>
                </div>
                <ul className="pricing-features">
                  <li className="feature-item included"><Check size={16} /> <span>Unlimited 24/7 gym & recovery spa</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>All group & boxing sessions</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>4 Personal trainer sessions / mo</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>Bespoke caloric & diet tracking</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>Complimentary pre/post-workout drinks</span></li>
                  <li className="feature-item included"><Check size={16} /> <span>Secure towel & key-fob service</span></li>
                </ul>
              </div>
              <button className="btn btn-secondary" style={{ width: '100%' }} onClick={() => openBookingModal('Elite Performance Plan')}>
                Go Elite Elite
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section id="contact" className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Get in Touch</span>
            <h2 className="text-gradient">Start Your Journey Today</h2>
            <p className="section-desc">Have questions about memberships or facilities? Send us a message or review our FAQ questions below.</p>
          </div>

          <div className="contact-grid">
            <div>
              <h3 style={{ marginBottom: '1rem', textAlign: 'left' }}>Contact Information</h3>
              <p style={{ textAlign: 'left', marginBottom: '2rem' }}>Stop by during operational hours to tour the compound and consult with a head trainer.</p>

              <div className="contact-info-list">
                <div className="contact-info-item">
                  <div className="contact-info-icon-box">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-info-text">
                    <h4>Gym Compound Location</h4>
                    <p style={{ fontSize: '0.95rem' }}>1024 Performance Way, Suite B, SF, CA 94103</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon-box">
                    <Mail size={20} />
                  </div>
                  <div className="contact-info-text">
                    <h4>Direct Support Email</h4>
                    <p style={{ fontSize: '0.95rem' }}>support@apexfitclub.com</p>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-info-icon-box">
                    <Phone size={20} />
                  </div>
                  <div className="contact-info-text">
                    <h4>Phone Line</h4>
                    <p style={{ fontSize: '0.95rem' }}>+1 (800) 555-APEX (2739)</p>
                  </div>
                </div>
              </div>

              {/* FAQs Accordion */}
              <div className="faq-container">
                <h3 style={{ textAlign: 'left', fontSize: '1.25rem', marginTop: '1.5rem', marginBottom: '1rem' }}>Frequently Asked Questions</h3>
                {faqs.map((faq, idx) => (
                  <div className={`faq-item ${activeFaq === idx ? 'active' : ''}`} key={idx}>
                    <button 
                      className="faq-question-btn" 
                      onClick={() => toggleFaq(idx)}
                      aria-expanded={activeFaq === idx}
                    >
                      <span>{faq.q}</span>
                      <ChevronRight size={18} />
                    </button>
                    <div className="faq-answer">
                      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '1.5rem', textAlign: 'left' }}>Send Us a Message</h3>
              {contactSuccess ? (
                <div className="modal-success-state" style={{ padding: '4rem 0' }}>
                  <div className="modal-success-icon">
                    <Check size={32} />
                  </div>
                  <h2>Message Received!</h2>
                  <p style={{ marginTop: '0.5rem' }}>Thank you. One of our fitness advisors will reply to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit}>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-name">Full Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      className="form-input" 
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. John Doe" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-email">Email Address</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      className="form-input" 
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="e.g. john@example.com" 
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-phone">Phone Number (Optional)</label>
                    <input 
                      id="contact-phone"
                      type="tel" 
                      className="form-input" 
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. +1 (555) 019-2834" 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="contact-message">Your Message</label>
                    <textarea 
                      id="contact-message"
                      className="form-textarea" 
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      placeholder="Ask about onboarding, personal coaching, or scheduling a visit..." 
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <a href="#home" className="logo-link">
                <Dumbbell size={24} className="text-accent" />
                <span>APEX<span className="logo-accent">FIT</span></span>
              </a>
              <p>State-of-the-art training sanctuary crafted for individuals who seek peak athletic conditioning and aesthetic excellence.</p>
              <div className="footer-socials">
                <a href="#" className="footer-social-btn" aria-label="Facebook"><FacebookIcon /></a>
                <a href="#" className="footer-social-btn" aria-label="Twitter"><TwitterIcon /></a>
                <a href="#" className="footer-social-btn" aria-label="Instagram"><InstagramIcon /></a>
                <a href="#" className="footer-social-btn" aria-label="YouTube"><YoutubeIcon /></a>
              </div>
            </div>

            <div className="footer-column">
              <h4>Classes</h4>
              <ul className="footer-links">
                <li><a href="#programs" className="footer-link">Strength & Conditioning</a></li>
                <li><a href="#programs" className="footer-link">HIIT Intervals</a></li>
                <li><a href="#programs" className="footer-link">Vinyasa Yoga</a></li>
                <li><a href="#programs" className="footer-link">Combat Boxing</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Tools</h4>
              <ul className="footer-links">
                <li><a href="#calculator" className="footer-link">BMI Index assessment</a></li>
                <li><a href="#toolkit" className="footer-link">Workout Routine Builder</a></li>
                <li><a href="#toolkit" className="footer-link">Macronutrient Calculator</a></li>
                <li><a href="#trainers" className="footer-link">Meet the Trainers</a></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Hours</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                <strong>Monday - Friday:</strong><br />
                5:00 AM - 11:00 PM <br /><br />
                <strong>Saturday - Sunday:</strong><br />
                6:00 AM - 9:00 PM
              </p>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">&copy; {new Date().getFullYear()} APEX FIT INC. All rights reserved. Designed for elite athletes.</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Booking Dialog Modal Component */}
      <div className={`modal-overlay ${bookingOpen ? 'active' : ''}`} onClick={() => setBookingOpen(false)}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>{bookingSuccess ? 'Confirmed!' : 'Reserve Slot'}</h3>
            <button className="modal-close-btn" onClick={() => setBookingOpen(false)} aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
          <div className="modal-body">
            {bookingSuccess ? (
              <div className="modal-success-state">
                <div className="modal-success-icon">
                  <Check size={32} />
                </div>
                <h2>Booking Confirmed!</h2>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
                  You have successfully reserved a slot for <strong>{bookingClass}</strong>. Check your email for registration key details and calendar invite.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div style={{ background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    <strong>Selected Session:</strong>
                  </p>
                  <p style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--accent-primary)' }}>{bookingClass}</p>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="booking-name">Full Name</label>
                  <input 
                    id="booking-name"
                    type="text" 
                    className="form-input" 
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="e.g. Jane Doe" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="booking-email">Email Address</label>
                  <input 
                    id="booking-email"
                    type="email" 
                    className="form-input" 
                    value={bookingEmail}
                    onChange={(e) => setBookingEmail(e.target.value)}
                    placeholder="e.g. jane@example.com" 
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="booking-date">Select Date</label>
                  <input 
                    id="booking-date"
                    type="date" 
                    className="form-input" 
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required 
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="booking-time">Preferable Time Slot</label>
                  <select 
                    id="booking-time"
                    className="form-select"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                  >
                    <option value="morning">Morning Session (6:00 AM - 11:00 AM)</option>
                    <option value="afternoon">Afternoon Session (12:00 PM - 4:00 PM)</option>
                    <option value="evening">Evening Session (5:00 PM - 10:00 PM)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  Reserve Slot Now
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}

// Inline Social Icon Components
function FacebookIcon() {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

function TwitterIcon() {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="18" width="18" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
    </svg>
  );
}

export default App;
