// ── WRAPPER DE RÉTROCOMPATIBILITÉ ──
// Historiquement, tous les convertisseurs de données (serializers) étaient peut-être empilés dans ce fichier unique.
// Pour garder un projet propre, la logique a été découpée et isolée dans un sous-dossier spécialisé './serializers/index'.
// Ce fichier sert simplement d'aiguillage : il ré-exporte immédiatement le contenu du nouveau dossier.
// Avantage : N'importe quel autre fichier du serveur peut continuer à faire 'require("./utils/serializer")' sans casser le code,
// car ce fichier fait la redirection de manière totalement transparente pour le reste de l'application.
module.exports = require("./serializers/index");
