
const SUPABASE_URL = "https://gxywkdpbwebuxxilsfqb.supabase.co";
const SUPABASE_KEY = "sb_publishable_cgghpZNW7fIoFjXIiVQGtw_Q2H4Sety";

const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const ADMIN_EMAIL = "Directioninfo525@gmail.com";

const movies = [
 {title:"Dune : Deuxième partie",year:"2024 · Science-fiction",img:"https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",desc:"Paul Atréides rejoint les Fremen et poursuit son destin sur la planète Arrakis."},
 {title:"Spider-Man : Across the Spider-Verse",year:"2023 · Animation",img:"https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5XjkvL7.jpg",desc:"Miles Morales traverse des univers parallèles et rencontre une équipe de Spider-héros."},
 {title:"Avatar : La voie de l'eau",year:"2022 · Aventure",img:"https://image.tmdb.org/t/p/w500/t6HIQR5v1j1y2c8i3h6q6n6Z5Z.jpg",desc:"Une nouvelle aventure spectaculaire au cœur de Pandora."},
 {title:"Black Panther",year:"2018 · Action",img:"https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg",desc:"Le royaume du Wakanda doit protéger son avenir."},
 {title:"Top Gun : Maverick",year:"2022 · Action",img:"https://image.tmdb.org/t/p/w500/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",desc:"Maverick entraîne une nouvelle génération de pilotes d'élite."},
 {title:"Le Chat Potté 2",year:"2022 · Animation",img:"https://image.tmdb.org/t/p/w500/kxB9E6fo0ycHzd13oWXz3Yw7y5w.jpg",desc:"Le Chat Potté part à la recherche de la dernière étoile à souhaits."}
];

const shows = [
 {title:"Mercredi",year:"Série · Mystère",img:"https://image.tmdb.org/t/p/w500/9PFonBhy4cQy7Jz20NpMygczOkv.jpg",desc:"Mercredi Addams enquête sur une série de mystères dans une étrange académie."},
 {title:"Stranger Things",year:"Série · Fantastique",img:"https://image.tmdb.org/t/p/w500/49WJfeN0moxb9IPfGn8AIqMGskD.jpg",desc:"Des adolescents affrontent des phénomènes surnaturels dans leur ville."},
 {title:"Lupin",year:"Série · Policier",img:"https://image.tmdb.org/t/p/w500/sgxawbFB5Vi5OkPWQLNfl3dv.jpg",desc:"Assane Diop s'inspire d'Arsène Lupin pour préparer ses coups."},
 {title:"The Last of Us",year:"Série · Drame",img:"https://image.tmdb.org/t/p/w500/uKvVjHNqB5VmOrkEn23QygaWz.jpg",desc:"Un voyage dangereux dans un monde bouleversé."},
 {title:"One Piece",year:"Série · Aventure",img:"https://image.tmdb.org/t/p/w500/cMD9Ygz11zjJzAovURpO75Qg7rT.jpg",desc:"Luffy et son équipage partent à la recherche du trésor légendaire."},
 {title:"La Casa de Papel",year:"Série · Thriller",img:"https://image.tmdb.org/t/p/w500/reEMJA1uzscCbkpeRJeTT2bjqUp.jpg",desc:"Un groupe de braqueurs met au point un plan audacieux."}
];

const all = [...movies, ...shows];

function render(items, target) {
  document.getElementById(target).innerHTML = items.map(x => `
    <article class="poster-card" data-title="${x.title.toLowerCase()}" data-index="${all.indexOf(x)}">
      <img loading="lazy" src="${x.img}" alt="Affiche ${x.title}"
      onerror="this.style.background='#303345';this.removeAttribute('src')">
      <h3>${x.title}</h3>
      <p>${x.year}</p>
    </article>
  `).join("");
}

render(movies, "movieList");
render(shows, "seriesList");

/* Films et séries */
document.addEventListener("click", e => {
  const card = e.target.closest(".poster-card");
  if (!card) return;

  const item = all[Number(card.dataset.index)];
  document.getElementById("detailTitle").textContent = item.title;
  document.getElementById("detailDescription").textContent = item.desc;

  const img = document.getElementById("detailImage");
  img.src = item.img;
  img.alt = item.title;

  document.getElementById("detailDialog").showModal();
});

document.getElementById("closeDialog").onclick =
  () => document.getElementById("detailDialog").close();

document.getElementById("dialogOk").onclick =
  () => document.getElementById("detailDialog").close();

/* Recherche */
document.getElementById("searchToggle").onclick = () => {
  const panel = document.getElementById("searchPanel");
  panel.classList.toggle("visible");
  if (panel.classList.contains("visible")) {
    document.getElementById("searchInput").focus();
  }
};

document.getElementById("clearSearch").onclick = () => {
  document.getElementById("searchInput").value = "";
  filter("");
};

function filter(q) {
  document.querySelectorAll(".poster-card").forEach(card => {
    card.style.display =
      card.dataset.title.includes(q.toLowerCase()) ? "" : "none";
  });
}

document.getElementById("searchInput").addEventListener("input", e => {
  filter(e.target.value.trim());
});

/* Comptes et connexion */
const authDialog = document.getElementById("authDialog");
const authForm = document.getElementById("authForm");
const authTitle = document.getElementById("authTitle");
const authMessage = document.getElementById("authMessage");
const authSubmit = document.getElementById("authSubmit");
const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const password = document.getElementById("password");

let authMode = "signup";

function showMessage(message, error = false) {
  authMessage.textContent = message;
  authMessage.style.color = error ? "#ff8b8b" : "#8ab4f8";
}

