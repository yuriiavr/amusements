interface Project {
  title: string;
  fullDescription: string;
  features: string[];
  stack: string[];
  status: string;
  titleGradient: string;
  category: string;
  year: string;
  demoUrl?: string;
}

export const projectsData = {
  "ai-fixer": {
    title: "AI Fixer",
    fullDescription: "Універсальний текстовий асистент, що працює поверх усіх вікон. Інструмент дозволяє за лічені секунди трансформувати виділений текст: миттєво виправляти граматику, перекладати на будь-яку мову або змінювати стиль і тональність повідомлення під ваші індивідуальні запити прямо в процесі роботи.",
    features: [
        "Глобальні гарячі клавіші (Alt+Shift+G)", 
        "Трансформація тексту за будь-яким промптом", 
        "Робота в будь-якому редакторі чи месенджері"
    ],
    stack: ["Electron", "JS", "Gemini API"],
    status: "Active Development",
    titleGradient: "from-purple-400 to-indigo-300",
    category: "useful",
    videoUrl: "/videos/aifixer-demo.mp4",
    demoUrl: "https://github.com/yuriiavr/text-corrector/releases/tag/AiFixer",
    year: "2026"
  },
  "alias-ai": {
    title: "AliasAI",
    fullDescription: "Сучасна інтерпретація класичної настільної гри, де слова ніколи не закінчуються. Ви можете змагатися як у великій компанії, так і грати самостійно. Головна особливість — повна свобода налаштувань: обирайте рівень складності або задавайте власну тематику, і штучний інтелект миттєво створить унікальний набір слів для вашої гри.",
    features: [
        "Генерація слів під будь-яку тематику", 
        "Рівні складності: від легких до експертних", 
        "Режими для командної та соло-гри"
    ],
    stack: ["Next.js", "Pusher", "Tailwind CSS", "Node.js"],
    status: "Beta",
    titleGradient: "from-purple-400 to-indigo-300",
    category: "amusement",
    year: "2026",
    demoUrl: "https://alias-umber.vercel.app"
  },
  "whisper-of-fate": {
    title: "Whisper of Fate",
    fullDescription: "Езотеричний додаток, що поєднує стародавні традиції з сучасними технологіями. Gemini аналізує розклади карт, будує натальні карти та вираховує синастрію, надаючи глибокі персоналізовані інтерпретації.",
    features: ["Аналіз натальних карт", "Інтерактивні розклади", "Персоналізовані прогнози"],
    stack: ["Vite", "React", "Gemini API", "Framer Motion"],
    status: "Completed",
    titleGradient: "text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-magical-accent via-white to-magical-gold mb-3",
    category: "amusement",
    year: "2026",
    videoUrl: "/videos/taro-demo.mp4",
    demoUrl: "https://whisper-of-fate.vercel.app"
  },
  "password-manager": {
    title: "Password Manager",
    fullDescription: "Надійне рішення для автономного керування цифровою безпекою. Додаток створює локальне зашифроване сховище, доступ до якого маєте лише ви через єдиний майстер-пароль. Це виключає ризики хмарних витоків, дозволяючи зберігати базу на ПК, флешці або власному Google Диску.",
    features: [
      "Галузеве шифрування даних", 
      "Повна автономність та контроль файлу", 
      "Миттєве копіювання в один клік"
    ],
    stack: ["JS", "Crypto API", "Electron"],
    status: "Stable",
    titleGradient: "from-emerald-400 to-cyan-500",
    category: "useful",
    videoUrl: "/videos/password-demo.mp4",
    demoUrl: "https://github.com/yuriiavr/password-saver/releases",
    year: "2026"
  }
};