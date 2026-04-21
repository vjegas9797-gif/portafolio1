import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import NotionContent from './NotionContent';

const personalInfo = [
  { label: 'Nombre', value: 'Julian Egas' },
  { label: 'Cumpleaños', value: '21 de Junio 1992' },
  { label: 'Teléfono', value: '(1) 123 456 789' },
  { label: 'Correo', value: 'example@example.com' },
];

export default function About({ data }: { data?: any }) {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold uppercase tracking-widest mb-4"
          >
            Sobre Mí
          </motion.h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            className="w-20 h-1 bg-black mx-auto mb-8"
          />
          {data && data.length > 0 ? (
             <div className="max-w-3xl mx-auto text-left">
               <NotionContent blocks={data} />
             </div>
          ) : (
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Soy <span className="font-bold text-black">Julian Egas</span>, estudiante apasionado de <span className="font-bold text-black">Ingeniería Electrónica</span>. Me especializo en el diseño de sistemas embebidos, automatización y robótica. Mi objetivo es aplicar la tecnología para resolver problemas complejos y crear soluciones innovadoras en el mundo del hardware y el software integrado.
            </motion.p>
          )}
        </div>

        <Card className="border-none shadow-xl bg-gray-50/50 overflow-hidden">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col items-center justify-center">
              {/* Profile & Info */}
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="w-48 h-48 rounded-full overflow-hidden shadow-lg border-4 border-white flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop" 
                    alt="Julian Egas" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-4 text-center md:text-left mt-4 md:mt-0">
                  {personalInfo.map((info) => (
                    <div key={info.label} className="flex flex-col md:flex-row md:gap-2">
                      <span className="font-bold text-gray-900 min-w-[120px]">{info.label} :</span>
                      <span className="text-gray-600">{info.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
