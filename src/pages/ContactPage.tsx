import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FireParticles from "@/components/FireParticles";
import sparkLogo from "@/assets/spark-logo.png";

/**
 * Contact page with form submission and social media links.
 * Provides multiple contact channels for SPARK 2026 inquiries.
 * @page
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name?.trim() || !formData.email?.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.", {
      description: "Thank you for contacting SPARK 2K26",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <FireParticles density={30} />
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-4">
              <Mail className="w-4 h-4 text-primary" />
              <span className="text-sm font-orbitron font-semibold text-primary uppercase tracking-wider">
                Get In Touch
              </span>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 mb-6">
              <h1 className="text-5xl md:text-7xl font-sans font-bold">
                Contact
              </h1>
              <img src={sparkLogo} alt="SPARK 2026" className="h-20 md:h-28 object-contain drop-shadow-[0_0_15px_rgba(195,13,22,0.6)] animate-pulse" />
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-exo">
              Have questions? Want to register? Reach out to us and become part of the revolution
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="p-8 rounded-lg bg-card/50 border border-border">
                <h2 className="text-3xl font-orbitron font-bold mb-6 text-foreground">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-orbitron font-semibold text-foreground mb-2">
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="border-glow-cyan focus:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-orbitron font-semibold text-foreground mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="border-glow-cyan focus:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-orbitron font-semibold text-foreground mb-2">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="border-glow-cyan focus:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300"
                      placeholder="+91 xxxxx xxxxx"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-orbitron font-semibold text-foreground mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="border-glow-cyan focus:shadow-[0_0_15px_hsl(var(--neon-cyan)/0.3)] transition-all duration-300"
                      placeholder="Tell us about your query..."
                    />
                  </div>

                  <Button type="submit" variant="hero" size="lg" className="w-full">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-foreground mb-2">
                      Call Us
                    </h3>
                    <p className="text-muted-foreground font-exo">+91 1234 567 890</p>
                    <p className="text-muted-foreground font-exo">+91 0987 654 321</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-foreground mb-2">
                      Email Us
                    </h3>
                    <p className="text-muted-foreground font-exo">spark2K26@svcollege.edu.in</p>
                    <p className="text-muted-foreground font-exo">info@spark2K26.com</p>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-foreground mb-2">
                      Visit Us
                    </h3>
                    <p className="text-muted-foreground font-exo">
                      SV College Campus<br />
                      Tirupati, Andhra Pradesh<br />
                      India - 517502
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="p-6 rounded-lg bg-card/50 border border-border">
                <h3 className="text-lg font-orbitron font-bold text-foreground mb-4">
                  Follow Us
                </h3>
                <div className="flex gap-3">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--fire-orange)/0.4)]"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5 text-foreground hover:text-primary transition-colors" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
            <div className="rounded-lg overflow-hidden border-2 border-border/50 hover:border-primary/50 transition-all duration-300 shadow-[0_0_30px_hsl(var(--fire-orange)/0.2)]">
              <iframe

                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.9719813829824!2d79.48344232485414!3d13.659467636722896!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4991206ff455%3A0x37f34fc0f435a909!2sSV%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1764354010221!5m2!1sen!2sin"

                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="SV College Location"
                className="grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
