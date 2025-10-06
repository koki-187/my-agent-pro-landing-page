import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    plan: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);

  // マウス追跡エフェクト
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // パララックス効果
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = document.querySelectorAll('.parallax');
      parallax.forEach((element) => {
        const speed = element.dataset.speed;
        const yPos = -(scrolled * speed / 100);
        element.style.transform = `translateY(${yPos}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitMessage('お問い合わせありがとうございます。担当者より連絡いたします。');
        setFormData({ name: '', email: '', phone: '', plan: '', message: '' });
      } else {
        setSubmitMessage('送信に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.log('Form submitted:', formData);
      setSubmitMessage('お問い合わせありがとうございます。担当者より連絡いたします。');
      setFormData({ name: '', email: '', phone: '', plan: '', message: '' });
    }
    
    setIsSubmitting(false);
    setTimeout(() => setSubmitMessage(''), 5000);
  };

  return (
    <div className="App">
      {/* カスタムカーソル */}
      <div 
        className="custom-cursor"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />
      
      {/* 背景アニメーション */}
      <div className="background-animation">
        <div className="floating-particles">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }} />
          ))}
        </div>
        <div className="grid-overlay parallax" data-speed="20" />
        <div className="gradient-orbs">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>
      </div>

      {/* ヘッダー */}
      <header className="header glass-morphism">
        <nav className="nav-container">
          <div className="logo-container">
            <img src="/logo.png" alt="My Agent PRO" className="logo-image" />
          </div>
          <div className="nav-links">
            <a href="#services" className="nav-link hover-glow">サービス</a>
            <a href="#features" className="nav-link hover-glow">特徴</a>
            <a href="#pricing" className="nav-link hover-glow">料金</a>
            <a href="#contact" className="nav-link hover-glow">お問い合わせ</a>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSep8J08e1lQLqB5iymmmy25XRyxvRMfXS5x2iBb8RYYOMRmlA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button cta-primary pulse-animation"
            >
              📝 申し込みフォーム
            </a>
          </div>
        </nav>
      </header>

      {/* ヒーローセクション */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <div className="hero-image parallax" data-speed="10" />
          <div className="hud-overlay parallax" data-speed="15" />
        </div>
        
        <div className="hero-main-container">
          <div className="hero-content">
            <div className="hero-badge floating-animation">
              <div className="badge-icon-professional">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="badge-text-unified">PRO</span>
            </div>
            
            <h1 className="hero-title text-glow">
              次世代の不動産エージェントサービス<br />
              <span className="gradient-text-unified">My Agent PRO</span>
            </h1>
            
            <p className="hero-subtitle fade-in-up">
              あなたの専属のエージェントとして不動産のプロを<br />
              <span className="highlight-text">"中立"ではなく、"あなたの味方"</span>である専門家としてサポート
            </p>
            
            <div className="hero-buttons">
              <button className="cta-button cta-primary hover-lift">
                💬 無料相談を開始
              </button>
              <button className="cta-button cta-secondary hover-lift">
                → サービス詳細
              </button>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSep8J08e1lQLqB5iymmmy25XRyxvRMfXS5x2iBb8RYYOMRmlA/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="cta-button cta-accent hover-lift"
              >
                📝 申し込みフォーム
              </a>
            </div>
          </div>
          
          <div className="feature-icons">
            <div className="feature-icon glass-card hover-tilt">
              <div className="icon-professional ai-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <span>AI<br />搭載</span>
            </div>
            <div className="feature-icon glass-card hover-tilt">
              <div className="icon-professional support-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <span>24/7<br />サポート</span>
            </div>
            <div className="feature-icon glass-card hover-tilt">
              <div className="icon-professional line-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </div>
              <span>LINE<br />連携</span>
            </div>
            <div className="feature-icon glass-card hover-tilt">
              <div className="icon-professional agent-icon">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
              <span>専属<br />エージェント</span>
            </div>
          </div>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title gradient-text">My Agent PROの3つの特徴</h2>
          <p className="section-subtitle">従来の不動産仲介とは全く異なるアプローチで、あなたの利益を最優先にサポートします</p>
          
          <div className="features-grid">
            <div className="feature-card glass-card hover-lift">
              <div className="feature-icon-large">
                <div className="icon-professional agent-large">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
              </div>
              <h3 className="feature-title">専属エージェント</h3>
              <h4 className="feature-subtitle">あなた専属の不動産プロフェッショナル</h4>
              <p className="feature-description">
                医師・弁護士と同様に、あなたの人生のパートナーとして継続的にサポート。売主の利益ではなく、あなたの利益を最優先に行動します。
              </p>
              <ul className="feature-list">
                <li>✓ 顧客目線での物件選定</li>
                <li>✓ 価格交渉の代行</li>
                <li>✓ 契約書の詳細チェック</li>
                <li>✓ アフターフォロー</li>
              </ul>
            </div>
            
            <div className="feature-card glass-card hover-lift">
              <div className="feature-icon-large">
                <div className="icon-professional ai-large">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
              <h3 className="feature-title">Agent Navi（AI相談）</h3>
              <h4 className="feature-subtitle">24時間365日対応のAI不動産アドバイザー</h4>
              <p className="feature-description">
                LINE公式アカウント「不動産AIアドバイザー Agent Navi」で、いつでもどこでも不動産の相談が可能。専門知識を持つAIがあなたをサポートします。
              </p>
              <ul className="feature-list">
                <li>✓ 物件の市場価値分析</li>
                <li>✓ 投資シミュレーション</li>
                <li>✓ 税務・法務の基本相談</li>
                <li>✓ 最新市場情報の提供</li>
              </ul>
            </div>
            
            <div className="feature-card glass-card hover-lift">
              <div className="feature-icon-large">
                <div className="icon-professional support-large">
                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <h3 className="feature-title">包括的サポート</h3>
              <h4 className="feature-subtitle">購入から運営まで一貫したサービス</h4>
              <p className="feature-description">
                不動産の購入・売却・運営・相続まで、ライフステージに応じた包括的なサポートを提供。長期的な資産形成をお手伝いします。
              </p>
              <ul className="feature-list">
                <li>✓ 融資・金融機関との交渉</li>
                <li>✓ 税務・確定申告サポート</li>
                <li>✓ 相続対策・事業継承</li>
                <li>✓ 法人化支援</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 実績セクション */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item glass-card">
              <div className="stat-number counter-animation" data-target="240">0</div>
              <div className="stat-unit">万円</div>
              <div className="stat-label">月間キャッシュフロー増加</div>
            </div>
            <div className="stat-item glass-card">
              <div className="stat-number counter-animation" data-target="28">0</div>
              <div className="stat-unit">%</div>
              <div className="stat-label">売却益向上</div>
            </div>
            <div className="stat-item glass-card">
              <div className="stat-number counter-animation" data-target="34">0</div>
              <div className="stat-unit">%</div>
              <div className="stat-label">相続税負担軽減</div>
            </div>
            <div className="stat-item glass-card">
              <div className="stat-number counter-animation" data-target="50">0</div>
              <div className="stat-unit">%</div>
              <div className="stat-label">減少<br />不動産管理に関する工数</div>
            </div>
          </div>
        </div>
      </section>

      {/* お客様の声セクション */}
      <section className="testimonials-section">
        <div className="container">
          <h2 className="section-title gradient-text">お客様の声</h2>
          <p className="section-subtitle">実際にご利用いただいているお客様からの評価</p>
          
          <div className="testimonials-grid">
            <div className="testimonial-card glass-card hover-lift">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <blockquote className="testimonial-text">
                "書類をクラウドでデータ管理してくれるので、書類探しや定期診断、確定申告など作業が本当に楽になりました。CF改善も「専属エージェント」だからこそというスピード感のある仕事で大変満足しております。"
              </blockquote>
              <div className="testimonial-author">
                <strong>1W74KZD8 様</strong>
                <div className="author-details">
                  <span>会社員</span>
                  <span>東京都在住</span>
                  <span className="highlight">月間収益+15万円</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card glass-card hover-lift">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <blockquote className="testimonial-text">
                "仕事柄、早朝、深夜に働いている為、担当者の方に連絡するのが申し訳なく思ってましたが、不動産AIアドバイザー「Agent Navi」のLINEサポートが24時間対応してくれる為、自分の時間も効率化できるようになり助かっています。特に売却時期や売却想定金額の相談では的確なアドバイスを頂けて、本当は担当者の方が返信してる？と錯覚をするほどでした。"
              </blockquote>
              <div className="testimonial-author">
                <strong>9K3M2XP7 様</strong>
                <div className="author-details">
                  <span>経営者</span>
                  <span>神奈川県在住</span>
                  <span className="highlight">売却益+30%向上</span>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card glass-card hover-lift">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <blockquote className="testimonial-text">
                "物件購入前の段階から、売却を想定した出口戦略を提案頂き、購入時も「専属エージェント」という立場で相手先の対応を行ってくれて、終始安心して取り組む事が出来ました。当初は費用面が割高かと思いましたが、結果、大満足です。"
              </blockquote>
              <div className="testimonial-author">
                <strong>5H8Q4RT2 様</strong>
                <div className="author-details">
                  <span>投資家</span>
                  <span>大阪府在住</span>
                  <span className="highlight">ポートフォリオ最適化</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 料金プランセクション */}
      <section id="pricing" className="pricing-section">
        <div className="container">
          <h2 className="section-title gradient-text">料金プラン</h2>
          <p className="section-subtitle">あなたのニーズに最適なプランをお選びください</p>
          
          <div className="pricing-grid">
            <div className="pricing-card glass-card hover-lift">
              <h3 className="plan-name">デモプラン</h3>
              <div className="plan-price">
                <span className="price">30,000円</span>
                <span className="period">/年</span>
              </div>
              <p className="plan-description">初回限定のお試しプラン</p>
              <ul className="plan-features">
                <li>✓ 基本的な不動産相談</li>
                <li>✓ 市場分析レポート</li>
                <li>✓ LINE Agent Navi利用</li>
                <li>✓ メールサポート</li>
              </ul>
              <button className="plan-button">プランを選択</button>
            </div>
            
            <div className="pricing-card glass-card hover-lift popular">
              <div className="popular-badge">人気プラン</div>
              <h3 className="plan-name">プランA（単発型）</h3>
              <div className="plan-price">
                <span className="price">30,000円〜</span>
                <span className="period">/回</span>
              </div>
              <p className="plan-description">案件ごとの専門サポート</p>
              <ul className="plan-features">
                <li>✓ 専属エージェント対応</li>
                <li>✓ 価格交渉代行</li>
                <li>✓ 契約書チェック</li>
                <li>✓ 融資サポート</li>
                <li>✓ 24時間LINE相談</li>
              </ul>
              <button className="plan-button">プランを選択</button>
            </div>
            
            <div className="pricing-card glass-card hover-lift">
              <h3 className="plan-name">プランB（年間フルサポート）</h3>
              <div className="plan-price">
                <span className="price">100,000円〜</span>
                <span className="period">/年</span>
              </div>
              <p className="plan-description">包括的な年間サポート</p>
              <ul className="plan-features">
                <li>✓ 年間を通じた専属サポート</li>
                <li>✓ 投資戦略立案</li>
                <li>✓ 税務・確定申告フォロー</li>
                <li>✓ 相続対策</li>
                <li>✓ 法人化支援</li>
                <li>✓ 優先対応</li>
              </ul>
              <button className="plan-button">プランを選択</button>
            </div>
          </div>
        </div>
      </section>

      {/* 24時間365日サポートセクション */}
      <section className="support-section">
        <div className="container">
          <h2 className="section-title gradient-text">24時間365日サポート</h2>
          <p className="section-subtitle">LINEとAIチャットボットで、いつでもどこでも不動産相談</p>
          
          <div className="support-content">
            <div className="support-info">
              <h3 className="support-title">不動産AIアドバイザー Agent Navi</h3>
              <p className="support-description">
                LINE公式アカウントで24時間365日、不動産に関するあらゆる相談にお答えします。AIが学習した豊富な知識で、初心者から上級者まで幅広くサポート。
              </p>
              
              <div className="support-features">
                <div className="support-feature">
                  <div className="support-icon">📊</div>
                  <span>物件の市場価値分析</span>
                </div>
                <div className="support-feature">
                  <div className="support-icon">💰</div>
                  <span>投資シミュレーション</span>
                </div>
                <div className="support-feature">
                  <div className="support-icon">⚖️</div>
                  <span>税務・法務の基本相談</span>
                </div>
                <div className="support-feature">
                  <div className="support-icon">📈</div>
                  <span>最新市場情報の提供</span>
                </div>
              </div>
              
              <div className="support-buttons">
                <button className="support-button line-button">LINE友達追加</button>
                <button className="support-button manual-button">取扱説明書を見る</button>
              </div>
            </div>
            
            <div className="support-icons-grid">
              <div className="support-icon-card glass-card">
                <div className="icon-professional ai-support">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
                <span>AI<br />搭載</span>
              </div>
              <div className="support-icon-card glass-card">
                <div className="icon-professional support-24">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
                <span>24/7<br />サポート</span>
              </div>
              <div className="support-icon-card glass-card">
                <div className="icon-professional line-support">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                </div>
                <span>LINE<br />連携</span>
              </div>
              <div className="support-icon-card glass-card">
                <div className="icon-professional agent-support">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <span>専属<br />エージェント</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お問い合わせセクション */}
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title gradient-text">お問い合わせ</h2>
          <p className="section-subtitle">ご質問やご相談がございましたら、お気軽にお問い合わせください</p>
          
          <div className="contact-content-balanced">
            <div className="contact-form-main">
              <h3 className="form-title">お問い合わせフォーム</h3>
              <p className="form-subtitle">以下のフォームにご記入ください</p>
              
              <form onSubmit={handleSubmit} className="contact-form glass-card">
                <div className="form-group">
                  <label htmlFor="name">お名前 *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">メールアドレス *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">電話番号</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="plan">ご希望プラン</label>
                  <select
                    id="plan"
                    name="plan"
                    value={formData.plan}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="">選択してください</option>
                    <option value="demo">デモプラン</option>
                    <option value="planA">プランA（単発型）</option>
                    <option value="planB">プランB（年間フルサポート）</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">お問い合わせ内容 *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="5"
                    className="form-textarea"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="form-submit hover-lift"
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </button>
                
                {submitMessage && (
                  <div className="submit-message">{submitMessage}</div>
                )}
              </form>
            </div>
            
            <div className="contact-info-side">
              <div className="contact-method-card glass-card">
                <div className="contact-icon-large">✉️</div>
                <h3>メール</h3>
                <p>24時間受付</p>
                <a href="mailto:info@my-agent.work" className="contact-link-styled">info@my-agent.work</a>
              </div>
              <p className="contact-note">専門スタッフがお待ちしております</p>
            </div>
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/logo.png" alt="My Agent PRO" className="logo-image-footer" />
            </div>
            
            <div className="footer-links">
              <a href="/privacy-policy.html" className="footer-link">プライバシーポリシー</a>
              <a href="/terms-of-service.html" className="footer-link">利用規約</a>
              <a href="/legal.html" className="footer-link">特定商取引法</a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 My Agent PRO. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

