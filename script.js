// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.8)"
    navbar.style.boxShadow = "none"
  }
})

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".scroll-animate, .scroll-animate-left, .scroll-animate-right")

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top
    const elementVisible = 150

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("animate")
    }
  })
}

// Add scroll animation classes to elements
function addScrollAnimations() {
  // About section
  const aboutCard = document.querySelector(".about-card")
  const aboutInfo = document.querySelector(".about-info")
  if (aboutCard) aboutCard.classList.add("scroll-animate-left")
  if (aboutInfo) aboutInfo.classList.add("scroll-animate-right")

  // Skills section
  const skillCategories = document.querySelectorAll(".skill-category")
  skillCategories.forEach((category, index) => {
    category.classList.add("scroll-animate")
    category.style.animationDelay = `${index * 0.1}s`
  })

  // Projects section
  const projectCards = document.querySelectorAll(".project-card")
  projectCards.forEach((card, index) => {
    card.classList.add("scroll-animate")
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Experience section
  const experienceItems = document.querySelectorAll(".experience-item")
  experienceItems.forEach((item, index) => {
    item.classList.add("scroll-animate")
    item.style.animationDelay = `${index * 0.1}s`
  })
}

// Mobile menu toggle
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Close menu when clicking on a link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })
}

// Add mobile menu styles
const style = document.createElement("style")
style.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            left: -100%;
            top: 70px;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            width: 100%;
            text-align: center;
            transition: 0.3s;
            box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
            padding: 2rem 0;
        }
        
        .nav-menu.active {
            left: 0;
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active span:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    }
`
document.head.appendChild(style)

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Skill tag hover effects
document.querySelectorAll(".skill-tag").forEach((tag) => {
  tag.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.05) rotate(2deg)"
  })

  tag.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1) rotate(0deg)"
  })
})

// Project card tilt effect
document.querySelectorAll(".project-card .card").forEach((card) => {
  card.addEventListener("mouseenter", function (e) {
    const rect = this.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10

    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)"
  })
})

// Initialize animations
document.addEventListener("DOMContentLoaded", () => {
  addScrollAnimations()
  animateOnScroll()

  // Add scroll event listener
  window.addEventListener("scroll", animateOnScroll)

  // Add intersection observer for better performance
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    document.querySelectorAll(".scroll-animate, .scroll-animate-left, .scroll-animate-right").forEach((el) => {
      observer.observe(el)
    })
  }

  // Add click handlers for project cards
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("click", function (e) {
      e.preventDefault()
      const repoUrl = this.getAttribute("data-repo")

      if (repoUrl) {
        // Add a subtle click animation
        this.style.transform = "translateY(-5px) scale(0.98)"

        // Reset animation and redirect after a short delay
        setTimeout(() => {
          this.style.transform = ""
          window.open(repoUrl, "_blank", "noopener,noreferrer")
        }, 150)
      }
    })

    // Add keyboard accessibility
    card.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        this.click()
      }
    })

    // Make cards focusable for keyboard navigation
    card.setAttribute("tabindex", "0")
    card.setAttribute("role", "button")
    card.setAttribute("aria-label", `View ${card.querySelector(".card-title").textContent.trim()} repository on GitHub`)
  })

  // Add visual feedback for keyboard focus
  const style = document.createElement("style")
  style.textContent = `
    .project-card:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 4px;
      border-radius: 1rem;
    }
    
    .project-card:focus .card {
      transform: translateY(-5px);
      box-shadow: 0 20px 40px rgba(59, 130, 246, 0.2);
    }
  `
  document.head.appendChild(style)
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add cursor trail effect (optional)
document.addEventListener("mousemove", (e) => {
  const cursor = document.querySelector(".cursor-trail")
  if (!cursor) {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
        `
    document.body.appendChild(trail)
  }

  const trail = document.querySelector(".cursor-trail")
  trail.style.left = e.clientX - 10 + "px"
  trail.style.top = e.clientY - 10 + "px"
})

// Add smooth reveal animations for sections
const revealSections = () => {
  const sections = document.querySelectorAll("section")

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top
    const sectionVisible = 150

    if (sectionTop < window.innerHeight - sectionVisible) {
      section.style.opacity = "1"
      section.style.transform = "translateY(0)"
    }
  })
}

// Initialize section reveals
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "all 0.6s ease"
})

window.addEventListener("scroll", revealSections)
revealSections() // Run once on load
