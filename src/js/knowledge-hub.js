import { gsap } from "gsap";
import kalpData from "@js/content.js";

document.addEventListener("DOMContentLoaded", function() {

  const tl = gsap.timeline();

  tl.to(".loader-text", {
    opacity: 1,
    duration: 1,
    yoyo: true,
    repeat: 1
  });

  tl.to("#loader", {
    opacity: 0,
    duration: 1,
    delay: 0.8,
    onComplete: () => {
      document.getElementById("loader").style.display = "none";
    }
  });


async function loadSidebar() {
  const sidebar = document.getElementById("sidebar");
  const data = kalpData;

  // Render multiple single links if present
  if (Array.isArray(data.singleLinks)) {
    data.singleLinks.forEach(singleLink => {
      const singleLinkDiv = document.createElement("div");
      singleLinkDiv.className = "single-link";
      const a = document.createElement("a");
      a.href = "#" + singleLink.id;
      a.textContent = singleLink.title;
      // Add dropdown icon for style consistency
      // const icon = document.createElement("span");
      // icon.className = "dropdown-icon";
      // a.appendChild(icon);
      a.addEventListener("click", (e) => {
        e.preventDefault();
        loadContent(singleLink);
        if (window.innerWidth <= 768) {
          sidebar.classList.remove("open");
          updateSidebarTogglePosition();
        }
        // Close all open section and nested dropdowns
        document.querySelectorAll("#sidebar .section.active").forEach(sec => {
          sec.classList.remove("active");
          const icon = sec.querySelector(".dropdown-icon");
          if (icon) icon.classList.remove("rotated");
          sec.querySelectorAll(".nested-dropdown.active").forEach(nested => {
            nested.classList.remove("active");
            const nestedIcon = nested.querySelector(".dropdown-icon");
            if (nestedIcon) nestedIcon.classList.remove("rotated");
            const nestedLinksDiv = nested.querySelector(".nested-links");
            if (nestedLinksDiv) nestedLinksDiv.style.maxHeight = "0";
          });
        });
      });
      singleLinkDiv.appendChild(a);
      sidebar.appendChild(singleLinkDiv);
    });
  }

  data.sections.forEach(section => {
    const secDiv = document.createElement("div");
    secDiv.className = "section";

    const btn = document.createElement("button");
    btn.textContent = section.title;

    // Add dropdown icon
    const icon = document.createElement("span");
    icon.className = "dropdown-icon";
    btn.appendChild(icon);

    btn.addEventListener("click", () => {
      // Close other open sections
      document.querySelectorAll("#sidebar .section.active").forEach(activeSec => {
        if (activeSec !== secDiv) {
          activeSec.classList.remove("active");

          // remove active from section button
          const activeBtn = activeSec.querySelector("button");
          if (activeBtn) activeBtn.classList.remove("active");

          const activeIcon = activeSec.querySelector(".dropdown-icon");
          if (activeIcon) activeIcon.classList.remove("rotated");

          // Also close any nested dropdowns in other sections
          activeSec.querySelectorAll(".nested-dropdown.active").forEach(nested => {
            nested.classList.remove("active");
            const nestedBtn = nested.querySelector(".nested-dropdown-btn");
            if (nestedBtn) nestedBtn.classList.remove("active"); // remove here too
            const nestedIcon = nested.querySelector(".dropdown-icon");
            if (nestedIcon) nestedIcon.classList.remove("rotated");
            const nestedLinksDiv = nested.querySelector(".nested-links");
            if (nestedLinksDiv) nestedLinksDiv.style.maxHeight = "0";
          });
        }
      });

  // Toggle current section
  secDiv.classList.toggle("active");
  btn.classList.toggle("active"); // 🔥 this makes the button bold immediately
  icon.classList.toggle("rotated");

  // Close nested dropdowns in this section when opening/closing section
  if (!secDiv.classList.contains("active")) {
    secDiv.querySelectorAll(".nested-dropdown.active").forEach(nested => {
      nested.classList.remove("active");
      const nestedBtn = nested.querySelector(".nested-dropdown-btn");
      if (nestedBtn) nestedBtn.classList.remove("active"); // 🔥 clean nested btn too
      const nestedIcon = nested.querySelector(".dropdown-icon");
      if (nestedIcon) nestedIcon.classList.remove("rotated");
      const nestedLinksDiv = nested.querySelector(".nested-links");
      if (nestedLinksDiv) nestedLinksDiv.style.maxHeight = "0";
    });
  }
});


    const linksDiv = document.createElement("div");
    linksDiv.className = "links";

    // --- Render links and nested dropdowns in order as defined in section ---
    Object.keys(section).forEach(key => {
      if (key === "links" && Array.isArray(section.links)) {
        section.links.forEach(link => {
          const a = document.createElement("a");
          a.href = "#" + link.id;
          a.textContent = link.title;
          a.addEventListener("click", (e) => {
            e.preventDefault();
            loadContent(link);
            if (window.innerWidth <= 768) {
              sidebar.classList.remove("open");
              updateSidebarTogglePosition();
            }
            // Close any open nested dropdowns in this section
            secDiv.querySelectorAll(".nested-dropdown.active").forEach(nested => {
              nested.classList.remove("active");
              const nestedIcon = nested.querySelector(".dropdown-icon");
              if (nestedIcon) nestedIcon.classList.remove("rotated");
              const nestedLinksDiv = nested.querySelector(".nested-links");
              if (nestedLinksDiv) nestedLinksDiv.style.maxHeight = "0";
            });
          });
          linksDiv.appendChild(a);
        });
      } else if (key.endsWith("Dropdown") && section[key] && section[key].links) {
        const dropdown = section[key];
        const nestedDiv = document.createElement("div");
        nestedDiv.className = "nested-dropdown";
        const nestedBtn = document.createElement("button");
        nestedBtn.textContent = dropdown.title;
        nestedBtn.className = "nested-dropdown-btn";
        // Nested dropdown icon
        const nestedIcon = document.createElement("span");
        nestedIcon.className = "dropdown-icon";
        nestedBtn.appendChild(nestedIcon);

        // Nested links container
        const nestedLinksDiv = document.createElement("div");
        nestedLinksDiv.className = "nested-links";
        nestedLinksDiv.style.maxHeight = "0";
        nestedLinksDiv.style.overflow = "hidden";
        nestedLinksDiv.style.transition = "max-height 0.3s ease";

        dropdown.links.forEach(nestedLink => {
          const a = document.createElement("a");
          a.href = "#" + nestedLink.id;
          a.textContent = nestedLink.title;
          a.addEventListener("click", (e) => {
            e.preventDefault();
            loadContent(nestedLink);
            if (window.innerWidth <= 768) {
              sidebar.classList.remove("open");
              updateSidebarTogglePosition();
            }
          });
          nestedLinksDiv.appendChild(a);
        });

        nestedBtn.addEventListener("click", (e) => {
          e.stopPropagation();

          // Close other open nested dropdowns in this section
          secDiv.querySelectorAll(".nested-dropdown.active").forEach(otherNested => {
            if (otherNested !== nestedDiv) {
              otherNested.classList.remove("active");

              // remove active from other nested buttons
              const otherBtn = otherNested.querySelector(".nested-dropdown-btn");
              if (otherBtn) otherBtn.classList.remove("active");

              const otherIcon = otherNested.querySelector(".dropdown-icon");
              if (otherIcon) otherIcon.classList.remove("rotated");

              const otherLinksDiv = otherNested.querySelector(".nested-links");
              if (otherLinksDiv) otherLinksDiv.style.maxHeight = "0";
            }
          });

          // Toggle current nested dropdown
          nestedDiv.classList.toggle("active");
          nestedBtn.classList.toggle("active"); // 🔥 make the nested dropdown button bold
          nestedIcon.classList.toggle("rotated");

          if (nestedDiv.classList.contains("active")) {
            nestedLinksDiv.style.maxHeight = "400px"; // expanded
          } else {
            nestedLinksDiv.style.maxHeight = "0"; // collapsed
          }
        });

        nestedDiv.appendChild(nestedBtn);
        nestedDiv.appendChild(nestedLinksDiv);
        linksDiv.appendChild(nestedDiv);
      } else if (Array.isArray(section[key]) && section[key].length && section[key][0].id && section[key][0].title) {
        // Render any additional array of links (like exampleLink)
        section[key].forEach(link => {
          const a = document.createElement("a");
          a.href = "#" + link.id;
          a.textContent = link.title;
          a.addEventListener("click", (e) => {
            e.preventDefault();
            loadContent(link);
            if (window.innerWidth <= 768) {
              sidebar.classList.remove("open");
              updateSidebarTogglePosition();
            }
            // Close any open nested dropdowns in this section
            secDiv.querySelectorAll(".nested-dropdown.active").forEach(nested => {
              nested.classList.remove("active");
              const nestedIcon = nested.querySelector(".dropdown-icon");
              if (nestedIcon) nestedIcon.classList.remove("rotated");
              const nestedLinksDiv = nested.querySelector(".nested-links");
              if (nestedLinksDiv) nestedLinksDiv.style.maxHeight = "0";
            });
          });
          linksDiv.appendChild(a);
        });
      }
    });
    // --- End: Render links and nested dropdowns in order ---

    secDiv.appendChild(btn);
    secDiv.appendChild(linksDiv);
    sidebar.appendChild(secDiv);
  });

  // After rendering sidebar, check URL hash
  const currentHash = window.location.hash.substring(1);
  if (currentHash) {
    // Search in singleLinks
    let link = data.singleLinks.find(l => l.id === currentHash);

    // If not in singleLinks, search in sections + nested
    if (!link) {
      for (const section of data.sections) {
        if (section.links) {
          link = section.links.find(l => l.id === currentHash);
          if (link) break;
        }
        for (const key in section) {
          if (key.endsWith("Dropdown") && section[key].links) {
            const found = section[key].links.find(l => l.id === currentHash);
            if (found) {
              link = found;
              break;
            }
          }
        }
        if (link) break;
      }
    }

    // Load if found
    if (link) {
      loadContent(link);
      // Highlight the link
      const activeLink = document.querySelector(`#sidebar a[href="#${link.id}"]`);
      if (activeLink) {
        activeLink.classList.add("active");

        // Expand parent section if inside one
        const section = activeLink.closest(".section");
        if (section && !section.classList.contains("active")) {
          section.classList.add("active");
          const icon = section.querySelector(".dropdown-icon");
          if (icon) icon.classList.add("rotated");
        }

        // Expand nested dropdown if inside one
        const nestedDropdown = activeLink.closest(".nested-dropdown");
        if (nestedDropdown && !nestedDropdown.classList.contains("active")) {
          nestedDropdown.classList.add("active");
          const nestedIcon = nestedDropdown.querySelector(".dropdown-icon");
          if (nestedIcon) nestedIcon.classList.add("rotated");

          const nestedLinksDiv = nestedDropdown.querySelector(".nested-links");
          if (nestedLinksDiv) nestedLinksDiv.style.maxHeight = "400px"; // match your toggle code
        }
      }
    }
  }
}


function loadContent(link) {
  const content = document.getElementById("content");
  // Insert back to home button + content
  content.innerHTML = `
    <button class="back-home-btn" id="backHomeBtn">⬅ Back to Home</button>
    ${link.content}
  `;
  
  // Scroll to top immediately
  window.scrollTo({ top: 0, behavior: 'instant' });
  
  // Use requestAnimationFrame to ensure DOM is updated
  requestAnimationFrame(() => {
    generateTOC();

    // Show both sidebars when content is loaded
    document.getElementById("sidebar").classList.remove("hidden");
    document.getElementById("toc-downloads").classList.remove("hidden");
    
    // Ensure scroll to top after DOM updates
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    // Additional scroll to top with a slight delay
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 10);
  });

// Remove all active states first
document.querySelectorAll("#sidebar a, #sidebar button").forEach(el => el.classList.remove("active"));

// Highlight clicked link
const activeLink = document.querySelector(`#sidebar a[href="#${link.id}"]`);
if (activeLink) {
  activeLink.classList.add("active");

  // Highlight parent SECTION button if exists
  const sectionBtn = activeLink.closest(".section")?.querySelector("button");
  if (sectionBtn) sectionBtn.classList.add("active");

  // Highlight parent NESTED dropdown button if exists
  const nestedBtn = activeLink.closest(".nested-dropdown")?.querySelector(".nested-dropdown-btn");
  if (nestedBtn) nestedBtn.classList.add("active");
}
  
  // Use history.replaceState instead of location.hash to avoid page jump
  history.replaceState(null, null, `#${link.id}`);

  // Handle back button click
  document.getElementById("backHomeBtn").addEventListener("click", showHomeView);
}

// Hide sidebars initially on home view
  document.getElementById("sidebar").classList.add("hidden");
  document.getElementById("toc-downloads").classList.add("hidden");

// The rest of your functions remain the same
function generateTOC() {
  const tocSection = document.querySelector("#toc-downloads .toc-section ul");
  if (!tocSection) return;
  tocSection.innerHTML = "";
  const headers = document.querySelectorAll("#content h1, #content h2");
  headers.forEach(h => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = "#" + h.textContent.replace(/\s+/g, '-').toLowerCase();
    a.textContent = h.textContent;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      h.scrollIntoView({behavior: "smooth"});
    });
    li.appendChild(a);
    tocSection.appendChild(li);
    h.id = h.textContent.replace(/\s+/g, '-').toLowerCase();
  });
}

