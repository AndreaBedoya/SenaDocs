export default function CentroAyuda() {
  return (
    <div className="help-wrapper">
      <nav className="help-navbar">
        <div className="logo">SENA DOCS</div>
        <div className="nav-links">
          <a href="#">Upgrade</a>
          <a href="#">Log In</a>
          <span className="settings-icon">⚙️</span>
        </div>
      </nav>

      <header className="help-header">
        <h1>How can we help?</h1>
        <input
          type="text"
          className="help-search"
          placeholder="Search how tos and more"
        />
        <div className="top-searches">
          <button>Forms</button>
          <button>Templates</button>
          <button>Rules</button>
          <button>Export</button>
          <button>Billing</button>
        </div>
      </header>

      <section className="help-intro">
        <h2>New to SenaDocs? Start here.</h2>
        <div className="help-cards">
          <div className="card">
            <img src="/img/getting-started.png" alt="Getting started" />
            <p>Getting started with SenaDocs</p>
          </div>
          <div className="card">
            <img src="/img/video-tutorials.png" alt="Video tutorials" />
            <p>Video tutorials</p>
          </div>
          <div className="card">
            <img src="/img/navigating-interface.png" alt="Navigating Asana" />
            <p>Navigating the Asana interface</p>
          </div>
        </div>
      </section>
    </div>
  );
};
