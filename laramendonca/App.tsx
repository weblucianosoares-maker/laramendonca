import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  CheckCircle2,
  MapPin,
  Calendar,
  Clock,
  ArrowRight,
  Star,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Lock,
  Heart
} from 'lucide-react';

// --- Components ---

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  fullWidth = false,
  disabled = false,
  type = 'button'
}: {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-300 transform active:scale-95";

  const variants = {
    primary: "bg-gold hover:bg-gold-hover text-white shadow-lg shadow-gold/20",
    secondary: "bg-charcoal text-white hover:bg-gray-800",
    outline: "border-2 border-gold text-gold hover:bg-gold hover:text-white"
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed grayscale' : ''} ${className}`}
    >
      {children}
    </button>
  );
};

const SectionTitle = ({ title, subtitle, light = false }: { title: string, subtitle?: string, light?: boolean }) => (
  <div className="mb-12 text-center max-w-3xl mx-auto px-4">
    <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl mb-4 ${light ? 'text-white' : 'text-charcoal'}`}>
      {title}
    </h2>
    {subtitle && (
      <div className={`h-1 w-24 mx-auto mb-6 ${light ? 'bg-gold' : 'bg-nude'}`}></div>
    )}
    {subtitle && (
      <p className={`text-lg md:text-xl font-light ${light ? 'text-gray-300' : 'text-gray-600'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

// --- Sections ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Quem Sou", href: "#quem-sou" },
    { name: "Cura", href: "#cura" },
    { name: "O Método", href: "#metodo" },
    { name: "Eventos", href: "#agenda" },
    { name: "Depoimentos", href: "#depoimentos" },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-11 h-11 rounded-full bg-white shadow-xl flex items-center justify-center overflow-hidden border border-gold/20 transition-transform duration-500 group-hover:scale-105">
            <img
              src="/assets/logo.png"
              alt="Logo LB"
              className="w-8 h-8 object-contain mix-blend-multiply"
            />
          </div>
          <span className={`font-serif text-lg md:text-xl font-bold tracking-tight transition-colors duration-300 ${scrolled ? 'text-charcoal' : 'text-white'}`}>
            Lara Mendonça Bizzotto
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs lg:text-sm font-semibold uppercase tracking-widest hover:text-gold transition-colors ${scrolled ? 'text-gray-600' : 'text-gray-200'}`}
            >
              {link.name}
            </a>
          ))}
          <Button onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Agende uma Sessão Gratuita
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gold" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-off-white shadow-xl border-t border-gray-100">
          <div className="flex flex-col py-6 px-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-charcoal font-medium py-2 border-b border-gray-100"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button fullWidth onClick={() => {
              setIsOpen(false);
              document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Agende uma Sessão Gratuita
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <header className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("/assets/lara-hero.png")',
          backgroundPosition: 'center 20%'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/30 md:via-black/50"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center md:text-left pt-20">
        <div className="max-w-3xl">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 animate-fade-in-up">
            Sua conta bancária é apenas um <span className="text-gold italic">espelho</span> das suas emoções.
          </h1>
          <p className="text-lg md:text-2xl text-gray-200 mb-10 font-light leading-relaxed max-w-2xl">
            Descubra como quebrar os ciclos de escassez hereditária e destravar o fluxo financeiro que a sua família bloqueou inconscientemente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={() => document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' })}>
              Quero Destravar Minha Prosperidade
            </Button>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-white/80 text-sm mt-2 sm:mt-0 px-4">
              <Lock size={16} className="text-gold" />
              <span>Ambiente Seguro & Transformador</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const Identification = () => {
  const painPoints = [
    "Trabalha muito, se esforça, mas vive no \"zero a zero\".",
    "Sente culpa quando gasta dinheiro com você mesma.",
    "Ganha dinheiro, mas surgem imprevistos \"mágicos\" que levam tudo embora.",
    "Sente que está repetindo a história difícil da sua mãe ou avó."
  ];

  return (
    <section id="cura" className="py-24 bg-off-white relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-6 leading-tight">
              Você sente que o dinheiro <span className="border-b-4 border-nude">queima na sua mão?</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Muitas mulheres acreditam que falta de dinheiro se resolve com planilhas e cortar o cafezinho. Mas se fosse matemática, você já estaria rica.
            </p>

            <div className="space-y-6">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="mt-1 flex-shrink-0 bg-nude/20 p-1 rounded-full">
                    <CheckCircle2 className="text-gold w-6 h-6" />
                  </div>
                  <p className="text-charcoal font-medium text-lg">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 p-6 bg-white border-l-4 border-gold shadow-sm rounded-r-lg">
              <p className="text-charcoal font-serif text-xl italic">
                "A verdade é uma só: O problema não está no seu bolso. Está na sua Identidade Emocional Financeira."
              </p>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            <div className="absolute -inset-4 bg-nude/30 rounded-full blur-3xl opacity-50"></div>
            <img
              src="/assets/sad-executive.png"
              alt="Mulher executiva pensativa"
              className="relative rounded-lg shadow-2xl w-full object-cover h-[500px] grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Method = () => {
  const keys = [
    {
      title: "A Fonte",
      desc: "Ressignificar a relação com quem te deu a vida (Mãe/Pai) para liberar a permissão de ter mais.",
      icon: <Heart className="w-8 h-8 text-gold" />
    },
    {
      title: "A Permissão",
      desc: "Sair do lugar de \"criança ferida\" e assumir a cadeira da \"mulher adulta\" que faz dinheiro.",
      icon: <Star className="w-8 h-8 text-gold" />
    },
    {
      title: "O Fluxo",
      desc: "Aprender a receber sem culpa e multiplicar sem medo.",
      icon: <ArrowRight className="w-8 h-8 text-gold" />
    }
  ];

  return (
    <section id="metodo" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="O Método Dinheiro Emocional"
          subtitle="Eu desenvolvi uma metodologia baseada na Inteligência Sistêmica que vai na raiz do problema. Não tratamos o sintoma, tratamos a causa."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {keys.map((key, idx) => (
            <div key={idx} className="bg-off-white p-10 rounded-xl hover:-translate-y-2 transition-transform duration-300 border border-gray-100 shadow-lg hover:shadow-xl group">
              <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform">
                {key.icon}
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-4">{key.title}</h3>
              <p className="text-gray-600 leading-relaxed">{key.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="quem-sou" className="py-24 bg-charcoal text-white relative overflow-hidden">
      {/* Decorative Elements - "Luz" feel */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-nude/10 rounded-full blur-[80px] -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-12 gap-12 items-center">

          {/* Image Column */}
          <div className="md:col-span-5 relative group">
            <div className="absolute inset-0 border-2 border-gold transform translate-x-4 translate-y-4 rounded-sm transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
            <div className="relative rounded-sm overflow-hidden shadow-2xl aspect-[3/4]">
              {/* Using a placeholder that looks like a speaker/professional woman */}
              <img
                src="/assets/lara-hero.png"
                alt="Lara Mendonça - Mentora de Inteligência Financeira"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-7 md:pl-8">
            <div className="inline-flex items-center gap-2 text-gold font-bold tracking-[0.2em] uppercase text-xs mb-4">
              <span className="w-8 h-[1px] bg-gold"></span>
              A Mentora
            </div>

            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight text-white">
              Lara Mendonça Bizzotto
            </h2>

            <div className="space-y-6 text-gray-300 text-lg font-light leading-relaxed mb-10">
              <p>
                Lara Mendonça Bizzotto é especialista em <strong className="text-white font-medium">Inteligência Emocional Financeira</strong> e <strong className="text-white font-medium">Constelação Sistêmica</strong>.
              </p>
              <p>
                Com mais de <span className="text-white font-medium">12 anos de experiência</span> e milhares de alunas transformadas, Lara não ensina apenas economia ou planilhas; ela ensina <span className="text-gold italic font-serif">libertação</span>.
              </p>
              <p>
                Sua missão é guiar mulheres que cansaram de lutar contra a maré e decidiram que a prosperidade é um <strong>direito de nascença</strong>, não um prêmio de loteria.
              </p>
            </div>

            <div className="border-l-4 border-gold pl-6 py-2 mb-10 bg-white/5 rounded-r-lg">
              <p className="text-xl font-serif italic text-white/90">
                "O dinheiro flui para onde há ordem, permissão e adulto no comando. Eu te ajudo a assumir esse lugar."
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-8 border-t border-white/10 pt-8">
              <div className="text-center md:text-left">
                <span className="block text-3xl md:text-4xl font-serif text-gold mb-1">5k+</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Alunas Impactadas</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block text-3xl md:text-4xl font-serif text-gold mb-1">12+</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Anos de Mercado</span>
              </div>
              <div className="text-center md:text-left">
                <span className="block text-3xl md:text-4xl font-serif text-gold mb-1">100%</span>
                <span className="text-xs text-gray-400 uppercase tracking-widest">Transformação</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Agenda = () => {
  return (
    <section id="agenda" className="py-24 bg-off-white">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Como realizamos a Cura"
          subtitle="Escolha abaixo como você deseja iniciar sua transformação."
        />

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1: Pocket Show */}
          <div className="bg-white rounded-xl shadow-xl border-2 border-gold overflow-hidden relative transform hover:-translate-y-2 transition-all duration-300 flex flex-col">
            <div className="bg-gold text-white text-center py-2 text-xs font-bold uppercase tracking-wider">
              ✨ Próximo Evento
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-1">Laboratório de cura</span>
              <h3 className="font-serif text-3xl text-charcoal font-bold mb-1 leading-tight">
                Dinheiro Emocional
              </h3>
              <p className="text-charcoal/60 font-medium text-[10px] uppercase tracking-[0.2em] mb-6">Evento Presencial em Goiânia</p>

              <div className="space-y-4 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Calendar className="text-nude w-5 h-5" />
                  <span>17 de Janeiro de 2026</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-nude w-5 h-5" />
                  <span>Duração: 4 horas</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-nude w-5 h-5" />
                  <span>Goiânia - GO (Presencial)</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                O evento aborda a relação emocional com o dinheiro, ajudando a identificar padrões inconscientes que afetam a organização financeira e a prosperidade, trazendo clareza para as participantes.
              </p>

              <div className="mt-auto">
                <div className="mb-6">
                  <span className="text-gray-400 line-through text-sm block">De R$ 497,00</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-charcoal font-bold text-3xl">R$ 97</span>
                    <span className="text-gray-500">,00</span>
                  </div>
                </div>
                <Button fullWidth onClick={() => window.open('https://wa.me/556282208279?text=Olá Lara! Tenho interesse no próximo evento presencial Laboratório de Cura em Goiânia. Como posso garantir minha vaga?', '_blank')}>
                  Garantir Meu Ingresso
                </Button>
                <p className="text-center text-xs text-red-500 mt-3 font-medium animate-pulse">
                  Restam apenas 3 cadeiras.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: Mentoria */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden relative hover:shadow-2xl transition-all duration-300 flex flex-col lg:scale-105 z-10">
            <div className="bg-charcoal text-white text-center py-3 text-xs font-bold uppercase tracking-wider">
              🏆 MENTORIA PREMIUM
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h3 className="font-serif text-2xl text-charcoal font-bold mb-2">
                Mentoria Dinheiro Emocional
              </h3>
              <p className="text-nude font-bold text-sm uppercase tracking-wide mb-6">A Reconstrução</p>

              <div className="space-y-4 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">ONLINE</div>
                  <span>Via Zoom (8 Encontros)</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-nude w-5 h-5" />
                  <span>Início: Fevereiro/2026</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-8 leading-relaxed border-t border-gray-100 pt-4">
                Uma jornada profunda de 8 semanas para reprogramar sua identidade financeira, curar a escassez hereditária e assumir o comando da sua riqueza com a força de uma mulher adulta e próspera.
              </p>

              <div className="mt-auto">
                <Button variant="secondary" fullWidth onClick={() => window.open('https://wa.me/556282208279?text=Olá Lara! Quero saber mais sobre a Mentoria Dinheiro Emocional e como entrar para a lista de espera VIP.', '_blank')}>
                  Entrar na Lista de Espera VIP
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Aplicação necessária
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: Imersão */}
          <div className="bg-white rounded-xl shadow-xl border-2 border-gold overflow-hidden relative transform hover:-translate-y-2 transition-all duration-300 flex flex-col">
            <div className="bg-gold text-white text-center py-2 text-xs font-bold uppercase tracking-wider">
              ✨ IMERSÕES
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <span className="text-gold font-bold text-xs uppercase tracking-widest block mb-1">Cura profunda</span>
              <h3 className="font-serif text-3xl text-charcoal font-bold mb-1 leading-tight">
                Cura do Feminino
              </h3>
              <p className="text-charcoal/60 font-medium text-[10px] uppercase tracking-[0.2em] mb-6">EVENTO PREMIUM</p>

              <div className="space-y-4 mb-8 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <Clock className="text-nude w-5 h-5" />
                  <span>Duração: 1 dia inteiro</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-nude w-5 h-5" />
                  <span>Data: Em breve</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="text-nude w-5 h-5" />
                  <span>Vagas Limitadas</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-8 leading-relaxed">
                Uma imersão profunda onde a Lara trata diversas áreas da vida da mulher, curando feridas e renovando forças para despertar mulheres verdadeiramente poderosas, femininas e integradas à sua essência.
              </p>

              <div className="mt-auto">
                <Button variant="outline" fullWidth onClick={() => window.open('https://wa.me/556282208279?text=Olá Lara! Tenho muito interesse na Imersão Cura do Feminino. Por favor, me avise quando abrir a próxima data!', '_blank')}>
                  Entrar na Lista de Espera
                </Button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  Seja avisada primeiro
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      text: "Lara, fechei um contrato de 10k um dia depois do evento! Eu não acreditei quando o cliente disse sim sem pedir desconto.",
      author: "Mariana S.",
      role: "Arquiteta"
    },
    {
      text: "Eu achava que meu problema era vendas, mas era minha relação com minha mãe. Depois que curei isso, o dinheiro fluiu naturalmente.",
      author: "Fernanda L.",
      role: "Empresária"
    },
    {
      text: "Saí das dívidas em 3 meses aplicando o método. A sensação de paz que eu tenho hoje não tem preço.",
      author: "Patrícia B.",
      role: "Dentista"
    }
  ];

  return (
    <section id="depoimentos" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionTitle title="Elas destravaram. Agora é sua vez." />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-off-white p-8 rounded-lg relative">
              <div className="absolute top-0 left-0 transform -translate-y-1/2 translate-x-4 bg-nude text-white w-10 h-10 flex items-center justify-center rounded-full text-2xl font-serif">
                "
              </div>
              <p className="text-gray-700 italic mb-6 leading-relaxed pt-2">
                {t.text}
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div>
                  <h4 className="font-bold text-charcoal text-sm">{t.author}</h4>
                  <span className="text-gold text-xs uppercase tracking-wide">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "Preciso entender de constelação sistêmica?", a: "Não. O método é prático e guiado. Você não precisa estudar a teoria, apenas estar aberta para viver a experiência e aplicar os exercícios propostos." },
    { q: "O evento é religioso?", a: "Não. O trabalho é terapêutico, baseado em leis sistêmicas e inteligência emocional. Respeitamos todas as crenças e fé, mas o foco aqui é o desenvolvimento humano." },
    { q: "E se eu comprar e não puder ir?", a: "O valor do ingresso promocional não é reembolsável devido à reserva de lugar e custos logísticos, mas você pode transferir sua vaga para outra pessoa até 48h antes do evento." },
    { q: "Como funciona a Mentoria Elite?", a: "A Mentoria é um grupo fechado com acompanhamento mais próximo. Para participar, você precisa passar por uma aplicação para garantirmos que está no momento certo para esse nível de profundidade." }
  ];

  return (
    <section className="py-24 bg-off-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <SectionTitle title="Dúvidas Frequentes" />

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
};

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-lg shadow-sm overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-serif text-lg text-charcoal">{question}</span>
        {isOpen ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-gray-400" />}
      </button>
      <div
        className={`px-6 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}
      >
        <p className="text-gray-600">{answer}</p>
      </div>
    </div>
  );
};

const BookingSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    estadoCivil: '',
    profissao: '',
    frase: ''
  });

  const phrases = [
    "Sinto que trabalho muito mas o dinheiro nunca sobra.",
    "Tenho medo constante de faltar, mesmo quando tenho dinheiro.",
    "Repito os mesmos padrões financeiros difíceis da minha família.",
    "Sinto culpa ao gastar comigo mesma ou investir no meu prazer.",
    "Desejo destravar minha prosperidade e viver em abundância."
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Formatação de data brasileira: DD/MM/YYYY HH:mm:ss
    const now = new Date();
    const brTimestamp = now.toLocaleString('pt-BR', {
      timeZone: 'America/Sao_Paulo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const payload = { ...formData, timestamp: brTimestamp };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbxlRyRh7fpp_V679KBiB_bZ1iMhX7LEgmOupTnTRxb2u04GSU52ANGEhvRYkBglPwfGPg/exec', {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        body: JSON.stringify(payload)
      });

      setIsSubmitted(true);
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error('Erro ao enviar dados:', err);
      setError('Ocorreu um erro ao enviar seus dados. Por favor, tente novamente ou fale conosco pelo WhatsApp.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="booking-section" className="py-24 bg-charcoal border-t border-white/5">
      <div className="container mx-auto px-6 max-w-4xl">
        {!isSubmitted ? (
          <>
            <SectionTitle
              title="Agende uma Sessão Gratuita"
              subtitle="Preencha seus dados abaixo para liberar o acesso à minha agenda pessoal."
              light={true}
            />

            <form onSubmit={handleSubmit} className="bg-white/5 p-8 md:p-12 rounded-2xl shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gold">Nome Completo</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-gold outline-none transition-colors placeholder:text-gray-500"
                    placeholder="Seu nome"
                    value={formData.nome}
                    onChange={e => setFormData({ ...formData, nome: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gold">WhatsApp</label>
                  <input
                    required
                    type="tel"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-gold outline-none transition-colors placeholder:text-gray-500"
                    placeholder="(00) 00000-0000"
                    value={formData.whatsapp}
                    onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gold">E-mail</label>
                  <input
                    required
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-gold outline-none transition-colors placeholder:text-gray-500"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gold">Estado Civil</label>
                  <select
                    required
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-charcoal text-white focus:border-gold outline-none transition-colors"
                    value={formData.estadoCivil}
                    onChange={e => setFormData({ ...formData, estadoCivil: e.target.value })}
                  >
                    <option value="" className="bg-charcoal">Selecione...</option>
                    <option value="solteira" className="bg-charcoal text-white">Solteira</option>
                    <option value="casada" className="bg-charcoal text-white">Casada</option>
                    <option value="uniao-estavel" className="bg-charcoal text-white">União Estável</option>
                    <option value="divorciada" className="bg-charcoal text-white">Divorciada</option>
                    <option value="viuva" className="bg-charcoal text-white">Viúva</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold uppercase tracking-widest text-gold">Profissão</label>
                  <input
                    required
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white focus:border-gold outline-none transition-colors placeholder:text-gray-500"
                    placeholder="Sua profissão"
                    value={formData.profissao}
                    onChange={e => setFormData({ ...formData, profissao: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-4 mb-10">
                <label className="text-sm font-bold uppercase tracking-widest text-gold block">Qual frase melhor descreve seu momento atual?</label>
                <div className="relative">
                  <select
                    required
                    className="w-full px-4 py-4 rounded-lg border border-white/10 bg-charcoal text-white focus:border-gold outline-none transition-colors appearance-none cursor-pointer"
                    value={formData.frase}
                    onChange={e => setFormData({ ...formData, frase: e.target.value })}
                  >
                    <option value="" className="bg-charcoal">Selecione uma frase...</option>
                    {phrases.map((phrase, idx) => (
                      <option key={idx} value={phrase} className="bg-charcoal text-white">{phrase}</option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gold">
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm mb-6 animate-shake">
                  {error}
                </div>
              )}

              <Button type="submit" fullWidth className="py-4 text-lg" disabled={isLoading}>
                {isLoading ? 'Enviando Dados...' : 'Liberar Acesso à Minha Agenda'}
                {!isLoading && <ArrowRight className="ml-2" />}
              </Button>
            </form>
          </>
        ) : (
          <div className="animate-fade-in">
            <SectionTitle
              title="Escolha o melhor horário"
              subtitle="Selecione abaixo o dia e hora para o nosso encontro."
              light={true}
            />
            <div className="w-full h-[600px] bg-white rounded-2xl shadow-inner border border-white/10 overflow-hidden">
              {/* Embed do Cal.com */}
              <iframe
                src="https://cal.com/lara-mendonca-bizzotto-psbsbz/sessao-experimental-lara?embed=true"
                style={{ width: '100%', height: '100%', border: 'none' }}
                title="Agenda Lara Mendonça Bizzotto"
              />
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-gold font-bold uppercase tracking-widest text-xs hover:underline"
              >
                ← Voltar para o formulário
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12 border-b border-gray-800 pb-12">
          <div>
            <h3 className="font-serif text-2xl mb-6">Lara Mendonça Bizzotto</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Desbloqueando prosperidade através da inteligência emocional e sistêmica. Sua nova história financeira começa aqui.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gold uppercase tracking-widest text-sm mb-6">Links Rápidos</h4>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><a href="#quem-sou" className="hover:text-white transition-colors">Sobre</a></li>
              <li><a href="#metodo" className="hover:text-white transition-colors">O Método</a></li>
              <li><a href="#agenda" className="hover:text-white transition-colors">Agenda</a></li>
              <li><a href="#depoimentos" className="hover:text-white transition-colors">Depoimentos</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gold uppercase tracking-widest text-sm mb-6">Contato</h4>
            <p className="text-gray-400 text-sm mb-4">Dúvidas sobre os eventos?</p>
            <Button variant="outline" className="text-xs px-6 py-2" onClick={() => window.open('https://wa.me/556282208279?text=Eu vim do site da Lara e quero mais informações sobre como ela pode me ajudar!', '_blank')}>
              Fale com a Equipe
            </Button>
            <p className="text-gray-500 text-[10px] mt-4 uppercase tracking-widest">
              Goiânia - GO - Brasil
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© 2026 Lara Mendonça Bizzotto. Todos os direitos reservados.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-gold transition-colors">Políticas de Privacidade</a>
            <a href="#" className="hover:text-gold transition-colors">Termos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/556282208279?text=Eu vim do site da Lara e quero mais informações sobre como ela pode me ajudar!"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50 flex items-center justify-center group"
    >
      <MessageCircle size={32} fill="white" className="text-white" />
      <span className="absolute right-full mr-4 bg-white text-charcoal px-4 py-2 rounded-lg shadow-lg text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Fale com a minha equipe
      </span>
    </a>
  );
};

// --- Main App ---

const App = () => {
  return (
    <div className="font-sans text-charcoal bg-off-white selection:bg-gold selection:text-white">
      <Navbar />
      <Hero />
      <Identification />
      <Method />
      <About />
      <Agenda />
      <Testimonials />
      <BookingSection />
      <FAQ />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default App;