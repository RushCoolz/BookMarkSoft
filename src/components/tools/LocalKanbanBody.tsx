import React, { useState, useEffect } from 'react';
import { Plus, X, ArrowRight, ArrowLeft } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  column: 'todo' | 'inprogress' | 'done';
}

export function LocalKanbanBody() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('bookmarksoft_kanban');
    if (saved) {
      try { setTasks(JSON.parse(saved)); } catch (e) {}
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('bookmarksoft_kanban', JSON.stringify(tasks));
    }
  }, [tasks, loaded]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim(), column: 'todo' }]);
    setNewTask('');
  };

  const moveTask = (id: string, newCol: 'todo' | 'inprogress' | 'done') => {
    setTasks(tasks.map(t => t.id === id ? { ...t, column: newCol } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const columns: { id: 'todo' | 'inprogress' | 'done', title: string, color: string }[] = [
    { id: 'todo', title: 'To Do', color: 'border-slate-500' },
    { id: 'inprogress', title: 'In Progress', color: 'border-sky-500' },
    { id: 'done', title: 'Done', color: 'border-emerald-500' }
  ];

  if (!loaded) return <div className="h-64 flex items-center justify-center">Loading board...</div>;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[600px]">
      
      <form onSubmit={addTask} className="flex gap-4 mb-4">
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="What needs to be done?" 
          className="flex-grow bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500 outline-none transition-colors shadow-sm text-slate-800 dark:text-slate-200"
        />
        <button type="submit" disabled={!newTask.trim()} className="px-6 py-3 bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white font-medium rounded-xl transition-colors shadow-sm flex items-center gap-2">
          <Plus className="w-5 h-5" /> Add Task
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map(col => (
          <div key={col.id} className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-full min-h-[500px]">
            <div className={`p-4 border-b-2 ${col.color} bg-white dark:bg-slate-900 rounded-t-2xl shadow-sm mb-4`}>
              <h3 className="font-semibold text-slate-800 dark:text-slate-200">{col.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{tasks.filter(t => t.column === col.id).length} tasks</p>
            </div>
            
            <div className="px-4 pb-4 flex-grow space-y-3">
              {tasks.filter(t => t.column === col.id).map(task => (
                <div key={task.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 group hover:border-sky-300 dark:hover:border-sky-700 transition-colors">
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-snug">{task.text}</p>
                    <button onClick={() => deleteTask(task.id)} className="text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-700 pt-2 mt-2">
                    {col.id !== 'todo' ? (
                      <button onClick={() => moveTask(task.id, col.id === 'done' ? 'inprogress' : 'todo')} className="text-xs flex items-center gap-1 text-slate-500 hover:text-sky-500">
                        <ArrowLeft className="w-3 h-3" /> Move Back
                      </button>
                    ) : <div></div>}
                    
                    {col.id !== 'done' && (
                      <button onClick={() => moveTask(task.id, col.id === 'todo' ? 'inprogress' : 'done')} className="text-xs flex items-center gap-1 text-sky-500 hover:text-sky-600 font-medium">
                        Next <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              
              {tasks.filter(t => t.column === col.id).length === 0 && (
                <div className="h-32 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                  <p className="text-sm">No tasks</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
