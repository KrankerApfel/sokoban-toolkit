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
                <button class="p-1 bg-[#fee9fc] hover:bg-pink-100 disabled:text-gray" disabled>Résoudre</button>
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
import { FileManager } from '~/game/FileManager';
import { Sokoban } from '~/game/Sokoban';

export default {
    setup() {

        onMounted(async () => {
            const gameScreen = document.getElementById('gameScreen') as HTMLCanvasElement;
            const textarea = document.getElementById('textarea') as HTMLTextAreaElement;

            const updateButton = document.getElementById('btn_update') as HTMLButtonElement;
            const fileInput = document.getElementById('file') as HTMLInputElement;
            const importButton = document.querySelector('input[value="Importer"]') as HTMLInputElement;
            const exportButton = document.getElementById('btn_upload') as HTMLButtonElement;
            const filenameInput = document.getElementById('uploadedFile') as HTMLInputElement;

            const sokoban = new Sokoban(gameScreen, textarea);
            await sokoban.init(); 

            // Initialiser le niveau dans le textarea
            textarea.value = sokoban.boardState.join(',');
            sokoban.updateBoardFromTextArea();

            // Gestion clavier
            gameScreen.addEventListener('keydown', (e) => {
                if (!e.repeat) {
                    sokoban.keyEvent(e.keyCode, true);
                }
            });

            // === File Management ===
            const fileManager = new FileManager(textarea, fileInput, filenameInput);
            importButton.addEventListener('click', () => fileManager.clickFileInput());
            exportButton.addEventListener('click', () =>
                fileManager.triggerFileDownload(textarea.value, filenameInput.value.trim() || 'niveau.txt')
            );
            fileInput.addEventListener('change', () => fileManager.loadTextFromFile());
            updateButton.addEventListener('click', () => {
                sokoban.updateBoardFromTextArea();
            });
        });

    }
};
</script>
