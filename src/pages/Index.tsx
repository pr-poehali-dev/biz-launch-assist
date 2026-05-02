import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type IconName = React.ComponentProps<typeof Icon>["name"];

const PROJECT_IMAGE = "https://cdn.poehali.dev/projects/ccc01412-e20a-4f65-abed-e394645d2f34/files/a23024d4-0964-4855-ad55-feb016225a61.jpg";

const NAV_LINKS = [
  { label: "Главная", href: "#home" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Услуги", href: "#services" },
  { label: "Обо мне", href: "#about" },
  { label: "Блог", href: "#blog" },
  { label: "Контакты", href: "#contact" },
];

const PROJECTS = [
  { id: 1, title: "Фирменный стиль бренда", category: "брендинг", year: "2024", img: PROJECT_IMAGE, desc: "Разработка визуальной идентичности для стартапа в сфере технологий" },
  { id: 2, title: "Веб-платформа для стартапа", category: "веб", year: "2024", img: PROJECT_IMAGE, desc: "Проектирование и дизайн SaaS-продукта с нуля до запуска" },
  { id: 3, title: "Редизайн мобильного приложения", category: "ui/ux", year: "2023", img: PROJECT_IMAGE, desc: "Полный редизайн пользовательского опыта для e-commerce приложения" },
  { id: 4, title: "Упаковка и мерч", category: "брендинг", year: "2023", img: PROJECT_IMAGE, desc: "Серия фирменных материалов и упаковки для ресторанного бренда" },
  { id: 5, title: "Корпоративный сайт", category: "веб", year: "2023", img: PROJECT_IMAGE, desc: "Представительский сайт с анимациями и 3D-элементами" },
  { id: 6, title: "Dashboard аналитики", category: "ui/ux", year: "2022", img: PROJECT_IMAGE, desc: "Проектирование интерфейса аналитической панели для финтех-компании" },
];

const SERVICES: { icon: string; title: string; desc: string; price: string }[] = [
  { icon: "Pen", title: "Брендинг", desc: "Создание фирменного стиля, логотипа и визуальной идентичности, которые выделяют вас среди конкурентов", price: "от 50 000 ₽" },
  { icon: "Monitor", title: "Веб-дизайн", desc: "Современные сайты с продуманным UX, высокой конверсией и отличным визуальным впечатлением", price: "от 80 000 ₽" },
  { icon: "Smartphone", title: "UI/UX дизайн", desc: "Проектирование интерфейсов мобильных приложений и веб-продуктов с фокусом на пользователе", price: "от 60 000 ₽" },
  { icon: "Layout", title: "Полиграфия", desc: "Дизайн презентаций, буклетов, упаковки и маркетинговых материалов под ключ", price: "от 15 000 ₽" },
];

const TESTIMONIALS = [
  { name: "Алексей Воронов", role: "CEO, TechStart", text: "Работа с этим дизайнером изменила восприятие нашего продукта. Клиенты стали сразу понимать ценность того, что мы предлагаем. Результат превзошёл все ожидания.", avatar: "А", rating: 5 },
  { name: "Марина Светлова", role: "Основатель, Bloom Studio", text: "Удивительная внимательность к деталям и понимание бизнеса. Наш новый брендинг получил несколько наград и помог привлечь крупных клиентов.", avatar: "М", rating: 5 },
  { name: "Дмитрий Кравцов", role: "Директор по маркетингу, Novex", text: "Очень профессиональный подход. Редизайн нашего сайта увеличил конверсию на 40%. Рекомендую всем, кто хочет по-настоящему сильный дизайн.", avatar: "Д", rating: 5 },
  { name: "Ольга Берестова", role: "Арт-директор, Pulse Agency", text: "Работали вместе над сложным проектом с жёсткими дедлайнами. Всё сдано вовремя, качество исключительное. Обязательно продолжим сотрудничество.", avatar: "О", rating: 5 },
];

const BLOG_POSTS = [
  { date: "18 апреля 2025", category: "Дизайн", title: "Как минимализм увеличивает конверсию: 5 принципов", desc: "Разбираем реальные кейсы, где меньше элементов на странице привело к большему количеству заявок и покупок.", readTime: "5 мин" },
  { date: "2 марта 2025", category: "Брендинг", title: "Фирменный стиль за 3 месяца: от идеи до результата", desc: "Подробный разбор процесса создания брендинга — от первых скетчей до финального руководства для команды.", readTime: "8 мин" },
  { date: "14 января 2025", category: "UI/UX", title: "Топ ошибок в интерфейсах, которые теряют клиентов", desc: "Собрал самые распространённые проблемы в дизайне приложений, которые заставляют пользователей уходить.", readTime: "6 мин" },
];

function useIntersectionObserver(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function SectionWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useIntersectionObserver();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-accent-custom text-sm">★</span>
      ))}
    </div>
  );
}

