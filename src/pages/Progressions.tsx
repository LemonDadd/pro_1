import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Play, ChevronRight, Music, Heart, Plus, Edit2, Trash2, X } from 'lucide-react';
import { getAllProgressions } from '@/data/progressions';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { useCustomProgressionsStore } from '@/store/useCustomProgressionsStore';
import { getChordBySymbol } from '@/utils/chordRepository';
import { getDisplayChordSymbol, getDisplayRootNotes } from '@/utils/chordDisplay';
import { ROOT_NOTES, CHORD_QUALITIES, QUALITY_DISPLAY } from '@/types';
import { useSettingsStore } from '@/store/useSettingsStore';

const Progressions: React.FC = () => {
  const { customProgressions, addProgression, updateProgression, deleteProgression } = useCustomProgressionsStore();
  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const { noteDisplay } = useSettingsStore();
  const progressions = getAllProgressions(customProgressions);
  const displayRootNotes = getDisplayRootNotes(noteDisplay);
  
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [chordList, setChordList] = useState<string[]>(['C', 'G', 'Am', 'F']);
  const [selectedRoot, setSelectedRoot] = useState('C');
  const [selectedQuality, setSelectedQuality] = useState('maj');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  
  const openCreateModal = () => {
    setEditingId(null);
    setName('');
    setChordList(['C', 'G', 'Am', 'F']);
    setShowModal(true);
  };
  
  const openEditModal = (id: string) => {
    const prog = customProgressions.find(p => p.id === id);
    if (prog) {
      setEditingId(id);
      setName(prog.name);
      setChordList([...prog.chords]);
      setShowModal(true);
    }
  };
  
  const handleSave = () => {
    if (!name.trim() || chordList.length === 0) return;
    
    if (editingId) {
      updateProgression(editingId, name.trim(), chordList);
    } else {
      addProgression(name.trim(), chordList);
    }
    setShowModal(false);
  };
  
  const handleDelete = (id: string) => {
    deleteProgression(id);
    setShowDeleteConfirm(null);
  };
  
  const addChord = () => {
    const qualityDisplay = QUALITY_DISPLAY[selectedQuality] || '';
    const chordSymbol = selectedRoot + qualityDisplay;
    setChordList([...chordList, chordSymbol]);
  };
  
  const removeChord = (index: number) => {
    setChordList(chordList.filter((_, i) => i !== index));
  };
  
  const moveChord = (index: number, direction: -1 | 1) => {
    const newList = [...chordList];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= newList.length) return;
    [newList[index], newList[newIndex]] = [newList[newIndex], newList[index]];
    setChordList(newList);
  };
  
  const isValidChord = (symbol: string) => {
    return getChordBySymbol(symbol) !== null;
  };
  
  return (
    <div className="min-h-screen bg-wood-50 dark:bg-wood-900">
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-12 animate-fade-up">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-wine-100 dark:bg-wine-900/30 text-wine-700 dark:text-wine-300 rounded-full text-sm font-medium mb-4">
              <Music size={16} />
              练习模式
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-wood-900 dark:text-cream-50 mb-2">
              和弦进行练习
            </h1>
            <p className="text-lg text-wood-600 dark:text-wood-400">
              选择一套经典和弦进行，配合节拍器自动切换练习
            </p>
          </div>
          <button
            onClick={openCreateModal}
            className="
              inline-flex items-center gap-2 px-5 py-3 bg-wine-700 text-white
              rounded-full font-medium hover:bg-wine-800 transition-all
              hover:shadow-md
            "
          >
            <Plus size={20} />
            新建进行
          </button>
        </div>
        
        {customProgressions.length > 0 && (
          <div className="mb-12 animate-fade-up" style={{ animationDelay: '0.05s' }}>
            <h2 className="font-display text-2xl font-bold text-wood-900 dark:text-cream-50 mb-6 flex items-center gap-3">
              <span className="w-1 h-8 bg-wine-600 rounded-full"></span>
              我的练习清单
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {customProgressions.map((progression, idx) => {
                const isFav = isFavorite(progression.id, 'progression');
                
                return (
                  <div
                    key={progression.id}
                    className="
                      bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft
                      overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-1
                      border-2 border-wine-200 dark:border-wine-800
                    "
                    style={{ animationDelay: `${idx * 0.05}s` }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-display text-xl font-bold text-wood-900 dark:text-cream-50">
                          {progression.name}
                        </h3>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleFavorite(progression.id, 'progression')}
                            className={`
                              p-2 rounded-full transition-all
                              ${isFav
                                ? 'text-wine-600 bg-wine-50 dark:bg-wine-900/30'
                                : 'text-wood-400 hover:text-wine-500 hover:bg-wood-100 dark:hover:bg-wood-700'
                              }
                            `}
                          >
                            <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
                          </button>
                          <button
                            onClick={() => openEditModal(progression.id)}
                            className="p-2 rounded-full text-wood-400 hover:text-wood-700 hover:bg-wood-100 dark:hover:bg-wood-700 transition-all"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => setShowDeleteConfirm(progression.id)}
                            className="p-2 rounded-full text-wood-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {progression.chords.map((chord, chordIdx) => (
                          <div
                            key={chordIdx}
                            className="
                              px-4 py-2 rounded-xl bg-wine-50 dark:bg-wine-900/30
                              text-wine-700 dark:text-wine-300 font-bold text-lg
                            "
                          >
                            {getDisplayChordSymbol(chord, noteDisplay)}
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-wood-100 dark:border-wood-700">
                        <span className="text-sm text-wood-500 dark:text-wood-400">
                          {progression.chords.length} 个和弦
                        </span>
                        
                        <Link
                          to={`/progressions/${progression.id}`}
                          className="
                            inline-flex items-center gap-2 px-5 py-2.5 bg-wine-700 text-white
                            rounded-full font-medium hover:bg-wine-800 transition-all
                            hover:shadow-md
                          "
                        >
                          <Play size={16} fill="white" />
                          开始练习
                          <ChevronRight size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        
        <div className="animate-fade-up" style={{ animationDelay: customProgressions.length > 0 ? '0.1s' : '0' }}>
          <h2 className="font-display text-2xl font-bold text-wood-900 dark:text-cream-50 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-wood-400 rounded-full"></span>
            预设进行
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getAllProgressions().filter(p => !p.isCustom).map((progression, idx) => {
              const isFav = isFavorite(progression.id, 'progression');
              
              return (
                <div
                  key={progression.id}
                  className="
                    bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-soft
                    overflow-hidden transition-all duration-300 hover:shadow-warm hover:-translate-y-1
                    border border-wood-100 dark:border-wood-700
                  "
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-display text-xl font-bold text-wood-900 dark:text-cream-50">
                        {progression.name}
                      </h3>
                      <button
                        onClick={() => toggleFavorite(progression.id, 'progression')}
                        className={`
                          p-2 rounded-full transition-all
                          ${isFav
                            ? 'text-wine-600 bg-wine-50 dark:bg-wine-900/30'
                            : 'text-wood-400 hover:text-wine-500 hover:bg-wood-100 dark:hover:bg-wood-700'
                          }
                        `}
                      >
                        <Heart size={20} fill={isFav ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {progression.chords.map((chord, chordIdx) => (
                        <div
                          key={chordIdx}
                          className="
                            px-4 py-2 rounded-xl bg-wood-100 dark:bg-wood-700
                            text-wood-700 dark:text-wood-200 font-bold text-lg
                          "
                        >
                          {getDisplayChordSymbol(chord, noteDisplay)}
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-wood-100 dark:border-wood-700">
                      <span className="text-sm text-wood-500 dark:text-wood-400">
                        {progression.chords.length} 个和弦
                      </span>
                      
                      <Link
                        to={`/progressions/${progression.id}`}
                        className="
                          inline-flex items-center gap-2 px-5 py-2.5 bg-wine-700 text-white
                          rounded-full font-medium hover:bg-wine-800 transition-all
                          hover:shadow-md
                        "
                      >
                        <Play size={16} fill="white" />
                        开始练习
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative bg-cream-50 dark:bg-wood-800 rounded-3xl shadow-warm w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-fade-up">
            <div className="sticky top-0 bg-cream-50 dark:bg-wood-800 p-6 border-b border-wood-100 dark:border-wood-700 z-10">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-wood-900 dark:text-cream-50">
                  {editingId ? '编辑进行' : '新建进行'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 rounded-full text-wood-400 hover:text-wood-700 hover:bg-wood-100 dark:hover:bg-wood-700 transition-all"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-wood-700 dark:text-wood-300 mb-2">
                  名称
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="输入进行名称，如：我的练习 1"
                  className="
                    w-full px-4 py-3 rounded-xl border border-wood-200 dark:border-wood-600
                    bg-white dark:bg-wood-700 text-wood-900 dark:text-cream-50
                    focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent
                    transition-all
                  "
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-wood-700 dark:text-wood-300 mb-2">
                  和弦序列（点击可删除）
                </label>
                <div className="flex flex-wrap gap-2 min-h-[48px] p-3 bg-wood-50 dark:bg-wood-900 rounded-xl border border-wood-100 dark:border-wood-700">
                  {chordList.length === 0 ? (
                    <span className="text-wood-400 text-sm">还没有和弦，请从下方添加</span>
                  ) : (
                    chordList.map((chord, idx) => (
                      <div
                        key={idx}
                        className="
                          inline-flex items-center gap-2 px-3 py-2 rounded-lg
                          bg-wine-100 dark:bg-wine-900/30 text-wine-700 dark:text-wine-300
                          font-bold cursor-pointer hover:bg-wine-200 dark:hover:bg-wine-800/40 transition-colors
                        "
                        onClick={() => removeChord(idx)}
                      >
                        {getDisplayChordSymbol(chord, noteDisplay)}
                        <X size={14} />
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-wood-700 dark:text-wood-300 mb-3">
                  添加和弦
                </label>
                <div className="space-y-3">
                  <div>
                    <span className="text-xs text-wood-500 dark:text-wood-400 mb-2 block">根音</span>
                    <div className="flex flex-wrap gap-2">
                      {displayRootNotes.map((note) => {
                        let internalNote = note;
                        if (noteDisplay === 'flat' && note.includes('b')) {
                          internalNote = note === 'Db' ? 'C#' :
                            note === 'Eb' ? 'D#' :
                            note === 'Gb' ? 'F#' :
                            note === 'Ab' ? 'G#' :
                            note === 'Bb' ? 'A#' : note;
                        }
                        const isSelected = selectedRoot === internalNote;
                        return (
                          <button
                            key={note}
                            onClick={() => setSelectedRoot(internalNote)}
                            className={`
                              w-10 h-10 rounded-lg font-bold transition-all
                              ${isSelected
                                ? 'bg-wine-700 text-white'
                                : 'bg-wood-100 dark:bg-wood-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-wood-600'
                              }
                            `}
                          >
                            {note}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-wood-500 dark:text-wood-400 mb-2 block">类型</span>
                    <div className="flex flex-wrap gap-2">
                      {CHORD_QUALITIES.map((quality) => (
                        <button
                          key={quality}
                          onClick={() => setSelectedQuality(quality)}
                          className={`
                            px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                            ${selectedQuality === quality
                              ? 'bg-wine-700 text-white'
                              : 'bg-wood-100 dark:bg-wood-700 text-wood-700 dark:text-wood-300 hover:bg-wood-200 dark:hover:bg-wood-600'
                            }
                          `}
                        >
                          {QUALITY_DISPLAY[quality] || quality}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={addChord}
                    disabled={!isValidChord(selectedRoot + (QUALITY_DISPLAY[selectedQuality] || ''))}
                    className="
                      w-full py-2.5 rounded-xl font-medium transition-all
                      bg-wood-200 dark:bg-wood-700 text-wood-700 dark:text-wood-300
                      hover:bg-wood-300 dark:hover:bg-wood-600
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    + 添加 {getDisplayChordSymbol(selectedRoot + (QUALITY_DISPLAY[selectedQuality] || ''), noteDisplay)}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-wood-700 dark:text-wood-300 mb-2">
                  调整顺序
                </label>
                <div className="flex flex-wrap gap-2">
                  {chordList.map((chord, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-wood-100 dark:bg-wood-700"
                    >
                      <button
                        onClick={() => moveChord(idx, -1)}
                        disabled={idx === 0}
                        className="p-1 text-wood-500 hover:text-wood-700 disabled:opacity-30"
                      >
                        ←
                      </button>
                      <span className="text-sm font-medium text-wood-700 dark:text-wood-300 min-w-[40px] text-center">
                        {getDisplayChordSymbol(chord, noteDisplay)}
                      </span>
                      <button
                        onClick={() => moveChord(idx, 1)}
                        disabled={idx === chordList.length - 1}
                        className="p-1 text-wood-500 hover:text-wood-700 disabled:opacity-30"
                      >
                        →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="sticky bottom-0 bg-cream-50 dark:bg-wood-800 p-6 border-t border-wood-100 dark:border-wood-700">
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="
                    px-6 py-2.5 rounded-full font-medium
                    text-wood-600 dark:text-wood-400 hover:bg-wood-100 dark:hover:bg-wood-700
                    transition-colors
                  "
                >
                  取消
                </button>
                <button
                  onClick={handleSave}
                  disabled={!name.trim() || chordList.length === 0}
                  className="
                    px-6 py-2.5 rounded-full font-medium
                    bg-wine-700 text-white hover:bg-wine-800
                    transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {editingId ? '保存修改' : '创建进行'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(null)} />
          <div className="relative bg-cream-50 dark:bg-wood-800 rounded-2xl shadow-warm w-full max-w-md p-6 animate-fade-up">
            <h3 className="font-display text-xl font-bold text-wood-900 dark:text-cream-50 mb-2">
              删除确认
            </h3>
            <p className="text-wood-600 dark:text-wood-400 mb-6">
              确定要删除这个进行吗？此操作不可撤销。
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteConfirm(null)}
                className="
                  px-5 py-2 rounded-full font-medium
                  text-wood-600 dark:text-wood-400 hover:bg-wood-100 dark:hover:bg-wood-700
                  transition-colors
                "
              >
                取消
              </button>
              <button
                onClick={() => handleDelete(showDeleteConfirm)}
                className="
                  px-5 py-2 rounded-full font-medium
                  bg-red-500 text-white hover:bg-red-600
                  transition-colors
                "
              >
                删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Progressions;
