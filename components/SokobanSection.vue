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
            // === DOM Elements ===
            const textarea = document.getElementById('textarea') as HTMLTextAreaElement;
            const updateButton = document.getElementById('btn_update') as HTMLButtonElement;
            const fileInput = document.getElementById('file') as HTMLInputElement;
            const importButton = document.querySelector('input[value="Importer"]') as HTMLInputElement;
            const exportButton = document.getElementById('btn_upload') as HTMLButtonElement;
            const filenameInput = document.getElementById('uploadedFile') as HTMLInputElement;
            const gameScreen = document.getElementById('gameScreen') as HTMLCanvasElement;

            // === Initial Game Board ===
            const defaultLevel = [
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

            textarea.textContent = defaultLevel;
            const boardArray = defaultLevel.replace(/\n/g, '').split(',');

            // === Game Object ===
            const game = {
                board: boardArray,
                checkWinCondition: () => false,
                focusEnter: () => {
                    gameScreen.focus();
                    gameScreen.style.border = '2px solid red';
                },
                focusExit: () => {
                    gameScreen.style.border = '1px solid black';
                },
                keyEvent: (key: number, isPressed: boolean) => {
                    handlePlayerMove(key, isPressed);
                }
            };

            // === Load Sprites ===
            const images: Record<string, HTMLImageElement> = {
                wal: new Image(),
                flr: new Image(),
                tar: new Image(),
                bor: new Image(),
                bog: new Image()
            };
            images.wal.src = './sprites/wall.png';
            images.flr.src = './sprites/floor.png';
            images.tar.src = './sprites/target.png';
            images.bor.src = './sprites/box00.png';
            images.bog.src = './sprites/box01.png';

            const playerSprite = new Image();
            playerSprite.src = './sprites/me3.png';

            // === Engine & Player Setup ===
            const engine = new Engine(game, images, 30, 15, 10, 10, playerSprite);
            engine.init();

            const player = new Player(game.board);

            // === Player Movement Logic ===
            function handlePlayerMove(key: number, isPressed: boolean) {
                if (!isPressed) return;

                const dirMap: Record<number, [number, number]> = {
                    37: [-1, 0], // left
                    38: [0, -1], // up
                    39: [1, 0],  // right
                    40: [0, 1],  // down
                };

                if (dirMap[key]) {
                    const [dx, dy] = dirMap[key];
                    player.setSprite(key);
                    playerSprite.src = player.getSprite().src;
                    moveTo(dx, dy);
                    engine.drawBoard();
                }
            }

            function moveTo(dx: number, dy: number) {
                const source = player.getFuturPosition(0, 0);
                const target = player.getFuturPosition(dx, dy);
                const next = player.getFuturPosition(dx * 2, dy * 2);

                const cell = game.board[target];
                const nextCell = game.board[next];

                // Si la cellule ciblée n'est ni vide, ni une cible, ni une caisse, on ne bouge pas
                if (!['_', '.', '$', '*'].includes(cell)) return;

                // Tentative de poussée de caisse
                if (cell === '$' || cell === '*') {
                    // Si derrière la caisse c'est un mur, une autre caisse, ou une caisse sur une cible : on bloque
                    if (['#', '$', '*'].includes(nextCell)) return;

                    // On pousse la caisse vers la cellule suivante
                    game.board[next] = nextCell === '.' ? '*' : '$';
                    game.board[target] = cell === '$' ? '_' : '.';
                }

                // Déplacement du joueur
                game.board[source] = player.under;
                player.under = game.board[target];
                game.board[target] = '@';

                player.setX(player.x + dx);
                player.setY(player.y + dy);

                engine.drawBoard();
                console.log(game.board);
            }


            // === File Management ===
            const fileManager = new FileManager(textarea, fileInput, filenameInput);
            importButton.addEventListener('click', () => fileManager.clickFileInput());
            exportButton.addEventListener('click', () =>
                fileManager.triggerFileDownload(textarea.value, filenameInput.value.trim() || 'niveau.txt')
            );
            fileInput.addEventListener('change', () => fileManager.loadTextFromFile());
            updateButton.addEventListener('click', () => {
                game.board = textarea.value.replace(/\n/g, '').split(',');
                player.initPos(game.board);
                engine.drawBoard();
            });
        });
    }
};
</script>
