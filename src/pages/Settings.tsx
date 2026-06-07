import React from 'react';
import { Settings as SettingsIcon, Moon, Sun, Hand, Music } from 'lucide-react';
import { useSettingsStore } from '@/store/useSettingsStore';
import { TUNING_NAMES } from '@/types';

const Settings: React.FC = () => {
  const {
    leftHanded,
    theme,
    tuning,
    setLeftHanded,
    setTheme,
    setTuning,
  } = useSettingsStore();
  
  const tunings = Object.keys(TUNING_NAMES);
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="text-center mb-10 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-wine-100 dark:bg-wine-900/30 text-wine-700 dark:text-wine-300 rounded-full text-sm font-medium mb-6">
            <SettingsIcon size={16} />
            个性化设置
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-wood-900 dark:text-cream-50 mb-4">
            设置
          </h1>
          <p className="text-lg text-wood-600 dark:text-wood-400">
            自定义你的学习体验
          </p>
        </div>
        
        <div className="space-y-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 shadow-soft border border-wood-100 dark:border-wood-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-wine-100 dark:bg-wine-900/30 flex items-center justify-center text-wine-700 dark:text-wine-300 flex-shrink-0">
                <Moon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl text-wood-900 dark:text-cream-50 mb-1">
                  主题模式
                </h3>
                <p className="text-wood-500 dark:text-wood-400 text-sm mb-4">
                  选择浅色或深色主题
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => setTheme('light')}
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all
                      ${theme === 'light'
                        ? 'bg-wine-700 text-white shadow-soft'
                        : 'bg-wood-100 dark:bg-wood-700 text-wood-600 dark:text-wood-400 hover:bg-wood-200 dark:hover:bg-wood-600'
                      }
                    `}
                  >
                    <Sun size={20} />
                    浅色
                  </button>
                  <button
                    onClick={() => setTheme('dark')}
                    className={`
                      flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all
                      ${theme === 'dark'
                        ? 'bg-wine-700 text-white shadow-soft'
                        : 'bg-wood-100 dark:bg-wood-700 text-wood-600 dark:text-wood-400 hover:bg-wood-200 dark:hover:bg-wood-600'
                      }
                    `}
                  >
                    <Moon size={20} />
                    深色
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 shadow-soft border border-wood-100 dark:border-wood-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-wine-100 dark:bg-wine-900/30 flex items-center justify-center text-wine-700 dark:text-wine-300 flex-shrink-0">
                <Hand size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl text-wood-900 dark:text-cream-50 mb-1">
                  左手模式
                </h3>
                <p className="text-wood-500 dark:text-wood-400 text-sm mb-4">
                  镜像指板显示，适合左手演奏者
                </p>
                <button
                  onClick={() => setLeftHanded(!leftHanded)}
                  className={`
                    relative w-16 h-9 rounded-full transition-all
                    ${leftHanded ? 'bg-wine-700' : 'bg-wood-300 dark:bg-wood-600'}
                  `}
                  role="switch"
                  aria-checked={leftHanded}
                >
                  <div
                    className={`
                      absolute top-1 w-7 h-7 rounded-full bg-white shadow-md transition-all
                      ${leftHanded ? 'left-8' : 'left-1'}
                    `}
                  />
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 shadow-soft border border-wood-100 dark:border-wood-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-wine-100 dark:bg-wine-900/30 flex items-center justify-center text-wine-700 dark:text-wine-300 flex-shrink-0">
                <Music size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl text-wood-900 dark:text-cream-50 mb-1">
                  调音设置
                </h3>
                <p className="text-wood-500 dark:text-wood-400 text-sm mb-4">
                  选择吉他调音方式
                </p>
                <div className="space-y-2">
                  {tunings.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTuning(t)}
                      className={`
                        w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium transition-all
                        ${tuning === t
                          ? 'bg-wine-700 text-white'
                          : 'bg-wood-100 dark:bg-wood-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-wood-600'
                      }
                    `}
                    >
                      <span>{TUNING_NAMES[t]}</span>
                      {tuning === t && (
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-cream-50 dark:bg-wood-800 rounded-2xl p-6 shadow-soft border border-wood-100 dark:border-wood-700">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-wine-100 dark:bg-wine-900/30 flex items-center justify-center text-wine-700 dark:text-wine-300 flex-shrink-0">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="font-display font-bold text-xl text-wood-900 dark:text-cream-50 mb-1">
                  关于
                </h3>
                <p className="text-wood-500 dark:text-wood-400 text-sm">
                  吉他和弦交互图谱 v1.0
                </p>
                <p className="text-wood-400 dark:text-wood-500 text-sm mt-2">
                  一款帮助吉他学习者快速查询和弦指法的工具
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