function showHomeView() {
  const content = document.getElementById("content");

  // Restore home cards (copy from your HTML home section)
  content.innerHTML = `
    <h1 class="text-4xl mb-3">Institution Types Kalp Works With</h1>
    <div class="card-grid">
      <div class="card card-link" data-link-id="governments">
        <img src="/src/assets/images/governments_1.webp" alt="Governments & Nation Builders" class="card-img">
        <div class="card-body">
          <h3 class="card-title">Governments & Nation Builders</h3>
          <p class="card-text">Governments worldwide modernize institutions, expand access, improve services.</p>
        </div>
      </div>
      <div class="card card-link" data-link-id="ngos">
        <img src="/src/assets/images/ngos_1.webp" alt="NGOs & Development Organizations" class="card-img">
        <div class="card-body">
          <h3 class="card-title">NGOs & Development Organizations</h3>
          <p class="card-text">NGOs tackle urgent global challenges: health, poverty, climate.</p>
        </div>
      </div>
      <div class="card card-link" data-link-id="entrepreneurs">
        <img src="/src/assets/images/entrepreneurs_1.webp" alt="Entrepreneurs & Private Sector" class="card-img">
        <div class="card-body">
          <h3 class="card-title">Entrepreneurs & Private Sector</h3>
          <p class="card-text">Growth needs trusted infrastructure meeting regulation and transactions.</p>
        </div>
      </div>
      <div class="card card-link" data-link-id="citizens">
        <img src="/src/assets/images/citizens_1.webp" alt="Citizens & Communities" class="card-img">
        <div class="card-body">
          <h3 class="card-title">Citizens & Communities</h3>
          <p class="card-text">Billions lack services due to complex, distant systems.</p>
        </div>
      </div>
    </div>
  `;

  // Hide both sidebars
  document.getElementById("sidebar").classList.add("hidden");
  document.getElementById("toc-downloads").classList.add("hidden");

  // Reset URL (remove hash)
  history.replaceState(null, null, " ");

  // Re-bind card click events
function initCardClicks() {
  document.querySelectorAll(".card.card-link").forEach(card => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      const linkId = card.getAttribute("data-link-id");

      // Find the link object in kalpData
      let link = kalpData.singleLinks.find(l => l.id === linkId);

      if (!link) {
        for (const section of kalpData.sections) {
          if (section.links) {
            link = section.links.find(l => l.id === linkId);
            if (link) break;
          }
          for (const key in section) {
            if (key.endsWith("Dropdown") && section[key].links) {
              const found = section[key].links.find(l => l.id === linkId);
              if (found) {
                link = found;
                break;
              }
            }
          }
          if (link) break;
        }
      }

      if (link) {
        loadContent(link);

        // ✅ Highlight & expand correct sidebar link
        document.querySelectorAll("#sidebar a").forEach(a => a.classList.remove("active"));
        const activeLink = document.querySelector(`#sidebar a[href="#${link.id}"]`);
        if (activeLink) {
          activeLink.classList.add("active");

          // Expand parent section if needed
          const section = activeLink.closest(".section");
          if (section && !section.classList.contains("active")) {
            const sectionButton = section.querySelector(".section-toggle, .section-header, button");
            if (sectionButton) sectionButton.click(); // 🔥 simulate real expand
          }

          // Expand nested dropdown if needed
          const nestedDropdown = activeLink.closest(".nested-dropdown");
          if (nestedDropdown && !nestedDropdown.classList.contains("active")) {
            const nestedButton = nestedDropdown.querySelector(".nested-toggle, .dropdown-header, button");
            if (nestedButton) nestedButton.click(); // 🔥 simulate real expand
          }

          // Scroll into view bock: "cenr" });
        }

        // Update URL
        history.replaceState(null, null, `#${link.id}`);
      }
    });
  });
}

