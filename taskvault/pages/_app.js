// pages/_app.js
import Navbar from '../components/Navbar';
import '../pages/_app.css';
import './login.css';
import './register.css';
import './index.css';

function App({ Component, pageProps }) {
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}

export default App;
