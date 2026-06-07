import React, { useState } from 'react';
import { HelpCircle, BookOpen, ChevronDown, ChevronUp } from 'lucide-react';
import Fretboard from '@/components/Fretboard';
import { getChordBySymbol } from '@/utils/chordUtils';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const Help: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'fretboard': true,
  });
  
  const cChord = getChordBySymbol('C');
  const fChord = getChordBySymbol('F');
  
  const toggleSection = (key: string) => {
    setOpenSections(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };
  
  const faqItems: FAQItem[] = [
    {
      question: '什么是根音 (Root Note)？',
      answer: (
        <p>
          根音是和弦的基础音，也是和弦名称中的第一个音。
          例如 C 大调的根音是 C，Gm 的根音是 G。
          根音决定了和弦的音高位置。
        </p>
      ),
    },
    {
      question: '和弦类型有什么区别？',
      answer: (
        <div className="space-y-2">
          <p><strong>大三和弦 (maj)</strong>：明亮、欢快的感觉，由根音、大三度、纯五度组成。</p>
          <p><strong>小三和弦 (min)</strong>：柔和、忧郁的感觉，由根音、小三度、纯五度组成。</p>
          <p><strong>七和弦 (7)</strong>：更丰富的和声色彩，在三和弦基础上加入七度音。</p>
          <p><strong>挂二和弦 (sus2)</strong>：用二度音代替三度音，空灵、开放的感觉。</p>
          <p><strong>挂四和弦 (sus4)</strong>：用四度音代替三度音，紧张、期待的感觉。</p>
        </div>
      ),
    },
    {
      question: '什么是横按 (Barre)？',
      answer: (
        <p>
          横按是一种吉他技巧，用一根手指（通常是食指）同时按住多根弦。
          横按可以让你在不同把位演奏相同的和弦形状，
          是学习高阶和弦的必备技巧。F 和弦就是最常见的横按和弦。
        </p>
      ),
    },
    {
      question: '什么是把位 (Position)？',
      answer: (
        <p>
          把位指的是左手在指板上的位置。相同的和弦可以在不同把位演奏，
          产生不同的音色和手感。开放把位（open）使用空弦，
          而高把位和弦通常需要横按技巧。
        </p>
      ),
    },
  ];
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-wine-100 dark:bg-wine-900/30 text-wine-700 dark:text-wine-300 rounded-full text-sm font-medium mb-6">
            <HelpCircle size={16} />
            使用指南
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-wood-900 dark:text-cream-50 mb-4">
            帮助中心
          </h1>
          <p className="text-lg text-wood-600 dark:text-wood-400">
            学习如何阅读和弦指法图，了解和弦命名规则
          </p>
        </div>
        
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft border border-wood-100 dark:border-wood-700 overflow-hidden">
            <button
              onClick={() => toggleSection('fretboard')}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-wood-50 dark:hover:bg-wood-700/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-wine-100 dark:bg-wine-900/30 flex items-center justify-center text-wine-700 dark:text-wine-300">
                  <BookOpen size={24} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-wood-900 dark:text-cream-50">
                    如何阅读指法图
                  </h3>
                  <p className="text-wood-500 dark:text-wood-400 text-sm">
                    指板图符号、手指编号、空弦与闷音
                  </p>
                </div>
              </div>
              {openSections['fretboard'] ? <ChevronUp size={24} className="text-wood-400" /> : <ChevronDown size={24} className="text-wood-400" />}
            </button>
            
            {openSections['fretboard'] && (
              <div className="px-6 pb-6 border-t border-wood-100 dark:border-wood-700">
                <div className="pt-6 space-y-8">
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      {cChord && <Fretboard position={cChord.positions[0]} size="medium" />}
                    </div>
                    <div className="flex-1 space-y-4">
                      <h4 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50">
                        C 大调开放和弦
                      </h4>
                      <div className="space-y-3 text-wood-600 dark:text-wood-400">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-wine-700 text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                          <p><strong>圆点</strong>表示需要按弦的位置，数字表示用哪根手指（1=食指，2=中指，3=无名指，4=小指）</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full border-2 border-wood-600 dark:border-wood-400 flex items-center justify-center flex-shrink-0">
                            <span className="w-2 h-2 rounded-full bg-wood-600 dark:bg-wood-400" />
                          </span>
                          <p><strong>圆圈 O</strong>表示空弦，不需要按弦但要弹响</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full border-2 border-wine-600 text-wine-600 text-xl font-bold flex items-center justify-center flex-shrink-0 -mt-1">×</span>
                          <p><strong>叉号 X</strong>表示闷音，这根弦不要弹</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6 items-center">
                    <div className="flex-shrink-0">
                      {fChord && <Fretboard position={fChord.positions[0]} size="medium" />}
                    </div>
                    <div className="flex-1 space-y-4">
                      <h4 className="font-display font-bold text-lg text-wood-900 dark:text-cream-50">
                        F 大调和弦（横按）
                      </h4>
                      <div className="space-y-3 text-wood-600 dark:text-wood-400">
                        <div className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-lg bg-wine-700 flex items-center justify-center flex-shrink-0">
                            <span className="w-4 h-1 bg-white rounded-full" />
                          </span>
                          <p><strong>横按条</strong>表示用一根手指（通常是食指）同时按住多根弦</p>
                        </div>
                        <div className="flex items-start gap-3">
                          <span className="text-wood-600 dark:text-wood-400 font-bold flex-shrink-0">fr</span>
                          <p><strong>品格数</strong>标注在左侧，显示当前显示的是第几品开始的把位</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft border border-wood-100 dark:border-wood-700 overflow-hidden">
            <button
              onClick={() => toggleSection('naming')}
              className="w-full flex items-center justify-between p-6 text-left hover:bg-wood-50 dark:hover:bg-wood-700/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-wine-100 dark:bg-wine-900/30 flex items-center justify-center text-wine-700 dark:text-wine-300">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl text-wood-900 dark:text-cream-50">
                    和弦命名规则
                  </h3>
                  <p className="text-wood-500 dark:text-wood-400 text-sm">
                    根音、和弦类型的组合方式
                  </p>
                </div>
              </div>
              {openSections['naming'] ? <ChevronUp size={24} className="text-wood-400" /> : <ChevronDown size={24} className="text-wood-400" />}
            </button>
            
            {openSections['naming'] && (
              <div className="px-6 pb-6 border-t border-wood-100 dark:border-wood-700">
                <div className="pt-6 space-y-4 text-wood-600 dark:text-wood-400">
                  <p>
                    和弦名称由 <strong>根音</strong> + <strong>和弦类型</strong> 组成。
                  </p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-4">
                    <div className="bg-wood-100 dark:bg-wood-700 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-2xl text-wood-900 dark:text-cream-50 mb-1">C</div>
                      <div className="text-sm">C 大三和弦</div>
                    </div>
                    <div className="bg-wood-100 dark:bg-wood-700 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-2xl text-wood-900 dark:text-cream-50 mb-1">Am</div>
                      <div className="text-sm">A 小三和弦</div>
                    </div>
                    <div className="bg-wood-100 dark:bg-wood-700 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-2xl text-wood-900 dark:text-cream-50 mb-1">G7</div>
                      <div className="text-sm">G 属七和弦</div>
                    </div>
                    <div className="bg-wood-100 dark:bg-wood-700 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-2xl text-wood-900 dark:text-cream-50 mb-1">Dm7</div>
                      <div className="text-sm">D 小七和弦</div>
                    </div>
                    <div className="bg-wood-100 dark:bg-wood-700 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-2xl text-wood-900 dark:text-cream-50 mb-1">Fmaj7</div>
                      <div className="text-sm">F 大七和弦</div>
                    </div>
                    <div className="bg-wood-100 dark:bg-wood-700 rounded-xl p-4 text-center">
                      <div className="font-display font-bold text-2xl text-wood-900 dark:text-cream-50 mb-1">Esus4</div>
                      <div className="text-sm">E 挂四和弦</div>
                    </div>
                  </div>
                  
                  <div className="bg-wine-50 dark:bg-wine-900/20 rounded-xl p-4 mt-4">
                    <p className="text-wine-700 dark:text-wine-300 text-sm">
                      <strong>小贴士：</strong>
                      大三和弦通常省略 "maj" 后缀，直接用根音表示。
                      比如 C 就是 C 大三和弦，而 Cm 才是 C 小三和弦。
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft border border-wood-100 dark:border-wood-700 p-6">
            <h3 className="font-display font-bold text-xl text-wood-900 dark:text-cream-50 mb-6">
              常见问题
            </h3>
            <div className="space-y-4">
              {faqItems.map((item, idx) => (
                <div key={idx} className="pt-4 border-t border-wood-100 dark:border-wood-700 first:border-0 first:pt-0">
                  <h4 className="font-semibold text-wood-800 dark:text-wood-200 mb-2">
                    {item.question}
                  </h4>
                  <div className="text-wood-600 dark:text-wood-400 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
