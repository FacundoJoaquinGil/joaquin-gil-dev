import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import AOS from "aos";
import "aos/dist/aos.css";
import Particles from "@tsparticles/react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

import logoJ from "./assets/logo.png";
import fotoperfil from "./assets/perfil.png";
import loaderGif from "./assets/loader.gif";

import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  ChevronRight,
  ChevronDown,
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
  proyectos: 12,
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

const SectionDivider = () => {
  return (
    <div
      className="
        relative z-10
        mx-auto
        flex
        w-full
        max-w-7xl
        items-center
        justify-center
        px-5
        sm:px-8
      "
      aria-hidden="true"
    >
      <div
        className="
          relative
          h-px
          w-full
          overflow-visible
          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      >
        <div
          className="
            absolute
            left-1/2
            top-1/2

            h-px
            w-32

            -translate-x-1/2
            -translate-y-1/2

            bg-gradient-to-r
            from-transparent
            via-indigo-400/70
            to-transparent

            sm:w-48
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2

            h-2
            w-20

            -translate-x-1/2
            -translate-y-1/2

            bg-indigo-500/20
            blur-xl
          "
        />
      </div>
    </div>
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
  const [isScrolled, setIsScrolled] = useState(false);

  const form = useRef(null);

  const [isSending, setIsSending] = useState(false);

  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;

  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    AOS.init({
      duration: 650,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const validarFormulario = () => {
    if (!form.current) return false;

    const userName = form.current.user_name.value.trim();
    const userEmail = form.current.user_email.value.trim();
    const message = form.current.message.value.trim();

    if (!userName || !userEmail || !message) {
      Swal.fire({
        icon: "warning",
        title: "Faltan algunos datos",
        text: "Completá tu nombre, email y contame brevemente tu idea.",
        background: "#0b101c",
        color: "#ffffff",
        confirmButtonColor: "#6366f1",
      });

      return false;
    }

    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validarFormulario()) {
      return;
    }

    try {
      setIsSending(true);

      Swal.fire({
        html: `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;
    ">
      <img
        src="${loaderGif}"
        alt="Enviando..."
        style="
          width: 70px;
          height: 70px;
          object-fit: contain;
          border-radius: 10px;
        "
      />

      <span style="
        font-size: 1.05rem;
        color: #e2e8f0;
      ">
        Enviando mensaje...
      </span>
    </div>
  `,
        background: "#0b101c",
        color: "#ffffff",
        allowOutsideClick: false,
        allowEscapeKey: false,
        showConfirmButton: false,
      });

      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form.current,
        {
          publicKey: EMAILJS_PUBLIC_KEY,
        },
      );

      await Swal.fire({
        icon: "success",
        title: "¡Mensaje enviado!",
        text: "Gracias por contactarme. Voy a responderte lo antes posible.",
        background: "#0b101c",
        color: "#ffffff",
        confirmButtonColor: "#6366f1",
        confirmButtonText: "Perfecto",
      });

      form.current.reset();
    } catch (error) {
      console.error("Error al enviar el email:", error);

      Swal.fire({
        icon: "error",
        title: "No se pudo enviar",
        text: "Ocurrió un problema al enviar el mensaje. Podés intentarlo nuevamente o contactarme por WhatsApp.",
        background: "#0b101c",
        color: "#ffffff",
        confirmButtonColor: "#6366f1",
        confirmButtonText: "Entendido",
      });
    } finally {
      setIsSending(false);
    }
  };

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
        {/* <Particles
          id="particles"
          options={particlesOptions}
          className="absolute inset-0 h-full w-full"
        /> */}

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
        className={`
    fixed
    left-1/2
    z-50
    -translate-x-1/2

    transition-[width,top,border-radius,background-color,box-shadow]
    duration-500
    ease-out

    ${
      isScrolled
        ? `
          top-3
          w-[calc(100%-24px)]
          max-w-5xl

          rounded-2xl
          border border-white/10

          bg-[#0b101c]/85
          shadow-2xl shadow-black/30
          backdrop-blur-xl
        `
        : `
          top-0
          w-full

          rounded-none
          border-b border-white/10

          bg-[#070b14]/75
          backdrop-blur-xl
        `
    }
  `}
      >
        <div
          className={`
      mx-auto
      flex
      items-center
      justify-between

      transition-all duration-500

      ${
        isScrolled
          ? `
            h-[62px]
            px-4
            sm:px-5
          `
          : `
            h-[74px]
            max-w-7xl
            px-5
            sm:px-8
          `
      }
    `}
        >
          {/* LOGO */}
          <a
            href="#sobre-mi"
            onClick={() => setMenuOpen(false)}
            className="
    flex
    shrink-0
    items-center
    gap-3
    font-semibold
  "
          >
            {/* LOGO J */}
            <div
              className={`
      flex
      items-center
      justify-center

      overflow-hidden

      transition-all
      duration-500

      ${isScrolled ? "h-10 w-10" : "h-12 w-12"}
    `}
            >
              <img
                src={logoJ}
                alt="Logo Joaquín"
                className="
    h-full
    w-full
    rounded-md
    object-contain
  "
              />
            </div>
          </a>

          {/* =====================================================
        DESKTOP
    ===================================================== */}

          <nav
            className="
        hidden
        items-center
        gap-1
        md:flex
      "
          >
            <a
              href="#sobre-mi"
              className="
          rounded-lg
          px-3 py-2

          text-sm
          text-slate-400

          transition

          hover:bg-white/5
          hover:text-white
        "
            >
              Sobre mí
            </a>

            <a
              href="#propuesta"
              className="
          rounded-lg
          px-3 py-2

          text-sm
          text-slate-400

          transition

          hover:bg-white/5
          hover:text-white
        "
            >
              Propuesta
            </a>

            <a
              href="#servicios"
              className="
          rounded-lg
          px-3 py-2

          text-sm
          text-slate-400

          transition

          hover:bg-white/5
          hover:text-white
        "
            >
              Servicios
            </a>

            <a
              href="#como-trabajo"
              className="
          rounded-lg
          px-3 py-2

          text-sm
          text-slate-400

          transition

          hover:bg-white/5
          hover:text-white
        "
            >
              Cómo trabajo
            </a>

            {/* CONTACTO */}

            <a
              href="#contacto"
              className="
          ml-2

          flex
          items-center
          gap-2

          rounded-xl

          bg-gradient-to-r
          from-indigo-500
          to-violet-500

          px-5 py-2.5

          text-sm
          font-semibold
          text-white

          shadow-lg
          shadow-indigo-500/20

          transition-all duration-300

          hover:-translate-y-0.5
          hover:shadow-indigo-500/30
        "
            >
              Contactarme
              <ArrowRight size={16} />
            </a>
          </nav>

          {/* =====================================================
        BOTÓN MOBILE
    ===================================================== */}

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="
        flex
        h-10 w-10
        items-center
        justify-center

        rounded-xl

        border border-white/10
        bg-white/5

        text-white

        transition

        hover:border-white/20
        hover:bg-white/10

        md:hidden
      "
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* =====================================================
      MOBILE MENU
  ===================================================== */}

        {menuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
              height: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              y: -10,
              height: 0,
            }}
            transition={{
              duration: 0.25,
            }}
            className={`
        border-t border-white/10

        px-4
        pb-4
        pt-3

        md:hidden

        ${
          isScrolled
            ? `
              rounded-b-2xl
              bg-[#0b101c]/95
            `
            : `
              bg-[#070b14]/95
            `
        }
      `}
          >
            <nav className="flex flex-col gap-1">
              <a
                href="#sobre-mi"
                onClick={() => setMenuOpen(false)}
                className="
            rounded-xl
            px-4 py-3

            text-sm
            text-slate-300

            transition

            hover:bg-white/5
            hover:text-white
          "
              >
                Sobre mí
              </a>

              <a
                href="#propuesta"
                onClick={() => setMenuOpen(false)}
                className="
            rounded-xl
            px-4 py-3

            text-sm
            text-slate-300

            transition

            hover:bg-white/5
            hover:text-white
          "
              >
                Propuesta
              </a>

              <a
                href="#servicios"
                onClick={() => setMenuOpen(false)}
                className="
            rounded-xl
            px-4 py-3

            text-sm
            text-slate-300

            transition

            hover:bg-white/5
            hover:text-white
          "
              >
                Servicios
              </a>

              <a
                href="#como-trabajo"
                onClick={() => setMenuOpen(false)}
                className="
            rounded-xl
            px-4 py-3

            text-sm
            text-slate-300

            transition

            hover:bg-white/5
            hover:text-white
          "
              >
                Cómo trabajo
              </a>

              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="
            mt-2

            flex
            items-center
            justify-center
            gap-2

            rounded-xl

            bg-gradient-to-r
            from-indigo-500
            to-violet-500

            px-5 py-3

            font-semibold
            text-white

            shadow-lg
            shadow-indigo-500/20

            transition

            active:scale-[0.98]
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
              }}
              animate={{
                opacity: 1,
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
      bg-[#0b101c]
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
                  decoding="sync"
                  draggable={false}
                  className="
        block
        h-full
        w-full
        rounded-[26px]
        object-cover
        object-top
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
                  <MapPin size={19} className="shrink-0 text-indigo-400" />

                  <div>
                    <p className="text-xs text-slate-500">Ubicación</p>

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
                  <Mail size={19} className="shrink-0 text-cyan-400" />

                  <div className="min-w-0">
                    <p className="text-xs text-slate-500">Email</p>

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
                  <span className="font-semibold text-white">Mi objetivo:</span>{" "}
                  crear soluciones sencillas y útiles que permitan que la
                  tecnología ayude a tu negocio en lugar de complicarlo.
                </p>
              </div>
            </motion.div>
          </div>

          {/* =====================================================
              ESTADÍSTICAS
          ===================================================== */}

          <div
            data-aos="fade-up"
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

            <div
              data-aos="fade-up"
              data-aos-delay="100"
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
            </div>

            {/* PROYECTOS */}

            <div
              data-aos="fade-up"
              data-aos-delay="200"
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
            </div>

            {/* FORMACIÓN */}

            <div
              data-aos="fade-up"
              data-aos-delay="300"
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
                  <p className="text-xl font-bold text-white">UTN</p>

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
                    <AnimatedCounter end={perfil.graduacion} duration={1800} />
                  </span>
                </div>

                <p className="mt-1 text-sm leading-5 text-slate-400">
                  Técnico Universitario
                  <br />
                  en Programación
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
    INDICADOR DE SCROLL
===================================================== */}

        <motion.a
          href="#propuesta"
          aria-label="Desplazarse a la siguiente sección"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isScrolled ? 0 : 1,
            y: [0, 7, 0],
          }}
          transition={{
            opacity: {
              duration: 0.3,
            },
            y: {
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className={`
    fixed
    bottom-6
    right-6
    z-30

    text-slate-500

    transition-colors
    duration-300

    hover:text-indigo-400

    ${isScrolled ? "pointer-events-none" : "pointer-events-auto"}
  `}
        >
          <ChevronDown size={28} strokeWidth={1.8} />
        </motion.a>
      </section>

      <SectionDivider />

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
          <div
            data-aos="fade-up"
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
          </div>

          <div
            className="
              mt-16
              grid gap-5
              md:grid-cols-3
            "
          >
            {pasos.map((paso, index) => (
              <div
                key={paso.numero}
                data-aos="fade-up"
                data-aos-delay={index * 150}
                className="
                  rounded-2xl
                  border border-white/[0.08]
                  bg-white/[0.025]
                  p-8
                  transition-all
                  duration-300
                  hover:-translate-y-1
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
    PROPUESTA
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
      max-w-7xl
      px-5
      sm:px-8
    "
        >
          {/* =====================================================
        ENCABEZADO
    ===================================================== */}

          <div
            data-aos="fade-up"
            className="max-w-3xl"
          >
            <span
              className="
          text-sm
          font-semibold
          uppercase
          tracking-[0.2em]
          text-indigo-400
        "
            >
              Propuesta
            </span>

            <h2
              className="
          mt-4
          text-4xl
          font-bold
          tracking-tight
          sm:text-5xl
        "
            >
              Hacé más simple{" "}
              <span
                className="
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

            <p
              className="
          mt-5
          max-w-2xl
          text-lg
          leading-8
          text-slate-400
        "
            >
              Desarrollo herramientas digitales para simplificar tareas,
              organizar información y resolver problemas cotidianos de distintos
              tipos de negocios.
            </p>
          </div>

          {/* =====================================================
        TIPOS DE NEGOCIOS
    ===================================================== */}

          <div className="mt-14">
            <p
              data-aos="fade-up"
              className="
          mb-5
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
          gap-4
          md:grid-cols-3
          lg:grid-cols-5
        "
            >
              {negocios.map(({ icon: Icon, nombre }, index) => (
                <div
                  key={nombre}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="
              group

              flex
              min-h-[120px]
              flex-col
              items-start
              justify-between

              rounded-2xl

              border
              border-white/[0.08]

              bg-white/[0.025]

              p-5

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-indigo-400/25
              hover:bg-white/[0.05]
            "
                >
                  <div
                    className="
                flex
                h-10 w-10
                items-center
                justify-center

                rounded-xl

                border
                border-indigo-400/15

                bg-indigo-400/10

                text-indigo-400

                transition-transform
                duration-300

                group-hover:scale-110
              "
                  >
                    <Icon size={19} />
                  </div>

                  <p
                    className="
                mt-5
                text-sm
                font-medium
                text-slate-300

                transition-colors

                group-hover:text-white
              "
                  >
                    {nombre}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* =====================================================
        CTA
    ===================================================== */}

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="
        mt-10

        flex
        flex-col
        gap-3

        sm:flex-row
        sm:items-center
      "
          >
            <motion.a
              whileHover={{
                y: -3,
              }}
              whileTap={{
                scale: 0.98,
              }}
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="
          flex
          items-center
          justify-center
          gap-2

          rounded-xl

          bg-gradient-to-r
          from-indigo-500
          to-violet-500

          px-6 py-3.5

          text-sm
          font-semibold
          text-white

          shadow-lg
          shadow-indigo-500/20

          transition

          sm:w-auto
        "
            >
              <MessageCircle size={18} />
              Tengo una idea
            </motion.a>

            <a
              href="#servicios"
              className="
          flex
          items-center
          justify-center
          gap-2

          rounded-xl

          border
          border-white/10

          bg-white/[0.035]

          px-6 py-3.5

          text-sm
          font-medium
          text-slate-300

          transition

          hover:border-white/20
          hover:bg-white/[0.07]
          hover:text-white

          sm:w-auto
        "
            >
              Ver servicios
              <ChevronRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

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
          <div
            data-aos="fade-up"
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
              Desde una página sencilla hasta un sistema completo para organizar
              tu negocio.
            </p>
          </div>

          <div
            className="
              mt-14
              grid gap-5
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {servicios.map(({ icon: Icon, titulo, descripcion }, index) => (
              <article
                key={titulo}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="
                    group
                    rounded-2xl
                    border border-white/[0.08]
                    bg-white/[0.035]
                    p-7
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:-translate-y-1.5
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

                <h3 className="text-xl font-semibold">{titulo}</h3>

                <p
                  className="
                      mt-3
                      leading-7
                      text-slate-400
                    "
                >
                  {descripcion}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* =====================================================
    CONTACTO
===================================================== */}

      <section
        id="contacto"
        className="
    relative z-10
    py-24
    sm:py-32
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
          {/* =====================================================
        ENCABEZADO
    ===================================================== */}

          <div
            data-aos="fade-up"
            className="max-w-3xl"
          >
            <span
              className="
          text-sm
          font-semibold
          uppercase
          tracking-[0.2em]
          text-indigo-400
        "
            >
              Contacto
            </span>

            <h2
              className="
          mt-4
          text-4xl
          font-bold
          tracking-tight
          sm:text-5xl
        "
            >
              ¿Tenés una idea para{" "}
              <span
                className="
            bg-gradient-to-r
            from-indigo-400
            via-violet-400
            to-cyan-400
            bg-clip-text
            text-transparent
          "
              >
                tu negocio?
              </span>
            </h2>

            <p
              className="
          mt-5
          max-w-2xl
          text-lg
          leading-8
          text-slate-400
        "
            >
              Contame qué querés mejorar, automatizar u organizar. No hace falta
              que sepas qué tecnología necesitás: podemos encontrar una solución
              adecuada para tu negocio.
            </p>
          </div>

          {/* =====================================================
        CONTENIDO
    ===================================================== */}

          <div
            className="
        mt-14
        grid
        gap-6
        lg:grid-cols-[0.8fr_1.2fr]
        lg:gap-8
      "
          >
            {/* =====================================================
          INFORMACIÓN
      ===================================================== */}

            <div
              data-aos="fade-right"
              className="
               h-full
          relative
          overflow-hidden

          rounded-2xl

          border
          border-white/[0.08]

          bg-white/[0.025]

          p-7

          sm:p-8
        "
            >
              {/* LUZ DECORATIVA */}

              <div
                className="
            pointer-events-none
            absolute
            -left-20
            -top-20

            h-60
            w-60

            rounded-full

            bg-indigo-500/10

            blur-[100px]
          "
              />

              <div className="relative z-10 flex h-full flex-col">
                <div
                  className="
              flex
              h-12 w-12
              items-center
              justify-center

              rounded-xl

              border
              border-indigo-400/20

              bg-indigo-400/10

              text-indigo-400
            "
                >
                  <MessageCircle size={22} />
                </div>

                <h3
                  className="
              mt-7
              text-2xl
              font-semibold
              text-white
            "
                >
                  Hablemos de tu idea.
                </h3>

                <p
                  className="
              mt-4
              max-w-md
              leading-7
              text-slate-400
            "
                >
                  Podés contarme brevemente qué problema querés resolver o qué
                  proceso de tu negocio te gustaría simplificar.
                </p>

                {/* WHATSAPP */}

<div
  className="
    mt-auto
    border-t
    border-white/[0.07]
    pt-6
  "
>
  <p
    className="
      mb-4
      text-sm
      text-slate-500
    "
  >
    ¿Preferís una conversación más directa?
  </p>

  <motion.a
    whileHover={{
      y: -2,
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

      border
      border-emerald-400/20

      bg-emerald-400/[0.07]

      px-5
      py-3.5

      text-sm
      font-medium
      text-emerald-300

      transition-colors

      hover:border-emerald-400/35
      hover:bg-emerald-400/[0.12]
      hover:text-emerald-200
    "
  >
    <MessageCircle size={18} />

    Hablar por WhatsApp

    <ArrowRight size={16} />
  </motion.a>
</div>
              </div>
            </div>

            {/* =====================================================
          FORMULARIO
      ===================================================== */}

            <div
              data-aos="fade-left"
              data-aos-delay="100"
              className="
          relative

          rounded-2xl

          border
          border-white/[0.08]

          bg-white/[0.035]

          p-6

          backdrop-blur-xl

          sm:p-8
        "
            >
              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                {/* NOMBRE + EMAIL */}

                <div
                  className="
              grid
              gap-5
              sm:grid-cols-2
            "
                >
                  {/* NOMBRE */}

                  <div>
                    <label
                      htmlFor="user_name"
                      className="
                  mb-2
                  block

                  text-sm
                  font-medium
                  text-slate-300
                "
                    >
                      Nombre
                    </label>

                    <input
                      id="user_name"
                      name="user_name"
                      type="text"
                      autoComplete="name"
                      placeholder="Tu nombre"
                      required
                      className="
                  w-full

                  rounded-xl

                  border
                  border-white/[0.08]

                  bg-[#070b14]/70

                  px-4
                  py-3.5

                  text-sm
                  text-white

                  outline-none

                  transition-all

                  placeholder:text-slate-600

                  hover:border-white/[0.15]

                  focus:border-indigo-400/60
                  focus:ring-4
                  focus:ring-indigo-500/10
                "
                    />
                  </div>

                  {/* EMAIL */}

                  <div>
                    <label
                      htmlFor="user_email"
                      className="
                  mb-2
                  block

                  text-sm
                  font-medium
                  text-slate-300
                "
                    >
                      Email
                    </label>

                    <input
                      id="user_email"
                      name="user_email"
                      type="email"
                      autoComplete="email"
                      placeholder="tu@email.com"
                      required
                      className="
                  w-full

                  rounded-xl

                  border
                  border-white/[0.08]

                  bg-[#070b14]/70

                  px-4
                  py-3.5

                  text-sm
                  text-white

                  outline-none

                  transition-all

                  placeholder:text-slate-600

                  hover:border-white/[0.15]

                  focus:border-indigo-400/60
                  focus:ring-4
                  focus:ring-indigo-500/10
                "
                    />
                  </div>
                </div>

                {/* NEGOCIO */}

                {/* MENSAJE */}

                <div>
                  <div
                    className="
                mb-2
                flex
                items-center
                justify-between
                gap-4
              "
                  >
                    <label
                      htmlFor="message"
                      className="
                  text-sm
                  font-medium
                  text-slate-300
                "
                    >
                      Contame tu idea
                    </label>
                  </div>

                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    required
                    placeholder="Ej: Tengo un kiosco y actualmente llevo el stock manualmente. Me gustaría poder registrar productos y saber cuándo necesito reponer..."
                    className="
                min-h-[180px]
                w-full

                resize-y

                rounded-xl

                border
                border-white/[0.08]

                bg-[#070b14]/70

                px-4
                py-3.5

                text-sm
                leading-6
                text-white

                outline-none

                transition-all

                placeholder:text-slate-600

                hover:border-white/[0.15]

                focus:border-indigo-400/60
                focus:ring-4
                focus:ring-indigo-500/10
              "
                  />
                </div>

                {/* SUBMIT */}

                <div
                  className="
              flex
              flex-col
              gap-4

              border-t
              border-white/[0.07]

              pt-6

              sm:flex-row
              sm:items-center
              sm:justify-between
            "
                >
                  <button
  type="submit"
  disabled={isSending}
  className="
    flex
    min-w-[170px]
    items-center
    justify-center
    gap-2

    rounded-xl

    bg-gradient-to-r
    from-indigo-500
    to-violet-500

    px-6
    py-3.5

    text-sm
    font-semibold
    text-white

    shadow-lg
    shadow-indigo-500/20

    transition

    hover:shadow-indigo-500/30

    disabled:cursor-not-allowed
    disabled:opacity-60
  "
>
  Enviar mensaje

  <ArrowRight size={17} />
</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
