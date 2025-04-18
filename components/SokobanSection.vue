<template>
    <div id="Toolkit"
        class="flex flex-row items-center space-x-8 p-2 m-24 text-[#1e1e1e] bg-pink-200 max-w-wrapper-sm font-vt323">
        <div class="flex-1">
            <canvas id="gameScreen" class="w-full aspect-square bg-amber-100">
                Votre navigateur ne supporte pas canvas, l'application ne peut fonctionner.<br /> Voici une liste non
                exhaustive des navigateurs supportant cette technologie :
                <br /> Chrome, Firefox, Opéra, Safari, Konqueror ...
            </canvas>
        </div>

        <div class="flex flex-col flex-1 space-y-2 aspect-square">
            <h1 class="text-4xl">Sokoban Toolkit</h1>
            <div class="flex flex-row space-x-2">
                <button class="p-1 bg-[#fee9fc] hover:bg-pink-100">Résoudre</button>
                <button class="p-1 bg-[#fee9fc] hover:bg-pink-100">Générer</button>
            </div>

            <ul>
                <li> R : recommencer le niveau</li>
                <li> U : annuler un coup</li>
                <li> ↑ : se déplacer vers le haut</li>
                <li> ↓ : se déplacer vers le bas</li>
                <li> → : se déplacer vers la droite</li>
                <li> ← : se déplacer vers la gauche</li>
            </ul>
            <p>Code source disponible sur <a href="https://github.com/KrankerApfel/Sokoban-Toolkit">Github</a></p>
        </div>

        <div class="flex-1">
            <div class="flex flex-col space-y-2">
                <h3>Format 10x10 cases :</h3>
                <textarea id="textarea" class="w-full p-2 border border-[#1e1e1e] h-66"
                    placeholder="Éditez le niveau ici..."></textarea>

                <div class="flex flex-row space-x-2">
                    <input id="uploadedFile" class="p-2 border border-[#1e1e1e]" placeholder="Nom du fichier" />
                    <button id="btn_upload" title="Téléchargez le niveau actuel dans votre PC"
                        class="p-2 bg-[#Fee9fc] hover:bg-pink-100">Télécharger</button>
                </div>

                <div>
                    <input type="file" id="file" class="hidden" />
                    <input type="button" value="Importer" title="Importez un fichier texte depuis votre PC"
                        class="p-2 bg-[#fee9fc] hover:bg-pink-100" @click="triggerFileInput" />
                    <button type="button" id="btn_update"
                        title="Affiche le niveau écrit dans l'éditeur sur l'écran de jeu"
                        class="p-2 m-2 bg-[#fee9fc] hover:bg-pink-100">Actualiser</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">

import { onMounted, ref } from 'vue';

// Exemple d'objet game
const game = ref({
    board: ['#', '_', '.', '*', '$', '+', '@'], // Exemple simplifié
    checkWinCondition: () => false, // À ajuster selon ta logique de victoire
    focusEnter: () => console.log('Focus Entré'),
    focusExit: () => console.log('Focus Sorti'),
    keyEvent: (keyCode: number, isPressed: boolean) => console.log(`Key: ${keyCode}, Pressed: ${isPressed}`)
});

export default {
    setup() {
        onMounted(() => {
            const gameScreen = document.getElementById('gameScreen') as HTMLCanvasElement;
            const textarea = document.getElementById('textarea') as HTMLTextAreaElement;
            const updateButton = document.getElementById('btn_update') as HTMLButtonElement;
            const fileInput = document.getElementById('file') as HTMLInputElement;
            const importButton = document.querySelector('input[value="Importer"]') as HTMLInputElement;
            const exportButton = document.getElementById('btn_upload') as HTMLButtonElement;
            const filenameInput = document.getElementById('uploadedFile') as HTMLInputElement;

            if (!gameScreen || !textarea || !updateButton || !fileInput || !importButton || !exportButton) return;

            // Initialisation du contexte du canvas
            const ctx = gameScreen.getContext('2d');
            if (!ctx) return;

            const tileSize = 40; // Taille des tuiles, ajuste selon ton besoin

            // Fonction pour dessiner le tableau sur le canvas
            const drawBoard = () => {
                const board = textarea.value.split('\n').map(row => row.split(''));
                game.value.board = board; // Met à jour le board avec le contenu du textarea

                ctx.clearRect(0, 0, gameScreen.width, gameScreen.height); // Nettoie l'écran

                board.forEach((row, y) => {
                    row.forEach((cell, x) => {
                        const spritePath = getTileSprite(cell); // Récupère le chemin du sprite correspondant à la case
                        const img = new Image();
                        img.src = spritePath; // Charge l'image de la tuile

                        // Lorsque l'image est chargée, on la dessine sur le canvas
                        img.onload = () => {
                            ctx.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize); // Dessine l'image à la position calculée
                        };
                    });
                });
            };


            const getTileSprite = (tile: string): string => {
                switch (tile) {
                    case '#':
                        return './sprites/wall.png'; // Mur
                    case '_':
                        return './sprites/floor.png'; // Sol
                    case '.':
                        return './sprites/target.png'; // Objectif
                    case '*':
                        return './sprites/box01.png'; // Boîte
                    case '$':
                        return './sprites/box00.png'; // Boîte sur objectif
                    case '@':
                        return './sprites/me3.png'; // Joueur
                    default:
                        return './sprites/floor.png'; // Sol par défaut
                }
            };


            // Met à jour le tableau lorsque le bouton "Actualiser" est cliqué
            updateButton.addEventListener('click', drawBoard);

            // Redimensionner le canvas
            gameScreen.width = 400;
            gameScreen.height = 400;

            // Dessiner initialement
            drawBoard();

            // Gérer l'importation de fichier
            importButton.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', () => {
                const file = fileInput.files?.[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e: ProgressEvent<FileReader>) => {
                        if (typeof e.target?.result === 'string') {
                            textarea.value = e.target.result;
                            drawBoard(); // Met à jour le canvas avec le fichier importé
                        }
                    };
                    reader.readAsText(file);
                }
            });

            // Gérer l'exportation du fichier
            exportButton.addEventListener('click', () => {
                const text = textarea.value;
                const filename = filenameInput.value.trim() || 'niveau.txt';

                const blob = new Blob([text], { type: 'text/plain' });
                const url = URL.createObjectURL(blob);

                const a = document.createElement('a');
                a.href = url;
                a.download = filename;
                a.click();

                URL.revokeObjectURL(url);
            });
        });
    }
};


</script>