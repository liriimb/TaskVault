import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const words = ["Minimalistic.", "Secure.", "Free.", "Microservices.", "Fast.", "Easy use.", "Never lose track.", "All in one app."];
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timeout;

    if (!isDeleting && charIndex < currentWord.length) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 120);
    } else if (!isDeleting && charIndex === currentWord.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setText(currentWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 50);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex]);

  const handleGetStarted = () => {
    const isAuthenticated = localStorage.getItem("userToken");
    router.push(isAuthenticated ? "/tasklist" : "/login");
  };

  return (
    <div className="container">
      <div className="hero">
        <h1>Welcome to TaskVault</h1>
        <h2 className="animated-text">{text}&nbsp;</h2>
        <p>Organize your tasks effortlessly with a secure and intuitive interface.</p>
        <button className="cta-button" onClick={handleGetStarted}>Get Started</button>
      </div>
    </div>
  );
}
