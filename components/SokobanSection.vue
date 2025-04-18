<template>
    <div id="toolkit"
        class="flex flex-row items-center space-x-8 p-2 m-24 text-[#1e1e1e] bg-pink-200 max-w-wrapper-sm font-vt323">
        <div class="flex-1">
            <canvas id="gameScreen" class="w-full outline-none aspect-square bg-amber-100 ">

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

import { onMounted } from 'vue';
import { Engine } from '~/game/Engine';
import { FileManager } from '~/game/FileManager';
import { Player } from '~/game/Player';

export default {
    setup() {
        onMounted(() => {

            // init const
            const textarea = document.getElementById('textarea') as HTMLTextAreaElement;
            const updateButton = document.getElementById('btn_update') as HTMLButtonElement;
            const fileInput = document.getElementById('file') as HTMLInputElement;
            const importButton = document.querySelector('input[value="Importer"]') as HTMLInputElement;
            const exportButton = document.getElementById('btn_upload') as HTMLButtonElement;
            const filenameInput = document.getElementById('uploadedFile') as HTMLInputElement;
            const gameScreen = document.getElementById('gameScreen') as HTMLCanvasElement;

            // init game
            textarea.textContent = [
                "_", "_", "_", "#", "#", "#", "_", "_", "_", "_\n",
                "_", "_", "_", "#", ".", "#", "_", "_", "_", "_\n",
                "_", "_", "_", "#", "_", "#", "#", "#", "#", "#\n",
                "#", "#", "#", "#", "$", "_", "$", "_", ".", "#\n",
                "#", ".", "_", "_", "$", "@", "#", "#", "#", "#\n",
                "#", "#", "#", "#", "#", "$", "#", "_", "_", "_\n",
                "_", "_", "_", "_", "#", "_", "#", "_", "_", "_\n",
                "_", "_", "_", "_", "#", "_", "#", "_", "_", "_\n",
                "_", "_", "_", "_", "#", ".", "#", "_", "_", "_\n",
                "_", "_", "_", "_", "#", "#", "#", "_", "_", "_\n"
            ].join(',');


            const boardArray = textarea.textContent.replace(/\n/g, '').split(',');

            const game = {
                board: boardArray,
                checkWinCondition: () => false,
                focusEnter: () => {
                    gameScreen.focus(); // Important : canvas doit avoir tabindex="0"
                    gameScreen.style.border = "2px solid red";
                },
                focusExit: () => {
                    gameScreen.style.border = "1px solid black";
                },
                keyEvent: (key, isPressed) => { movePlayer(key, isPressed) }
            };

            const images: Record<string, HTMLImageElement> = {
                wal: new Image(),
                flr: new Image(),
                tar: new Image(),
                bor: new Image(),
                bog: new Image()
            };
            images.wal.src = "./sprites/wall.png";
            images.flr.src = "./sprites/floor.png";
            images.tar.src = "./sprites/target.png";
            images.bor.src = "./sprites/box00.png";
            images.bog.src = "./sprites/box01.png";

            const playerSprite = new Image();
            playerSprite.src = "./sprites/me3.png";

            const engine = new Engine(game, images, 30, 15, 10, 10, playerSprite);
            engine.init();

            const player = new Player(game.board);

            // GAME CORE
            function movePlayer(key, isPressed) {

                let dirMap = {
                    37: [-1, 0],
                    38: [0, -1],
                    39: [1, 0],
                    40: [0, 1],
                };
                if (isPressed) {
                    if (key >= 37 && key <= 40) {
                        player.setSprite(key);
                        playerSprite.src = player.getSprite().src;
                        moveTo(dirMap[key][0], dirMap[key][1]);
                    }
                    // else if (key == 82) {
                    //     game.restart();
                    // }
                    // else if (key == 85) {
                    //     game.undoLastPush();
                    // }
                    engine.drawBoard();
                }
            }

            // //Move To function
            // Move To function
            function moveTo(x: number, y: number): void {
                // Récupère la case vers laquelle on veut se déplacer
                const sourcePosition = player.getFuturPosition(0, 0);
                const targetPosition = player.getFuturPosition(x, y);
                const cell = game.board[targetPosition];

                // Vérifie si la case cible est traversable
                if (['_', '.', '$', '*'].includes(cell)) {


                    // Déplacer le joueur vers la case vide
                    game.board[sourcePosition] = player.under; // Laisser l'endroit précédent vide
                    game.board[targetPosition] = "@"; // Déplacer le joueur sur la case cible
                    player.under = game.board[sourcePosition] ; // Le joueur prend la valeur de l'ancienne case


                    // Mise à jour de la position du joueur (sur le tableau de jeu)
                    player.setX(player.x + x);
                    player.setY(player.y + y);

                    // Met à jour le rendu du jeu après déplacement
                    engine.drawBoard();
                    console.log(game.board);
                }
            }



            // END GAME CORE

            // File Management
            const fileManager = new FileManager(textarea, fileInput, filenameInput);
            importButton.addEventListener('click', () => { fileManager.clickFileInput(); });
            exportButton.addEventListener('click', () => { fileManager.triggerFileDownload(textarea.value, filenameInput.value.trim() || 'niveau.txt'); });
            fileInput.addEventListener('change', () => { fileManager.loadTextFromFile(); });
            updateButton.addEventListener('click', () => {
                const newBoard = textarea.value.replace(/\n/g, '').split(',');
                game.board = newBoard;
                engine.drawBoard();
            });
        });
    }
};


</script>