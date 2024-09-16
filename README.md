# Vehicle App

Projekt izrađen u sklopu prijave na natječaj za posao. Riječ je o web aplikaciji napisanoj u React programskom okviru uz Firebase bazu podataka. Aplikacija ima CRUD mogućnosti.

# Funkcionalnosti

1. **Prikaz svih vozila:** Korisniku se na početku prikazuju kartice sa svim vozilima iz baze podataka. Implementirana je paginacija, a svaka stranica sadrži 10 kartica s vozilima.
2. **Dodavanje novih vozila:** Pritiskom na gumb _Add new vehicle_ korisnik ima mogućnost dodati novo vozilo u bazu. Nakon što popuni sva polja i pritisne na _Submit_ podaci se upisuju u bazu podataka. Za povratak na počenu stranicu, korisnik može pritisnuti _Cancel_ ili logo u gornjem lijevom kutu.
3. **Brisanje vozila:** Korisnik može obrisati vozilo s početne stranice pritiskom na gumb _Delete_. Potvrdom birsanja vozilo se briše iz baze te se ažurira prikaz svih vozila na početnoj stranici.
4. **Ažuriranje vozila:** Korisnik može ažurirati podatke o vozilu pritiskom na gumb _Update_. Nakon toga se otvara nova stranica s trenutnim podacima o vozilu koje korisnik može mijenjati i pohraniti u bazu pritikom na gumb _Submit_.
5. **Pretraživanje vozila po nazivu brenda ili tipu:** Korisnik na početnoj stranici može pretraživati vozila pomoći _input_ polja upisivanjem naziva brenda i/ili odabirom tipa vozila iz padajućeg izbornika. Padajući izbornih sadržava jedinstvene nazive tipova vozila koje dohvaća iz baze podataka.

## Live

[Kliknite da biste vidjeli web stranicu](https://akmacicbruno.github.io/vehicle-mono)

### Installation

1. Clone the repository

```bash
git clone https://github.com/akmacicbruno/vehicle-mono
```

2. Enter the project directory

```bash
cd vehicle-mono
```

3. Install dependencies

```bash
npm install
```

4. Run the local development server

```bash
npm run dev
```
