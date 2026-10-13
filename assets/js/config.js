/* m-translate.at – zentrale Konfiguration
   Hier ändern: Kontaktdaten, Menü, Sprachen, Leistungen, Galeriebilder.
   Die Texte dazu stehen in assets/lang/*.js (de, en, ar). */
window.SITE = {
  domain: 'https://www.m-translate.at',
  name: 'Mohammad Jamil Muarrawi',
  phone: '+43 316 435554',          // Telefon und Fax
  mobile: '+43 664 5655983',
  email: 'jamilm75@gmail.com',
  address: { street: 'Casalgasse 47a/1', zip: '8041', city: 'Graz', country: 'Österreich' },
  gisa: '34800881',
  uid: 'ATU80949814',

  // Kontaktformular: Access Key von web3forms.com (kommt per E-Mail an jamilm75@gmail.com)
  formKey: '2fca22e4-2ab4-496c-8b85-6864f6116412',

  // Sprachen. Neue Sprache: Eintrag hier + Datei assets/lang/<code>.js (Kopie von en.js übersetzen).
  // dir: 'rtl' nur für Sprachen mit Schreibrichtung von rechts nach links (Arabisch, Persisch, Hebräisch, Urdu ...)
  defaultLang: 'de',
  autoDetect: true,                 // Sprache des Browsers erkennen, falls unterstützt
  languages: [
    { code: 'de', short: 'DE' },
    { code: 'en', short: 'EN' },
    { code: 'ar', short: 'عربي', dir: 'rtl' }
  ],

  // Hauptmenü. Neuer Punkt = eine Zeile. "children" macht ein Untermenü. "cta: true" = hervorgehobener Button.
  // "key" verweist auf den Menütext in assets/lang/*.js
  nav: [
    { href: 'index.html', key: 'nav.home' },
    { key: 'nav.services', children: [
      { href: 'leistungen.html', key: 'nav.allservices' },
      { href: 'ki-uebersetzungen.html', key: 'nav.ki' },
      { href: 'preise.html', key: 'nav.prices' }
    ] },
    { key: 'nav.about', children: [
      { href: 'lebenslauf.html', key: 'nav.cv' },
      { href: 'informationen.html', key: 'nav.info' },
      { href: 'infrastruktur-und-ausstattung.html', key: 'nav.infra' },
      { href: 'galerie.html', key: 'nav.gallery' }
    ] },
    { href: 'faq.html', key: 'nav.faq' },
    { href: 'kontakt.html', key: 'nav.contact', cta: true }
  ],

  // Rechtliche Links in der Fußzeile
  legal: [
    { href: 'impressum.html', key: 'legal.imprint' },
    { href: 'agb.html', key: 'legal.terms' },
    { href: 'datenschutz.html', key: 'legal.privacy' }
  ],

  // Leistungen (Startseite zeigt die ersten 4, Seite "Leistungen" alle, Formular-Auswahl ebenfalls).
  // Neue Leistung: Eintrag hier + Texte "svc.<id>.t" (Titel) und "svc.<id>.d" (Beschreibung) in allen lang-Dateien.
  // Icons: doc, scale, spark, pulse, globe, chat, phone, mail, pin, clock
  services: [
    { id: 'beglaubigung', icon: 'doc' },
    { id: 'gericht', icon: 'scale' },
    { id: 'fach', icon: 'doc' },
    { id: 'ki', icon: 'spark' },
    { id: 'medizin', icon: 'pulse' },
    { id: 'web', icon: 'globe' }
  ],

  // Galerie. Neues Bild: Datei nach assets/images/ legen, Zeile ergänzen, Beschriftung "gal.<name>" in den lang-Dateien.
  // fit: 'contain' zeigt Logos/Stempel ohne Beschnitt.
  gallery: [
    { src: 'assets/images/buero-graz.webp', key: 'gal.office' },
    { src: 'assets/images/stempel-beglaubigung.webp', key: 'gal.stamp' },
    { src: 'assets/images/oevgd-logo.webp', key: 'gal.oevgd', fit: 'contain' },
    { src: 'assets/images/jamil-muarrawi-portrait.webp', key: 'gal.portrait' }
  ]
};
