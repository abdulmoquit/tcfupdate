import { ArrowUp, Facebook, Instagram, Youtube, Twitter } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-heading text-2xl font-bold text-primary">TCF</span>
              <span className="font-heading text-xl font-light text-foreground tracking-wider">GYM</span>
            </div>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              The Calcutta Fitness Studio Plus — Kolkata's premier multi-branch fitness chain since 2014.
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, Youtube, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Programs", "Trainers", "Pricing", "Contact"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Programs</h4>
            <ul className="space-y-2">
              {["Strength Training", "CrossFit", "Zumba", "Yoga", "HIIT", "Kickboxing"].map((p) => (
                <li key={p}>
                  <a href="#programs" className="font-body text-sm text-muted-foreground hover:text-primary transition-colors">
                    {p}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-sm uppercase tracking-wider text-foreground mb-4">Contact</h4>
            <div className="space-y-3 font-body text-sm text-muted-foreground">
              <p>Head Office: 42, Gariahat Road<br />Kolkata - 700029</p>
              <p>Phone: +91 98765 43210</p>
              <p>Email: info@tcfgym.in</p>
              <p>Mon-Sun: 5 AM - 11 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-muted-foreground">
            © 2024 The Calcutta Fitness Studio Plus. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="p-2 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
