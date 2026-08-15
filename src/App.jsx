import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import Particles from "@tsparticles/react";

import fotoperfil from "./assets/perfil.png";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Check,
  ChevronRight,
  Dumbbell,
  Globe2,
  Menu,
  MessageCircle,
  MonitorSmartphone,
  PackageSearch,
  Scissors,
  ShoppingBasket,
  Store,
  UtensilsCrossed,
  Users,
  X,
  Zap,
  GraduationCap,
  BriefcaseBusiness,
  FolderKanban,
  MapPin,
  Mail,
} from "lucide-react";

import "./App.css";

/* =========================================================
   DATOS
========================================================= */

const servicios = [
  {
    icon: PackageSearch,
    titulo: "Control de stock",
    descripcion:
      "Sistemas para registrar productos, controlar cantidades y saber qué mercadería necesitás reponer.",
  },
  {
    icon: BarChart3,
    titulo: "Ventas y estadísticas",
    descripcion:
      "Registrá ventas y visualizá ingresos, productos vendidos y movimientos de tu negocio.",
  },
  {
    icon: Globe2,
    titulo: "Páginas web",
    descripcion:
      "Landing pages modernas para mostrar tu negocio, servicios, precios, ubicación y formas de contacto.",
  },
  {
    icon: CalendarDays,
    titulo: "Turnos y reservas",
    descripcion:
      "Organizá turnos, reservas y horarios para dejar atrás las anotaciones en papel o WhatsApp.",
  },
  {
    icon: Users,
    titulo: "Gestión de clientes",
    descripcion:
      "Guardá información de clientes y mantené un historial organizado de servicios, compras o visitas.",
  },
  {
    icon: MonitorSmartphone,
    titulo: "Sistemas personalizados",
    descripcion:
      "Si tu negocio tiene una necesidad particular, podemos transformar ese proceso en una herramienta digital.",
  },
];

const negocios = [
  {
    icon: ShoppingBasket,
    nombre: "Kioscos",
  },
  {
    icon: Scissors,
    nombre: "Peluquerías",
  },
  {
    icon: Dumbbell,
    nombre: "Gimnasios",
  },
  {
    icon: UtensilsCrossed,
    nombre: "Restaurantes",
  },
  {
    icon: Store,
    nombre: "Comercios",
  },
];

const pasos = [
  {
    numero: "01",
    titulo: "Me contás tu idea",
    descripcion:
      "Hablamos sobre tu negocio, cómo trabajás actualmente y qué problema querés resolver.",
  },
  {
    numero: "02",
    titulo: "Buscamos una solución",
    descripcion:
      "Definimos una solución simple y adecuada a lo que realmente necesitás.",
  },
  {
    numero: "03",
    titulo: "La hacemos realidad",
    descripcion:
      "Desarrollo la herramienta y vamos ajustándola hasta que funcione como necesitás.",
  },
];

const perfil = {
  nombreCompleto: "Facundo Joaquín Gil",
  nombre: "Joaquín",
  edad: 26,
  email: "facundojoagl@gmail.com",
  ubicacion: "Bella Vista, Tucumán, Argentina",
  titulo: "Técnico Universitario en Programación",
  universidad: "Universidad Tecnológica Nacional",
  graduacion: 2024,
  experiencia: 3,
  proyectos: 20,
};

/* =========================================================
   CONTADOR ANIMADO
========================================================= */