const Index = () => {
  const [activeFilter, setActiveFilter] = useState("все");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const filters = ["все", "брендинг", "веб", "ui/ux"];

  const filtered = activeFilter === "все"
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body overflow-x-hidden">

      {/* NAVIGATION */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border shadow-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16">
          <a href="#home" className="font-display text-xl font-light tracking-widest uppercase text-foreground hover:text-accent-custom transition-colors">
            Studio
          </a>
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-sm font-body font-light text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Меню"
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border py-4 px-6 flex flex-col gap-4 animate-fade-in">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-base font-light text-foreground hover:text-accent-custom transition-colors tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(217,91%,95%,0.5)_0%,transparent_60%)]" />
        <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full pt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm tracking-[0.3em] uppercase text-accent-custom font-light mb-6 animate-fade-in">
                Дизайн · Брендинг · Digital
              </p>
              <h1 className="font-display text-6xl lg:text-8xl font-light leading-none mb-8 animate-fade-in-up delay-100">
                Создаю
                <br />
                <em className="not-italic text-accent-custom">визуальные</em>
                <br />
                истории
              </h1>
              <p className="text-muted-foreground font-light text-lg leading-relaxed max-w-md mb-10 animate-fade-in-up delay-200">
                Дизайнер с 8-летним опытом. Помогаю компаниям и брендам стать заметными — через сильный визуал и продуманные интерфейсы.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
                <button
                  onClick={() => handleNavClick("#portfolio")}
                  className="px-8 py-3.5 bg-foreground text-background text-sm tracking-widest uppercase font-light hover:bg-accent-custom transition-all duration-300"
                >
                  Посмотреть работы
                </button>
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="px-8 py-3.5 border border-border text-foreground text-sm tracking-widest uppercase font-light hover:border-foreground transition-all duration-300"
                >
                  Связаться
                </button>
              </div>
            </div>
            <div className="relative animate-scale-in delay-400">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={PROJECT_IMAGE}
                  alt="Портфолио"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-background border border-border px-6 py-4 shadow-lg">
                <p className="font-display text-3xl font-light">60+</p>
                <p className="text-xs text-muted-foreground tracking-wide uppercase">Проектов</p>
              </div>
              <div className="absolute -top-5 -right-5 bg-accent-custom text-white px-6 py-4">
                <p className="font-display text-3xl font-light">8</p>
                <p className="text-xs tracking-wide uppercase opacity-90">Лет опыта</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={20} className="text-muted-foreground" />
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-accent-custom font-light mb-3">Работы</p>
                <h2 className="font-display text-5xl lg:text-6xl font-light">Избранные проекты</h2>
              </div>
              <div className="flex gap-2 flex-wrap">
                {filters.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-all duration-200 ${activeFilter === f
                      ? "bg-foreground text-background"
                      : "border border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </SectionWrapper>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, i) => (
              <SectionWrapper key={project.id}>
                <div
                  className="group cursor-pointer"
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <div className="aspect-[4/3] overflow-hidden mb-4 bg-secondary relative">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-center justify-center">
                      <span className="text-background text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-background px-4 py-2">
                        Смотреть
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs text-accent-custom tracking-wide uppercase mb-1">{project.category} · {project.year}</p>
                      <h3 className="font-display text-xl font-light">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1 font-light">{project.desc}</p>
                    </div>
                    <Icon name="ArrowUpRight" size={18} className="text-muted-foreground group-hover:text-accent-custom transition-colors mt-1 flex-shrink-0" />
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 lg:py-32 bg-secondary/40">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionWrapper>
            <div className="mb-14">
              <p className="text-xs tracking-[0.3em] uppercase text-accent-custom font-light mb-3">Услуги</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light">Чем могу помочь</h2>
            </div>
          </SectionWrapper>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {SERVICES.map((service, i) => (
              <SectionWrapper key={i}>
                <div className="bg-background p-8 lg:p-10 group hover:bg-secondary/60 transition-colors duration-300">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-10 h-10 border border-border flex items-center justify-center group-hover:border-accent-custom group-hover:bg-accent-custom/10 transition-all duration-300">
                      <Icon name={service.icon as IconName} size={18} className="text-muted-foreground group-hover:text-accent-custom transition-colors" />
                    </div>
                    <span className="text-sm font-light text-accent-custom">{service.price}</span>
                  </div>
                  <h3 className="font-display text-2xl font-light mb-3">{service.title}</h3>
                  <p className="text-muted-foreground font-light leading-relaxed text-sm">{service.desc}</p>
                  <div className="mt-6 flex items-center gap-2 text-xs tracking-widest uppercase text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Подробнее</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <SectionWrapper>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={PROJECT_IMAGE}
                    alt="Обо мне"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute bottom-6 right-6 bg-background border border-border p-5 shadow-md max-w-[200px]">
                  <p className="font-display text-4xl font-light text-accent-custom mb-1">98%</p>
                  <p className="text-xs text-muted-foreground tracking-wide">Клиентов возвращаются снова</p>
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-accent-custom font-light mb-3">Обо мне</p>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-6">
                  Дизайн — это
                  <br />
                  <em className="not-italic text-accent-custom">решение задач</em>
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-5">
                  Меня зовут Александр. Я дизайнер и арт-директор с опытом работы в крупных агентствах и собственными успешными проектами. Специализируюсь на создании визуального языка для брендов.
                </p>
                <p className="text-muted-foreground font-light leading-relaxed mb-10">
                  Верю, что хороший дизайн — это не украшение, а инструмент бизнеса. Каждый проект начинаю с глубокого погружения в задачу клиента, а заканчиваю результатом, который работает.
                </p>
                <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-border">
                  {[["60+", "Проектов"], ["8", "Лет опыта"], ["40+", "Клиентов"]].map(([num, label]) => (
                    <div key={label}>
                      <p className="font-display text-4xl font-light text-foreground">{num}</p>
                      <p className="text-xs text-muted-foreground tracking-wide mt-1">{label}</p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Брендинг", "Web-дизайн", "UI/UX", "Motion", "Иллюстрация", "Figma"].map((skill) => (
                    <span key={skill} className="px-3 py-1.5 border border-border text-xs tracking-wide text-muted-foreground hover:border-accent-custom hover:text-accent-custom transition-colors">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 lg:py-32 bg-foreground text-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionWrapper>
            <div className="mb-14">
              <p className="text-xs tracking-[0.3em] uppercase font-light mb-3" style={{ color: "hsl(217, 91%, 75%)" }}>Отзывы</p>
              <h2 className="font-display text-5xl lg:text-6xl font-light text-background">Говорят клиенты</h2>
            </div>
          </SectionWrapper>
          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <SectionWrapper key={i}>
                <div className="border border-background/20 p-8 hover:border-background/40 transition-colors duration-300 group">
                  <StarRating count={t.rating} />
                  <p className="font-display text-xl font-light leading-relaxed mt-5 mb-6 text-background/90 italic">
                    «{t.text}»
                  </p>
                  <div className="flex items-center gap-3 pt-6 border-t border-background/15">
                    <div className="w-10 h-10 rounded-full bg-background/15 flex items-center justify-center font-display text-lg text-background">
                      {t.avatar}
                    </div>
                    <div>
                      <p className="font-light text-background text-sm">{t.name}</p>
                      <p className="text-xs font-light" style={{ color: "hsl(217, 91%, 75%)" }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionWrapper>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-accent-custom font-light mb-3">Блог</p>
                <h2 className="font-display text-5xl lg:text-6xl font-light">Мысли о дизайне</h2>
              </div>
              <button className="text-xs tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                Все статьи <Icon name="ArrowRight" size={14} />
              </button>
            </div>
          </SectionWrapper>
          <div className="space-y-0 divide-y divide-border">
            {BLOG_POSTS.map((post, i) => (
              <SectionWrapper key={i}>
                <article className="py-8 grid md:grid-cols-[1fr_2fr_auto] gap-6 items-start group cursor-pointer hover:bg-secondary/30 -mx-4 px-4 transition-colors duration-200">
                  <div>
                    <span className="text-xs tracking-widest uppercase text-accent-custom">{post.category}</span>
                    <p className="text-xs text-muted-foreground mt-1 font-light">{post.date}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-light mb-2 group-hover:text-accent-custom transition-colors">{post.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{post.desc}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon name="Clock" size={12} />
                    <span>{post.readTime}</span>
                    <Icon name="ArrowUpRight" size={16} className="ml-2 group-hover:text-accent-custom transition-colors" />
                  </div>
                </article>
              </SectionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 lg:py-32 bg-secondary/30">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <SectionWrapper>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-accent-custom font-light mb-3">Контакты</p>
                <h2 className="font-display text-5xl lg:text-6xl font-light leading-tight mb-6">
                  Начнём
                  <br />
                  <em className="not-italic text-accent-custom">новый проект?</em>
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-10">
                  Расскажите о своём проекте — я отвечу в течение 24 часов и предложу решение для вашей задачи.
                </p>
                <div className="space-y-5">
                  {[
                    { icon: "Mail", label: "Email", value: "hello@studio.ru" },
                    { icon: "Phone", label: "Телефон", value: "+7 (999) 123-45-67" },
                    { icon: "MapPin", label: "Город", value: "Москва, Россия" },
                  ].map(({ icon, label, value }) => (
                    <div key={label} className="flex items-center gap-4">
                      <div className="w-9 h-9 border border-border flex items-center justify-center flex-shrink-0">
                        <Icon name={icon as IconName} size={15} className="text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground tracking-wide">{label}</p>
                        <p className="text-sm font-light">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-10">
                  {[
                    { icon: "Send", label: "Telegram" },
                    { icon: "Instagram", label: "Instagram" },
                    { icon: "Linkedin", label: "LinkedIn" },
                    { icon: "Dribbble", label: "Dribbble" },
                  ].map(({ icon, label }) => (
                    <button
                      key={label}
                      aria-label={label}
                      className="w-9 h-9 border border-border flex items-center justify-center hover:border-accent-custom hover:text-accent-custom transition-all duration-200 text-muted-foreground"
                    >
                      <Icon name={icon as IconName} fallback="Link" size={15} />
                    </button>
                  ))}
                </div>
              </div>
            </SectionWrapper>
            <SectionWrapper>
              <form
                className="space-y-5"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Сообщение отправлено! Свяжусь с вами в ближайшее время.");
                }}
              >
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Ваше имя</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                    placeholder="Иван Петров"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-border bg-background px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
                    placeholder="ivan@company.ru"
                  />
                </div>
                <div>
                  <label className="text-xs tracking-widest uppercase text-muted-foreground block mb-2">Сообщение</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full border border-border bg-background px-4 py-3 text-sm font-light focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/50"
                    placeholder="Расскажите о вашем проекте..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-foreground text-background text-xs tracking-widest uppercase font-light hover:bg-accent-custom transition-all duration-300"
                >
                  Отправить сообщение
                </button>
              </form>
            </SectionWrapper>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-display text-lg font-light tracking-widest uppercase">Studio</p>
          <p className="text-xs text-muted-foreground font-light">© 2025. Все права защищены.</p>
          <div className="flex gap-6">
            {NAV_LINKS.slice(0, 4).map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;