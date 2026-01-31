import { useState } from "react";
import { Mail, Phone, MapPin, Send, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Input validation
    if (!formData.name?.trim() || !formData.email?.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.", {
      description: "Thank you for contacting SPARK 2K25",
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
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/svce_sac" },
    { icon: Youtube, label: "YouTube", href: "https://youtube.com/@svce_sac" },
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/30 mb-4">
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm font-orbitron font-semibold text-primary uppercase tracking-wider">
              Get In Touch
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6">
            Join us in <span className="text-primary text-glow-primary">igniting the SPARK!</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-exo">
            Have questions? Want to register? Reach out to us and become part of SPARK 2026
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="">
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

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-orbitron font-bold text-foreground mb-2">
                      Contact Us
                    </h3>
                    <h5>Student Coordinators</h5>
                    <p className="text-muted-foreground font-exo">Kiran - +91 9390 223 609</p>
                    <p className="text-muted-foreground font-exo">Abdul - +91 8309 746 940</p>
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
                    <p className="text-muted-foreground font-exo">sac@svce.edu.in</p>
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
                      SVCE Campus<br />
                      Tirupati, Andhra Pradesh<br />
                      India - 517507
                    </p>
                  </div>
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
      </div>
    </section>
  );
};

export default Contact;
