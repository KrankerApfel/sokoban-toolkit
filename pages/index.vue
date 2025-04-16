<template>
<div class="m-auto py-24 antialiased">
    <!-- Section Accueil -->
        <div class="max-w-wrapper-sm m-24 p-2 pb-8 bg-[url('/bkg_home.png')] text-white font-vt323">
            <h1 class="text-5xl m-8">-Sokoban Level Generator-</h1>
            <div class="flex flex-row items-end h-1/2 ml-24">
                <p
                    class="bg-black border-2 border-[#Fee9fc] text-[#fee9fc] text-4xl p-8 w-1/2 h-full flex flex-col justify-end">
                    Sokoban est un casse-tête japonais populaire dans les années 80. On y incarne un gardien d'entrepôt
                    qui doit ranger ses caisses à des emplacements précis dans un dédale de murs uniquement en les
                    poussant,
                    sans les tirer. Sokoban Toolkit (STk) est un outil de généreration automatique de
                    casse-têtes et de vérification de résolvabilité des niveaux.
                    <br /><br />
                    <NuxtLink class="text-4xl underline">En savoir plus »</NuxtLink>
                </p>

                <img src="/moi.gif" class="h-full" />
            </div>
        </div>


        <!--Section  A Propos-->
        <div
            class="maw-w-wrapper-sm mx-24 bg-[url('/pixel_tv2.gif')] text-[#212529] font-vt323 flex flex-row space-x-8 p-12">
            <div class="flex-1">
                <h1 class="text-5xl">Un projet scolaire</h1>
                <p class="my-4 text-xl text-justify">Sokoban Level Generator est un projet conçut dans le cadre de ma
                    deuxième année de
                    licence
                    mathématiques-informatique. Pour la validation des acquis de cette année, il a été demandé aux
                    étudiants de mettre en oeuvre leurs connaissances dans la réalisation d'un projet associant maths et
                    programmation. En informatique, la génération procédurale est une méthode permettant de créer du
                    contenu numérique de manière automatisé et vérifiant un ensemble de règles. Un niveau de Sokoban à
                    pour injonction d'être solvable, des outils mathématiques tels que les graphes et quelques notions
                    basiques en intelligence artficielle sont nécessaire pour répondre à cette contrainte. Pour ces
                    raisons, j'ai proposé ce sujet qui me semble utiliser autant les mathématiques que l'informatique.
                </p>
                <NuxtLink class="text-xl text-purple-300">Qui suis-je ? >></NuxtLink>
            </div>
            <div class="flex-1">
                <h1 class="text-5xl">Un outil pratique</h1>
                <p class="my-4 text-xl text-justify">Sokoban Level Generator est un projet conçut dans le cadre de ma
                    deuxième année de
                    Il n'est pas facile pour un humain de concevoir un casse-tête à la fois intéressant et pas trop dur.
                    Parfois, on peut passer des heures à fabriquer quelques choses qui nous semble parfait, puis quand
                    un joueur l'essaie, on se rend compte qu'une solution trop simple nous a échappée ou pire encore, le
                    niveau est impossible ! Pour prévenir ces problèmes, Sokoban Level Generator vous ropose plusieurs
                    services :<br/><br/>

                    >>> Générez des niveaux ni trop durs, ni trop faciles (indisponible pour le moment)<br/>
                    >>> Exportez-les sous format .txt<br/>
                    >>> Importez vos propres niveaux et testez leurs solvabilités<br/>
                    >>> Editez en direct pour modeler le niveau comme vous le préférez !</p>
                <NuxtLink class="text-xl text-purple-300">Essayer maintenant >></NuxtLink>
            </div>
            <div class="flex-1">
                <h1 class="text-5xl">Une documentation accessible</h1>
                <p class="my-4 text-xl text-justify">Sokoban Level Generator est un projet conçut dans le cadre de ma
                    Toute la documentation concernant ce projet est libre d'accès. Vous trouverez dans la section du
                    même nom le rapport du projet écrit pour mes professeurs, ainsi que le tutoriel pour coder un jeu de
                    Sokoban, avec importation et exportation de fichier texte, en Javascript écrit pour mon blog
                    personnel. Le rapport contient en plus d'une bibliographie, l'explication du fonctionnement du
                    générateur et du solveur de niveaux accompagné de mon travail de recherche. Etant destiné a des
                    professeurs, les détails techniques ne sont pas simplifiés. En revanche, j'ai posté un article le
                    synthétisant de manière plus accessible sur mon blog. </p>
                <NuxtLink class="text-xl text-purple-300">En savoir plus >></NuxtLink>
            </div>
        </div>
        <!--Section  Toolkit-->
        <div></div>

        <!--Section  Documentation-->
        <div></div>

        <!--Section  Et Moi?-->
        <div></div>

    </div>
</template>