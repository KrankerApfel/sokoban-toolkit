<template>
    <div class="m-auto py-24">
        <!-- Section Accueil -->
        <div id="accueil" class="h-screen p-2 pb-8 bg-[url('/bkg_home.png')] text-white font-vt323">
            <h1 class="text-4xl m-8">-Sokoban Level Generator-</h1>

            <div class="flex flex-row  h-1/2 ml-24">
                <p class="bg-black border-2 border-[#Fee9fc] text-[#fee9fc] text-lg p-8 w-1/2 flex flex-col ">
                    Sokoban est un casse-tête japonais populaire dans les années 80. On y incarne un gardien d'entrepôt
                    qui doit ranger ses caisses à des emplacements précis dans un dédale de murs uniquement en les
                    poussant,
                    sans les tirer. Sokoban Toolkit (STk) est un outil de généreration automatique de
                    casse-têtes et de vérification de résolvabilité des niveaux.
                    <br /><br />
                    <NuxtLink class="text-4xl">En savoir plus »</NuxtLink>
                </p>

                <img src="/moi.gif" class="h-full" />
            </div>
        </div>

        <!--Section  A Propos-->
        <div id="a-Propos" class="p-8 bg-[url('/pixel_tv2.gif')] text-[#212529] font-vt323 flex flex-row space-x-8 ">
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
                    services :<br /><br />

                    >>> Générez des niveaux ni trop durs, ni trop faciles (indisponible pour le moment)<br />
                    >>> Exportez-les sous format .txt<br />
                    >>> Importez vos propres niveaux et testez leurs solvabilités<br />
                    >>> Editez en direct pour modeler le niveau comme vous le préférez !</p>
                <NuxtLink class="text-xl text-purple-300">Essayer maintenant >></NuxtLink>
            </div>
            <div class="flex-1">
                <h1 class="text-5xl">Une documentation accessible</h1>
                <p class="my-4 text-xl text-justify mx-">Sokoban Level Generator est un projet conçut dans le cadre de ma
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

        <!--Section  Documentation-->
        <div id="doc" class="max-w-wrapper-sm m-24 p-2 pb-8 bg-[url('/floor.png')] text-white font-vt323">
            <div class="flex flex-row items-end m-8">
                <img class="h-10 object-contain" src="/deco.png" />
                <h1 class="text-6xl ml-2">Documentation</h1>
            </div>


            <div class="flex flex-row m-8">
                <p class="bg-[#000000B3] text-[#fee9fc] text-xl p-8 w-3/4 justify-end">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.<br /><br />
                    <NuxtLink> Lire le PDF » </NuxtLink><br />
                    <NuxtLink> Suivre le tutoriel » </NuxtLink><br />
                    <NuxtLink> Consulter l'article » </NuxtLink>
                </p>



                <img class="m-8 h-80" src="/kanji.png" />
            </div>
        </div>

        <!--Section  Et Moi?-->
        <div id="etMoi" class="max-w-wrapper-sm m-24 p-2 pb-8 text-[#fee9fc] font-vt323 border-6 border-[#fee9fc]">

            <div class="border-2 m-8 mr-60 border-[#fee9fc] p-20 -z-10">
                <h1 class="text-5xl">- Qui suis-je ? -</h1>
                <div class="flex flex-row">
                    <p class="text-xl p-8 bg-black mr-[50px] ">
                        Développeur de jeux vidéo amateur, j'étudis actuellement l'informatique et un peu les
                        mathématiques
                        en licence 2 à l'université. Je tiens également un blog qui parle principalement de conception
                        de
                        jeux vidéo et de l'actualité autour.
                    </p>
                   
                    <img src="https://avatars0.githubusercontent.com/u/19972486?s=400&u=c92018a13e1844e050fac4f903e248f43d335625&v=4"
                        alt="photo de profil Github" class="w-50 h-50" />
                   
                        <div class="mt-[15px] mr-[75px] mb-auto ml-[25px] ">
                        <p class="bg-[rgba(249,213,213,0.5)] w-[320px] h-[320px] p-[10px] text-xl">
                            C:// T. RKT
                            <br />&raquo; Réalisé en Mars 2018
                            <br />Développeur web, logiciel et illustrateur 2D
                            <br /><br />
                            <br />い. <a href="https://www.linkedin.com/in/tomrakotomanampison/" style="color:#fee9fc;">LinkedIn 
                            </a>
                            <br />ろ. <a href="https://krankerapfel.github.io" style="color:#fee9fc;">Porfolio</a>
                            <br />は. t.rakoto76 @ gmail.com

                        </p>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<style lang="css" scoped>
a {
    color: #800080;
}

a:hover {
    text-decoration: underline;

}
</style>