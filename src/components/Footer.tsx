// import { Heart, Zap, Mail, Phone } from "lucide-react";
// import sparkLogo from "@/assets/spark-logo.png";

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="relative py-16 overflow-hidden border-t border-border">
//       {/* Animated Sparks Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(30)].map((_, i) => (
//           <div
//             key={i}
//             className="absolute w-0.5 h-0.5 bg-primary rounded-full animate-spark-trail"
//             style={{
//               left: `${Math.random() * 100}%`,
//               bottom: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 5}s`,
//               animationDuration: `${3 + Math.random() * 3}s`,
//             }}
//           />
//         ))}
//       </div>

//       <div className="container mx-auto px-4 relative z-10">
//         {/* Main Footer Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
//           {/* About SPARK 2026 */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-orbitron font-bold text-secondary">About SPARK 2026</h3>
//             <p className="text-muted-foreground text-sm leading-relaxed font-exo">
//               SPARK 2026 is the annual technical and cultural fest of SV College, Tirupati — where innovation meets imagination. Get ready for gaming, coding, and creativity!
//             </p>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-orbitron font-bold text-secondary">Quick Links</h3>
//             <div className="flex flex-col gap-2 text-muted-foreground text-sm font-exo">
//               <button
//                 onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
//                 className="hover:text-primary transition-colors text-left"
//               >
//                 About
//               </button>
//               <button
//                 onClick={() => document.getElementById("events")?.scrollIntoView({ behavior: "smooth" })}
//                 className="hover:text-primary transition-colors text-left"
//               >
//                 Events
//               </button>
//               <button
//                 onClick={() => document.getElementById("schedule")?.scrollIntoView({ behavior: "smooth" })}
//                 className="hover:text-primary transition-colors text-left"
//               >
//                 Schedule
//               </button>
//               <a href="/events" className="hover:text-primary transition-colors">
//                 Register
//               </a>
//               <a href="/gallery" className="hover:text-primary transition-colors">
//                 Gallery
//               </a>
//               <button
//                 onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
//                 className="hover:text-primary transition-colors text-left"
//               >
//                 Contact
//               </button>
//             </div>
//           </div>

//           {/* Contact */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-orbitron font-bold text-secondary">Contact</h3>
//             <div className="space-y-3 text-muted-foreground text-sm font-exo">
//               <p className="leading-relaxed">
//                 SV College of Engineering, Tirupati
//               </p>
//               <div className="flex items-center gap-2">
//                 <Phone className="w-4 h-4 text-primary" />
//                 <a href="tel:+919876543210" className="hover:text-primary transition-colors">
//                   +91 98765 43210
//                 </a>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Mail className="w-4 h-4 text-primary" />
//                 <a href="mailto:spark@svcollegetirupati.ac.in" className="hover:text-primary transition-colors">
//                   spark@svcollegetirupati.ac.in
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Stay Updated */}
//           <div className="space-y-4">
//             <h3 className="text-xl font-orbitron font-bold text-secondary">Stay Updated</h3>
//             <div className="space-y-3">
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full px-4 py-2 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary font-exo text-sm"
//               />
//               <button className="w-full px-4 py-2 rounded-md bg-secondary text-secondary-foreground font-orbitron font-bold hover:opacity-90 transition-opacity text-sm">
//                 Subscribe
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
//           <Zap className="w-5 h-5 text-primary animate-pulse" />
//           <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
//         </div>

//         {/* Bottom Section */}
//         <div className="text-center space-y-4">
//           <p className="text-sm text-muted-foreground font-exo flex items-center justify-center gap-2 flex-wrap">
//             <span>© {currentYear} SPARK | Designed & Developed by <a href="#" className="text-secondary hover:underline">Shashi</a></span>
//           </p>
          
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border text-xs font-exo text-muted-foreground">
//             <Zap className="w-3 h-3 text-secondary" />
//             <span>Powered by Innovation & Adrenaline</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;


import { Mail, Phone, MapPin, Heart, Zap, Send, Instagram, Twitter, Facebook, Youtube } from "lucide-react";