// Run once on page load
initCardClicks();
}


function moveDownloadsSection() {
  const downloads = document.getElementById("downloads");
  const sidebar = document.getElementById("sidebar");
  const container = document.querySelector(".container");
  if (!downloads || !sidebar || !container) return;

  if (window.innerWidth <= 768) {
    // Move downloads into sidebar if not already there
    if (!sidebar.contains(downloads)) {
      sidebar.appendChild(downloads);
      downloads.classList.add("downloads");
    }
  } else {
    // Move downloads back to container after toc
    if (container.contains(downloads)) return;
    const toc = document.getElementById("toc");
    if (toc && toc.nextSibling) {
      container.insertBefore(downloads, toc.nextSibling);
    } else {
      container.appendChild(downloads);
    }
    downloads.classList.add("downloads");
  }
}

function moveTocDownloadsSection() {
  const tocDownloads = document.getElementById("toc-downloads");
  const sidebar = document.getElementById("sidebar");
  const container = document.querySelector(".container");
  if (!tocDownloads || !sidebar || !container) return;

  if (window.innerWidth <= 768) {
    if (!sidebar.contains(tocDownloads)) {
      sidebar.appendChild(tocDownloads);
    }
  } else {
    if (container.contains(tocDownloads)) return;
    container.appendChild(tocDownloads);
  }
}