const AnimatedCounter = ({
  end,
  prefix = "",
  suffix = "",
  duration = 1500,
}) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const counterRef = useRef(null);

  useEffect(() => {
    const element = counterRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    let animationFrame;

    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      /*
       * EaseOutCubic.
       * Hace que empiece rápido y termine suavemente.
       */
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(end * easedProgress);

      setCount(currentValue);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [started, end, duration]);

  return (
    <span ref={counterRef}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

/* =========================================================
   CONFIGURACIÓN DE PARTÍCULAS
========================================================= */

const particlesOptions = {
  fullScreen: {
    enable: false,
  },

  fpsLimit: 60,

  particles: {
    number: {
      value: 45,

      density: {
        enable: true,
      },
    },

    color: {
      value: ["#6366f1", "#06b6d4", "#8b5cf6"],
    },

    links: {
      enable: true,
      color: "#6366f1",
      distance: 150,
      opacity: 0.12,
      width: 1,
    },

    move: {
      enable: true,
      speed: 0.55,
      direction: "none",
      random: false,
      straight: false,

      outModes: {
        default: "out",
      },
    },

    opacity: {
      value: {
        min: 0.15,
        max: 0.5,
      },
    },

    size: {
      value: {
        min: 1,
        max: 3,
      },
    },
  },

  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "grab",
      },
    },

    modes: {
      grab: {
        distance: 160,

        links: {
          opacity: 0.25,
        },
      },
    },
  },

  detectRetina: true,
};

