import { motion } from 'framer-motion';
import { ContactForm } from './ContactForm';
import { ContactSocials } from './ContactSocials';

export function ContactSection() {
  return (
    <section id="contact" className="bg-surface py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex flex-col gap-3"
        >
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
            Contact
          </span>
          <h2 className="font-heading text-3xl font-bold text-text md:text-4xl">
            Travaillons ensemble
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          <ContactForm />
          <ContactSocials />
        </div>
      </div>
    </section>
  );
}