import { toast } from "sonner";

import FireParticles from "@/components/FireParticles";
import { useState } from "react";


const Footer = () => {
  const currentYear = new Date().getFullYear();
  const year = 2026;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
  <footer className="relative py-16 overflow-hidden border-t border-border">
  {/* Animated Background */}
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(30)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 bg-primary rounded-full animate-spark-trail"
        style={{
          left: `${Math.random() * 100}%`,
          bottom: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${3 + Math.random() * 3}s`,
        }}
      />
    ))}
  </div>

  <div className="container mx-auto px-4 relative z-10">

    {/* ================= CONTACT + MAP ================= */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-20">

      {/* LEFT – CONTACT INFO */}
      <div className="space-y-6">
        {/* Call */}
        <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Phone className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold">Call Us</h3>
              <a href="tel:+919390223609" className="text-muted-foreground text-sm hover:text-primary transition" aria-label="Call Spark team">
                +91 9390 223 609
              </a>
              <br />
              <a href="tel:+918309746940" className="text-muted-foreground text-sm hover:text-primary transition" aria-label="Call Spark support">
                +91 8309 746 940
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-secondary/50 transition">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
              <Mail className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold">Email Us</h3>
              <a href="mailto:sac@svce.edu.in" className="text-muted-foreground text-sm hover:text-secondary transition" aria-label="Email SAC">
                sac@svce.edu.in
              </a>
              <br />
              <a href="mailto:spark2k26@svce.edu.in" className="text-muted-foreground text-sm hover:text-secondary transition" aria-label="Email Spark">
                spark2k26@svce.edu.in
              </a>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="p-6 rounded-lg bg-card/50 border border-border hover:border-primary/50 transition">
          <div className="flex gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-orbitron font-bold">Visit Us</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                SV College Campus<br />
                Tirupati, Andhra Pradesh<br />
                India – 517502
              </p>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="p-6 rounded-lg bg-card/50 border border-border">
          <h3 className="font-orbitron font-bold mb-4">Follow Us</h3>
          <div className="flex gap-3">
            {[Instagram, Twitter, Facebook, Youtube].map((Icon, i) => (
              <div
                key={i}
                className="w-11 h-11 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/10 flex items-center justify-center transition hover:scale-110"
              >
                <Icon className="w-5 h-5" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT – MAP */}
      <div className="rounded-lg overflow-hidden border border-border shadow-lg">
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

    {/* ================= FOOTER LINKS ================= */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

      {/* About */}
      <div>
        <h3 className="font-orbitron font-bold text-primary mb-4">About SPARK 2026</h3>
        <p className="text-sm text-muted-foreground">
          SPARK 2026 is the annual technical and cultural fest of SVCE Tirupati.
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h3 className="font-orbitron font-bold text-primary mb-4">Quick Links</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="hover:text-primary cursor-pointer">About</li>
          <li className="hover:text-primary cursor-pointer">Events</li>
          <li className="hover:text-primary cursor-pointer">Schedule</li>
          <li className="hover:text-primary cursor-pointer">Gallery</li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h3 className="font-orbitron font-bold text-primary mb-4">Contact</h3>
        <p className="text-sm text-muted-foreground">Student Coordinators</p>
        <p className="text-sm">Kiran – 9390 223 609</p>
        <p className="text-sm">Abdul – 8309 746 940</p>
      </div>

      {/* Subscribe */}
      <div>
        <h3 className="font-orbitron font-bold text-primary mb-4">Stay Updated</h3>
        <input
          type="email"
          placeholder="Your email"
          className="w-full mb-3 px-4 py-2 rounded bg-card border border-border"
        />
        <button className="w-full bg-primary py-2 rounded font-orbitron">
          Subscribe
        </button>
      </div>
    </div>

    {/* Bottom */}
    <div className="text-center text-sm text-muted-foreground">
      © 2026 SPARK | Designed & Developed by <span className="text-primary">Shashi</span>
    </div>
  </div>
</footer>

  );
};

export default Footer;
