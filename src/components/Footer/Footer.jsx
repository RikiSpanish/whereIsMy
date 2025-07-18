import spbw from "../../utils/spbw";

import origLogo from '../../assets/img/original.svg';
import cls from './footer.module.css';

function Footer() {
    return (
        <footer className={cls.footer}>
            <div className={cls.part_top}>
                <div className={spbw('container', cls.container)}>
                    <div className={cls.section}>
                        <h3 className={cls.section_header}>
                            Disclaimer
                        </h3>
                        <p className={cls.section_text}>
                            I'm not a pirate. I didn't hack any sources. I don't cooperate with pirates or somebody else
                            who's bad... I just took an idea for my own and others' education/experience making web-apps
                            and working with APIs. I don't monetize this project. I encourage you to use the original.
                            Thank you for your attention.
                        </p>
                        <div className={cls.section_image}>
                            <a href="https://geoguessr.com/" target="_blank" rel="noreferrer">
                                <img src={origLogo} alt="GeoGuessr" />
                            </a>
                        </div>
                    </div>
                    <div className={cls.section}>
                        <h3 className={cls.section_header}>
                            Built with...
                        </h3>
                        <div className={cls.section_text}>
                            <ul className={cls.list}>
                                <li>NPM</li>
                                <li>JavaScript</li>
                                <li>ReactJS</li>
                                <li>Google Maps API</li>
                                <li>Turf</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cls.part_bottom}>
                <div className={spbw('container', cls.container)}>
                    <p>
                        &copy; 2025 JakeFleischer
                    </p>
                    <p>
                        My GitHub:{' '}
                        <a
                            href="https://github.com/RikiSpanish"
                            target="_blank"
                            rel="noreferrer"
                        >
                            RikiSpanish
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
