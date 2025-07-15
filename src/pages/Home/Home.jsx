import Header from '../../components/Header/Header';
import EnterGame from '../../components/EnterGame/EnterGame';
import Footer from '../../components/Footer/Footer';

import cls from './home.module.css';

function Home() {
    return (
        <div>
            <Header label="Stats" href="/stats" />
            <main className="header-above">
                <div className="container main-container">
                    <section className="section">
                        <h2 className="title section-title title-center">Description</h2>
                        <p className="paragraph section-paragraph paragraph-center">
                            This is a very exciting geography game. At the start, it puts the player in a random
                            location in the world from an overhead view. The main goal is to guess where the player was placed.
                            For this purpose you are given a 2D-map where you can mark your guess on it and click
                            "Guess". At this point the game ends and you will be shown the actual location.
                        </p>
                        <p className="paragraph section-paragraph title-center">
                            This is a clone game of the more popular Geoguesser but with the twist being not Street View.
                            I took a lot of the code from an already establish Public clone and build more on top of it.
                            Again this is a fan project and I'm doing this to learn more about Google's Cloud APIs.
                        </p>
                    </section>
                    <section className="section">
                        <h2 className="title section-title title-center">Enter the game</h2>
                        <EnterGame className={cls.enter_game} />
                    </section>
                    <section className="section">
                        <h2 className="title section-title title-center">Tutorial</h2>
                        <p className="paragraph section-paragraph paragraph-center">
                            If you want, you can set your preferences before entering the game. In the first field you can specify the region you want to discover. Then you can see the zoom distance, aka difficulty of the game.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            After you've set your preferences, you're ready to enter the game, just press the "START" button. Wait until a random location is loaded and then you're finally in the game, you can play now.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            Your goal is to guess where you were placed. Exactly where you were placed at the start.
                        </p>    
                        <p className="paragraph section-paragraph paragraph-center">
                            At the end you are shown the results: your guess position and the real position, and points.
                        </p>
                        <p className="paragraph section-paragraph paragraph-center">
                            You can see your stats - visit the link in the right-top corner of the homepage. You are shown your summary and history, you can pause logging the progress, export it to a local file, import or delete.
                        </p>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
