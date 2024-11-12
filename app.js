async function getUserInfo() {
    const username = document.getElementById("username").value;
    const userInfoDiv = document.getElementById("user-info");

    if (!username) {
        userInfoDiv.innerHTML = "Lütfen bir kullanıcı adı girin.";
        return;
    }

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error("Kullanıcı bulunamadı.");
        }
        const data = await response.json();

        userInfoDiv.innerHTML = `
            <h2>${data.name} (@${data.login})</h2>
            <img src="${data.avatar_url}" alt="${data.login}" width="100">
            <p>Takipçi: ${data.followers} | Takip Edilen: ${data.following}</p>
            <p>Açıklama: ${data.bio || "Yok"}</p>
            <p>GitHub: <a href="${data.html_url}" target="_blank">Profilini Gör</a></p>
            <p>Repo Sayısı: ${data.public_repos}</p>
        `;
    } catch (error) {
        userInfoDiv.innerHTML = error.message;
    }
}
