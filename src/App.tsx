import "./App.css"
import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTerminal, FaCode, FaGithub, FaTwitter, FaLinkedin, 
  FaEnvelope, FaSun, FaMoon, FaFileCode, FaDatabase, FaServer 
} from 'react-icons/fa';

// 定义终端输出类型
type TerminalOutputType = 'info' | 'input' | 'output' | 'error' | 'prompt';

// 定义终端输出项接口
interface TerminalOutputItem {
  type: TerminalOutputType;
  content: string;
}

// 定义命令处理函数接口
interface CommandHandler {
  (args: string[]): string;
}

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [command, setCommand] = useState<string>('');
  const [terminalOutput, setTerminalOutput] = useState<TerminalOutputItem[]>([
    { type: 'info', content: 'Welcome to geek-profile v1.0.0' },
    { type: 'info', content: 'Type "help" to see available commands' },
    { type: 'prompt', content: '' }
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  // 切换暗黑/明亮模式
  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
  };

  // 命令处理映射表
  const commandHandlers: Record<string, CommandHandler> = {
    help: () => `Available commands:\n  about    - Show personal information\n  skills   - List technical skills\n  projects - Show recent projects\n  contact  - Display contact info\n  clear    - Clear terminal\n  theme    - Toggle light/dark mode`,
    
    about: () => `Name: Alex Developer\nRole: Full Stack Engineer\nLocation: Digital Space\nBio: Passionate about building efficient, scalable systems and exploring new technologies.`,
    
    skills: () => `Languages: JavaScript, TypeScript, Python, Go\nFrontend: React, Vue, TailwindCSS, Webpack\nBackend: Node.js, Express, Django, PostgreSQL\nDevOps: Docker, AWS, CI/CD, Kubernetes`,
    
    projects: () => `1. code-analyzer - Static code analysis tool (Python)\n2. react-terminal - Terminal UI component library\n3. api-gateway - Microservices gateway (Go)\n4. data-visualizer - Real-time dashboard (React)`,
    
    contact: () => `GitHub: github.com/geekdev\nTwitter: @alexdev\nEmail: contact@geekprofile.dev\nLinkedIn: linkedin.com/in/alexdeveloper`,
    
    clear: () => {
      setTerminalOutput([{ type: 'prompt', content: '' }]);
      return '';
    },
    
    theme: () => {
      toggleDarkMode();
      return `Theme switched to ${darkMode ? 'light' : 'dark'} mode`;
    }
  };

  // 处理终端命令提交
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim()) return;

    // 解析命令和参数
    const [commandName, ...args] = command.trim().split(/\s+/);
    
    // 添加用户输入到输出
    const newOutput = [...terminalOutput];
    newOutput[newOutput.length - 1] = { type: 'input', content: command };

    // 处理命令
    let response: TerminalOutputItem;
    if (commandHandlers[commandName]) {
      try {
        const content = commandHandlers[commandName](args);
        if (commandName === 'clear') {
          // 清除命令有特殊处理
          setCommand('');
          return;
        }
        response = { type: 'output', content };
      } catch (error) {
        response = { 
          type: 'error', 
          content: `Error executing command: ${(error as Error).message}` 
        };
      }
    } else {
      response = { 
        type: 'error', 
        content: `Command not found: ${command}\nType "help" to see available commands` 
      };
    }

    // 添加响应和新的提示符
    newOutput.push(response);
    newOutput.push({ type: 'prompt', content: '' });
    setTerminalOutput(newOutput);
    setCommand('');

    // 滚动到底部
    scrollToBottom();
  };

  // 滚动到终端底部
  const scrollToBottom = () => {
    setTimeout(() => {
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }, 0);
  };

  // 模拟初始化加载效果
  useEffect(() => {
    const timer = setTimeout(() => {
      const newOutput = [...terminalOutput];
      newOutput.push({ 
        type: 'info', 
        content: 'System check: All modules operational' 
      });
      newOutput.push({ type: 'prompt', content: '' });
      setTerminalOutput(newOutput);
      scrollToBottom();
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // 技能数据
  const skills = {
    frontend: [
      'React.js', 'Vue.js', 'TypeScript', 'JavaScript (ES6+)',
      'TailwindCSS', 'SASS/LESS', 'Webpack/Vite', 'Responsive Design'
    ],
    backend: [
      'Node.js', 'Express', 'Python', 'Django', 'RESTful APIs',
      'GraphQL', 'Authentication & Authorization', 'Database Design'
    ],
    databases: [
      'PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite',
      'Prisma ORM', 'Sequelize', 'Database Optimization'
    ],
    devops: [
      'Docker', 'Git', 'GitHub Actions', 'AWS', 'CI/CD Pipelines',
      'Nginx', 'Linux', 'Monitoring & Logging'
    ]
  };

  // 项目数据
  const projects = [
    {
      title: 'code-analyzer',
      description: 'Static code analysis tool that detects bugs, security issues, and code smells.',
      tags: ['Python', 'AST', 'CLI']
    },
    {
      title: 'react-terminal',
      description: 'Terminal emulator component for React with support for custom commands.',
      tags: ['React', 'TypeScript', 'UI']
    },
    {
      title: 'api-gateway',
      description: 'Microservices gateway with rate limiting, authentication and request routing.',
      tags: ['Go', 'gRPC', 'Microservices']
    },
    {
      title: 'data-visualizer',
      description: 'Real-time data visualization dashboard with WebSockets and interactive charts.',
      tags: ['React', 'D3.js', 'WebSockets']
    }
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-900'}`}>
      {/* 顶部导航 */}
      <nav className={`sticky top-0 z-10 px-6 py-4 flex justify-between items-center ${darkMode ? 'bg-gray-800' : 'bg-gray-200'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
        <div className="flex items-center space-x-2">
          <FaTerminal className="text-xl" />
          <span className="font-mono font-bold text-lg">geek_profile</span>
        </div>
        
        <div className="flex items-center space-x-6">
          <a href="#projects" className="font-mono hover:underline transition-all">projects</a>
          <a href="#skills" className="font-mono hover:underline transition-all">skills</a>
          <a href="#contact" className="font-mono hover:underline transition-all">contact</a>
          <button 
            onClick={toggleDarkMode} 
            className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`}
            aria-label="Toggle theme"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
      
      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* 英雄区域 */}
        <section className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono tracking-tight">
              <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>console.</span>
              <span>log('Hello, World!');</span>
            </h1>
            <p className={`text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Full Stack Developer &amp; Tech Explorer. Building digital experiences with code.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#terminal" className={`px-6 py-3 rounded-md font-mono ${darkMode ? 'bg-green-600 text-black hover:bg-green-500' : 'bg-green-500 text-white hover:bg-green-600'} transition-colors`}>
                Start Terminal
              </a>
              <a href="#projects" className={`px-6 py-3 rounded-md font-mono border ${darkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-600'} transition-colors`}>
                View Projects
              </a>
            </div>
          </div>
        </section>
        
        {/* 终端区域 */}
        <section id="terminal" className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl md:text-3xl font-bold mb-6 font-mono ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <FaTerminal className="inline mr-2" /> Terminal
            </h2>
            
            <div className={`rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
              {/* 终端头部 */}
              <div className={`px-4 py-2 flex items-center space-x-2 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className={`text-sm ml-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>bash -- geek-profile</span>
              </div>
              
              {/* 终端内容 */}
              <div 
                ref={terminalRef}
                className={`font-mono text-sm p-4 h-80 overflow-y-auto ${darkMode ? 'bg-gray-900' : 'bg-white'}`}
              >
                {terminalOutput.map((line, index) => (
                  <div key={index} className="mb-1">
                    {line.type === 'info' && (
                      <span className={darkMode ? 'text-blue-400' : 'text-blue-600'}>{line.content}</span>
                    )}
                    {line.type === 'input' && (
                      <span><span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>$ </span>{line.content}</span>
                    )}
                    {line.type === 'output' && (
                      <span>{line.content.split('\n').map((l, i) => (
                        <div key={i} className={i > 0 ? 'pl-2' : ''}>{l}</div>
                      ))}</span>
                    )}
                    {line.type === 'error' && (
                      <span className={darkMode ? 'text-red-400' : 'text-red-600'}>{line.content}</span>
                    )}
                    {line.type === 'prompt' && (
                      <span><span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>$ </span><span className="animate-pulse">_</span></span>
                    )}
                  </div>
                ))}
              </div>
              
              {/* 终端输入 */}
              <form onSubmit={handleCommandSubmit} className={`px-4 py-3 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <div className="flex items-center">
                  <span className={`mr-2 font-mono ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>$</span>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    className={`flex-1 bg-transparent border-none focus:outline-none font-mono ${darkMode ? 'text-green-400' : 'text-gray-900'}`}
                    placeholder="Enter command..."
                    autoFocus
                  />
                </div>
              </form>
            </div>
          </div>
        </section>
        
        {/* 技能区域 */}
        <section id="skills" className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl md:text-3xl font-bold mb-8 font-mono ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <FaCode className="inline mr-2" /> Technical Skills
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 前端技能 */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h3 className="text-xl font-bold mb-4 font-mono">Frontend Development</h3>
                <ul className="space-y-2">
                  {skills.frontend.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">▣</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 后端技能 */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h3 className="text-xl font-bold mb-4 font-mono">Backend Development</h3>
                <ul className="space-y-2">
                  {skills.backend.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">▣</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* 数据库技能 */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h3 className="text-xl font-bold mb-4 font-mono flex items-center">
                  <FaDatabase className="mr-2" /> Databases
                </h3>
                <ul className="space-y-2">
                  {skills.databases.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">▣</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* DevOps技能 */}
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                <h3 className="text-xl font-bold mb-4 font-mono flex items-center">
                  <FaServer className="mr-2" /> DevOps
                </h3>
                <ul className="space-y-2">
                  {skills.devops.map((skill, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">▣</span> {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* 项目区域 */}
        <section id="projects" className="mb-16 md:mb-24">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl md:text-3xl font-bold mb-8 font-mono ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <FaFileCode className="inline mr-2" /> Featured Projects
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project, index) => (
                <div 
                  key={index} 
                  className={`rounded-lg overflow-hidden border transition-transform hover:scale-105 ${darkMode ? 'border-gray-700 hover:border-blue-500' : 'border-gray-300 hover:border-blue-500'}`}
                >
                  <div className={`p-5 ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
                    <h3 className="text-xl font-bold mb-2 font-mono">{project.title}</h3>
                    <p className={`mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, i) => (
                        <span key={i} className={`px-2 py-1 text-xs rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a href="#" className={`text-sm font-mono ${darkMode ? 'text-blue-400 hover:underline' : 'text-blue-600 hover:underline'}`}>
                      View on GitHub →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 联系区域 */}
        <section id="contact">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-2xl md:text-3xl font-bold mb-8 font-mono ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              <FaEnvelope className="inline mr-2" /> Get In Touch
            </h2>
            
            <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-6 md:mb-0">
                  <p className="mb-4">Interested in working together? Feel free to reach out.</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available for freelance projects and collaborations.</p>
                </div>
                
                <div className="flex space-x-4">
                  <a href="#" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`} aria-label="GitHub">
                    <FaGithub />
                  </a>
                  <a href="#" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`} aria-label="Twitter">
                    <FaTwitter />
                  </a>
                  <a href="#" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`} aria-label="LinkedIn">
                    <FaLinkedin />
                  </a>
                  <a href="mailto:contact@geekprofile.dev" className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} transition-colors`} aria-label="Email">
                    <FaEnvelope />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* 页脚 */}
      <footer className={`py-6 border-t ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-200 border-gray-300'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className={`font-mono text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            &copy; {new Date().getFullYear()} geek_profile. Built with React and TailwindCSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;