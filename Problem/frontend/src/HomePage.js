import React from 'react';
import './Log.css'; // Import CSS file for styling

const WelcomePage = () => {

    return (

        <div className="welcome-container">

            <header className="header">

                <h1>Welcome to Our Gym</h1>

            </header>

            <section className="content">

                <p>We are dedicated to helping you achieve your fitness goals.</p>

                <p>Our state-of-the-art facilities and experienced trainers are here to support you on your fitness journey.</p>

                <button className="get-started-button">Get Started</button>

            </section>

            <footer className="footer">

                <p>Contact us at: example@gym.com</p>

            </footer>

        </div>

    );

};

export default WelcomePage;