
const SUPABASE_URL = "https://gxywkdpbwebuxxilsfqb.supabase.co";
const SUPABASE_KEY = "sb_publishable_cgghpZNW7fIoFjXIiVQGtw_Q2H4Sety";
const ADMIN_EMAIL = "Directioninfo525@gmail.com";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const movies = [
  {
    title: "Dune : Deuxième partie",
    year: "2024",
    image: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    description: "Paul Atréides poursuit son destin sur la planète Arrakis."
  },
  {
    title: "Spider-Man: Across the Spider-Verse",
    year: "2023",
    image: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    description: "Miles Morales traverse de nouveaux univers."
  },
  {
    title: "Avatar : La Voie de l'eau",
    year: "2022",
    image: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    description: "Une nouvelle aventure sur Pandora."
  },
  {
    title: "Black Panther : Wakanda Forever",
    year: "2022",
    image: "https://image.tmdb.org/t/p/w500/sv1xJUazXeYqALzczSZ3O6nkH75.jpg",
    description: "Le royaume du Wakanda doit faire face à de nouveaux défis."
  },
  {
    title: "Top Gun : Maverick",
    year: "2022",
    image: "https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    description: "Maverick revient pour une mission exceptionnelle."
  },
  {
    title: "Le Chat Potté 2",
    year: "2022",
    image: "https://image.tmdb.org/t/p/w500/kuf6dutpsT0vSVehic3EZIqkOBt.jpg",
    description: "Le Chat Potté part à la recherche de la dernière étoile."
  }
];

const shows = [
  {
    title: "Mercredi",
    year: "2022",
    image: "https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",
    description: "Mercredi Addams enquête dans une mystérieuse académie."
  },
  {
    title: "Stranger Things",
    year: "2016",
    image: "https://image.tmdb.org/t/p/w500/x2LSRK2Cm7MZhjluni1msVJ3wDF.jpg",
    description: "Des événements étranges bouleversent une petite ville."
  },
  {
    title: "Lupin",
    year: "2021",
    image: "https://image.tmdb.org/t/p/w500/sgxawbFB5Vi5OkPWQLNfl3dvkNJ.jpg",
    description: "Un gentleman cambrioleur prépare ses plans."
  },
  {
    title: "The Last of Us",
    year: "2023",
    image: "https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg",
    description: "Deux survivants traversent un monde bouleversé."
  },
  {
    title: "One Piece",
    year: "2023",
    image: "https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",
    description: "Luffy part à la recherche du trésor légendaire."
  },
  {
    title: "La Casa de Papel",
    year: "2017",
    image: "https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",
    description: "Une équipe prépare un braquage spectaculaire."
  }
];

const $ = (id) => document.getElementById(id);

const authDialog = $("authDialog");
const authForm = $("authForm");
const authMessage = $("authMessage");
const authTitle = $("authTitle");
const authSubmit = $("authSubmit");
const switchAuth = $("switchAuth");

let authMode = "signup";
let currentUser = null;

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function showMemberContent(allowed) {
  [document.querySelector(".hero"), $("searchPanel"), $("films"), $("series"), $("tendances")]
    .forEach((element) => {
      if (element) element.hidden = !allowed;
    });
}

function renderItems(items, containerId) {
  const container = $(containerId);
  if (!container) return;

  container.innerHTML = items.map((item) => `
    <article class="poster-card">
      <img src="${safe(item.image)}" alt="${safe(item.title)}" loading="lazy">
      <h3>${safe(item.title)}</h3>
      <p>${safe(item.year)}</p>
      <button type="button" class="details-button"
        data-title="${safe(item.title)}"
        data-image="${safe(item.image)}"
        data-description="${safe(item.description)}">
        Voir les détails
      </button>
    </article>
  `).join("");
}

renderItems(movies, "movieList");
renderItems(shows, "seriesList");

document.addEventListener("click", (event) => {
  const button = event.target.closest(".details-button");
  if (!button) return;

  $("detailTitle").textContent = button.dataset.title;
  $("detailDescription").textContent = button.dataset.description;
  $("detailImage").src = button.dataset.image;

  $("detailDialog").showModal();
});

$("closeDialog")?.addEventListener("click", () => {
  $("detailDialog").close();
});

$("dialogOk")?.addEventListener("click", () => {
  $("detailDialog").close();
});

$("searchToggle")?.addEventListener("click", () => {
  $("searchPanel")?.classList.toggle("visible");
});

$("clearSearch")?.addEventListener("click", () => {
  if ($("searchInput")) $("searchInput").value = "";
  filterItems("");
});

function filterItems(search) {
  const term = search.toLowerCase();

  document.querySelectorAll(".poster-card").forEach((card) => {
    card.hidden = !card.textContent.toLowerCase().includes(term);
  });
}

$("searchInput")?.addEventListener("input", (event) => {
  filterItems(event.target.value);
});

