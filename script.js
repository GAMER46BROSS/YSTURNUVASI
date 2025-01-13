
const API_KEY = "BURAYA_API_KEYİNİZİ_EKLEYİN"; // Brawl Stars API Key
const BASE_URL = "https://api.brawlstars.com/v1/players/";

const userList = [];
const winnersList = [];

// Form işleme
document.getElementById("registerForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const email = document.getElementById("email").value.trim();
  const brawlId = document.getElementById("brawlId").value.trim();
  const team = document.getElementById("team").value;
  const errorDiv = document.getElementById("error");

  errorDiv.textContent = ""; // Hata mesajını sıfırla

  try {
    // Brawl Stars API doğrulaması
    const response = await fetch(BASE_URL + encodeURIComponent(brawlId), {
      headers: {
        "Authorization": `Bearer ${API_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error("Geçersiz Brawl Stars ID! Lütfen doğru bir ID girin.");
    }

    const playerData = await response.json();

    // Kullanıcıyı listeye ekle
    const newUser = {
      username,
      email,
      brawlId: playerData.tag,
      team,
      trophies: playerData.trophies,
    };

    userList.push(newUser);
    updateUserList();
    alert("Kayıt başarılı!");

    // Formu sıfırla
    document.getElementById("registerForm").reset();
  } catch (error) {
    errorDiv.textContent = error.message;
  }
});

// Kullanıcı listesini güncelle
function updateUserList() {
  const userListEl = document.getElementById("userList");
  userListEl.innerHTML = ""; // Listeyi temizle

  userList.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.username} - ${user.team} - ${user.brawlId} (${user.trophies} kupa)`;
    userListEl.appendChild(li);
  });
}

// Kazananları ekle (örnek olarak manuel ekliyoruz)
function addWinner(username) {
  winnersList.push(username);
  updateWinnersList();
}

// Kazanan listesini güncelle
function updateWinnersList() {
  const winnersListEl = document.getElementById("winnersList");
  winnersListEl.innerHTML = ""; // Listeyi temizle

  winnersList.forEach(winner => {
    const li = document.createElement("li");
    li.textContent = winner;
    winnersListEl.appendChild(li);
  });
}
