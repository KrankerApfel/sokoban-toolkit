<template>
    <div id="Toolkit"
        class="flex flex-row items-center space-x-8 p-2 m-24 text-[#1e1e1e] bg-pink-200 max-w-wrapper-sm font-vt323">
        <div class="flex-1">
            <canvas id="gameScreen" tabindex="0"
                class="w-full outline-none aspect-square bg-amber-100 focus:border-2 focus:border-red-500">

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

export default {
    setup() {
        onMounted(() => {


            const textarea = document.getElementById('textarea') as HTMLTextAreaElement;
            const updateButton = document.getElementById('btn_update') as HTMLButtonElement;
            const fileInput = document.getElementById('file') as HTMLInputElement;
            const importButton = document.querySelector('input[value="Importer"]') as HTMLInputElement;
            const exportButton = document.getElementById('btn_upload') as HTMLButtonElement;
            const filenameInput = document.getElementById('uploadedFile') as HTMLInputElement;

            const game = {
                board: [
                    "_","_","_","#","#","#","_","_","_","_",
                    "_","_","_","#",".","#","_","_","_","_",
                    "_","_","_","#","_","#","#","#","#","#",
                    "#","#","#","#","$","_","$","_",".","#",
                    "#",".","_","_","$","@","#","#","#","#",
                    "#","#","#","#","#","$","#","_","_","_",
                    "_","_","_","_","#","_","#","_","_","_",
                    "_","_","_","_","#","_","#","_","_","_",
                    "_","_","_","_","#",".","#","_","_","_",
                    "_","_","_","_","#","#","#","_","_","_"
                   ],

                checkWinCondition: () => false,
                focusEnter: () => console.log("Canvas focus"),
                focusExit: () => console.log("Canvas blur"),
                keyEvent: (key, isPressed) => console.log("Key:", key, "Pressed:", isPressed)
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

            const engine = new Engine(game, images, 30, 15, 10,10 , playerSprite);
            engine.init();



            if (!textarea || !updateButton || !fileInput || !importButton || !exportButton) return;


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