/* =========================================================
   APP
========================================================= */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const whatsapp = "3816566750";

  const whatsappLink =
    `https://wa.me/${whatsapp}?text=` +
    encodeURIComponent(
      "Hola Joaquín, vi tu página y quería consultarte por una solución para mi negocio.",
    );

  return (
    <main className="relative overflow-hidden bg-[#070b14] text-white">
      {/* =====================================================
          BACKGROUND
      ===================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">
        <Particles
          id="particles"
          options={particlesOptions}
          className="absolute inset-0 h-full w-full"
        />

        <div
          className="
            absolute -left-40 top-40
            h-[500px] w-[500px]
            rounded-full
            bg-indigo-600/10
            blur-[150px]
          "
        />

        <div
          className="
            absolute -right-40 top-[40%]
            h-[450px] w-[450px]
            rounded-full
            bg-cyan-500/10
            blur-[150px]
          "
        />
      </div>

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header
        className="
          fixed left-0 right-0 top-0 z-50
          border-b border-white/10
          bg-[#070b14]/75
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto flex h-[74px]
            max-w-7xl
            items-center justify-between
            px-5 sm:px-8
          "
        >
          <a
            href="#sobre-mi"
            className="flex items-center gap-3 font-semibold"
          >
            <div
              className="
                flex h-10 w-10 items-center justify-center
                rounded-xl
                bg-gradient-to-br
                from-indigo-500
                to-cyan-400
                shadow-lg shadow-indigo-500/20
              "
            >
              <Zap size={20} />
            </div>

            <span>
              Joaquín
              <span className="text-indigo-400">.</span>
            </span>
          </a>

          {/* DESKTOP */}

          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#sobre-mi"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Sobre mí
            </a>

            <a
              href="#servicios"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Qué puedo hacer
            </a>

            <a
              href="#como-trabajo"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Cómo trabajo
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="
                flex items-center gap-2
                rounded-xl
                bg-white
                px-5 py-2.5
                text-sm font-semibold text-slate-900
                transition
                hover:-translate-y-0.5
                hover:bg-slate-100
              "
            >
              Contactarme

              <ArrowRight size={16} />
            </a>
          </nav>

          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              border border-white/10
              bg-white/5
              md:hidden
            "
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* MOBILE MENU */}

        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              border-t border-white/10
              bg-[#070b14]
              px-5 py-6
              md:hidden
            "
          >
            <nav className="flex flex-col gap-5">
              <a href="#sobre-mi" onClick={() => setMenuOpen(false)}>
                Sobre mí
              </a>

              <a href="#servicios" onClick={() => setMenuOpen(false)}>
                Qué puedo hacer
              </a>

              <a href="#como-trabajo" onClick={() => setMenuOpen(false)}>
                Cómo trabajo
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  bg-white
                  px-5 py-3
                  font-semibold text-slate-900
                "
              >
                Contactarme

                <ArrowRight size={17} />
              </a>
            </nav>
          </motion.div>
        )}
      </header>

      {/* =====================================================
          SOBRE MÍ / INICIO
      ===================================================== */}

      <section
        id="sobre-mi"
        className="
          relative z-10
          flex min-h-screen
          items-center
          pt-[74px]
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-7xl
            px-5
            py-16
            sm:px-8
            lg:py-20
          "
        >
          <div
            className="
              grid
              items-center
              gap-14
              lg:grid-cols-[0.82fr_1.18fr]
              lg:gap-20
            "
          >
            {/* FOTO */}

            <motion.div
              initial={{
                opacity: 0,
                x: -40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="
                mx-auto
                w-full
                max-w-[410px]
                lg:mx-0
              "
            >
              <div
                className="
                  profile-image-wrapper
                  relative
                  aspect-[4/5]
                  overflow-hidden
                  rounded-[30px]
                  border border-white/10
                  bg-gradient-to-br
                  from-indigo-500/20
                  via-slate-900
                  to-cyan-500/15
                  p-1
                  shadow-2xl
                  shadow-indigo-500/10
                "
              >
                <img
                  src={fotoperfil}
                  alt="Joaquín Gil"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="
                    profile-image
                    h-full
                    w-full
                    rounded-[26px]
                    object-cover
                    object-top
                  "
                />

                <div
                  className="
                    pointer-events-none
                    absolute
                    inset-x-10
                    bottom-[-30px]
                    h-24
                    bg-indigo-500/15
                    blur-3xl
                  "
                />
              </div>
            </motion.div>

            {/* INFORMACIÓN */}

            <motion.div
              initial={{
                opacity: 0,
                x: 40,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: "easeOut",
              }}
            >
              {/* TITULO */}

              <h1
                className="
                  mt-4
                  max-w-4xl
                  text-5xl
                  font-bold
                  tracking-[-0.045em]
                  sm:text-6xl
                  lg:text-7xl
                  xl:text-[5rem]
                  xl:leading-[1.02]
                "
              >
                Hola, soy{" "}

                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-indigo-400
                    via-violet-400
                    to-cyan-400
                    bg-clip-text
                    text-transparent
                  "
                >
                  Joaquín Gil.
                </span>
              </h1>

              {/* DESCRIPCIÓN */}

              <p
                className="
                  mt-7
                  max-w-2xl
                  text-lg
                  leading-8
                  text-slate-400
                  sm:text-xl
                "
              >
                <span className="font-medium text-slate-200">
                  Técnico Universitario en Programación
                </span>
                , graduado de la Universidad Tecnológica Nacional, y
                desarrollador de software con más de 3 años de experiencia
                creando soluciones digitales.
              </p>

              {/* DATOS */}

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <div
                  className="
                    flex items-center gap-3
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    p-4
                  "
                >
                  <MapPin
                    size={19}
                    className="shrink-0 text-indigo-400"
                  />

                  <div>
                    <p className="text-xs text-slate-500">
                      Ubicación
                    </p>

                    <p className="mt-0.5 text-sm text-slate-300">
                      Bella Vista, Tucumán
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${perfil.email}`}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    p-4
                    transition
                    hover:border-indigo-400/30
                    hover:bg-white/[0.06]
                  "
                >
                  <Mail
                    size={19}
                    className="shrink-0 text-cyan-400"
                  />

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">
                      Email
                    </p>

                    <p className="mt-0.5 truncate text-sm text-slate-300">
                      {perfil.email}
                    </p>
                  </div>
                </a>
              </div>

              {/* OBJETIVO */}

              <div
                className="
                  mt-6
                  rounded-2xl
                  border border-indigo-400/15
                  bg-gradient-to-r
                  from-indigo-500/[0.08]
                  to-cyan-500/[0.04]
                  p-6
                "
              >
                <p className="leading-7 text-slate-300">
                  <span className="font-semibold text-white">
                    Mi objetivo:
                  </span>{" "}
                  crear soluciones sencillas y útiles que permitan que la
                  tecnología ayude a tu negocio en lugar de complicarlo.
                </p>
              </div>
              
            </motion.div>
          </div>

          {/* =====================================================
              ESTADÍSTICAS
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.6,
            }}
            className="
              mt-16
              grid
              overflow-hidden
              rounded-2xl
              border border-white/[0.08]
              bg-white/[0.035]
              backdrop-blur-xl
              sm:grid-cols-3
            "
          >
            {/* EXPERIENCIA */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.1,
              }}
              className="
                group
                flex items-center gap-5
                border-b border-white/[0.08]
                p-6
                transition
                hover:bg-white/[0.025]
                sm:border-b-0
                sm:border-r
                lg:p-8
              "
            >
              <div
                className="
                  flex h-12 w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-400/10
                  text-indigo-400
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <BriefcaseBusiness size={23} />
              </div>

              <div>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    end={perfil.experiencia}
                    prefix="+"
                    duration={1200}
                  />
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  años de experiencia
                </p>
              </div>
            </motion.div>

            {/* PROYECTOS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                group
                flex items-center gap-5
                border-b border-white/[0.08]
                p-6
                transition
                hover:bg-white/[0.025]
                sm:border-b-0
                sm:border-r
                lg:p-8
              "
            >
              <div
                className="
                  flex h-12 w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-cyan-400/10
                  text-cyan-400
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <FolderKanban size={23} />
              </div>

              <div>
                <p className="text-3xl font-bold text-white">
                  <AnimatedCounter
                    end={perfil.proyectos}
                    prefix="+"
                    duration={1600}
                  />
                </p>

                <p className="mt-1 text-sm text-slate-400">
                  proyectos realizados
                </p>
              </div>
            </motion.div>

            {/* FORMACIÓN */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: 0.3,
              }}
              className="
                group
                flex items-center gap-5
                p-6
                transition
                hover:bg-white/[0.025]
                lg:p-8
              "
            >
              <div
                className="
                  flex h-12 w-12
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-violet-400/10
                  text-violet-400
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              >
                <GraduationCap size={23} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xl font-bold text-white">
                    UTN
                  </p>

                  <span
                    className="
                      rounded-md
                      border border-violet-400/15
                      bg-violet-400/[0.07]
                      px-2 py-0.5
                      text-xs
                      text-violet-300
                    "
                  >
                    <AnimatedCounter
                      end={perfil.graduacion}
                      duration={1800}
                    />
                  </span>
                </div>

                <p className="mt-1 text-sm leading-5 text-slate-400">
                  Técnico Universitario
                  <br />
                  en Programación
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          HERO SECUNDARIO / PROPUESTA
      ===================================================== */}

      <section
        id="propuesta"
        className="
          relative z-10
          py-24
          sm:py-32
        "
      >
        <div
          className="
            mx-auto
            flex w-full
            max-w-5xl
            flex-col
            items-center
            justify-center
            px-5
            text-center
            sm:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 35,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.7,
            }}
            className="
              flex w-full
              flex-col
              items-center
            "
          >
            

            {/* TITULO */}

            <h2
              className="
                max-w-5xl
                text-4xl
                font-bold
                tracking-[-0.04em]
                sm:text-5xl
                lg:text-6xl
                xl:text-7xl
              "
            >
              Hacé más simple

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-indigo-400
                  via-violet-400
                  to-cyan-400
                  bg-clip-text
                  text-transparent
                "
              >
                tu negocio.
              </span>
            </h2>

            <section className="relative z-10">
        <div
          className="
            mx-auto
            max-w-7xl
            px-5 py-12
            sm:px-8
          "
        >
          <p
            className="
              mb-7
              text-center
              text-sm
              text-slate-500
            "
          >
            Soluciones para distintos tipos de negocios
          </p>

          <div
            className="
              grid
              grid-cols-2
              gap-3
              md:grid-cols-5
            "
          >
            {negocios.map(({ icon: Icon, nombre }, index) => (
              <motion.div
                key={nombre}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.07,
                  duration: 0.4,
                }}
                whileHover={{
                  y: -4,
                }}
                className="
                  flex
                  items-center
                  justify-center
                  gap-3
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.025]
                  px-4 py-4
                  text-sm
                  text-slate-400
                  transition
                  hover:border-white/15
                  hover:bg-white/5
                  hover:text-white
                "
              >
                <Icon size={19} />

                {nombre}
              </motion.div>
            ))}
          </div>
        </div>
      </section>


            {/* BOTONES */}

            <div
              className="
                mt-9
                flex
                w-full
                flex-col
                items-center
                justify-center
                gap-3
                sm:w-auto
                sm:flex-row
              "
            >
              <motion.a
                whileHover={{
                  y: -3,
                }}
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-indigo-500
                  to-violet-500
                  px-7 py-4
                  font-semibold
                  shadow-lg
                  shadow-indigo-500/20
                  sm:w-auto
                "
              >
                <MessageCircle size={20} />

                Tengo una idea
              </motion.a>

              <a
                href="#servicios"
                className="
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border border-white/10
                  bg-white/5
                  px-7 py-4
                  font-medium
                  backdrop-blur-sm
                  transition
                  hover:bg-white/10
                  sm:w-auto
                "
              >
                Ver qué puedo hacer

                <ChevronRight size={18} />
              </a>
            </div>

           

          </motion.div>
        </div>
      </section>


      
      {/* =====================================================
          SERVICIOS
      ===================================================== */}

      <section
        id="servicios"
        className="
          relative z-10
          py-24 sm:py-32
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            sm:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="max-w-3xl"
          >
            <span
              className="
                text-sm font-semibold
                uppercase
                tracking-[0.2em]
                text-indigo-400
              "
            >
              Qué puedo hacer
            </span>

            <h2
              className="
                mt-4
                text-4xl font-bold
                tracking-tight
                sm:text-5xl
              "
            >
              Tecnología para resolver problemas reales.
            </h2>

            <p
              className="
                mt-5
                max-w-2xl
                text-lg leading-8
                text-slate-400
              "
            >
              Desde una página sencilla hasta un sistema completo para
              organizar tu negocio.
            </p>
          </motion.div>

          <div
            className="
              mt-14
              grid gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {servicios.map(
              ({ icon: Icon, titulo, descripcion }, index) => (
                <motion.article
                  key={titulo}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    delay: index * 0.06,
                    duration: 0.45,
                  }}
                  whileHover={{
                    y: -6,
                  }}
                  className="
                    group
                    rounded-2xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    p-7
                    backdrop-blur-md
                    transition-colors
                    hover:border-indigo-400/30
                    hover:bg-white/[0.06]
                  "
                >
                  <div
                    className="
                      mb-7
                      flex h-12 w-12
                      items-center justify-center
                      rounded-xl
                      border border-indigo-400/20
                      bg-indigo-400/10
                      text-indigo-400
                    "
                  >
                    <Icon size={23} />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {titulo}
                  </h3>

                  <p
                    className="
                      mt-3
                      leading-7
                      text-slate-400
                    "
                  >
                    {descripcion}
                  </p>

                  <div
                    className="
                      mt-6
                      flex items-center gap-2
                      text-sm
                      font-medium
                      text-indigo-400
                    "
                  >
                    Puede adaptarse a tu negocio

                    <ArrowRight
                      size={15}
                      className="
                        transition-transform
                        group-hover:translate-x-1
                      "
                    />
                  </div>
                </motion.article>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CÓMO TRABAJO
      ===================================================== */}

      <section
        id="como-trabajo"
        className="
          relative z-10
          py-24 sm:py-32
        "
      >
        <div
          className="
            mx-auto
            max-w-7xl
            px-5
            sm:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text-center"
          >
            <span
              className="
                text-sm font-semibold
                uppercase
                tracking-[0.2em]
                text-indigo-400
              "
            >
              Cómo trabajo
            </span>

            <h2
              className="
                mx-auto mt-4
                max-w-3xl
                text-4xl font-bold
                tracking-tight
                sm:text-5xl
              "
            >
              No hace falta que sepas qué sistema necesitás.
            </h2>

            <p
              className="
                mx-auto mt-5
                max-w-2xl
                text-lg
                leading-8
                text-slate-400
              "
            >
              Alcanzan una idea, un problema o una tarea que quieras
              simplificar.
            </p>
          </motion.div>

          <div
            className="
              mt-16
              grid gap-5
              md:grid-cols-3
            "
          >
            {pasos.map((paso, index) => (
              <motion.div
                key={paso.numero}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.12,
                }}
                whileHover={{
                  y: -5,
                }}
                className="
                  rounded-2xl
                  border border-white/[0.08]
                  bg-white/[0.025]
                  p-8
                  transition-colors
                  hover:border-white/[0.14]
                  hover:bg-white/[0.04]
                "
              >
                <span
                  className="
                    bg-gradient-to-r
                    from-indigo-400
                    to-cyan-400
                    bg-clip-text
                    text-4xl font-bold
                    text-transparent
                  "
                >
                  {paso.numero}
                </span>

                <h3
                  className="
                    mt-8
                    text-xl font-semibold
                  "
                >
                  {paso.titulo}
                </h3>

                <p
                  className="
                    mt-3
                    leading-7
                    text-slate-400
                  "
                >
                  {paso.descripcion}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section
        id="contacto"
        className="
          relative z-10
          px-5 py-24
          sm:px-8
          sm:py-32
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="
            relative
            mx-auto
            max-w-6xl
            overflow-hidden
            rounded-[32px]
            border border-indigo-400/20
            bg-gradient-to-br
            from-indigo-600/20
            via-violet-500/10
            to-cyan-500/10
            px-6 py-16
            text-center
            sm:px-12
            sm:py-20
          "
        >
          <div
            className="
              absolute
              left-1/2 top-0
              h-[300px] w-[500px]
              -translate-x-1/2
              bg-indigo-500/15
              blur-[120px]
            "
          />

          <div className="relative z-10">
            <MessageCircle
              size={35}
              className="mx-auto text-indigo-400"
            />

            <h2
              className="
                mx-auto mt-6
                max-w-3xl
                text-4xl font-bold
                tracking-tight
                sm:text-5xl
              "
            >
              ¿Tenés una idea para tu negocio?
            </h2>

            <p
              className="
                mx-auto mt-5
                max-w-xl
                text-lg
                leading-8
                text-slate-400
              "
            >
              Contame qué querés mejorar, automatizar u organizar. No hace
              falta que sepas qué tecnología necesitás: podemos encontrar
              juntos la solución adecuada.
            </p>

            <motion.a
              whileHover={{
                scale: 1.03,
              }}
              whileTap={{
                scale: 0.98,
              }}
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="
                mt-9
                inline-flex
                items-center gap-3
                rounded-xl
                bg-white
                px-7 py-4
                font-semibold
                text-slate-900
                shadow-xl
              "
            >
              <MessageCircle size={20} />

              Hablar por WhatsApp

              <ArrowRight size={18} />
            </motion.a>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer
        className="
          relative z-10
          border-t border-white/[0.07]
        "
      >
        <div
          className="
            mx-auto
            flex max-w-7xl
            flex-col gap-7
            px-5 py-10
            sm:px-8
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <div className="flex items-center gap-2 font-semibold">
              <div
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-lg
                  bg-gradient-to-br
                  from-indigo-500
                  to-cyan-400
                "
              >
                <Zap size={16} />
              </div>

              Facundo Joaquín Gil
            </div>

            <p className="mt-3 text-sm text-slate-500">
              Técnico Universitario en Programación · Soluciones digitales
              para negocios.
            </p>

            <p className="mt-1 text-xs text-slate-600">
              Bella Vista, Tucumán, Argentina
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-xl
                border border-white/10
                bg-white/5
                text-slate-400
                transition
                hover:bg-white/10
                hover:text-white
              "
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;