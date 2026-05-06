import "./About.css";
import Author from "../../assets/author.jpg";

function About() {
  return (
    <section className="about">
      <img src={Author} alt="Author" className="about__img" />
      <div className="about__content">
        <h2 className="about__title">About the author</h2>
        <p className="about__paragraph">
          My name is Marquis Waters, and I am a fullstack software engineer.
        </p>
        <p className="about__paragraph">
          I've learned a lot about web development and design through tripleten.
          I use the MERN stack to create web applications, and I am passionate
          about building user-friendly and efficient software. To develop my
          skills further, I am constantly exploring new technologies and best
          practices in the field.
        </p>
      </div>
    </section>
  );
}

export default About;