// Move sidebarToggle after sidebar for CSS sibling selector to work
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebar && sidebarToggle && sidebar.nextSibling !== sidebarToggle) {
  sidebar.parentNode.insertBefore(sidebarToggle, sidebar.nextSibling);
}

// Ensure sidebar toggle button is pushed when sidebar is open on mobile
function updateSidebarTogglePosition() {
  if (window.innerWidth <= 768) {
    if (sidebar.classList.contains("open")) {
      sidebarToggle.style.left = "299px";
    } else {
      sidebarToggle.style.left = "0";
    }
  } else {
    sidebarToggle.style.left = "";
  }
}

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  updateSidebarTogglePosition();
});

// Close sidebar on mobile if click outside
document.addEventListener("click", function (e) {
  const sidebar = document.getElementById("sidebar");
  if (
    window.innerWidth <= 768 &&
    sidebar.classList.contains("open") &&
    !sidebar.contains(e.target) &&
    e.target.id !== "sidebarToggle"
  ) {
    sidebar.classList.remove("open");
  }
});

// Card click navigation logic
function findLinkById(id) {
  // Search singleLinks
  if (Array.isArray(kalpData.singleLinks)) {
    const found = kalpData.singleLinks.find(link => link.id === id);
    if (found) return found;
  }
  // Search sections
  for (const section of kalpData.sections) {
    // Direct links
    if (Array.isArray(section.links)) {
      const found = section.links.find(link => link.id === id);
      if (found) return found;
    }
    // Nested dropdowns
    for (const key of Object.keys(section)) {
      if (key.endsWith("Dropdown") && section[key] && Array.isArray(section[key].links)) {
        const found = section[key].links.find(link => link.id === id);
        if (found) return found;
      }
      // Other arrays of links
      if (Array.isArray(section[key]) && section[key].length && section[key][0].id && section[key][0].title) {
        const found = section[key].find(link => link.id === id);
        if (found) return found;
      }
    }
  }
  return null;
}