function openAuth(mode) {
  authMode = mode;
  authForm.reset();
  authMessage.textContent = "";

  const isSignup = mode === "signup";

  authTitle.textContent = isSignup ? "Créer un compte" : "Connexion";
  authSubmit.textContent = isSignup ? "Créer mon compte" : "Se connecter";
  switchAuth.textContent = isSignup
    ? "Déjà inscrit ? Se connecter"
    : "Pas encore de compte ? Créer un compte";

  authForm.querySelectorAll(".signup-only").forEach((element) => {
    element.hidden = !isSignup;
  });

  authDialog.showModal();
}

$("signupOpen")?.addEventListener("click", () => openAuth("signup"));
$("loginOpen")?.addEventListener("click", () => openAuth("login"));

$("authClose")?.addEventListener("click", () => {
  authDialog.close();
});

switchAuth?.addEventListener("click", () => {
  openAuth(authMode === "signup" ? "login" : "signup");
});

async function checkAccess(user) {
  currentUser = user;

  if (!user) {
    showMemberContent(false);
    $("adminPanel").hidden = true;
    return;
  }

  if (user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
    showMemberContent(true);
    $("adminPanel").hidden = false;
    await loadPendingUsers();
    return;
  }

  const { data: profile, error } = await client
    .from("profiles")
    .select("approved")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !profile || profile.approved !== true) {
    showMemberContent(false);
    await client.auth.signOut();
    currentUser = null;
    authMessage.textContent = "Votre compte est en attente d'approbation.";
    return;
  }

  showMemberContent(true);
  $("adminPanel").hidden = true;
}

authForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  authSubmit.disabled = true;
  authMessage.textContent = "Veuillez patienter...";

  try {
    const email = $("email").value.trim();
    const password = $("password").value;

    if (authMode === "signup") {
      const fullName = $("fullName").value.trim();
      const countryCode = $("countryCode").value;
      const phoneNumber = $("phone").value.trim();

      if (!fullName || !phoneNumber || !email || !password) {
        throw new Error("Veuillez remplir tous les champs.");
      }

      if (password.length < 8) {
        throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
      }

      const fullPhone = countryCode + phoneNumber.replace(/\s+/g, "");

      const { data, error } = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone: fullPhone
          }
        }
      });

      if (error) throw error;

      authMessage.textContent = data.session
        ? "Inscription réussie. Votre compte attend l'approbation de l'administrateur."
        : "Inscription réussie. Vérifiez votre adresse e-mail si une confirmation est demandée. Votre compte attend ensuite l'approbation.";

      authForm.reset();
    } else {
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      authMessage.textContent = "Connexion réussie.";

      await checkAccess(data.user);

      if (currentUser) {
        authDialog.close();
      }
    }
  } catch (error) {
    authMessage.textContent = error.message || "Une erreur est survenue.";
  } finally {
    authSubmit.disabled = false;
  }
});

async function loadPendingUsers() {
  const container = $("pendingUsers");
  if (!container) return;

  container.textContent = "Chargement des inscriptions...";

  const { data, error } = await client
    .from("profiles")
    .select("id, full_name, phone, email, created_at")
    .eq("approved", false)
    .order("created_at", { ascending: false });

  if (error) {
    container.textContent = "Impossible de charger les inscriptions.";
    return;
  }

  if (!data || data.length === 0) {
    container.textContent = "Aucune inscription en attente.";
    return;
  }

  container.innerHTML = data.map((user) => `
    <div class="pending-user">
      <p><strong>Nom :</strong> ${safe(user.full_name)}</p>
      <p><strong>Téléphone :</strong> ${safe(user.phone)}</p>
      <p><strong>Email :</strong> ${safe(user.email)}</p>
      <button type="button" class="approve-user"
        data-user-id="${safe(user.id)}">
        Approuver ce compte
      </button>
    </div>
    <hr>
  `).join("");
}

$("pendingUsers")?.addEventListener("click", async (event) => {
  const button = event.target.closest(".approve-user");
  if (!button) return;

  if (!currentUser || currentUser.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    alert("Accès réservé à l'administrateur.");
    return;
  }

  button.disabled = true;

  const { error } = await client
    .from("profiles")
    .update({ approved: true })
    .eq("id", button.dataset.userId);

  if (error) {
    alert("Erreur : impossible d'approuver ce compte.");
    button.disabled = false;
    return;
  }

  alert("Compte approuvé avec succès.");
  await loadPendingUsers();
});

$("profileButton")?.addEventListener("click", async () => {
  const { data } = await client.auth.getUser();

  if (data.user) {
    alert("Compte connecté : " + data.user.email);
  } else {
    openAuth("login");
  }
});

$("logoutButton")?.addEventListener("click", async () => {
  await client.auth.signOut();
  currentUser = null;
  showMemberContent(false);
  $("adminPanel").hidden = true;
  alert("Vous êtes déconnecté.");
});

async function initializeApp() {
  showMemberContent(false);
  $("adminPanel").hidden = true;

  const { data, error } = await client.auth.getSession();

  if (!error && data.session) {
    await checkAccess(data.session.user);
  }
}

client.auth.onAuthStateChange((event, session) => {
  if (event === "SIGNED_OUT") {
    currentUser = null;
    showMemberContent(false);
    $("adminPanel").hidden = true;
  }
});

initializeApp();
