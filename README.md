# m-translate.at – Website

Reines HTML, CSS und JavaScript. Keine Cookies, keine fremden Server (außer Web3Forms beim Absenden des Formulars).
Ordner `assets/images/` und `assets/icons/` bleiben wie bisher.

## Wo ändere ich was?

| Ich will ... | Datei |
|---|---|
| Telefon, E-Mail, Adresse, GISA, UID ändern | `assets/js/config.js` (überall automatisch aktualisiert) |
| Web3Forms-Key eintragen | `assets/js/config.js`, Zeile `formKey` |
| Öffnungszeiten anzeigen | `assets/lang/de.js`, `en.js`, `ar.js`: Eintrag `site.hours` ausfüllen |
| Farben, Schriften, Abstände | `assets/css/style.css`, Block `:root` ganz oben |
| Text einer Seite ändern | Deutsch: direkt in der HTML-Datei. Englisch/Arabisch: `assets/lang/en.js` / `ar.js` (gleicher Schlüssel) |
| Menüpunkt hinzufügen | `assets/js/config.js`, Liste `nav` (eine Zeile), Menütext `nav.xyz` in den lang-Dateien |
| Leistung hinzufügen | `config.js`, Liste `services`; Texte `svc.<id>.t` und `svc.<id>.d` in allen drei lang-Dateien. Erscheint automatisch auf der Seite, der Startseite und im Formular |
| Galeriebild hinzufügen | Bild nach `assets/images/`, Zeile in `config.js` Liste `gallery`, Beschriftung `gal.<name>` in den lang-Dateien |
| Frage zur FAQ hinzufügen | In `faq.html` einen `<details>`-Block kopieren, Schlüssel `faq.q6` / `faq.a6` vergeben |

## Neue Sprache (z. B. Türkisch, Persisch, Bosnisch)

1. `assets/lang/en.js` kopieren, in `tr.js` umbenennen, Werte übersetzen, `window.I18N.en` in `window.I18N.tr` ändern.
2. In `assets/js/config.js` bei `languages` eintragen: `{ code: 'tr', short: 'TR' }`. Für Persisch, Hebräisch oder Urdu zusätzlich `dir: 'rtl'`.

Fehlt ein Schlüssel in einer Sprachdatei, erscheint an dieser Stelle der deutsche Text.

## Neue Seite

1. `_vorlage.html` kopieren und umbenennen.
2. `title`, `description`, `canonical` und `og:url` im `<head>` anpassen, `robots` auf `index, follow` setzen.
3. Texte, die übersetzt werden sollen, so auszeichnen: `<p data-i18n="meine.seite.p1">Deutscher Text</p>`.
   Platzhalter: `placeholder="..." data-i18n-attr="placeholder:schluessel"`.
4. Übersetzungen unter demselben Schlüssel in `en.js` und `ar.js` eintragen.
5. Seite in `config.js` (`nav`) und in `sitemap.xml` eintragen.

Rechtstexte (Impressum, AGB, Datenschutz) bleiben bewusst nur Deutsch (`<main lang="de" dir="ltr">`).

## Vor dem Go-Live

- [ ] Web3Forms-Key in `config.js` eintragen und Testnachricht senden
- [ ] Alle Texte vom Inhaber gegenlesen (Leistungen, Preislogik, Büro, Termine)
- [ ] Arabische Schreibweise des Namens vom Inhaber bestätigen lassen
- [ ] Impressum, AGB, Datenschutz juristisch prüfen lassen, Hosting-Anbieter in der Datenschutzerklärung nennen
- [ ] Öffnungszeiten eintragen (oder leer lassen)
- [ ] Optional: Bild `og-image.jpg` (1200×630) für Link-Vorschauen, Koordinaten in die strukturierten Daten der `index.html`
- [ ] Alte Dateien entfernen: `assets/icons/favicon.zip`