// Attach click listeners to cards
// Handle card clicks (home page cards)
document.querySelectorAll(".card.card-link").forEach(card => {
  card.addEventListener("click", (e) => {
    e.preventDefault();
    const linkId = card.getAttribute("data-link-id");

    // Find the link object in kalpData
    let link = kalpData.singleLinks.find(l => l.id === linkId);

    if (!link) {
      for (const section of kalpData.sections) {
        if (section.links) {
          link = section.links.find(l => l.id === linkId);
          if (link) break;
        }
        for (const key in section) {
          if (key.endsWith("Dropdown") && section[key].links) {
            const found = section[key].links.find(l => l.id === linkId);
            if (found) {
              link = found;
              break;
            }
          }
        }
        if (link) break;
      }
    }

    if (link) {
      loadContent(link);

     // Remove all active states first
document.querySelectorAll("#sidebar a, #sidebar button").forEach(el => el.classList.remove("active"));

// Highlight clicked link
const activeLink = document.querySelector(`#sidebar a[href="#${link.id}"]`);
if (activeLink) {
  activeLink.classList.add("active");

  // Highlight + expand parent SECTION
  const section = activeLink.closest(".section");
  if (section) {
    const sectionBtn = section.querySelector("button");
    if (sectionBtn) sectionBtn.classList.add("active");

    if (!section.classList.contains("active")) {
      section.classList.add("active"); // expand section
      const icon = section.querySelector(".dropdown-icon");
      if (icon) icon.classList.add("rotated");
    }
  }

  // Highlight + expand parent NESTED dropdown
  const nestedDropdown = activeLink.closest(".nested-dropdown");
  if (nestedDropdown) {
    const nestedBtn = nestedDropdown.querySelector(".nested-dropdown-btn");
    if (nestedBtn) nestedBtn.classList.add("active");

    if (!nestedDropdown.classList.contains("active")) {
      nestedDropdown.classList.add("active"); // expand nested
      const nestedIcon = nestedDropdown.querySelector(".dropdown-icon");
      if (nestedIcon) nestedIcon.classList.add("rotated");

      const nestedLinksDiv = nestedDropdown.querySelector(".nested-links");
      if (nestedLinksDiv) nestedLinksDiv.style.maxHeight = "400px";
    }
  }

  // Ensure visible in sidebar
  activeLink.scrollIntoView({ behavior: "smooth", block: "center" });
}


      // Update URL hash
      history.replaceState(null, null, `#${link.id}`);
    }
  });
});

// Only call loadSidebar ONCE
loadSidebar();


// Only set up event listeners ONCE
window.addEventListener("resize", () => {
  moveDownloadsSection();
  moveTocDownloadsSection();
  updateSidebarTogglePosition();
});
window.addEventListener("DOMContentLoaded", () => {
  moveDownloadsSection();
  moveTocDownloadsSection();
  // Initial position update
  updateSidebarTogglePosition();
});


});





