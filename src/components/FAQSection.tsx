import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItemProps {
    question: string;
    answer: string | string[];
    isOpen: boolean;
    onClick: () => void;
    index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`group relative border border-white/5 rounded-2xl overflow-hidden bg-zinc-900/30 backdrop-blur-sm transition-all duration-300 ${isOpen ? "bg-zinc-900/50 border-red-500/30 shadow-[0_0_20px_rgba(220,38,38,0.1)]" : "hover:bg-zinc-900/50 hover:border-white/10"
                }`}
        >
            {/* Accent Line on Open */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "100%" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-0 top-0 w-1 bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.8)]"
                    />
                )}
            </AnimatePresence>

            <button
                onClick={onClick}
                className="w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 relative z-10"
            >
                <span className={`text-lg sm:text-xl font-bold font-orbitron tracking-wide transition-colors duration-300 ${isOpen ? "text-white" : "text-zinc-300 group-hover:text-white"
                    }`}>
                    {question}
                </span>
                <div className={`mt-1 flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${isOpen ? "border-red-500 bg-red-500/20 text-red-500 rotate-180" : "border-white/20 text-zinc-400 group-hover:border-red-500/50 group-hover:text-red-500"
                    }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 sm:p-8 pt-0 text-zinc-400 leading-relaxed text-sm sm:text-base border-t border-white/5 mx-6 sm:mx-8 mt-2">
                            {Array.isArray(answer) ? (
                                <ul className="space-y-2 list-none">
                                    {answer.map((line, i) => (
                                        <li key={i} className="flex gap-2">
                                            {line.startsWith("-") || line.startsWith("•") ? "" : <span className="text-red-500 mt-1">•</span>}
                                            <span>{line}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                answer
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqData = [
        {
            question: "Who can participate in the event?",
            answer: "Students from engineering colleges of all disciplines around the nation."
        },
        {
            question: "How do I register for the events?",
            answer: "Registration link is available in our event website svce.edu.in"
        },
        {
            question: "Is there a registration fee?",
            answer: [
                "Yes.",
                "Elite Pass - SVCE students (All Two Days): Rs. 250 + Convenience Fee.",
                "Elite Pass - Outers (All Two Days): Rs. 500 + Convenience Fee.",
                "1 Day Pass – Outers (Any One Day): Rs. 250 + Convenience Fee."
            ]
        },
        {
            question: "Can one student participate in multiple events?",
            answer: "Yes"
        },
        {
            question: "What categories of events are offered?",
            answer: "Hackathons, Youth Summit, Pitch Fest, Start-up Stories, Tech Talk, Paper Presentation, Project expo, technical & Non-technical events, Cultural contests, International Education Expo and Sports."
        },
        {
            question: "Are both solo and team events available?",
            answer: "Yes"
        },
        {
            question: "Will accommodation be provided for outstation participants?",
            answer: "Yes- On First come First served basis."
        },
        {
            question: "What documents should I bring?",
            answer: "College ID Card and Payment & Registration Acknowledgment Proofs"
        },
        {
            question: "Will certificates or prizes be awarded?",
            answer: "Yes"
        },
        {
            question: "Is transportation arranged for participating colleges?",
            answer: "No."
        },
        {
            question: "Can faculty accompany the student teams?",
            answer: "Not Required"
        },
        {
            question: "Is there a dress code?",
            answer: "Formal Attire only"
        },
        {
            question: "Are props or musical instruments provided?",
            answer: "Drum Kits and Keyboard will be provided."
        },
        {
            question: "Can participants change events after registration?",
            answer: "No"
        },
        {
            question: "What if there is a schedule clash between two events?",
            answer: "Event timings are clearly provided. Check before you complete the registration process."
        },
        {
            question: "Whether food will be provided?",
            answer: "No. On payment basis, Food can be brought from food court."
        },
        {
            question: "How can we contact the event organizers?",
            answer: "For General queries: Dr. Sampath Kumar – 88382 94783. For accommodation related Queries: Dr. Ram Kumar – 98948 15528."
        },
        {
            question: "Are there any safety or disciplinary rules?",
            answer: "Displayed in the campus Premises."
        },
        {
            question: "Can photography and videography be done?",
            answer: "Yes"
        },
        {
            question: "What happens if an event gets delayed or canceled?",
            answer: "It will be communicated in advance."
        },
        {
            question: "Is parking available on campus?",
            answer: "Yes"
        },
        {
            question: "Will medical assistance be available?",
            answer: "Yes"
        },
        {
            question: "Can outsiders/audience attend the event?",
            answer: "No. Only registered engineering students are allowed."
        },
        {
            question: "How early should participants arrive?",
            answer: "Participants should arrive before 9am, and close the registration process."
        },
        {
            question: "What is the procedure to get Refund, in case of cancelation?",
            answer: "Registration amount will not be refunded"
        }
    ];

    return (
        <section className="relative py-24 px-4 container mx-auto" id="faq">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-5xl md:text-6xl font-black font-orbitron italic tracking-tighter text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        FAQ<span className="text-red-600">.</span>
                    </h2>
                    <div className="h-1 w-24 bg-red-600 mx-auto transform -skew-x-12" />
                    <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Everything you need to know before registering.
                    </p>
                </div>

                {/* FAQ Grid */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 items-start">
                    {faqData.map((item, index) => (
                        <FAQItem
                            key={index}
                            index={index}
                            question={item.question}
                            answer={item.answer}
                            isOpen={openIndex === index}
                            onClick={() => toggleFAQ(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
