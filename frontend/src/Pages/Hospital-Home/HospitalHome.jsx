import React from "react";
import Header from "../../Component/HomePage/Header";
import Hero from "../../Component/HomePage/Hero";
import Services from "../../Component/HomePage/Services";
import Statistics from "../../Component/HomePage/Statistics";
import Doctors from "../../Component/HomePage/Doctors";
import WhyCooseUs from "../../Component/HomePage/WhyCooseUs";
import Testmonials from "../../Component/HomePage/Testmonials";
import AppointmentSection from "../../Component/HomePage/AppointmentSection";
import Footer from "../../Component/HomePage/Footer";
import "../../Styles/Hospital Home/HospitalHome.css";

function HospitalHome() {
  return (
    <div className="hospital-home">
      <Header />

      <main className="hospital-home__main">
        <Hero />

        <section className="hospital-home__section hospital-home__services">
          <Services />
        </section>

        <section className="hospital-home__section hospital-home__doctors">
          <Doctors />
        </section>

        <section className="hospital-home__section hospital-home__appointment">
          <AppointmentSection />
        </section>

        <section className="hospital-home__section hospital-home__why">
          <WhyCooseUs />
        </section>

        <section className="hospital-home__section hospital-home__statistics">
          <Statistics />
        </section>

        <section className="hospital-home__section hospital-home__testimonials">
          <Testmonials />
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HospitalHome;