function openAuth(mode) {
  authMode = mode;
  authTitle.textContent =
    mode === "signup" ? "Créer un compte" : "Connexion";

  fullName.parentElement.style.display =
    mode === "signup" ? "" : "none";
  phone.parentElement.style.display =
    mode === "signup" ? "" : "none";

  fullName.required = mode === "signup";
  phone.required = mode === "signup";

  authSubmit.textContent =
    mode === "signup" ? "Créer mon compte" : "Me connecter";

  document.getElementById("switchAuth").textContent =
    mode === "signup" ? "J'ai déjà un compte" : "Créer un compte";

  authForm.reset();
  showMessage("");
  authDialog.showModal();
}

document.getElementById("signupOpen").onclick =
  () => openAuth("signup");

document.getElementById("loginOpen").onclick =
  () => openAuth("login");

document.getElementById("profileButton").onclick = async () => {
  const { data } = await client.auth.getSession();
  if (data.session) {
    alert("Connecté avec : " + data.session.user.email);
  } else {
    openAuth("login");
  }
};

document.getElementById("authClose").onclick =
  () => authDialog.close();

document.getElementById("switchAuth").onclick = () => {
  openAuth(authMode === "signup" ? "login" : "signup");
};

/* Inscription et connexion */
authForm.addEventListener("submit", async e => {
  e.preventDefault();
  authSubmit.disabled = true;
  showMessage("Veuillez patienter...");

  try {
    if (authMode === "signup") {
      const { data, error } = await client.auth.signUp({
        email: email.value.trim(),
        password: password.value,
        options: {
          data: {
            full_name: fullName.value.trim(),
            phone: phone.value.trim()
          }
        }
      });

      if (error) throw error;

      if (!data.session) {
        showMessage("Inscription enregistrée ! Vérifiez votre adresse e-mail pour confirmer votre compte. Votre accès sera disponible après approbation.");
      } else {
        showMessage("Inscription enregistrée. Votre compte attend l'approbation de l'administrateur.");
        await client.auth.signOut();
      }

    } else {
      const { error } = await client.auth.signInWithPassword({
        email: email.value.trim(),
        password: password.value
      });

      if (error) throw error;

      await checkAccess();
    }
  } catch (error) {
    showMessage(error.message || "Une erreur est survenue.", true);
  } finally {
    authSubmit.disabled = false;
  }
});

/* Accès des membres et administrateur */
async function checkAccess() {
  const { data, error } = await client.auth.getUser();

  if (error || !data.user) return;

  const user = data.user;
  const isAdmin =
    user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  if (isAdmin) {
    authDialog.close();
    showMemberContent(true);
    document.getElementById("adminPanel").hidden = false;
    document.getElementById("logoutButton").hidden = false;
    document.getElementById("loginOpen").hidden = true;
    document.getElementById("signupOpen").hidden = true;
    await loadPendingUsers();
    return;
  }

  const { data: profile, error: profileError } = await client
    .from("profiles")
    .select("approved")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    showMessage("Impossible de vérifier votre compte. Réessayez.", true);
    await client.auth.signOut();
    return;
  }

  if (!profile || profile.approved !== true) {
    showMessage("Votre compte est en attente de validation par l'administrateur.");
    await client.auth.signOut();
    return;
  }

  authDialog.close();
  showMemberContent(true);
  document.getElementById("logoutButton").hidden = false;
  document.getElementById("loginOpen").hidden = true;
  document.getElementById("signupOpen").hidden = true;
}

function showMemberContent(allowed) {
  ["films", "series", "tendances"].forEach(id => {
    document.getElementById(id).hidden = !allowed;
  });
}

/* Administration des inscriptions */
async function loadPendingUsers() {
  const container = document.getElementById("pendingUsers");
  container.textContent = "Chargement des inscriptions...";

  const { data, error } = await client
    .from("profiles")
    .select("id, full_name, phone, email, approved, created_at")
    .eq("approved", false)
    .order("created_at", { ascending: false });

  if (error) {
    container.textContent = "Erreur : " + error.message;
    return;
  }

  if (!data.length) {
    container.textContent = "Aucune inscription en attente.";
    return;
  }

  container.innerHTML = data.map(user => `
    <div style="padding:15px;margin:12px 0;background:#242735;border-radius:10px">
      <strong>${safe(user.full_name)}</strong><br>
      <span>${safe(user.email || "")}</span><br>
      <span>${safe(user.phone || "")}</span><br>
      <button class="primary-btn approve-user" data-id="${safe(user.id)}">
        Approuver le compte
      </button>
    </div>
  `).join("");

  container.querySelectorAll(".approve-user").forEach(button => {
    button.onclick = () => approveUser(button.dataset.id, button);
  });
}

function safe(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[char]);
}

async function approveUser(id, button) {
  button.disabled = true;
  button.textContent = "Validation...";

  const { error } = await client
    .from("profiles")
    .update({ approved: true })
    .eq("id", id);

  if (error) {
    alert("Erreur : " + error.message);
    button.disabled = false;
    button.textContent = "Approuver le compte";
    return;
  }

  alert("Compte approuvé avec succès !");
  await loadPendingUsers();
}

/* Déconnexion */
document.getElementById("logoutButton").onclick = async () => {
  await client.auth.signOut();
  location.reload();
};

/* Vérification d'une session déjà ouverte */
showMemberContent(false);

(async () => {
  const { data } = await client.auth.getSession();
  if (data.session) {
    await checkAccess();
  }
})();
