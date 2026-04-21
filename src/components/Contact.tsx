import { motion } from 'motion/react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import NotionContent from './NotionContent';

export default function Contact({ data }: { data?: any }) {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold uppercase tracking-widest mb-12"
            >
              Contactos
            </motion.h2>

            {data && data.length > 0 ? (
              <NotionContent blocks={data} />
            ) : (
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider mb-1">Dirección</h3>
                    <p className="text-gray-600">1324 Lorem Ipsum, USA</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider mb-1">Correo</h3>
                    <p className="text-gray-600">example@example.com</p>
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold uppercase tracking-wider mb-1">Teléfono</h3>
                    <p className="text-gray-600">+00 123 456 789</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Contact Form */}
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold uppercase tracking-widest mb-12"
            >
              Envíanos un Mensaje
            </motion.h2>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Nombre</label>
                  <Input placeholder="Tu Nombre" className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Correo</label>
                  <Input placeholder="Tu Correo" className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Mensaje</label>
                <Textarea placeholder="Tu Mensaje" className="min-h-[150px] border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-colors resize-none" />
              </div>
              <Button className="bg-white text-black border border-black hover:bg-black hover:text-white transition-all duration-300 rounded-none px-8 py-6 uppercase tracking-widest font-bold">
                Enviar Mensaje
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Wave Shape Divider (Bottom) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-[-1]">
        <svg className="relative block w-full h-[150px] md:h-[250px]" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5,73.84-4.36,147.54,16.88,218.2,35.26,69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113,-1.14,1200,0V120H0Z" fill="#111111"></path>
        </svg>
      </div>
    </section>
  );
}
